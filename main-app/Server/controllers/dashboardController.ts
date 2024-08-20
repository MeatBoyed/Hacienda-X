import { Context, Hono } from "hono";
import db from "../utils/db";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import { DeletePropertyPayload, PropertySchema } from "@/lib/FormUtils";
import { zValidator } from "@hono/zod-validator";
import PropertyService from "../lib/PropertyService";

const propertyService = new PropertyService();

const app = new Hono().use(clerkMiddleware());

// Checks user exists (True: Exist, False: Doesn't)
app.get("/authuser", async (c) => {
  const user = authenticateUser(c);
  return c.json(
    await db.user.findFirstOrThrow({
      where: { public_id: user.userId, role: "agent" },
    })
  );
});

// Fetch Agent's Products - Private Endpoint
app.get("/property", async (c) => {
  const user = authenticateUser(c);
  return c.json(
    await db.property.findMany({
      where: { agent_id: user.userId, visibility: { not: "Deleted" } },
      include: { Address: true },
    })
  );
});

// Fetch Agent's Specific Product - Private Endpoint
app.get("/property/:propertyid", async (c) => {
  // Get the current user
  const user = authenticateUser(c);

  const propertyId = c.req.param("propertyid");
  return c.json(
    await db.property.findFirstOrThrow({
      where: {
        agent_id: user.userId,
        property_id: propertyId,
        visibility: { not: "Deleted" },
      }, // Property needs a Slug field in DB
      include: { Address: true },
    })
  );
});

// Create Product - Private Endpoint
app.post("/property/create", zValidator("json", PropertySchema), async (c) => {
  const user = authenticateUser(c); // Auth user
  const payload = c.req.valid("json"); // Get Payload

  const response = await propertyService.Create(payload, user.userId); // Offload to Business Layer
  if (response.failure || !response.success) throw new HTTPException(500, { message: response.message });

  return c.json(response.success);
});

// Update Product - Private Endpoint
app.post("/property/update", zValidator("json", PropertySchema), async (c) => {
  const user = authenticateUser(c); // Auth user

  const prop = c.req.valid("json"); // Get Payload
  const response = await propertyService.Update(prop, user.userId); // Offload to Business Layer
  if (response.failure || !response.success) throw new HTTPException(500, { message: response.message });

  return c.json(response.success);
});

// Delete Product - Private Endpoint
app.post("/property/delete", zValidator("json", DeletePropertyPayload), async (c) => {
  const user = authenticateUser(c); // Auth

  const deletePayload = c.req.valid("json"); // Get Payload
  if (user.userId !== deletePayload.agentId) throw new HTTPException(403, { message: "Unable to verify request" });

  const response = await propertyService.Delete(deletePayload); // Offload to Business Layer
  if (response.failure || !response.success) throw new HTTPException(500, { message: response.message });

  return c.json(response.success);
});

export default app;

// Checks Clerk auth & returns logged in User
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
