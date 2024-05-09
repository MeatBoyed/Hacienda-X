import { $Enums, Property } from "@prisma/client";

// API Response Types
export interface GenericPropertyResponse {
  results: Property[];
  status: number;
}

export interface SelectPropertyResponse {
  results: Property;
  status: number;
}

export interface SelectUserResponse {
  results: $Enums.Role;
  status: number;
}
