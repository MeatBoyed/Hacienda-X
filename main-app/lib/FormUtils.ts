import { PreSignRequest } from "@/app/api/(controllers)/imagesController";
import { Property } from "@prisma/client";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const MINFILES = 1;
export const MAXFILES = 12;

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
  // { key: "Draft", value: "Draft" },
  // { key: "Deleted", value: "Deleted" },
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
  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    })
    .min(5, { message: "Address must be at least 5 characters long" }),
  lat: z.number(),
  lng: z.number(),
  images: z
    .array(typeof window === "undefined" ? z.any() : z.instanceof(File))
    // .min(1, { message: `There must be at least ${MINFILES} Image.` })
    .max(MAXFILES, { message: `No more than ${MAXFILES} Images allowed.` }),
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
  saleType: z.enum(["Sale", "Rent", "Auction"], {
    required_error: "Sale Type is required",
    invalid_type_error: "Sale type must be either Sale or Rent",
  }),
  imagesOrder: z.string().array().optional(),
  deletedImages: z.string().array().optional(),
});

export const PropertyRequestSchema = z.object({
  property_id: z.string(),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  bathrooms: z.coerce
    .number()
    .min(1, { message: "There must be at least 1 bathroom." }),
  bedrooms: z.coerce
    .number()
    .min(1, { message: "There must be at least 1 bedroom." }),
  pool: z.boolean(),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" }),
  lat: z.number(), // add Max and Min Val
  lng: z.number(),
  images: z
    .array(z.instanceof(File))
    .max(MAXFILES, { message: `No more than ${MAXFILES} Images allowed.` }),
  extraFeatures: z
    .array(z.string())
    .min(1, { message: "There must be at least one extra feature." }),
  visibility: z.enum(["Public", "Private", "Draft", "Deleted"], {
    required_error: "Pool information is required.",
    invalid_type_error: "Pool must be a boolean.",
  }),
  saleType: z.enum(["Sale", "Rent"], {
    required_error: "Sale Type is required",
    invalid_type_error: "Sale type must be either Sale or Rent",
  }),
  deletedImages: z.string().array().optional(),
  imagesOrder: z.string().array().optional(),
});
export const DeletePropertyRequestSchema = z.object({
  userId: z.string(),
  propertyId: z.string(),
  images: z.string().array(),
});

export const PropertyRequestFormDataSchema = zfd.formData(
  PropertyRequestSchema
);

export interface FileState {
  file: File | string;
  key: string; // used to identify the file in the progress callback
  progress: "PENDING" | "COMPLETE" | "ERROR";
}

export function propertyToFormData(
  property: z.infer<typeof PropertySchema>
): FormData {
  const formData = new FormData();

  formData.append("property_id", property.property_id);
  formData.append("title", property.title);
  formData.append("description", property.description);
  formData.append("price", property.price.toString());
  formData.append("bathrooms", property.bathrooms.toString());
  formData.append("bedrooms", property.bedrooms.toString());
  formData.append("pool", property.pool == true ? "true" : "false");
  formData.append("address", property.address);
  formData.append("lat", property.lat.toString());
  formData.append("lng", property.lng.toString());
  for (let i = 0; i < property.images.length; i++) {
    formData.append(`images[${i}]`, property.images[i] as File);
  }
  for (let i = 0; i < property.extraFeatures.length; i++) {
    formData.append(`extraFeatures[${i}]`, property.extraFeatures[i].text);
  }
  formData.append("visibility", property.visibility);
  formData.append("saleType", property.saleType);

  if (property.imagesOrder) {
    for (let i = 0; i < property.imagesOrder.length; i++) {
      formData.append(`imagesOrder[${i}]`, property.imagesOrder[i]);
    }
  }
  if (property.deletedImages) {
    for (let i = 0; i < property.deletedImages.length; i++) {
      formData.append(
        `deletedImages[${i}]`,
        property.deletedImages[i] as string
      );
    }
  }

  return formData;
}

