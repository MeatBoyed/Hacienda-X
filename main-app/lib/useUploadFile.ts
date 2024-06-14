import React, { useState } from "react";
// import type { UploadedFile } from "@/types";
import { toast } from "sonner";
// import type { UploadFilesOptions } from "uploadthing/types";

import { getErrorMessage } from "@/lib/handleError";
import { FileState } from "./FormUtils";
// import { uploadFiles } from "@/lib/uploadthing";
// import { type OurFileRouter } from "@/app/api/uploadthing/core";

// interface UseUploadFileProps
//   extends Pick<
//     UploadFilesOptions<OurFileRouter, keyof OurFileRouter>,
//     "headers" | "onUploadBegin" | "onUploadProgress" | "skipPolling"
//   > {
//   defaultUploadedFiles?: UploadedFile[];
// }

export function useUploadFile() {
  //   endpoint: keyof OurFileRouter,
  //   { defaultUploadedFiles = [], ...props }: UseUploadFileProps = {}
  const [files, setFiles] = useState<FileState[]>([]); // Buffer to store Files in Pending & Error states
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);

  async function uploadFiles(files: File[]) {
    setIsUploading(true);
    try {
      console.log("Uploaded files: ", files);

      setFiles(
        files.map((file) => {
          return {
            file: file,
            key: Math.random().toString(36).slice(2),
            progress: "PENDING",
          };
        })
      ); // Store Inputted Files

      // API call to Upload (Presign first, then Upload with URL)
      //   const res = await uploadFiles(endpoint, {
      //     ...props,
      //     files,
      //     onUploadProgress: ({ file, progress }) => {
      //       setProgresses((prev) => {
      //         return {
      //           ...prev,
      //           [file]: progress,
      //         };
      //       });
      //     },
      //   });

      //   Update File states
      //   setUploadedFiles((prev) => (prev ? [...prev, ...res] : res));
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    files,
    uploadedFiles,
    progresses,
    uploadFiles,
    isUploading,
  };
}
