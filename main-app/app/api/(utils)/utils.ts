import { $Enums, Prisma, Property } from "@prisma/client";

export type PropertyWithAddress = Prisma.PropertyGetPayload<{
  include: { Address: true };
}>;

// API Response Types
export interface GenericPropertyResponse {
  results: PropertyWithAddress[];
  status: number;
}

export interface SelectPropertyResponse {
  results: PropertyWithAddress;
  status: number;
  notFound: boolean;
}

export interface SelectUserResponse {
  results: $Enums.Role;
  status: number;
}
