import { MAXFILES } from "@/lib/FormUtils";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

export const TransPropertySchema = async () => {
  const t = await getTranslations("Dashboard.propertyFormComp");

  return z.object({
    property_id: z.string(),
    title: z
      .string({
        required_error: t("propertySchema.title.required"),
        invalid_type_error: t("propertySchema.title.invalid"),
      })
      .min(5, { message: t("propertySchema.title.min") }),
    description: z
      .string({
        required_error: t("propertySchema.description.required"),
        invalid_type_error: t("propertySchema.description.invalid"),
      })
      .min(10, { message: t("propertySchema.description.min") }),
    price: z.coerce
      .number({
        required_error: t("propertySchema.price.required"),
        invalid_type_error: t("propertySchema.price.invalid"),
      })
      .positive({ message: t("propertySchema.price.positive") }),
    bathrooms: z.coerce
      .number({
        required_error: t("propertySchema.bathrooms.required"),
        invalid_type_error: t("propertySchema.bathrooms.invalid"),
      })
      .min(1, { message: t("propertySchema.bathrooms.min") }),
    bedrooms: z.coerce
      .number({
        required_error: t("propertySchema.bedrooms.required"),
        invalid_type_error: t("propertySchema.bedrooms.invalid"),
      })
      .min(1, { message: t("propertySchema.bedrooms.min") }),
    pool: z.boolean({
      required_error: t("propertySchema.pool.required"),
      invalid_type_error: t("propertySchema.pool.invalid"),
    }),
    squareMeter: z.coerce
      .number({
        required_error: t("propertySchema.squareMeter.required"),
        invalid_type_error: t("propertySchema.squareMeter.invalid"),
      })
      .min(1, { message: t("propertySchema.squareMeter.min") }),
    address: z
      .string({
        required_error: t("propertySchema.address.required"),
        invalid_type_error: t("propertySchema.address.invalid"),
      })
      .min(5, { message: t("propertySchema.address.min") }),
    lat: z.number(),
    lng: z.number(),
    images: z
      .array(typeof window === "undefined" ? z.any() : z.instanceof(File))
      // .min(1, { message: `There must be at least ${MINFILES} Image.` }) Handled in Property Form Submit
      .max(MAXFILES, { message: `$t('propertySchema.images.part1') ${MAXFILES} $t('propertySchema.images.part2')` }),
    extraFeatures: z
      .array(
        z.object({
          id: z.string({
            required_error: t("propertySchema.extraFeatures.id.required"),
            invalid_type_error: t("propertySchema.extraFeatures.id.invalid"),
          }),
          text: z.string({
            required_error: t("propertySchema.extraFeatures.text.required"),
            invalid_type_error: t("propertySchema.extraFeatures.text.invalid"),
          }),
        })
      )
      .min(3, { message: t("propertySchema.extraFeatures.min") }),
    visibility: z.enum(["Public", "Private", "Draft", "Deleted"], {
      required_error: t("propertySchema.visibility.required"),
      invalid_type_error: t("propertySchema.visibility.invalid"),
    }),
    saleType: z.enum(["Sale", "Rent", "Auction"], {
      required_error: t("propertySchema.saleType.required"),
      invalid_type_error: t("propertySchema.saleType.invalid"),
    }),
  });
};

export const PropertySchema = z.object({
  property_id: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().positive(),
  bathrooms: z.coerce.number().min(1),
  bedrooms: z.coerce.number().min(1),
  pool: z.boolean(),
  squareMeter: z.coerce.number().min(1),
  address: z.string().min(5),
  lat: z.number(),
  lng: z.number(),
  images: z
    .array(typeof window === "undefined" ? z.any() : z.instanceof(File))
    // .min(1, { message: `There must be at least ${MINFILES} Image.` }) Handled in Property Form Submit
    .max(MAXFILES, { message: `$t('propertySchema.images.part1') ${MAXFILES} $t('propertySchema.images.part2')` }),
  extraFeatures: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .min(3),
  visibility: z.enum(["Public", "Private", "Draft", "Deleted"]),
  saleType: z.enum(["Sale", "Rent", "Auction"]),
});
