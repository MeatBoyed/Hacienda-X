"use client"
import React, { useState } from "react";
// import { Toaster } from "@/components/ui/sonner";
import { toast } from "@/components/ui/use-toast";

import { getErrorMessage } from "@/lib/handleError";
import { FileState } from "./FormUtils";


export function useUploadFile() {
  //   endpoint: keyof OurFileRouter,
  //   { defaultUploadedFiles = [], ...props }: UseUploadFileProps = {}
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);

  async function uploadFiles(files: File[]) {
    setIsUploading(true);
    try {
      console.log("Uploaded files: ", files);

      // setFiles(
      //   files.map((file) => {
      //     return {
      //       file: file,
      //       key: Math.random().toString(36).slice(2),
      //       progress: "PENDING",
      //     };
      //   })
      // ); // Store Inputted Files

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
        setUploadedFiles((prev) => (prev ? [...prev, ...files] : files));
      return {files: files}
    } catch (err) {
      // toast.error(getErrorMessage(err));
      console.log("There was an Error!")
    } finally {
      setProgresses({});
      setIsUploading(false);
      return {files: files}
    }
  }

  return {
    uploadedFiles,
    progresses,
    uploadFiles,
    isUploading,
  };
}
