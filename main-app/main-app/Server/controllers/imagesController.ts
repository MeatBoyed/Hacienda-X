import { Context, Hono } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import S3Service from "@/components/UploadShad/server/S3Service";
import { FilePayloadSchema } from "@/components/UploadShad/types";
import { zValidator } from "@hono/zod-validator";

const acceptedTypes = ["image/png", "image/jpeg"];
const maxFileSize = 10 * 1024 * 1024; // 10MB

const s3Service = new S3Service();

const app = new Hono()
  .post("/", async (c) => {
    console.log("Hello youu");

    const raw = await c.req.raw.json();
    const filePayload = FilePayloadSchema.safeParse(raw);
    if (!filePayload.success || !filePayload.data) throw new HTTPException(405, { message: "Missing payload values" });

    const signedURLResult = await s3Service.getSignedURL(filePayload.data, { acceptedTypes, maxFileSize });

    if (signedURLResult.failure)
      throw new HTTPException(400, { message: "Failed to generate signed URL.", cause: signedURLResult.failure });

    return c.json(signedURLResult);
  })
  .post("/delete", async (c) => {
    await authenticateUser(c);

    const { url } = c.req.query();
    if (!url) throw new HTTPException(400, { message: "Missing query values" });

    const deleteResult = await s3Service.deleteFile(url);

    if (deleteResult.failure || deleteResult.success === false)
      throw new HTTPException(400, { message: "Failed to delete file.", cause: deleteResult.failure });
    console.log("Result: ", deleteResult);

    return c.json(deleteResult);
  });

/**
 *
 * @param c API Context
 * @returns Authenticated user
 */
export function authenticateUser(c: Context) {
  // Get the current user
  const auth = getAuth(c);

  // Ensure user is signed in
  if (!auth?.userId) {
    const errorResponse = new Response("Unauthorized Request", {
      status: 401,
      headers: {
        Authenticate: 'error="invalid_token"',
      },
    });
    throw new HTTPException(401, { res: errorResponse });
  }

  return auth;
}

export default app;
