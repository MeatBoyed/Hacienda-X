"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropsWithChildren,  } from "react";
import {
  useImageGalleryContext,
  ImageGalleryContextProvider,
} from "../(components)/imageGalleryContext";
import { ImageDialog } from "../(components)/ImageDialog";
import { cn } from "@/lib/utils";

export default function ImageGallery({ defaultImages }: { defaultImages: string[] }) {
  return (
    <ImageGalleryContextProvider defaultImages={defaultImages}>

      <ImageCarousel>
        <ImageDialog />
      </ImageCarousel>
    </ImageGalleryContextProvider>
  );
}

export function ImageCarousel( { children, className }: { className?: string} & PropsWithChildren) {
  const { goBack, goNext, currentIndex, images } = useImageGalleryContext();

  return (
    <div className={cn("relative mb-8", className)}>
      {/* V0 Image sizing width: 600px height: 400px */}
      {children}

      {/* Next & Back btns */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
        onClick={goBack}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={goNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Bubbles */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`inline-block w-2 h-2 rounded-full mx-1 ${
              index === currentIndex ? "bg-white" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
