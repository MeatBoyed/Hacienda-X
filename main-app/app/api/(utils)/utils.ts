import { $Enums, Prisma, Property } from "@prisma/client";

export const AWS_S3_PRODUCTION_FOLDER_NAME = "haciendaXTest";
export const AWS_S3_BASE_URL =
  "https://dstilezauto.s3.af-south-1.amazonaws.com";

export type PropertyWithAddress = Prisma.PropertyGetPayload<{
  include: { Address: true };
}>;

export type PropertyWithAddressAndAgent = Prisma.PropertyGetPayload<{
  include: { Address: true; agent: true };
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
