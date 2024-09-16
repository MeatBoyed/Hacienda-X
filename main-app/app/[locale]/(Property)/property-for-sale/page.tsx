import React from "react";
import { SearchProvider } from "./(components)/SearchContext";
import { SearchFilterCard } from "./(components)/SearchFilterCard";
import { PropertyList } from "./(components)/PropertyList";
import { MessageView } from "@/components/main/Views/Views";
import { GetRequestService } from "@/lib/services/GetRequestService";
import { generateWebsiteConfig } from "@/config/siteConfig";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations("WebsiteConfig.search");
  return await generateWebsiteConfig(t);
}

export default async function SearchPropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const response = await GetRequestService.getSearchProperties(new URLSearchParams(searchParams as Record<string, string>));

  if (!response)
    return (
      <MessageView
        h1="Oops! Something went wrong."
        p="Please wait, or you can try again."
        button={{ href: "", text: "Try again", refresh: true }}
      />
    );

  return (
    <SearchProvider initialProperties={response.properties}>
      <div className="container mx-auto px-4 pt-24 md:pt-10 pb-32 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Find Your Dream Property</h1>
        <div className="mb-8">
          <SearchFilterCard />
        </div>
        <PropertyList />
      </div>
    </SearchProvider>
  );
}
