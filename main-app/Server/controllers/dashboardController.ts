import { Context, Hono } from "hono";
import db from "../utils/db";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import { DeletePropertyPayload, PropertySchema } from "@/lib/FormUtils";
import { zValidator } from "@hono/zod-validator";
import PropertyService from "../lib/PropertyService";
import { SignedInAuthObject } from "@clerk/backend/internal";
import { StatusCode } from "hono/utils/http-status";

const propertyService = new PropertyService();

const app = new Hono()
  .use(clerkMiddleware())
  // Checks user exists (True: Exist, False: Doesn't)
  .get("/authuser", async (c) => {
    const user = authenticateUser(c);
    return c.json(
      await db.user.findFirstOrThrow({
        where: { public_id: user.userId, role: "agent" },
      })
    );
  })

  // Fetch Agent's Products - Private Endpoint
  .get("/property", async (c) => {
    const user = authenticateUser(c);

    const response = await propertyService.GetAll(user.userId);
    if (response.err) throw new HTTPException((response.val.status as StatusCode) || 500, { message: response.val.message });

    return c.json(response.val);
  })

  // Fetch Agent's Specific Product - Private Endpoint
  .get("/property/:propertyid", async (c) => {
    // Get the current user
    const user = authenticateUser(c);
    const propertyId = c.req.param("propertyid");

    const response = await propertyService.Get(propertyId); // Get specific property
    if (response.err) throw new HTTPException((response.val.status as StatusCode) || 500, { message: response.val.message });

    // Ensure user is the owner of the property
    if (response.val.properties[0].agent_id !== user.userId)
      throw new HTTPException(403, { message: "Unable to verify request" });

    return c.json(response.val);
  })

  // Create Product - Private Endpoint
  .post("/property/create", zValidator("json", PropertySchema), async (c) => {
    const user = authenticateUser(c); // Auth user
    const payload = c.req.valid("json"); // Get Payload

    const response = await propertyService.Create(payload, user.userId); // Offload to Business Layer
    if (response.err) throw new HTTPException((response.val.status as StatusCode) || 500, { message: response.val.message });

    return c.json(response.val);
  })

  // Update Product - Private Endpoint
  .post("/property/update", zValidator("json", PropertySchema), async (c) => {
    const user = authenticateUser(c); // Auth user

    const prop = c.req.valid("json"); // Get Payload
    const response = await propertyService.Update(prop, user.userId); // Offload to Business Layer
    if (response.err) throw new HTTPException((response.val.status as StatusCode) || 500, { message: response.val.message });

    return c.json(response.val);
  })

  // Delete Product - Private Endpoint
  .post("/property/delete", zValidator("json", DeletePropertyPayload), async (c) => {
    const user = authenticateUser(c); // Auth

    const deletePayload = c.req.valid("json"); // Get Payload
    if (user.userId !== deletePayload.agentId) throw new HTTPException(403, { message: "Unable to verify request" });

    const response = await propertyService.Delete(deletePayload); // Offload to Business Layer
    if (response.err) throw new HTTPException((response.val.status as StatusCode) || 500, { message: response.val.message });

    return c.json(response.val);
  });

export default app;

// Checks Clerk auth & returns logged in User
// TODO: Check metadata validation is functional (within clerk)
export function authenticateUser(c: Context) {
  // Get the current user
  const auth = getAuth(c);
  const sessionClaims = auth?.sessionClaims;

  // Ensure user is signed in
  if (!auth?.userId || !sessionClaims) {
    // throwUnauthorized();
    throw throwUnauthorized();
  }

  // Ensure user is an agent or admin
  if (sessionClaims?.metadata === undefined) throw throwUnauthorized();
  if (sessionClaims?.metadata.role === undefined) throw throwUnauthorized();

  if (sessionClaims?.metadata.role === "viewer") throw throwUnauthorized();
  return auth;
}

function throwUnauthorized() {
  const errorResponse = new Response("Unauthorized Request", {
    status: 401,
    headers: {
      Authenticate: 'error="invalid_token"',
    },
  });
  throw new HTTPException(401, { res: errorResponse });
}
