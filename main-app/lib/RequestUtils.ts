import { z } from "zod";
import { DeletePropertyRequestSchema, PropertySchema, propertyToFormData } from "./FormUtils";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { LeadFormSchema } from "@/app/[locale]/(Property)/property-for-sale/[slug]/_components/LeadForm";

export interface PostPropertyResponse {
  results: PropertyWithAddress;
  status: number;
}

export interface DeleteImageResponse {
  results: boolean;
  status: number;
}

export interface GetUsersPropertyResponse {
  results: PropertyWithAddress;
  status: number;
}

// Property Requests
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

export async function DeleteImage(
  url: string,
  {
    arg,
  }: {
    arg: {
      deletedImage: string;
    };
  }
) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

export async function PostProperty(
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

export async function GetUsersProperty(url: string) {
  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
}

// Lead Requests
export async function PostLead(
  url: string,
  {
    arg,
  }: {
    arg: {
      lead: z.infer<typeof LeadFormSchema>;
    };
  }
) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(arg.lead),
  }).then((res) => res.json());
}

export async function GetPropertySearch(url: string) {
  return fetch(`${url}`, {
    method: "GET",
  }).then((res) => res.json());
}