export const parseFormData = (
  formData: Record<string, string | File> | FormData
): z.infer<typeof PropertyRequestSchema> => {
  const data: Record<string, any> = {};

  if (formData instanceof FormData) {
    formData.forEach((value, key) => {
      if (key.includes("[")) {
        // Handling array fields like extraFeatures
        const [mainKey, index, subKey] = key.match(/[^[\]]+/g) as string[];
        if (!data[mainKey]) data[mainKey] = [];
        if (!data[mainKey][index]) data[mainKey][index] = {};
        data[mainKey][index][subKey] = value;
      } else {
        data[key] = value;
      }
    });
  } else {
    Object.entries(formData).forEach(([key, value]) => {
      if (key.includes("[")) {
        // Handling array fields like extraFeatures
        const [mainKey, index, subKey] = key.match(/[^[\]]+/g) as string[];
        if (!data[mainKey]) data[mainKey] = [];
        if (!data[mainKey][index]) data[mainKey][index] = {};
        data[mainKey][index][subKey] = value;
      } else {
        data[key] = value;
      }
    });
  }

  let extras: string[] = [];
  if (Array.isArray(data.extraFeatures)) {
    data.extraFeatures.forEach((feature) => {
      extras.push(feature.undefined);
    });
  }

  let images: File[] = [];
  if (Array.isArray(data.images)) {
    data.images.forEach((image) => {
      if (image.undefined instanceof File) images.push(image.undefined as File);
    });
  }

  let imagesOrder: string[] = [];
  if (Array.isArray(data.imagesOrder)) {
    data.imagesOrder.forEach((order) => {
      imagesOrder.push(order.undefined);
    });
  }

  let deletedImages: File[] = [];
  if (Array.isArray(data.deletedImages)) {
    data.deletedImages.forEach((image) => {
      if (typeof image.undefined === "string")
        deletedImages.push(image.undefined);
    });
  }

  // Convert the data types as needed
  const property = {
    ...data,
    property_id: data.property_id,
    title: data.title,
    description: data.description,
    price: parseFloat(data.price),
    bathrooms: parseInt(data.bathrooms, 10),
    bedrooms: parseInt(data.bedrooms, 10),
    pool: data.pool === "true",
    address: data.address,
    lat: parseFloat(data.lat),
    lng: parseFloat(data.lng),
    images: images,
    extraFeatures: extras,
    visibility: data.visibility as "Public" | "Private" | "Draft" | "Deleted",
    saleType: data.saleType as "Sale" | "Rent",
    deletedImages: deletedImages,
    imagesOrder: imagesOrder,
  };

  const parsed = PropertyRequestSchema.parse(property);

  return parsed;
};

export const parseImageUploadFormData = (
  formData: Record<string, string | File> | FormData
): z.infer<typeof PreSignRequest> => {
  const data: Record<string, any> = {};

  if (formData instanceof FormData) {
    formData.forEach((value, key) => {
      if (key.includes("[")) {
        // Handling array fields like extraFeatures
        const [mainKey, index, subKey] = key.match(/[^[\]]+/g) as string[];
        if (!data[mainKey]) data[mainKey] = [];
        if (!data[mainKey][index]) data[mainKey][index] = {};
        data[mainKey][index][subKey] = value;
      } else {
        data[key] = value;
      }
    });
  } else {
    Object.entries(formData).forEach(([key, value]) => {
      if (key.includes("[")) {
        // Handling array fields like extraFeatures
        const [mainKey, index, subKey] = key.match(/[^[\]]+/g) as string[];
        if (!data[mainKey]) data[mainKey] = [];
        if (!data[mainKey][index]) data[mainKey][index] = {};
        data[mainKey][index][subKey] = value;
      } else {
        data[key] = value;
      }
    });
  }

  let images: File[] = [];
  if (Array.isArray(data.images)) {
    data.images.forEach((image) => {
      if (image.undefined instanceof File) images.push(image as File);
    });
  }

  const request = { images: data.images.map((image: any) => image.undefined) };

  // Convert the data types as needed
  const schema = zfd.formData(PreSignRequest);
  const parsed = schema.parse(request);

  return parsed;
};
