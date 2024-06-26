import { getAuth } from "@hono/clerk-auth";
import { $Enums, Prisma, Property } from "@prisma/client";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const AWS_S3_PRODUCTION_FOLDER_NAME = "haciendaXTest";
export const AWS_S3_BASE_URL =
  "https://dstilezauto.s3.af-south-1.amazonaws.com";

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

// Checks Clerk auth & returns logged in User
export function authenticateUser(c: Context) {
  // Get the current user
  const auth = getAuth(c);

  // Ensure user is signed in
  if (!auth?.userId) {
    const errorResponse = new Response("Unauthorized Request", {
      status: 401,
      headers: {
        Authenticate: 'error="invalid_token"',
      },
    });
    throw new HTTPException(401, { res: errorResponse });
  }

  return auth;
}
