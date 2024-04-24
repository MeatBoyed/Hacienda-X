import { Property, PropertyImage } from "@prisma/client";

// API Response Types
export interface GenericPropertyResponse {
  results: Property[];
  status: number;
}

export interface SelectPropertyResponse {
  results: Property & PropertyImage;
  status: number;
}
