"use client";
import { z } from "zod";
import { DeletePropertyPayload, PropertySchema } from "./FormUtils";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { LeadFormSchema } from "@/components/LeadForm/LeadFormContext";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface PostPropertyResponse {
  results: PropertyWithAddress;
  status: number;
}
export interface GetUsersPropertyResponse {
  results: PropertyWithAddress;
  status: number;
}

// Property Requests
export async function PostProperty(
  url: string,
  {
    arg,
  }: {
    arg: {
      property: PropertySchema;
    };
  }
) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(arg.property),
  }).then((res) => res.json());
}

export async function DeleteProperty(
  url: string,
  {
    arg,
  }: {
    arg: {
      payload: DeletePropertyPayload;
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

// export async function GetPropertySearch(url: string) {
//   return fetch(`${url}`, {
//     method: "GET",
//   }).then((res) => res.json());
// }
