import { Roles } from "@/types/globals";
import { auth } from "@clerk/nextjs/server";

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth();

  console.log("User role: ", sessionClaims?.metadata);

  if (sessionClaims?.metadata === undefined) return false;
  if (sessionClaims?.metadata.role === undefined) return false;

  return sessionClaims?.metadata.role === role;
};

export const checkDashboardRole = (role: Roles) => {
  const { sessionClaims } = auth();

  console.log("User's Metadata: ", sessionClaims?.metadata);

  if (sessionClaims?.metadata === undefined) return false;
  if (sessionClaims?.metadata.role === undefined) return false;

  return sessionClaims?.metadata.role === "agent" || sessionClaims?.metadata.role === "admin";
};
