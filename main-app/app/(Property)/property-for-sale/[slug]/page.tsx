"use client";

import React from "react";
import { useParams } from "next/navigation";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { SelectPropertyResponse } from "@/app/api/(utils)/utils";
import { PuffLoader } from "react-spinners";
import PropertyDetails from "./_components/PropertyDetails";
import BottomNavbar from "./_components/BottomNavbar";
import TopNavbar from "./_components/TopNavbar";
import LeadForm from "./_components/LeadForm";
import LocationSection from "./_components/LocationSection";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Define the type for the property images
interface PropertyCarouselProps {
  images: string[];
}

// Handler for the API request (Server Side)
export default function PropertyPage() {
  const params = useParams();
  const slug = decodeURIComponent(
    typeof params.slug === "string" ? params.slug : ""
  );

  const { data, error, isLoading } = useSWR<SelectPropertyResponse>(
    `/api/properties/${slug}`,
    fetcher
  );

  if (data?.notFound) {
    return (
      <div className="w-full flex justify-center items-center h-[100vh] bg-[#ffff]">
        <span>
          This property does not exist. It may have been removed by the agent
        </span>
        <p>Checkout other properties that are available</p>
      </div>
    );
  }

  return (
    <section
      id={"view-property"}
      className="w-full flex flex-col justify-center items-center gap-2 pt-16 bg-[#fff]"
    >
      {error && (
        <div className="w-full flex justify-center items-center h-[100vh] bg-[#ffff]">
          <span>Error while fetching the property details</span>
        </div>
      )}
      {isLoading && (
        <div className="w-full flex justify-center items-center h-[100vh] bg-[#ffff] text-accent">
          <PuffLoader />
        </div>
      )}
      {data?.results && (
        <>
          <TopNavbar />
          <PropertyCarousel images={data.results.images} />
          <div className="w-full flex justify-center items-start gap-10 lg:gap-20 pt-5 px-4 sm:max-w-3xl lg:max-w-5xl">
            <PropertyDetails
              description={data.results.description}
              bathrooms={data.results.bathrooms}
              bedrooms={data.results.bedrooms}
            />
            <LeadForm
              propertyId={data.results.property_id}
              agentId={data.results.agent_id}
            />
            {/* Final CTA should be placed here */}
            {/* After page is functional, add more content to increase SEO Ranking */}
          </div>
          <div className="w-full flex justify-center items-start gap-10 lg:gap-20 pt-5 px-4 sm:max-w-3xl lg:max-w-5xl">
            <LocationSection property={data.results} />
          </div>
          {/* <Residencies /> */}
          <BottomNavbar price={data.results.price} />
        </>
      )}
    </section>
  );
}

function PropertyCarousel({ images }: PropertyCarouselProps) {
  return (
    <Carousel className="w-full max-w-2xl">
      <CarouselContent>
        {images.map((image: string, index: number) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="aspect-w-16 aspect-h-7">
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <img
                    src={image}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
