"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { fetcher } from "@/components/ImagesInput/FileInputUtils";
import useSWR from "swr";
import { PropertyWithAddressAndAgent } from "@/Server/utils/utils";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { SavePropertyBTN } from "@/lib/bookmarksContext";
import { ChevronLeft, Share, X } from "lucide-react";
import PropertyDetails from "./_components/PropertyDetails";
import BottomNavbar from "./_components/BottomNavbar";
import LeadForm from "./_components/LeadForm";
import LocationSection from "./_components/LocationSection";
import { useRouter } from "next/navigation";
import PropertyCarousel from "./_components/ImageCarousel";
import Residencies from "@/app/[locale]/_components/Residencies";
import { useTranslations } from "next-intl";

// Handler for the API request (Server Side)
export default function PropertyPage() {
  const t = useTranslations("Property.Property");
  const router = useRouter();
  const params = useParams();
  const slug = decodeURIComponent(typeof params.slug === "string" ? params.slug : "");

  const { data, error, isLoading } = useSWR<PropertyWithAddressAndAgent>(`/api/properties/${slug}`, fetcher);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section id={"view-property"} className="w-full flex flex-col justify-center items-center gap-2 py-16 bg-[#fff]">
      {error && !isLoading && (
        <div className="w-full flex justify-center items-center h-[100vh] bg-[#ffff]">
          <span>{t("errors.fetchingError")}</span>
        </div>
      )}
      {data && !error && (
        <>
          <div className="flex justify-between items-center z-50 border-t bg-white py-4 px-4 w-full fixed top-0 shadow-sm sm:hidden">
            <Button onClick={() => router.back()} className="text-text bg-transparent gap-1 p-0">
              <ChevronLeft size={15} /> Back
            </Button>

            <div className="flex justify-center items-center">
              <Button size="icon" className="text-text p-0">
                <Share size={15} />
              </Button>
              <SavePropertyBTN property={data} />
            </div>
          </div>

          <div className="w-full h-full mt-5 md:mt-14 lg:mt-4">
            <PropertyCarousel images={data.images} />
          </div>
          <div className="w-full flex justify-center items-start flex-wrap md:flex-nowrap gap-10 lg:gap-20 pt-5 px-4 sm:max-w-3xl lg:max-w-5xl">
            <PropertyDetails property={data} />
            <LeadForm propertyId={data.property_id} agentId={data.agent_id} />
          </div>
          <div className="w-full flex justify-center items-start gap-10 lg:gap-20 pt-5 px-4 sm:max-w-3xl lg:max-w-5xl">
            <LocationSection property={data} />
          </div>
          <div className="w-full flex justify-center items-start gap-10 lg:gap-20 pt-5 px-4 sm:max-w-3xl lg:max-w-5xl">
            <Residencies
              subHeading={t("viewMore.subHeading")}
              heading={t("viewMore.heading")}
              className="px-1 sm:px-1 xl:px-1"
              margin="mt-0"
            />
          </div>
          <BottomNavbar price={data.price} />
        </>
      )}
    </section>
  );
}
