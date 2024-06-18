import { z } from "zod";
import {
  DeletePropertyRequestSchema,
  PropertySchema,
  propertyToFormData,
} from "./FormUtils";

export async function PostUploadImages(
  url: string,
  {
    arg,
  }: {
    arg: {
      images: File[];
    };
  }
) {
  const formData = new FormData();
  for (let i = 0; i < arg.images.length; i++) {
    formData.append(`images[${i}]`, arg.images[i] as File);
  }

  return fetch(url, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
}

export async function PostCreateProperty(
  url: string,
  {
    arg,
  }: {
    arg: {
      property: z.infer<typeof PropertySchema>;
    };
  }
) {
  return fetch(url, {
    method: "POST",
    body: propertyToFormData(arg.property),
  }).then((res) => res.json());
}

export async function DeleteProperty(
  url: string,
  {
    arg,
  }: {
    arg: {
      payload: z.infer<typeof DeletePropertyRequestSchema>;
    };
  }
) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(arg.payload),
  }).then((res) => res.json());
}

export async function GetUsersProperty(
  url: string
  // {
  //   arg,
  // }: {
  //   arg: {
  //     payload: z.infer<typeof DeletePropertyRequestSchema>;
  //   };
  // }
) {
  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
}
