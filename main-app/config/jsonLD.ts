import { GetRequestService } from "@/lib/services/GetRequestService";
import { PropertyWithAddressAndAgent } from "@/Server/utils/utils";
import { getTranslations } from "next-intl/server";

export async function generateJSONLD(property: PropertyWithAddressAndAgent) {
  const t = await getTranslations("WebsiteConfig");
  const title = property.title + " | " + t("site_name");
  const url = `${t("baseUrl")}/property-for-sale/${property.title}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description: property.description,
    image: property.images[0],
    dateCreated: property.createdAt.toString(),
    datePublished: property.createdAt.toString(),
    dateModified: property.updatedAt.toString(),
    author: {
      "@type": "Person",
      name: property.agent.firstName + property.agent.lastName || t("site_name"),
      url: `${t("baseUrl")}/agents/${property.agent.public_id}`,
    },
    publisher: {
      "@type": "Person",
      name: t("site_name"),
      logo: {
        "@type": "ImageObject",
        url: t("logo"),
      },
    },
    inLanguage: t("siteLanguage"),
    isFamilyFriendly: "true",
  };
}
