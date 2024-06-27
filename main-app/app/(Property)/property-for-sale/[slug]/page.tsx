"use client";

import React from "react";
import { useParams } from "next/navigation";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import {
  PropertyWithAddress,
  PropertyWithAddressAndAgent,
  SelectPropertyResponse,
} from "@/app/api/(utils)/utils";
import { PuffLoader } from "react-spinners";
import PropertyDetails from "./_components/PropertyDetails";
import BottomNavbar from "./_components/BottomNavbar";
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
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { SavePropertyBTN } from "@/lib/bookmarksContext";
import { property } from "lodash";
import { ChevronLeft, Share } from "lucide-react";

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

  const { data, error, isLoading } = useSWR<PropertyWithAddressAndAgent>(
    `/api/properties/${slug}`,
    fetcher
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section
      id={"view-property"}
      className="w-full flex flex-col justify-center items-center gap-2 py-16 bg-[#fff]"
    >
      {error && !isLoading && (
        <div className="w-full flex justify-center items-center h-[100vh] bg-[#ffff]">
          <span>Error while fetching the property details</span>
        </div>
      )}
      {data && !error && (
        <>
          <div className="flex justify-between items-center z-50 border-t bg-background py-4 px-4 w-full fixed top-0 sm:hidden">
            <Button className="text-text bg-transparent gap-1 p-0 ">
              <ChevronLeft size={15} /> Back
            </Button>

            <div className="flex justify-center items-center">
              <Button size="icon" className="text-text p-0">
                <Share size={15} />
              </Button>
              <SavePropertyBTN property={data} />
            </div>
          </div>

          <div className="pt-8 px-2 gap-3 w-full flex justify-start items-center">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {data.title}
            </h3>
            <div className="hidden sm:block">
              <SavePropertyBTN property={data} />
            </div>
          </div>
          <PropertyCarousel images={data.images} />
          <div className="w-full flex justify-center items-start flex-wrap md:flex-nowrap gap-10 lg:gap-20 pt-5 px-4 sm:max-w-3xl lg:max-w-5xl">
            <PropertyDetails property={data} />
            <LeadForm propertyId={data.property_id} agentId={data.agent_id} />
            {/* Final CTA should be placed here */}
            {/* After page is functional, add more content to increase SEO Ranking */}
          </div>
          <div className="w-full flex justify-center items-start gap-10 lg:gap-20 pt-5 px-4 sm:max-w-3xl lg:max-w-5xl">
            <LocationSection property={data} />
          </div>
          {/* <Residencies /> */}
          <BottomNavbar price={data.price} />
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
