import { Hono } from "hono";
import db from "../(utils)/db";
import { auth } from "@clerk/nextjs/server";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.use(clerkMiddleware());

// Templated Create Route
app.post("/create", async (c) => {
  try {
    // Get the current user
    // const auth = getAuth(c);

    // // Ensure user is signed in
    // if (!auth?.userId) {
    //   console.log("Unable to authenticate user");
    //   throw new HTTPException(401);
    // }

    // // Create User in DB
    // const user = db.user.create({
    //   data: {
    //     public_id: auth.userId,
    //   },
    // });

    // console.log("User created!!");

    // if (!user) {
    //   throw new HTTPException(500, { message: "Error creating User" });
    // }

    // Response object
    return c.json(
      { results: "Hello" },
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
