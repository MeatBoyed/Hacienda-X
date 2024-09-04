import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogImage,
  DialogContainer,
} from "@/components/core/dialog";
import { XIcon } from "lucide-react";
import { useImageGalleryContext } from "./imageGalleryContext";
import { useMemo } from "react";
import ImageGallery, { ImageCarousel } from "./ImageGallery";

// Copied from DialogBasicImage "motion-primative"
export function ImageDialog() {
  const { currentImage, currentIndex } = useImageGalleryContext();

  const inGalleryImageRender = useMemo(() => {
    return (
      <DialogImage
        src={currentImage}
        alt={`Property image ${currentIndex + 1}`}
        //   className="max-w-xs rounded-[4px]"
        className="w-full h-[400px] object-cover rounded-lg"
      />
    );
  }, [currentImage, currentIndex]);

  const fullscreenImageRender = useMemo(() => {
    return (
      <DialogImage
        src={currentImage}
        alt={`Property image ${currentIndex + 1}`}
        className="h-auto w-full max-w-[90vw] rounded-[4px] object-cover lg:h-[90vh]"
      />
    );
  }, [currentImage, currentIndex]);

  return (
    <Dialog
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <DialogTrigger>{inGalleryImageRender}</DialogTrigger>
      <DialogContainer>
        <DialogContent className="relative">
          {/* {imageRender} */}
          <ImageCarousel>{fullscreenImageRender}</ImageCarousel>
        </DialogContent>
        <DialogClose
          className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </DialogClose>
      </DialogContainer>
    </Dialog>
  );
}
