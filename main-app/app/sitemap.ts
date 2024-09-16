import { env } from "@/env";
import { GetRequestService } from "@/lib/services/GetRequestService";
import { MetadataRoute } from "next";

async function getAllPostSlugsWithModifyTime() {
  const response = await GetRequestService.getProperties();
  if (!response) throw new Error("Error while fetching properties");

  return response.properties.map((property) => ({
    slug: property.title.toLowerCase().replace(/ /g, "-"),
    modified_at: property.updatedAt,
  }));
}

type changeFrequency = "monthly" | "always" | "hourly" | "daily" | "weekly" | "yearly" | "never" | undefined;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cleanBaseUrl = env.NEXT_PUBLIC_HOST_URL;
  const defaultPages = [
    {
      url: cleanBaseUrl + "/",
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "monthly" as changeFrequency,
      alternates: {
        languages: {
          es: cleanBaseUrl + "/es",
          en: cleanBaseUrl + "/en",
        },
      },
    },
    {
      url: cleanBaseUrl + "/aboutus",
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "monthly" as changeFrequency,
      alternates: {
        languages: {
          es: cleanBaseUrl + "/es/aboutus",
          en: cleanBaseUrl + "/en/aboutus",
        },
      },
    },
    {
      url: cleanBaseUrl + "/bookmarks",
      lastModified: new Date(),
      priority: 0.3,
      changeFrequency: "always" as changeFrequency,
      alternates: {
        languages: {
          es: cleanBaseUrl + "/es/bookmarks",
          en: cleanBaseUrl + "/en/bookmarks",
        },
      },
    },
    {
      url: cleanBaseUrl + "/contactus",
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "monthly" as changeFrequency,
      alternates: {
        languages: {
          es: cleanBaseUrl + "/es/contactus",
          en: cleanBaseUrl + "/en/contactus",
        },
      },
    },
    {
      url: cleanBaseUrl + "/pricing",
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "monthly" as changeFrequency,
      alternates: {
        languages: {
          es: cleanBaseUrl + "/es/pricing",
          en: cleanBaseUrl + "/en/pricing",
        },
      },
    },
    {
      url: cleanBaseUrl + "/usage",
      lastModified: new Date(),
      priority: 0.4,
      changeFrequency: "monthly" as changeFrequency,
      alternates: {
        languages: {
          es: cleanBaseUrl + "/es/usage",
          en: cleanBaseUrl + "/en/usage",
        },
      },
    },
    {
      url: cleanBaseUrl + "/property-for-sale",
      lastModified: new Date(),
      priority: 0.5,
      changeFrequency: "always" as changeFrequency,
      alternates: {
        languages: {
          es: cleanBaseUrl + "/es/property-for-sale",
          en: cleanBaseUrl + "/en/property-for-sale",
        },
      },
    },
    // other pages
  ];

  const postSlugs = await getAllPostSlugsWithModifyTime();

  const sitemap = [
    ...defaultPages,
    ...postSlugs.map((e: any) => ({
      url: `https://dminhvu.com/${e.slug}`,
      lastModified: e.modified_at,
      changeFrequency: "weekly" as changeFrequency,
      priority: 0.8,
    })),
  ];

  return sitemap;
}
