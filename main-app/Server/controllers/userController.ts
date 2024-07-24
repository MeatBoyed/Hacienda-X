import { Hono } from "hono";
import db from "../utils/db";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import { authenticateUser } from "./dashboardController";
import { Prisma, Role, User } from "@prisma/client";

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

const app = new Hono()
  .use(clerkMiddleware())
  // Update the User's Role
  .post(
    "/create",
    zValidator(
      "json",
      z.object({
        user_id: z.string().min(10, { message: "User id is required" }),
        firstName: z.string().min(3, { message: "Name must be at least 3 characters long." }),
        lastName: z.string().min(3, { message: "Surname must be at least 3 characters long." }),
        email: z.string().email({ message: "Email address must be valid." }),
        company: z.string().optional(),
        phoneNumber: z.string().optional(),
        isAgent: z.boolean(),
      })
    ),
    async (c) => {
      const { userId } = await authenticateUser(c);
      const userForm = c.req.valid("json");

      if (userId !== userForm.user_id) throw new HTTPException(401, { message: "Unable to Authenticate" });

      const startDate = new Date();
      const endDate = startDate;
      endDate.setDate(startDate.getDate() + 30);

      // Create User
      await db.user.create({
        data: {
          email: userForm.email,
          company: userForm.company,
          public_id: userForm.user_id,
          lastName: userForm.lastName,
          firstName: userForm.firstName,
          role: userForm.isAgent ? "agent" : "viewer",
          subscriptions: {
            create: {
              start_date: startDate,
              end_date: endDate,
              plan_type: "Trail",
              payment_status: "Unpaid",
            },
          },
        },
      });
    }
  )
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

    // TODO: Implement client side handling
    return c.json(
      await db.user.findUniqueOrThrow({
        where: { public_id: publicId },
        select: {
          firstName: true,
          lastName: true,
          email: true,
          public_id: true,
          subscriptions: {
            where: {
              plan_type: { not: "Pending" },
              end_date: {
                not: {
                  gt: new Date(),
                },
              },
            },
          },
        },
      })
    );
  });

export default app;
