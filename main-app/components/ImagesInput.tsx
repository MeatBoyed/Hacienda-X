"use client";

import { FileUploader } from "@/lib/fileUploader";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { UploadedFilesCard } from "./UploadedFilesCard";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";
import {
  DeleteImage,
  DeleteImageResponse,
  PostUploadImages,
} from "@/lib/RequestUtils";
import { FileState } from "@/lib/FormUtils";
import { file } from "zod-form-data";
import { AWS_S3_BASE_URL } from "@/app/api/(utils)/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValues?: string[];
  handleChange: (
    uploadedImages: { newImages: File[]; order: string[] },
    deletedImages?: string[],
    newImages?: File[]
  ) => void;
}

const ImagesInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, defaultValues, handleChange, ...props }, ref) => {
    // const { uploadFiles, progresses, uploadedFiles, isUploading } =
    //   useUploadFile(handleChange);

    const [uploadedImages, setUploadedImages] = useState<FileState[]>([]);
    const [deletedImages, setDeletedImages] = useState<FileState[]>([]);

    const { trigger, isMutating, data } = useSWRMutation(
      "/api/images/upload",
      PostUploadImages /* options */,
      {
        onError: () => {
          toast.error("Something unexpected happend.", {
            description: "Please try again....",
          });
        },
        onSuccess: (data) => {
          console.log("Response Data: ", data);
          console.log("Recieved ULRS: ", data.result);
          const newImages = [...uploadedImages, ...data.result];
          setUploadedImages(newImages);
          // handleChange(newImages);
          // handleChange()

          // Show message
          toast.success("Your property has been posted!", {
            description: `View your image can be viewed at ${data}`,
          });
        },
      }
    );

    useEffect(() => {
      if (defaultValues) {
        const newFileStates: FileState[] = defaultValues.map((imageUrl) => ({
          key: Math.random().toString(5),
          file: imageUrl,
          progress: "COMPLETE",
        }));
        setUploadedImages(newFileStates);
        handleChange(convertUploadedImages(newFileStates));
      }
    }, []);

    // const ["Cmplete", "complete", "PENDING", "COmplete"]
    // ["url", "url", "file.name", "url"]
    function convertUploadedImages(uploadedimages: FileState[]) {
      let newImages: File[] = [];
      let order: string[] = [];
      uploadedimages.forEach((file) => {
        if (file.progress === "COMPLETE" && typeof file.file === "string")
          order.push(file.file);
        if (file.progress === "PENDING" && file.file instanceof File) {
          order.push(file.file.name);
          newImages.push(file.file);
        }
      });
      return { newImages: newImages, order: order };
    }
    function convertDeletedImages(deletedImages: FileState[]) {
      let images: string[] = [];
      deletedImages.forEach(
        (file) => typeof file.file === "string" && images.push(file.file)
      );
      return images;
    }

    return (
      <div className={cn("space-y-6", className)}>
        {/* File Uploader manages the File states of "Pending", "Error"
      1. It stores it's own file state (buffer of Pending and Error files)
      2. It returns the uploaded Image(s) stored in file state, for hook to manipluate
      2.2 Hook manages uploading and retry of Files, and retruns success to File Uploader
      3. It returns "onRetry" which allows re-upload (retry) of uploading image
      4. Clears state once all files are successfully uploaded
      4.4 Images should then appear in UploadedFilesCard */}

        {/* UPDATE:
        File Uploader should manage the Files states, and manage getting SignedUrls for images.
        2.2 Hook "uploads" and get's signedUrls of successful images
        3. Returns signedUlrs to Form
        4. OnFormSubmission it does the Post on signedUrls to upload images using Fetcher 
      */}
        {/* Handle when max inputted files is reached */}
        <FileUploader
          maxFiles={4}
          maxSize={4 * 1024 * 1024}
          // progresses={progresses}
          onUpload={async (files) => {
            // await trigger({ images: files });
            const newFileStates: FileState[] = files.map((image) => ({
              file: image,
              progress: "PENDING", // Set to PENDING, as it hasn't been Uploaded to S3
              key: Math.random().toString(5),
            }));

            setUploadedImages((prev) => [...prev, ...newFileStates]);
            handleChange(
              convertUploadedImages([...uploadedImages, ...newFileStates])
            );
          }}
          multiple
          disabled={isMutating}
        />
        <UploadedFilesCard
          uploadedImages={uploadedImages}
          onFileDelete={async (deletedFile) => {
            // Ensure Image is already uploaded
            if (
              deletedFile.progress === "COMPLETE" &&
              typeof deletedFile.file === "string" &&
              deletedFile.file.startsWith(AWS_S3_BASE_URL)
            ) {
              // Trigger API
              const images: FileState[] = uploadedImages.filter(
                (image) => image.key != deletedFile.key
              );
              console.log("Updted Images array: ", images);

              // Set Deleted Images
              setDeletedImages((prev) => [...prev, deletedFile]);

              // Set Image State
              setUploadedImages(images);
              // setUploadedFiles(convertUploadedImages(images));
              handleChange(
                convertUploadedImages(images),
                convertDeletedImages([...deletedImages, deletedFile])
              );
            }

            if (
              deletedFile.progress === "PENDING" &&
              deletedFile.file instanceof File
            ) {
              // Trigger API
              const images: FileState[] = uploadedImages.filter(
                (image) => image.key != deletedFile.key
              );

              // Set Image State
              setUploadedImages(images);
              handleChange(convertUploadedImages(images));
            }
          }}
        />
      </div>
    );
  }
);
ImagesInput.displayName = "ImagesInput";

export { ImagesInput };
