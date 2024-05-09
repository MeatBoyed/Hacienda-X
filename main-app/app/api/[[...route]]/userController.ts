import { Hono } from "hono";
import db from "./db";
import { Role } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

const RoleEnum = z.enum(["viewer", "agent", "admin", "dev"]);
const RoleRequestSchema = z.object({
  userId: z.string().min(4),
  role: RoleEnum,
});

export type RoleRequest = z.infer<typeof RoleRequestSchema>;

// Test Webhooks work via Clerkdashboard & manually in project
// Test that the call to the this API works, sending back send data
// Test that pipeline works in saving userId to Database
// Test webhook client

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

// Endpoint ("/api/properties")
app.post(
  "/updateRole",
  // Validates the Incoming data is the correct type through Zod validation schema
  zValidator("json", RoleRequestSchema),
  async (c) => {
    try {
      // Get Payload UserId & Desired Role
      const roleRequest = c.req.valid("json");

      //   Verify the Client user & Request user are the same person
      const { userId } = auth();

      if (userId !== roleRequest.userId) {
        console.error("Error validating Client & Request Users");
        throw new Error("Error validating Users");
      }

      // Database query (obvs)
      //   const user = await db.user.update({
      //     where: { userId: userId },
      //     data: {
      //       role: roleRequest.role
      //     },
      //   });

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

// Endpoint ("/api/properties/:slug")
// - The slug will be the public, Search Engine Optimized, unique identifier for Properties.
app.get("/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");

    // Database query (obvs)
    const prop = await db.property.findFirst({
      where: { title: slug }, // Property needs a Slug field in DB
    });

    // Let the Client (Front-End) decide what to do with a 404
    if (!prop) {
      return c.json(
        { results: undefined },
        {
          status: 200,
        }
      );
    }

    // Response object
    return c.json(
      { results: prop },
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
});

export default app;
