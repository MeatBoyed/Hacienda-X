import { Hono } from "hono";
import db from "./db";

const app = new Hono();

// Endpoint ("/api/properties")
app.get("/", async (c) => {
  try {
    // Database query (obvs)
    const properties = await db.property.findMany();

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
    throw new Error("Something went wrong. Error: ", error);
  }
});

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
          status: 404,
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
