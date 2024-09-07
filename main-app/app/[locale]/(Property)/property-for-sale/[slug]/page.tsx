import InformationCard from "./(components)/InformationCard";
import ImageGallery from "../../../../../components/main/ImageGallery/ImageGallery";
import LeadForm from "@/components/LeadForm/LeadForm";
import Residencies from "@/app/[locale]/_components/Residencies";
import { getTranslations } from "next-intl/server";
import {  getProperty } from "@/lib/RequestService";
import { MapCard } from "@/components/main/Maps/MapCard";
import ErrorView from "./(components)/ErrorView";
import { PropertyWithAddressAndAgent } from "@/Server/utils/utils";
import { BookmarkButton } from "@/components/main/PropertyCard";

export default async function PropertyView({ params: { slug } }: { params: { slug: string } }) {
  const t = await getTranslations("Property.Property");
  const response = await getProperty(slug);

  if (!response) {
    // Redirect to 404 or show message
    return (
      // <div className="container mx-auto px-4 py-8 max-w-6xl mt-12 md:mt-14">
      <ErrorView />
      // </div>
    );
  }
  const { properties } = response;
  const property = properties[0] as PropertyWithAddressAndAgent;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-12 md:mt-14">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-3xl font-bold mb-6">{properties[0].title}</h1>
        <BookmarkButton property={property} />
      </div>

      {/* Image Gallery */}
      <ImageGallery defaultImages={properties[0].images} />

      {/* Property Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        <InformationCard property={property} agent={property.agent} />

        <LeadForm agentId={property.agent.user_id} propertyId={property.property_id} />
      </div>

      <MapCard className="mb-8" properties={[]} />

      <Residencies className="w-full xl:px-0">
        <Residencies.Head subHeading={t("viewMore.subHeading")} heading={t("viewMore.heading")} />
      </Residencies>
    </div>
  );
}
