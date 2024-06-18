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

interface UploadedFilesCardProps {
  uploadedFiles: File[];
  // uploadedFiles: string[];
}

export function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded files</CardTitle>
        <CardDescription>View the uploaded files here</CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          // <ScrollArea className="pb-4 ">
          //   <div className="flex space-x-2.5">
          //     {uploadedFiles.map((file, index) => (
          //       // <div key={file.key} className="relative aspect-video w-64">
          //       <div key={index} className="relative aspect-video w-64">
          //         <Image
          //           src={URL.createObjectURL(file)}
          //           alt={file.name}
          //           fill
          //           // sizes="(min-width: 640px) 640px, 100vw"
          //           loading="lazy"
          //           className="rounded-md object-cover"
          //         />
          //       </div>
          //     ))}
          //   </div>
          //   <ScrollBar orientation="vertical" />
          // </ScrollArea>
          <div className="grid gap-1 lg:grid-cols-2">
            {uploadedFiles.map((file, index) => (
              // <div key={file.key} className="relative aspect-video w-64">
              <div
                key={index}
                className="relative aspect-video w-64 border pt-1"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  // src={file}
                  alt={`image ${index}`}
                  fill
                  // sizes="(min-width: 640px) 640px, 100vw"
                  // loading="lazy"
                  className="rounded-md object-cover"
                />
              </div>
            ))}
          </div>
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
