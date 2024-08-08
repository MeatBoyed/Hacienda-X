import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useState } from "react";

export default function PropertyCarousel({ images }: { images: string[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [showMore, setShowMore] = useState(false);
  const [modal, setModal] = useState<{ isOpen: boolean; currentImg: number }>({
    isOpen: false,
    currentImg: 0,
  });
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="w-full flex justify-center items-center flex-col gap-3">
      {/* Main image */}
      <Carousel
        setApi={setApi}
        className="w-full px-4 md:max-w-xl"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              onClick={() => setModal({ isOpen: true, currentImg: index })}
            >
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={image}
                  alt={`Thumbnail ${image}`}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Smaller Images */}
      <div className="w-full flex justify-center items-center gap-3 flex-wrap">
        {images.slice(0, 3).map((image, index) => (
          <div
            key={index}
            className="w-full h-full max-w-16 md:max-w-20"
            onClick={() => api && api.scrollTo(index)}
          >
            <AspectRatio ratio={1 / 1} className="">
              <Image
                src={image}
                alt={`Thumbnail ${image}`}
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        ))}
        {showMore ? (
          <>
            {images.slice(3).map((image, index) => (
              <div
                key={index}
                className="w-full h-full max-w-16 md:max-w-20"
                onClick={() => api && api.scrollTo(index)}
              >
                <AspectRatio ratio={1 / 1} className="">
                  <Image
                    src={image}
                    alt={`Thumbnail ${image}`}
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
            ))}
            <div
              className="w-full min-h-16 md:min-h-20 max-w-16 md:max-w-20 bg-gray-300 rounded flex justify-center items-center"
              onClick={() => setShowMore(!showMore)}
            >
              <p className="text-sm font-medium text-center">
                Show <br className="md:hidden" /> less
              </p>
            </div>
          </>
        ) : (
          images.length > 3 && (
            <div
              className="w-full min-h-16 md:min-h-20 max-w-16 md:max-w-20 bg-gray-300 rounded flex justify-center items-center"
              onClick={() => setShowMore(!showMore)}
            >
              <p className="leading-7">+ {images.length - 3}</p>
            </div>
          )
        )}
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-2">
          <div className="flex items-center justify-center w-full flex-col gap-5">
            <div
              onClick={() => setModal((prev) => ({ ...prev, isOpen: false }))}
              className="bg-red-600 text-white rounded p-1 hover:cursor-pointer hover:bg-red-500 shadow-md"
            >
              <X size={18} />
            </div>
            <div className="flex justify-center items-center h-full w-full max-w-full lg:max-w-screen-md">
              <AspectRatio ratio={3 / 2}>
                <Image
                  src={images[modal.currentImg]}
                  alt={`Thumbnail ${images[modal.currentImg]}`}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
            <div className="w-full flex justify-center items-center gap-3">
              <div
                onClick={() =>
                  setModal((prev) => ({
                    ...prev,
                    currentImg:
                      (prev.currentImg - 1 + images.length) % images.length,
                  }))
                }
                className="text-blue-600 rounded-full bg-white p-1 shadow-md hover:cursor-pointer hover:text-blue-700"
              >
                <ArrowLeft size={25} />
              </div>
              <div
                onClick={() =>
                  setModal((prev) => ({
                    ...prev,
                    currentImg: (prev.currentImg + 1) % images.length,
                  }))
                }
                className="p-1 text-blue-600 rounded-full bg-white shadow-md hover:cursor-pointer hover:text-blue-700"
              >
                <ArrowRight size={25} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
