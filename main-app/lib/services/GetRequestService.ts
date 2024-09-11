import { env } from "@/env";
import { PropertyServiceResponse } from "@/Server/lib/PropertyService";

// 1 - Fetch from url
// 2 - Handle failed response
// 3 - Type, validate, and Return the response data

export class GetRequestService {
  static verboseLog = false;

  static async getProperties() {
    const res = await fetch(`${env.NEXT_PUBLIC_HOST_URL}/api/properties`, {
      method: "GET",
    });
    if (!res.ok) {
      this.handleError("getProperties", res);
      return undefined;
    }
    return (await res.json()) as PropertyServiceResponse;
  }

  static async getProperty(slug: string) {
    const res = await fetch(`${env.NEXT_PUBLIC_HOST_URL}/api/properties/${slug}`);
    if (!res.ok) {
      this.handleError("getProperty", res);
      return undefined;
    }
    return (await res.json()) as PropertyServiceResponse;
  }

  static async getSearchProperties(searchParams: URLSearchParams) {
    const res = await fetch(
      `${env.NEXT_PUBLIC_HOST_URL}/api/properties/search?${searchParams.toString()}`
    );
    if (!res.ok) {
      this.handleError("getSearchProperties", res);
      return undefined;
    }
    return (await res.json()) as PropertyServiceResponse;
  }

  private static handleError(method: string, response: Response) {
    console.log(`Get Request Service | Fetch error occured at ${method} | Response - ${response}`);
    if (this.verboseLog) console.log(`Error & Response: ${response}`);
  }
}
