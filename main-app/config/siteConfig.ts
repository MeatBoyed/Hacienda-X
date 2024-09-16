import { env } from "@/env";
import { GetRequestService } from "@/lib/services/GetRequestService";
import { PropertyWithAddressAndAgent } from "@/Server/utils/utils";
import type { Viewport, Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import { AbsoluteTemplateString } from "next/dist/lib/metadata/types/metadata-types";

export async function generateWebsiteConfig(pageT: any): Promise<Metadata> {
  const t = await getTranslations("WebsiteConfig");

  return {
    title: pageT("title"),
    description: pageT("description"),
    metadataBase: new URL(env.NEXT_PUBLIC_HOST_URL),
    applicationName: t("site_name"),
    appleWebApp: {
      title: t("site_name"),
      statusBarStyle: "default",
      capable: true,
    },
    icons: {
      icon: [
        {
          url: t("favicon"),
          type: "image/x-icon",
        },
        {
          url: t("favicon"),
          sizes: "16x16",
          type: "image/png",
        },
        // add favicon-32x32.png, favicon-96x96.png, android-chrome-192x192.png
      ],
      shortcut: [
        {
          url: t("favicon"),
          type: "image/x-icon",
        },
      ],
      apple: [
        {
          url: t("appleIcon57"),
          sizes: "57x57",
          type: "image/png",
        },
        {
          url: t("appleIcon60"),
          sizes: "60x60",
          type: "image/png",
        },
        // add apple-icon-72x72.png, apple-icon-76x76.png, apple-icon-114x114.png, apple-icon-120x120.png, apple-icon-144x144.png, apple-icon-152x152.png, apple-icon-180x180.png
      ],
    },
    themeColor: t("themeColor"), // Example color
    openGraph: {
      type: "website",
      locale: t("siteLocale"),
      url: t("openGraph.url"), // haciendax.com/en + "/about-us"
      title: t("site_name"),
      description: t("openGraph.description"),
    },
    twitter: {
      card: "summary_large_image",
      site: t("twitter.username"),
      title: t("site_name"),
      description: t("twitter.description"),
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      googleBot: "index, follow",
    },
  };
}

export async function generatePropertyPageMetaData(slug: string): Promise<Metadata> {
  const t = await getTranslations("WebsiteConfig");
  const response = await GetRequestService.getProperty(slug);
  if (!response) throw new Error("Property not found");

  const property = response.properties[0] as PropertyWithAddressAndAgent;
  const title = property.title + " | " + t("site_name");
  const url = `${t("baseUrl")}/property-for-sale/${property.title}`;

  return {
    title: { absolute: title, template: null },
    metadataBase: null,
    applicationName: t("site_name"),
    alternates: {
      canonical: { url: url },
      languages: { es: [{ url: url, title: title }], en: [{ url: url, title: title }] },
      media: {},
      types: {},
    },
    authors: [
      {
        name: property.agent.firstName + property.agent.lastName || t("site_name"),
      },
      {
        name: t("site_name"),
      },
    ],
    description: property.description,
    // keywords: property.keywords,
    openGraph: {
      title: { absolute: title, template: null },
      description: property.description,
      type: "article",
      url: `${t("baseUrl")}/property-for-sale/${property.title}`,
      publishedTime: property.createdAt.toString(),
      modifiedTime: property.updatedAt.toString(),
      authors: [`${t("site_name")}/aboutus`],
      tags: property.extraFeatures,
      images: [
        {
          url: property.images[0],
          width: 1024,
          height: 576,
          alt: property.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      siteId: t("site_name"),
      creatorId: t("twitter.username"),
      card: "summary_large_image",
      site: t("twitter.username"),
      creator: t("twitter.username"),
      title: { absolute: title, template: null },
      description: property.description,
      images: [
        {
          url: property.images[0],
          width: 1024,
          height: 576,
          alt: property.title,
        },
      ],
    },
  };
}

export const generateStaticMetaData = () => {
  return {
    metadataBase: new URL(env.NEXT_PUBLIC_HOST_URL),
    openGraph: {
      siteName: "HaciendaX",
      type: "website",
      locale: "en_ES",
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      googleBot: "index, follow",
    },
    applicationName: "Blog | Minh Vu",
    appleWebApp: {
      title: "Blog | Minh Vu",
      statusBarStyle: "default",
      capable: true,
    },
    // verification: {
    //   google: "YOUR_DATA",
    //   yandex: ["YOUR_DATA"],
    //   other: {
    //     "msvalidate.01": ["YOUR_DATA"],
    //     "facebook-domain-verification": ["YOUR_DATA"],
    //   },
    // },
    icons: {
      icon: [
        {
          url: "/favicon.ico",
          type: "image/x-icon",
        },
        {
          url: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        // add favicon-32x32.png, favicon-96x96.png, android-chrome-192x192.png
      ],
      shortcut: [
        {
          url: "/favicon.ico",
          type: "image/x-icon",
        },
      ],
      apple: [
        {
          url: "/apple-icon-57x57.png",
          sizes: "57x57",
          type: "image/png",
        },
        {
          url: "/apple-icon-60x60.png",
          sizes: "60x60",
          type: "image/png",
        },
        // add apple-icon-72x72.png, apple-icon-76x76.png, apple-icon-114x114.png, apple-icon-120x120.png, apple-icon-144x144.png, apple-icon-152x152.png, apple-icon-180x180.png
      ],
    },
  } as Metadata;
};
