import { Hono } from "hono";
import db from "../(utils)/db";
import { Role } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

const RoleEnum = z.enum(["viewer", "agent", "admin", "dev"]);
const RoleRequestSchema = z.object({
  role: RoleEnum,
});

export type RoleRequest = z.infer<typeof RoleRequestSchema>;

app.use(clerkMiddleware());

// Update the User's Role
app.post(
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
);

// Used to verify User in Database, and get a User's Role
app.get("/:public_id", async (c) => {
  try {
    const publicId = c.req.param("public_id");

    // Database query (obvs)
    const user = await db.user.findUnique({
      where: { public_id: publicId },
    });

    // Let the Client (Front-End) decide what to do with a 404
    if (!user) {
      throw new HTTPException(404, { message: "Error: User not found" });
    }

    // Response object
    return c.json(
      { results: user.role },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    // Use as a "Catch-All" error handler
    // Show error in console for Debugging (Realistically this should be logged used a package)
    console.log("Error ------- ", error);

    // Respond with an Error for Client "error" state
    throw new HTTPException(500, { message: "Error: Something went wrong" });
  }
});

// Templated Create Route
app.post("/create", async (c) => {
  try {
    // Get the current user
    const auth = getAuth(c);

    // Ensure user is signed in
    if (!auth?.userId) {
      console.log("Unable to authenticate user");
      throw new HTTPException(401);
    }

    // Create User in DB
    const user = db.user.create({
      data: {
        public_id: auth.userId,
      },
    });

    console.log("User created!!");

    if (!user) {
      throw new HTTPException(500, { message: "Error creating User" });
    }

    // Response object
    return c.json(
      { results: user },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    // Use as a "Catch-All" error handler
    // Show error in console for Debugging (Realistically this should be logged used a package)
    console.log(error);

    // Respond with an Error for Client "error" state
    throw new HTTPException(500, {
      message: "Something unexpected happened",
    });
  }
});

export default app;
