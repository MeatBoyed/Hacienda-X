"use client";

import { FileUploader } from "@/lib/fileUploader";
import { useUploadFile } from "@/lib/useUploadFile";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { UploadedFilesCard } from "./UploadedFilesCard";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange: (inputtedFiles: File[]) => void;
}

const ImagesInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, handleChange, ...props }, ref) => {
    const { uploadFiles, progresses, uploadedFiles, isUploading } =
      useUploadFile(handleChange);

    // useEffect(() => {
    //   handleChange(uploadedFiles);
    // }, [uploadFiles, handleChange]);

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
          onUpload={uploadFiles}
          disabled={isUploading}
          multiple
        />
        <UploadedFilesCard uploadedFiles={uploadedFiles} />
      </div>
    );
  }
);
ImagesInput.displayName = "ImagesInput";

export { ImagesInput };
