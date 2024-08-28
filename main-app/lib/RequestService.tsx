import { env } from "@/env";
import { PropertyWithAddress, PropertyWithAddressAndAgent } from "@/Server/utils/utils";
import { auth } from "@clerk/nextjs/server";

// Handles calling Fetch API (This is an example, it has been extracted into the Utils file)
export async function getProperties() {
  const { getToken } = auth();
  const res = await fetch(`${env.NEXT_PUBLIC_HOST_URL}/api/properties`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });

  if (!res.ok) {
    console.log("Residencies: Fetching Properties failed: ", res);
    return undefined;
  }

  return (await res.json()) as PropertyWithAddress[];
}

export async function getProperty(slug: string) {
  const res = await fetch(`${env.NEXT_PUBLIC_HOST_URL}/api/properties/${slug}`);

  if (!res.ok) {
    console.log("Residencies: Fetching Properties failed: ", res);
    return undefined;
  }

  return (await res.json()) as PropertyWithAddressAndAgent;
}
