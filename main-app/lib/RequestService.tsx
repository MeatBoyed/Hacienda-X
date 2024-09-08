import { UserFormSchema } from "@/app/[locale]/(Auth)/onboarding/_components/OnboardingForm";
import { env } from "@/env";
import { PropertyServiceResponse } from "@/Server/lib/PropertyService";
import { UserServiceResponse } from "@/Server/lib/UserService";
import { auth } from "@clerk/nextjs/server";

// Handles calling Fetch API (This is an example, it has been extracted into the Utils file)
// Assumes  auth isn't needed
export async function getProperties() {
  const user = auth();
  const token = await user.getToken();

  // if (!token || token === null) throw new Error("No token found");
  // console.log("Token: ", token);

  const res = await fetch(`${env.NEXT_PUBLIC_HOST_URL}/api/properties`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.log("Residencies: Fetching Properties failed: ", res);
    return undefined;
  }

  return (await res.json()) as PropertyServiceResponse;
}

export async function getProperty(slug: string) {
  const res = await fetch(`${env.NEXT_PUBLIC_HOST_URL}/api/properties/${slug}`);

  if (!res.ok) {
    console.log("Residencies: Fetching Properties failed: ", res);
    return undefined;
  }

  return (await res.json()) as PropertyServiceResponse;
}

export async function getPropertiesForAgent() {
  const res = await fetch(`${env.NEXT_PUBLIC_HOST_URL}/api/dashboard/property`);

  if (!res.ok) {
    console.log("Residencies: Fetching Properties failed: ", res);
    return undefined;
  }

  return (await res.json()) as PropertyServiceResponse;
}