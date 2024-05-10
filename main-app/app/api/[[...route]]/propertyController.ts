import { Hono } from "hono";
import db from "./db";
import { Prisma } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

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
      message: "Error: Unexpected error occured",
    });
  }
});

// Endpoint ("/api/properties/:slug")
// - The slug will be the public, Search Engine Optimized, unique identifier for Properties.
app.get("/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");

    // Easy Prisma Types - https://stackoverflow.com/questions/68366105/get-full-type-on-prisma-client
    // type PropertyWithAddress = Prisma.<{
    //   include: {
    //     cars: true;
    //   };
    // }>;

    // Database query (obvs)
    const property = await db.property.findFirst({
      where: { title: slug }, // Property needs a Slug field in DB
      include: { Address: true },
    });

    // Let the Client (Front-End) decide what to do with a 404
    if (!property) {
      throw new HTTPException(404, { message: "Property not found" });
    }

    // Response object
    return c.json(
      { results: property },
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
