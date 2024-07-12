import { Hono } from "hono";
import db from "../utils/db";
import { HTTPException } from "hono/http-exception";
import { clerkMiddleware } from "@hono/clerk-auth";
import { PropertyWithAddress } from "../utils/utils";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { SearchQueryParameterSchema } from "@/app/_components/SearchFilters";
import { validator } from "hono/validator";

const app = new Hono()
  .use(clerkMiddleware())
  // Fetch All Products - Public Endpoint
  .get("/", async (c) => {
    return c.json(
      await db.property.findMany({
        where: { visibility: { not: "Deleted" } },
        include: { Address: true },
      })
    );
  })
  .get("/search", async (c) => {
    const { minPrice, maxPrice, bathrooms, bedrooms } = c.req.query();

    const minP = parseInt(minPrice);
    const maxP = parseInt(maxPrice);
    const baths = parseInt(bathrooms);
    const beds = parseInt(bedrooms);

    return c.json(
      await db.property.findMany({
        where: {
          visibility: { not: "Deleted" },
          bathrooms: { equals: baths > 0 ? baths : undefined },
          bedrooms: { equals: beds > 0 ? beds : undefined },
          price: {
            lte: maxP > 100000 ? maxP : undefined,
            gte: minP > 100000 ? minP : undefined,
          },
        },
        include: { Address: true },
      })
    );
  })
  // Fetch Specific Product - Public Endpoint
  .get("/:slug", async (c) => {
    const slug = c.req.param("slug");

    return c.json(
      await db.property.findFirstOrThrow({
        where: { title: slug, visibility: { not: "Deleted" } }, // TODO: Property needs a Slug field in DB
        include: { Address: true, agent: true },
      })
    );
  });

export type AppType = typeof app;
export default app;
