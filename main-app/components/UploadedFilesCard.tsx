"use client";
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
  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   })
  // );

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
  // const [images, setImage] = useState<string[]>([])

  //   function handleDragEnd(event: any) {
  //     const {active, over} = event;

  //     if (active.id !== over.id) {
  //       setImage((items) => {
  //         const oldIndex = items.indexOf(active.id);
  //         const newIndex = items.indexOf(over.id);

  //         return arrayMove(items, oldIndex, newIndex);
  //       });
  //     }
  //   }

  return (
    <div className="flex justify-center items-start flex-col w-full gap-5 ">
      <div className="flex justify-center items-start w-full flex-col text-start">
        <h3 className="text-xl font-semibold">Uploaded files</h3>
        <CardDescription>View the uploaded files here</CardDescription>
      </div>
      <CardContent className="p-0 w-full">
        {/* {uploadedImages.length > 0 ? (
          <>
            <div className="grid gap-3 lg:grid-cols-2">{images}</div>
          </>
        ) : (
          <EmptyCard
            title="No files uploaded"
            description="Upload some files to see them here"
            className="w-full"
          />
        )} */}
        {/* <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={images.map((file) => file.file)}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid gap-3 lg:grid-cols-2">
        {uploadedImages.map(id => <SortableItem key={id} id={id} />)}
        </div>
      </SortableContext>
    </DndContext> */}
      </CardContent>
    </div>
  );
}

// export function SortableItem(props) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({id: props.id});

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       <ImagePreviewCard image={} onRemove={() => return} />
//     </div>
//   );
// }

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
