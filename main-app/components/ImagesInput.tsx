"use client";

import { FileUploader } from "@/lib/fileUploader";
import { useUploadFile } from "@/lib/useUploadFile";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { UploadedFilesCard } from "./UploadedFilesCard";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange: (inputtedFiles: File[]) => void;
}

const ImagesInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, handleChange, ...props }, ref) => {
    // const { uploadFiles, progresses, uploadedFiles, isUploading } =
    //   useUploadFile(handleChange);

    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const { trigger, isMutating, data } = useSWRMutation(
      "/api/images/upload",
      sendUploadRequest /* options */,
      {
        onError: () => {
          toast.error("Something unexpected happend.", {
            description: "Please try again....",
          });
        },
        onSuccess: (data) => {
          // Posthog Action
          // const posthog = PostHogClient();
          // posthog.identify({
          //   distinctId: userId, // replace with a user's distinct ID
          //   properties: { role: role },
          // });
          console.log("Response Data: ", data);

          console.log("Recieved ULRS: ", data.result);
          const newImages = [...uploadedImages, ...data.result];
          setUploadedImages(newImages);
          handleChange(newImages);
          // handleChange()

          // Show message
          toast.success("Your property has been posted!", {
            description: `View your image can be viewed at ${data}`,
          });
        },
      }
    );

    return (
      <div className={cn("space-y-6", className)}>
        {/* File Uploader manages the File states of "Pending", "Error"
      1. It stores it's own file state (buffer of Pending and Error files)
      2. It returns the uploaded Image(s) stored in file state, for hook to manipluate
      2.2 Hook manages uploading and retry of Files, and retruns success to File Uploader
      3. It returns "onRetry" which allows re-upload (retry) of uploading image
      4. Clears state once all files are successfully uploaded
      4.4 Images should then appear in UploadedFilesCard */}
        <FileUploader
          maxFiles={4}
          maxSize={4 * 1024 * 1024}
          // progresses={progresses}
          onUpload={async (files) => {
            // const newImages = [...images, ...files];
            await trigger({ images: files });
          }}
          multiple
          disabled={isMutating}
        />
        <UploadedFilesCard uploadedFiles={uploadedImages} />
      </div>
    );
  }
);
ImagesInput.displayName = "ImagesInput";
export { ImagesInput };

async function sendUploadRequest(
  url: string,
  {
    arg,
  }: {
    arg: {
      images: File[];
    };
  }
) {
  const formData = new FormData();
  for (let i = 0; i < arg.images.length; i++) {
    formData.append(`images[${i}]`, arg.images[i] as File);
  }

  return fetch(url, {
    method: "POST",
    // headers: {
    //   // "Content-Type": "application/json",
    //   // "Content-Type": "multipart/form-data",
    // },
    body: formData,
  }).then((res) => res.json());
}
