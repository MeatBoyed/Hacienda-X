"use client";

import React from "react";
import { useParams } from "next/navigation";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { SelectPropertyResponse } from "@/app/api/[[...route]]/utils";
import { PuffLoader } from "react-spinners";
import Head from "./_components/Head";
import PropertyDetails from "./_components/PropertyDetails";
import BottomNavbar from "./_components/BottomNavbar";
import TopNavbar from "./_components/TopNavbar";
import LeadForm from "./_components/LeadForm";
import Residencies from "@/app/_components/Residencies";
import LocationSection from "./_components/LocationSection";

// Handler for the API request (Server Side)
export default function PropertyPage() {
  // Get the slug (/properties/:slug)
  const params = useParams();
  const slug = decodeURIComponent(
    typeof params.slug === "string" ? params.slug : ""
  );

  // Fetch Proerpty from APi, and handle Fetching states
  const { data, error, isLoading } = useSWR<SelectPropertyResponse>(
    `/api/properties/${slug}`,
    fetcher
  );
  console.log(data);

  // Return to 404 Page if Property doesn't exists
  // if (!data?.results && isLoading === false) {
  //   return notFound();
  // }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-[100vh] bg-[#ffff] text-accent">
        <PuffLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-[100vh] bg-[#ffff]">
        <span>Error while fetching the property details</span>
      </div>
    );
  }

  return (
    <section
      id={`${data?.results.title} page`}
      className="w-full flex flex-col justify-center items-center gap-2 pt-16 bg-[#fff]"
    >
      <TopNavbar />
      <Head title={data?.results.title} images={data?.results.images} />
      <div className="w-full flex justify-center items-start gap-10 lg:gap-20 pt-5 px-4 sm:max-w-3xl lg:max-w-5xl">
        <PropertyDetails
          description={data?.results.description}
          bathrooms={data?.results.bathrooms}
          bedrooms={data?.results.rooms}
        />
        <LeadForm />
        {/* Final CTA should be placed here */}
        {/* After page is functional, add more content to increase SEO Ranking */}
      </div>
      <div className="w-full flex justify-center items-start gap-10 lg:gap-20 pt-5 px-4 sm:max-w-3xl lg:max-w-5xl">
        <LocationSection properties={data?.results.longitude} />
      </div>
      <Residencies />
      <BottomNavbar price={data?.results.price} />
    </section>
  );
}

// export const revalidate = 3600;
