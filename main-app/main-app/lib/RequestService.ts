import { UserFormSchema } from "@/app/[locale]/(Auth)/onboarding/(components)/OnboardingForm";
import { env } from "@/env";
import { PropertyServiceResponse } from "@/Server/lib/PropertyService";
import { UserServiceResponse } from "@/Server/lib/UserService";
import { auth } from "@clerk/nextjs/server";

// Move to GetRequestService
// TODO: Implement auth layer
export async function getPropertiesForAgent() {
  const res = await fetch(`${env.NEXT_PUBLIC_HOST_URL}/api/dashboard/property`);

  if (!res.ok) {
    console.log("Residencies: Fetching Properties failed: ", res);
    return undefined;
  }

  return (await res.json()) as PropertyServiceResponse;
}
