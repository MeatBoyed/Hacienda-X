import { Hono } from "hono";
import db from "../utils/db";
import { clerkMiddleware } from "@hono/clerk-auth";
import PropertyService from "../lib/PropertyService";
import { HTTPException } from "hono/http-exception";
import { StatusCode } from "hono/utils/http-status";

const propertyService = new PropertyService();

const app = new Hono()
  // Fetch All Products - Public Endpoint
  .get("/", async (c) => {
    const response = await propertyService.GetAll();
    if (response.err) throw new HTTPException((response.val.status as StatusCode) || 500, { message: response.val.message });
    return c.json(response.val);
  })
  .get("/search", async (c) => {
    const { minPrice, maxPrice, bathrooms, bedrooms } = c.req.query();
    const response = await propertyService.Search({
      bathrooms: { equals: parseInt(bathrooms) > 0 ? parseInt(bathrooms) : undefined },
      bedrooms: { equals: parseInt(bedrooms) > 0 ? parseInt(bedrooms) : undefined },
      price: {
        lte: parseInt(maxPrice) > 100000 ? parseInt(maxPrice) : undefined,
        gte: parseInt(minPrice) > 100000 ? parseInt(minPrice) : undefined,
      },
    });
    if (response.err) throw new HTTPException((response.val.status as StatusCode) || 500, { message: response.val.message });
    return c.json(response.val);
  })
  // Fetch Specific Product - Public Endpoint
  .get("/:slug", async (c) => {
    const slug = c.req.param("slug");

    const response = await propertyService.Get(undefined, slug);
    if (response.err) throw new HTTPException((response.val.status as StatusCode) || 500, { message: response.val.message });
    return c.json(response.val);
  });

export type AppType = typeof app;
export default app;
