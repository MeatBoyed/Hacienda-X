import { Hono } from "hono";
import PropertyService from "../lib/PropertyService";
import { HTTPException } from "hono/http-exception";
import { StatusCode } from "hono/utils/http-status";
import { SearchParamSchema, BussinessLogicHandler } from "../lib/BussinessLogicHandler";

export enum SearchParams {
  bedrooms = "bedrooms",
  bathrooms = "bathrooms",
  sortBy = "sortBy",
  amenities = "amenities",
  priceRange = "priceRange",

  searchTerm = "searchTerm",
  propertyType = "propertyType",
}

const app = new Hono()
  // Fetch All Products - Public Endpoint
  .get("/", async (c) => {
    const response = await PropertyService.GetAll();
    if (response.err)
      throw new HTTPException((response.val.status as StatusCode) || 500, {
        message: response.val.message,
      });
    return c.json(response.val);
  })
  .get("/search", async (c) => {
    const rawParams = c.req.query();
    const searchParamRes = SearchParamSchema.safeParse(rawParams);
    if (!searchParamRes.success)
      throw new HTTPException(400, { message: "Bad search Params provided" });

    const response = await BussinessLogicHandler.searchProperties(searchParamRes.data);
    if (response.err)
      throw new HTTPException((response.val.status as StatusCode) || 500, {
        message: response.val.message,
      });

    return c.json(response.val);
  })
  // Fetch Specific Product - Public Endpoint
  .get("/:slug", async (c) => {
    const slug = c.req.param("slug");

    const response = await PropertyService.Get(undefined, slug);
    if (response.err)
      throw new HTTPException((response.val.status as StatusCode) || 500, {
        message: response.val.message,
      });
    return c.json(response.val);
  });

export type AppType = typeof app;
export default app;
