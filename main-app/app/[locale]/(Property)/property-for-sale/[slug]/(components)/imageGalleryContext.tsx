"use client";

import { PostLead } from "@/lib/RequestUtils";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { createContext, useCallback, useContext, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

// Enabling TS features
export type ImageGalleryContext = {
  images: string[];
  currentImage: string;
  currentIndex: number;
  goBack: () => void;
  goNext: () => void;
};

export const ImageGalleryContext = createContext<ImageGalleryContext | null>(null);

export function useImageGalleryContext() {
  const context = useContext(ImageGalleryContext);
  if (!context) {
    throw new Error("useImageGalleryContext must be used within a ImageGalleryContextProvider");
  }
  return context as ImageGalleryContext;
}

export const ImageGalleryContextProvider: React.FC<{
  defaultImages?: string[];
  children: React.ReactNode;
}> = ({ defaultImages, children }) => {
  const images: string[] = defaultImages || [];
  const [currentImage, setCurrentImage] = useState<string>(images[0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goBack = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      setCurrentImage(images[newIndex]);
      return newIndex;
    });
  }, [images]);

  const goNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      setCurrentImage(images[newIndex]);
      return newIndex;
    });
  }, [images]);

  return (
    <ImageGalleryContext.Provider value={{ images, currentImage, currentIndex, goBack, goNext }}>
      {children}
    </ImageGalleryContext.Provider>
  );
};
