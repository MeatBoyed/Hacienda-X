import { z } from "zod";

export const SelectBedroomsOptions = [
  { key: "1 Bedroom", value: "1" },
  { key: "2 Bedroom", value: "2" },
  { key: "3 Bedroom", value: "3" },
  { key: "4 Bedroom", value: "4" },
  { key: "5 Bedroom", value: "5" },
  { key: "6 Bedroom", value: "6" },
  { key: "7 Bedroom", value: "7" },
  { key: "8 Bedroom", value: "8" },
  { key: "9 Bedroom", value: "9" },
  { key: "10 Bedroom", value: "10" },
];

export const SelectBathroomsOptions = [
  { key: "1 Bathroom", value: "1" },
  { key: "2 Bathrooms", value: "2" },
  { key: "3 Bathrooms", value: "3" },
  { key: "4 Bathrooms", value: "4" },
  { key: "5 Bathrooms", value: "5" },
  { key: "6 Bathrooms", value: "6" },
  { key: "7 Bathrooms", value: "7" },
  { key: "8 Bathrooms", value: "8" },
  { key: "9 Bathrooms", value: "9" },
  { key: "10 Bathrooms", value: "10" },
];

export const SelectVisibilityOptions = [
  { key: "Public", value: "Public" },
  { key: "Private", value: "Private" },
  { key: "Draft", value: "Draft" },
  { key: "Deleted", value: "Deleted" },
];

export const SelectSaleTypeOptions = [
  { key: "Rent", value: "Rent" },
  { key: "Sale", value: "Sale" },
  // { key: "Auction", value: "Auction"}, // UPDATE: uncomment to make it avaible to customers
];

export const PropertySchema = z.object({
  property_id: z.string(),
  title: z
    .string({
      required_error: "Title is required.",
      invalid_type_error: "Title must be a string.",
    })
    .min(5, { message: "Title must be at least 5 characters long." }),
  description: z
    .string({
      required_error: "Description is required.",
      invalid_type_error: "Description must be a string.",
    })
    .min(10, { message: "Description must be at least 10 characters long." }),
  price: z.coerce
    .number({
      required_error: "Price is required.",
      invalid_type_error: "Price must be a number.",
    })
    .positive({ message: "Price must be a positive number." }),
  bathrooms: z.coerce
    .number({
      required_error: "Number of bathrooms is required.",
      invalid_type_error: "Bathrooms must be a number.",
    })
    .min(1, { message: "There must be at least 1 bathroom." }),
  bedrooms: z.coerce
    .number({
      required_error: "Number of bedrooms is required.",
      invalid_type_error: "Bedrooms must be a number.",
    })
    .min(1, { message: "There must be at least 1 bedroom." }),
  pool: z.boolean({
    required_error: "Pool information is required.",
    invalid_type_error: "Pool must be a boolean.",
  }),
  // Address: z
  //   .string({
  //     required_error: "Address is required.",
  //     invalid_type_error: "Address must be a string.",
  //   })
  //   .min(5, { message: "Address must be at least 5 characters long." }),
  Address: z.object(
    {
      address: z
        .string({
          required_error: "Address is required",
          invalid_type_error: "Address must be a string",
        })
        .min(5, { message: "Address must be at least 5 characters long" }),
      lat: z.number(),
      lng: z.number(),
    },
    {
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    }
  ),
  extraFeatures: z
    .array(
      z.object({
        id: z.string({
          required_error: "Feature ID is required.",
          invalid_type_error: "Feature ID must be a string.",
        }),
        text: z.string({
          required_error: "Feature text is required.",
          invalid_type_error: "Feature text must be a string.",
        }),
      })
    )
    .min(1, { message: "There must be at least one extra feature." }),
  visibility: z.enum(["Public", "Private", "Draft", "Deleted"], {
    required_error: "Pool information is required.",
    invalid_type_error: "Pool must be a boolean.",
  }),
  saleType: z.enum(["Sale", "Rent"], {
    required_error: "Sale Type is required",
    invalid_type_error: "Sale type must be either Sale or Rent",
  }),
});
