import React from "react";
import PropertyDetails from "./_components/PropertyDetails";
import BottomNavbar from "./_components/BottomNavbar";
import LocationSection from "./_components/LocationSection";
import PropertyCarousel from "./_components/ImageCarousel";
import Residencies from "@/app/[locale]/_components/Residencies";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ActionButtons from "./_components/ActionButtions";
import { getProperty } from "@/lib/RequestService";
import { PropertyWithAddressAndAgent } from "@/Server/utils/utils";
import LeadForm from "@/components/LeadForm/OldLeadForm";

// (default): Dynamic segments not included in generateStaticParams are generated on demand.
export const dynamicParams = true;

// TODO: Generate static params for pages
// export async function generateStaticParams() {
//   const res = (await fetch(`${env.NEXT_PUBLIC_SITE_URL}/api/properties`).then((res) => res.json)) as PropertyWithAddress[];

//   return res.map((property) => ({
//     slug: property.title,
//   }));
// }

// Handler for the API request (Server Side)
export default async function PropertyPage({ params }: { params: { slug: string } }) {
  const t = await getTranslations("Property.Property");
  const data = await getProperty(params.slug);

  if (!data) {
    return notFound();
  }

  return (
    <section id={"view-property"} className="w-full flex flex-col justify-center items-center gap-2 py-16 bg-[#fff]">
      <ActionButtons data={data.properties[0]} />
      <div className="w-full h-full mt-5 md:mt-14 lg:mt-4">
        <PropertyCarousel images={data.properties[0].images} />
      </div>
      <div className="w-full flex justify-center items-start flex-wrap md:flex-nowrap gap-10 lg:gap-20 pt-5 px-4 sm:max-w-3xl lg:max-w-5xl">
        <PropertyDetails property={data.properties[0] as PropertyWithAddressAndAgent} />

        <LeadForm propertyId={data.properties[0].property_id} agentId={data.properties[0].agent_id} />
      </div>
      <div className="w-full flex justify-center items-start gap-10 lg:gap-20 pt-5 px-4 sm:max-w-3xl lg:max-w-5xl">
        <LocationSection property={data.properties[0]} />
      </div>
      <div className="w-full flex justify-center items-start gap-10 lg:gap-20 pt-5 px-4 sm:max-w-3xl lg:max-w-5xl">
        <Residencies className="px-1 sm:px-1 xl:px-1" margin="mb-0">
          <Residencies.Head subHeading={t("viewMore.subHeading")} heading={t("viewMore.heading")} />
        </Residencies>
      </div>
      <BottomNavbar price={data.properties[0].price} />
    </section>
  );
}
