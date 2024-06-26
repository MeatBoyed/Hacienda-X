import { Hono } from "hono";
import db from "../(utils)/db";
import { HTTPException } from "hono/http-exception";
import { clerkMiddleware } from "@hono/clerk-auth";
import { PropertyWithAddress } from "../(utils)/utils";

const app = new Hono();

app.use(clerkMiddleware());

// Fetch All Products - Public Endpoint
app.get("/", async (c) => {
  try {
    // Database query (obvs)
    const properties = await db.property.findMany({
      where: { visibility: { not: "Deleted" } },
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

// Fetch Specific Product - Public Endpoint
app.get("/:slug", async (c) => {
  const slug = c.req.param("slug");

  let property: PropertyWithAddress;
  try {
    // Database query (obvs)
    property = await db.property.findFirstOrThrow({
      where: { title: slug, visibility: { not: "Deleted" } }, // Property needs a Slug field in DB
      include: { Address: true },
    });
  } catch (error: any) {
    console.log("Error: ", error as Error);
    throw new HTTPException(500, { message: "An unexpected error occured" });
  }
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
});

export type AppType = typeof app;
export default app;
