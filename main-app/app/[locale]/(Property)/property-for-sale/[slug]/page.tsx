import InformationCard from "./(components)/InformationCard";
import ImageGallery from "../../../../../components/main/ImageGallery/ImageGallery";
import LeadForm from "@/components/LeadForm/LeadForm";
import Residencies from "@/app/[locale]/_components/Residencies";
import { getTranslations } from "next-intl/server";
import { MapCard } from "@/components/main/Maps/MapCard";
import { PropertyWithAddressAndAgent } from "@/Server/utils/utils";
import { BookmarkButton } from "@/components/main/PropertyCard";
import { NotFoundViewCard } from "@/components/main/Views/Views";
import { GetRequestService } from "@/lib/services/GetRequestService";
import { generatePropertyPageMetaData } from "@/config/siteConfig";
import { Metadata } from "next";
import { generateJSONLD } from "@/config/jsonLD";

// export const revalidate = 18000; // 5 hours in seconds

// export async function generateStaticParams() {
//   const response = await GetRequestService.getProperties();
//   if (!response) return [];

//   const { properties } = response;
//   return properties.map((property) => ({
//     slug: property.title.toLowerCase().replace(/ /g, "-"),
//   }));
// }

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return await generatePropertyPageMetaData(slug);
}

export default async function PropertyView({ params: { slug } }: { params: { slug: string } }) {
  const t = await getTranslations("Property.Property");
  const propertyRes = await GetRequestService.getProperty(slug);

  if (!propertyRes) {
    // Redirect to 404 or show message
    return <NotFoundViewCard className="min-h-screen py-16 " />;
  }

  const property = propertyRes.properties[0] as PropertyWithAddressAndAgent;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-12 md:mt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJSONLD(property)) }}
      />
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-3xl font-bold mb-6">{property.title}</h1>
        <BookmarkButton property={property} />
      </div>

      {/* Image Gallery */}
      <ImageGallery defaultImages={property.images} />

      {/* Property Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        <InformationCard property={property} agent={property.agent} />

        <LeadForm agentId={property.agent.user_id} propertyId={property.property_id} />
      </div>

      <MapCard className="mb-8" mainProperty={property.property_id} />

      <Residencies className="w-full xl:px-0">
        <Residencies.Head subHeading={t("viewMore.subHeading")} heading={t("viewMore.heading")} />
      </Residencies>
    </div>
  );
}
