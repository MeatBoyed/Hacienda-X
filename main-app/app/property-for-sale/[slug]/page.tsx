"use client";

import React from "react";
// import "./Property.css";

import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import { notFound, useParams } from "next/navigation";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { SelectPropertyResponse } from "@/app/api/[[...route]]/utils";
import { PuffLoader } from "react-spinners";
import Head from "./_components/Head";
import PropertyDetails from "./_components/PropertyDetails";
import BottomNavbar from "./_components/BottomNavbar";

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
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings text-black text-lg">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <section
      id={`${data?.results.title} page`}
      className="w-full flex flex-col justify-center items-center gap-2 bg-background pt-16 bg-[#fff]"
    >
      <div className="w-full flex justify-center items-center flex-col px-4 pt-5 sm:max-w-3xl sm:px-2 sm:pt-0 lg:max-w-5xl">
        <Head title={data?.results.title} images={data?.results.images} />
        <PropertyDetails
          description={data?.results.description}
          bathrooms={data?.results.bathrooms}
          bedrooms={data?.results.rooms}
        />
      </div>
      <BottomNavbar price={data?.results.price} />
    </section>
  );
}

// export const revalidate = 3600;
