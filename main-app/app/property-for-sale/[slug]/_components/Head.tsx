import { Button } from "@/components/ui/button";
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
      className="flex justify-center items-center w-full gap-6 flex-col-reverse sm:flex-col sm:pt-5"
    >
      {/* Title, Share & Links */}
      <div className="w-full px-4 sm:max-w-3xl sm:px-4 sm:pt-0 lg:max-w-5xl">
        <div className="w-full flex justify-center items-start sm:items-end flex-col gap-3 sm:flex-row sm:justify-between">
          {/* <div className="w-full flex justify-between items-start flex-wrap"> */}
          <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            {title}
            {/* Luxurois Brynston 3 Bedroom Standalone house */}
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
      </div>

      <div className="flex justify-center items-center w-full sm:max-w-3xl sm:px-4 sm:pt-0 lg:max-w-5xl">
        {/* <ImageSlider images={images} /> */}
        {images && (
          <Image
            src={images[0]}
            alt={`property-image-${1}`}
            // Height is responsive, should be okay to use when implementing slider
            className="w-full object-cover h-[40vh] sm:h-[50vh] md:h-[60vh]"
            width={600}
            height={500}
            style={{
              width: "100%",
            }}
          />
        )}
      </div>
    </section>
  );
}

function ImageSlider({ images }: { images?: string[] }) {
  "use client";

  return (
    <Carousel className="w-full sm:max-w-full flex justify-center items-center">
      <CarouselContent className="w-full gap-5 -ml-4 flex justify-center items-center">
        {images?.map((image, index) => (
          <CarouselItem key={index} className="pl-4 w-full h-full">
            {/* Add Better SEO alt tag naming */}
            <Image
              src={image}
              alt={`property-image-${index}`}
              className="w-full object-cover"
              width={500}
              height={700}
              style={{
                width: "100%",
                height: "14rem",
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
