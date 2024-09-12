import { z } from "zod";
import PropertyService from "./PropertyService";
import { Prisma } from "@prisma/client";

export const SortByEnum = z.enum([
  "recommended",
  "recent",
  "price-asc",
  "price-dsc",
  "size-asc",
  "size-dsc",
]);
export type SortByOptions = z.infer<typeof SortByEnum>;

export const PriceRangeEnum = z.enum([
  "any",
  "0-200000",
  "200000-400000",
  "400000-600000",
  "600000-800000",
  "800000-1000000",
]);
export type PriceRanges = z.infer<typeof PriceRangeEnum>;

export const Amenities = z.enum(["Pool"]);

export const SearchParamSchema = z.object({
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  sortBy: SortByEnum.optional(),
  amenities: z.string().optional(),
  priceRange: PriceRangeEnum.optional(),
});

export class BussinessLogicHandler {
  static async searchProperties(searchParams: z.infer<typeof SearchParamSchema>) {
    const bathrooms = searchParams.bathrooms || 0;
    const bedrooms = searchParams.bedrooms || 0;
    const amenities = searchParams.amenities?.split(",") || undefined;
    const sortBy = searchParams.sortBy;
    const priceRange = searchParams.priceRange
      ? getPriceRangeValues(searchParams.priceRange)
      : undefined;

    return await PropertyService.Search(
      {
        bathrooms: { equals: bathrooms > 0 ? bathrooms : undefined },
        bedrooms: { equals: bedrooms > 0 ? bedrooms : undefined },
        // extraFeatures: { hasSome: amenities },
        price: priceRange,
      },
      {
        createdAt: sortBy === "recent" ? "desc" : undefined,
        price: sortBy === "price-asc" ? "asc" : sortBy === "price-dsc" ? "desc" : undefined,
        squareMeter: sortBy === "size-asc" ? "asc" : sortBy === "size-dsc" ? "desc" : undefined,
      }
    );
  }
}

export function getPriceRangeValues(
  priceRange: PriceRanges
): Prisma.FloatFilter<"Property"> | undefined {
  switch (priceRange) {
    case "any":
      return undefined;
    case "0-200000":
      return { gt: 0, lt: 200000 };
    case "200000-400000":
      return { gt: 200000, lt: 400000 };
    case "400000-600000":
      return { gt: 400000, lt: 600000 };
    case "600000-800000":
      return { gt: 600000, lt: 800000 };
    case "800000-1000000":
      return { gt: 800000, lt: 1000000 };
    default:
      return undefined;
  }
}
