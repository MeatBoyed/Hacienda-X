import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyCard } from "@/components/EmptyCard";
import { Trash2 } from "lucide-react";
import { FileState } from "@/lib/FormUtils";
import { useMemo } from "react";

interface UploadedFilesCardProps {
  uploadedImages: FileState[];
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
    <div className="flex justify-center items-start flex-col w-full gap-5 ">
      <div className="flex justify-center items-start w-full flex-col text-start">
        <h3 className="text-xl font-semibold">Uploaded files</h3>
        <CardDescription>View the uploaded files here</CardDescription>
      </div>
      <CardContent className="p-0 w-full">
        {uploadedImages.length > 0 ? (
          <>
            <div className="grid gap-3 lg:grid-cols-2">{images}</div>
          </>
        ) : (
          <EmptyCard
            title="No files uploaded"
            description="Upload some files to see them here"
            className="w-full"
          />
        )}
      </CardContent>
    </div>
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
    <div className="relative aspect-video w-full border">
      <Image
        src={
          typeof image.file === "string"
            ? image.file
            : URL.createObjectURL(image.file)
        }
        alt={`image 1`}
        fill
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
      </div>
    </div>
  );
}
