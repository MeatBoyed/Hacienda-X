"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { PropertyWithAddressAndAgent } from "@/Server/utils/utils";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { SavePropertyBTN } from "@/lib/bookmarksContext";
import {
  ChevronLeft,
  Share,
  X,
  ArrowLeft,
  ArrowRight,
  Router,
} from "lucide-react";
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
import { useRouter } from "next/navigation";

// Define the type for the property images
interface PropertyCarouselProps {
  images: string[];
}

// Handler for the API request (Server Side)
export default function PropertyPage() {
  const router = useRouter();
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
            <Button
              onClick={() => router.back()}
              className="text-text bg-transparent gap-1 p-0"
            >
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
          </div>
          <div className="w-full flex justify-center items-start gap-10 lg:gap-20 pt-5 px-4 sm:max-w-3xl lg:max-w-5xl">
            <LocationSection property={data} />
          </div>
          <BottomNavbar price={data.price} />
        </>
      )}
    </section>
  );
}

// Modal component to show full view of images
const ImageModal = ({
  images,
  currentIndex,
  onClose,
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="relative w-full max-w-3xl">
        <button
          className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <div className="flex items-center justify-between w-full">
          <button
            onClick={handlePrevious}
            className="p-2 bg-white text-blue-600 rounded-full"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex justify-center items-center max-w-full">
            <img
              src={images[currentImageIndex]}
              alt={`Property image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded"
            />
          </div>
          <button
            onClick={handleNext}
            className="p-2 bg-white text-blue-600 rounded-full"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

function PropertyCarousel({ images }: PropertyCarouselProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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

      <div className="flex justify-center items-center gap-2 mt-4">
        {images.slice(0, 3).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="w-20 h-20 object-cover rounded cursor-pointer"
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
        {images.length > 3 && (
          <div
            className="w-20 h-20 flex items-center justify-center bg-gray-300 rounded cursor-pointer"
            onClick={() => handleThumbnailClick(3)}
          >
            <span className="text-sm">+{images.length - 3}</span>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ImageModal
          images={images}
          currentIndex={currentImageIndex}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
