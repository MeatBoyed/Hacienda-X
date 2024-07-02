import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { deleteImages, uploadFilesToS3 } from "./uploadFile";
import { validator } from "hono/validator";
import { parseImageUploadFormData } from "@/lib/FormUtils";
import { AWS_S3_BASE_URL, AWS_S3_PRODUCTION_FOLDER_NAME } from "../utils/utils";

const app = new Hono();

app.use(clerkMiddleware());

export const PreSignRequest = z.object({
  images: z.array(z.instanceof(File)),
});
export const DeleteImagesRequestSchema = z.object({
  deletedImage: z.string(),
});

app.post(
  "/upload",
  validator("form", (value, c) => {
    const parsed = parseImageUploadFormData(value);
    if (!parsed) {
      return c.text("Invalid!", 401);
    }
    return parsed;
  }),
  async (c) => {
    // Get the current user
    const auth = getAuth(c);

    // Ensure user is signed in
    if (!auth?.userId) {
      console.log("Unable to authenticate user");
      throw new HTTPException(401);
    }

    const images = c.req.valid("form").images;

    const res = await uploadFilesToS3(auth.userId, images);

    if (!res) {
      return c.json({ message: "unable to upload" }, { status: 500 });
    }

    const imageUrls: string[] = images.map(
      (image) =>
        `${AWS_S3_BASE_URL}/${AWS_S3_PRODUCTION_FOLDER_NAME}/${image.name}`
    );
    console.log("Image URLs: ", imageUrls);

    return c.json({ result: imageUrls }, { status: 200 });
  }
);

// app.post(
//   "/delete",
//   zValidator("json", DeleteImagesRequestSchema),
//   async (c) => {
//     // Get the current user
//     const auth = getAuth(c);

//     // Ensure user is signed in
//     if (!auth?.userId) {
//       console.log("Unable to authenticate user");
//       throw new HTTPException(401);
//     }

//     const image = c.req.valid("json");
//     console.log("Images: ", image);

//     const res = await deleteImages(image.deletedImage);

//     if (!res) throw new Error("Unable to Delete Image");

//     return c.json({ result: res }, { status: 200 });
//   }
// );

export default app;
