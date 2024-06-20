import Image from "next/image";
// import type { UploadedFile } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { EmptyCard } from "@/components/EmptyCard";
import { Trash2 } from "lucide-react";
import { FileState } from "@/lib/FormUtils";
import { useMemo } from "react";
import { Button } from "./ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

interface UploadedFilesCardProps {
  uploadedImages?: FileState[];
  onFileDelete: (file: FileState) => void;
}

export function UploadedFilesCard({
  onFileDelete,
  uploadedImages,
}: UploadedFilesCardProps) {
  const images = useMemo(
    () =>
      uploadedImages?.map((image, index) => (
        <ImagePreviewCard
          key={index}
          image={image}
          onRemove={(file) => onFileDelete(file)}
        />
      )),
    [uploadedImages]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded files</CardTitle>
        <CardDescription>View the uploaded files here</CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedImages ? (
          <>
            <div className="grid gap-1 lg:grid-cols-2">{images}</div>
          </>
        ) : (
          <EmptyCard
            title="No files uploaded"
            description="Upload some files to see them here"
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  );
}

function ImagePreviewCard({
  image,
  onRemove,
}: {
  image: FileState;
  onRemove: (image: FileState) => void;
}) {
  return (
    <div className="relative aspect-video w-64 border">
      <Image
        src={
          typeof image.file === "string"
            ? image.file
            : URL.createObjectURL(image.file)
        }
        alt={`image 1`}
        fill
        // sizes="(min-width: 640px) 640px, 100vw"
        className="rounded-md object-cover"
      />
      <div className="absolute top-0 right-0 w-full h-full rounded-md">
        <div className="bg-black opacity-40 w-full h-full" />
        <div
          className="absolute top-2 right-2 hover:cursor-pointer bg-white rounded-full p-2 flex justify-center items-center text-black hover:bg-white hover:text-red-500 "
          onClick={() => onRemove(image)}
        >
          <Trash2 size={20} />
        </div>
        {/* <Dialog>
          <DialogTrigger asChild className="absolute top-2 right-2 pt-2 pr-2">
            <Button
              variant={"default"}
              className="bg-white rounded-full p-2 flex justify-center items-center text-black hover:bg-white hover:text-red-500 "
            >
              <Trash2 size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Warning! This is can't be undone.</DialogTitle>
              <DialogDescription>
                Deleting this image will be a permant action, and can't be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter
              style={{ justifyContent: "space-between" }}
              className="flex p-0 m-0 justify-between items-center w-full"
            >
              <p className="text-sm font-normal ">
                Are you sure you want to do this?
              </p>
              <Button
                variant={"destructive"}
                type="submit"
                onClick={() => onRemove(image)}
              >
                Confirm Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </div>
    </div>
  );
}
