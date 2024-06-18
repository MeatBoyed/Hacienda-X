import { Hono } from "hono";
import db from "../(utils)/db";
import { Property } from "@prisma/client";
import { HTTPException } from "hono/http-exception";
import { PropertySchema, parseFormData } from "@/lib/FormUtils";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { validator } from "hono/validator";
import { z } from "zod";
import { uploadFilesToS3 } from "./uploadFile";

const app = new Hono();

app.use(clerkMiddleware());

// Endpoint ("/api/properties")
app.get("/", async (c) => {
  try {
    // Database query (obvs)
    const properties = await db.property.findMany({
      include: { Address: true },
    });

    // Response object
    return c.json(
      { results: properties },
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
      message: "An Unexpected error occurred",
    });
  }
});

// Endpoint ("/api/properties/:slug")
// - The slug will be the public, Search Engine Optimized, unique identifier for Properties.
app.get("/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");

    // Database query (obvs)
    const property = await db.property.findFirst({
      where: { title: slug }, // Property needs a Slug field in DB
      include: { Address: true },
    });

    // Let the Client (Front-End) decide what to do with a 404
    if (!property) {
      return c.json({ results: undefined, notFound: true }, { status: 200 });
    }

    // Response object
    return c.json(
      { results: property, notFound: false },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    // Use as a "Catch-All" error handler
    // Show error in console for Debugging (Realistically this should be logged used a package)
    console.log(error);

    // Respond with an Error for Client "error" state
    throw new HTTPException(500, { message: "An unexpected error occured" });
  }
});

// Images are Uploaded via the backend to better Identify
app.post(
  "/create",
  // Validates the Incoming data is the correct type through Zod validation schema
  validator("form", (value, c) => {
    const parsed = parseFormData(value);
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

    const prop = c.req.valid("form");
    console.log("Your Submitted form data: ", prop);

    // Upload image process
    const imageUpload = await uploadFilesToS3(auth.userId, prop.images); // Url format: https:<aws-domain>/<userId>/<unique-uuid>
    console.log("Uploaded Images - ", imageUpload);

    let property;

    try {
      // Database query (obvs)
      property = await db.property.create({
        data: {
          title: prop.title,
          description: prop.description,
          price: prop.price,
          bathrooms: prop.bathrooms,
          bedrooms: prop.bedrooms,
          pool: prop.pool,
          saleType: prop.saleType,
          visibility: prop.visibility,
          agent_id: auth.userId,
          images: imageUpload.uploadedImages,
          sold: false,
          extraFeatures: prop.extraFeatures,
          Address: {
            // update to Connect or Create
            create: {
              address: prop.address,
              street: "dffg",
              city: "ksdf",
              country: "asd",
              latitude: prop.lat,
              longitude: prop.lng,
            },
          },
        },
      });
    } catch (error: any) {
      // Show error in console for Debugging (Realistically this should be logged used a package)
      // Respond with an Error for Client "error" state
      throw new Error("Something went wrong. Error: ", error as Error);
    }
    if (!property) {
      throw new HTTPException(500, { message: "Error: Upserting property" });
    }

    // Response object
    return c.json(
      { results: property },
      {
        status: 200,
      }
    );
  }
);

export type AppType = typeof app;

export default app;
