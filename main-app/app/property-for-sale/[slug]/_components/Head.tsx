import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Heart, Share } from "lucide-react";
import Image from "next/image";

export default function Head({
  title,
  images,
}: {
  title?: string;
  images?: string[];
}) {
  return (
    <section
      id="head"
      className="flex justify-center items-center flex-col w-full my-12 gap-14"
    >
      {/* Title, Share & Links */}
      <div className="w-full flex justify-center items-start sm:items-end flex-col gap-5 sm:flex-row sm:justify-between">
        {/* <div className="w-full flex justify-between items-start flex-wrap"> */}
        <h1 className="scroll-m-20 text-3xl font-medium tracking-tight first:mt-0">
          {/* {title} */}
          Luxurois Brynston 3 Bedroom Standalone house
        </h1>

        <div className="flex justify-center items-center gap-5">
          <Button
            className="text-text bg-transparent gap-3 p-0 underline"
            size={"sm"}
          >
            <Share size={15} /> Share
          </Button>
          <Button
            className="text-text bg-transparent gap-3 p-0 underline"
            size={"sm"}
          >
            <Heart size={15} /> Save
          </Button>
        </div>
      </div>

      <div className="flex justify-start items-center w-full">
        <ImageSlider images={images} />
      </div>
    </section>
  );
}

function ImageSlider({ images }: { images?: string[] }) {
  "use client";

  return (
    <Carousel className="w-full sm:max-w-full flex justify-center items-center">
      <CarouselContent className="w-full gap-5 -ml-4">
        {images?.map((image, index) => (
          <CarouselItem key={index} className="pl-4 w-full h-full">
            {/* Add Better SEO alt tag naming */}
            <Image
              src={image}
              alt={`property-image-${index}`}
              width={500}
              height={700}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
