import { Hono } from "hono";
import db from "../utils/db";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import { authenticateUser } from "./dashboardController";
import { Prisma, Role, User } from "@prisma/client";
import { Create, GetUser } from "../lib/UserService";

export const RoleEnum = z.enum(["viewer", "agent", "admin", "dev"]);
const RoleRequestSchema = z.object({
  role: RoleEnum,
});

const validUserSchema = z.object({
  user_id: z.string(),
});

const serverUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  public_id: z.string(),
});
export type ServerUser = z.infer<typeof serverUserSchema>;
export type RoleRequest = z.infer<typeof RoleRequestSchema>;
export type ValidUserRes = z.infer<typeof validUserSchema>;

export const userPayloadSchema = z.object({
  user_id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  company: z.string().optional(),
  phoneNumber: z.string().optional(),
});
export type UserPayload = z.infer<typeof userPayloadSchema>;

const app = new Hono()
  .use(clerkMiddleware())
  // Update the User's Role
  .post("/", zValidator("json", userPayloadSchema), async (c) => {
    await authenticateUser(c);
    const userForm = c.req.valid("json");

    const res = await Create(userForm);
    if (res.err) {
      throw new HTTPException(500, { message: res.val.message });
    }
    return c.json(res.val);
  })
  .post(
    "/updateRole",
    // Validates the Incoming data is the correct type through Zod validation schema
    zValidator("json", RoleRequestSchema),
    async (c) => {
      try {
        // Get Payload UserId & Desired Role
        const roleRequest = c.req.valid("json");

        // Get the current user
        const auth = getAuth(c);

        // Ensure user is signed in
        if (!auth?.userId) {
          console.log("Unable to authenticate user");
          throw new HTTPException(401);
        }

        // Database query (obvs)
        const user = await db.user.upsert({
          where: { public_id: auth.userId },
          create: {
            public_id: auth.userId,
            role: roleRequest.role,
            email: "",
            firstName: "",
            lastName: "",
            company: "",
          },
          update: {
            role: roleRequest.role,
          },
        });

        if (!user) {
          throw new HTTPException(500, { message: "Error: Upserting User" });
        }

        // Response object
        return c.json(
          { results: roleRequest },
          {
            status: 200,
          }
        );
      } catch (error: any) {
        // Use as a "Catch-All" error handler

        // Show error in console for Debugging (Realistically this should be logged used a package)
        console.log(error);

        // Respond with an Error for Client "error" state
        throw new Error("Something went wrong. Error: ", error);
      }
    }
  )
  // Used to verify User in Database, and get a User's Role
  .get("/:public_id", async (c) => {
    const publicId = c.req.param("public_id");
    const { userId } = await authenticateUser(c);

    if (userId !== publicId) throw new HTTPException(401);

    console.log("Getting User: ", publicId);
    const res = await GetUser(publicId);
    if (res.err) {
      throw new HTTPException(500, { message: res.val.message });
    }

    return c.json(res.val);
  });

export default app;
