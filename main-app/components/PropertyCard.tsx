import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bath, BedDouble, Bookmark, Ruler } from "lucide-react";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { MdPool } from "react-icons/md";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/components/ImagesInput/FileInputUtils";
import { SavePropertyBTN } from "@/lib/bookmarksContext";
import { Skeleton } from "./ui/skeleton";

export function PropertyCard({
  property,
  className,
}: {
  property: PropertyWithAddress;
  className?: string;
}) {
  return (
    <Card className="border-0  md:min-w-fit min-w-max bg-transparent">
      <div
        className={cn(
          "relative h-32 sm:h-48 md:h-52 w-full overflow-hidden rounded-xl  hover:cursor-pointer",
          className
        )}
      >
        <Link href={`/property-for-sale/${property.title}`} className="w-full h-full">
          <Image
            src={property.images[0]} // Assuming you have an array of images
            alt={"yess"}
            width={320}
            height={300}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
          />
        </Link>
        <div className="absolute flex justify-center items-center gap-3 top-0 right-0 pr-2 pt-2 ">
          <p className="rounded-sm bg-[#1f93ff] px-2 py-1 text-xs font-semibold text-white">
            {property.saleType}
          </p>
          {/* <SavePropertyBTN property={property} /> */}
        </div>
      </div>
      <CardContent className="px-1 flex flex-col gap-3 pt-4">
        <div className="flex gap-3 justify-start items-center overflow-hidden">
          <div className="flex justify-center items-center gap-2">
            <BedDouble size={20} />
            <p className="leading-7">{property.bedrooms}</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Bath size={20} />
            <p className="leading-7">{property.bathrooms}</p>
          </div>
          {property.pool && (
            <div className="flex justify-center items-center gap-2">
              <MdPool size={20} />
              <p className="leading-7">{property.pool && "Yes"}</p>
            </div>
          )}
          {property.squareMeter && (
            <div className="flex justify-center items-center gap-2">
              <Ruler size={20} />
              <p className="leading-7">{property.squareMeter.toLocaleString()} m&#178;</p>
            </div>
          )}
        </div>

        <Link href={`/property-for-sale/${property.title}`} className="w-full h-full">
          <p className="line-clamp-1 text-sm font-medium leading-none">{property.title}</p>
        </Link>
        <p className="text-lg font-semibold">R {property.price.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}

export function PropertyCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className="border-0  md:min-w-fit min-w-max bg-transparent">
      <Skeleton className="w-56 h-[128px] sm:h-[192px] md:h-[208px]  rounded-xl" />
      <CardContent className="px-1 flex flex-col gap-3 pt-4">
        <Skeleton className="w-full h-5" />

        <p className="line-clamp-1 text-sm font-medium leading-none">
          <Skeleton className="w-full h-5" />
        </p>
      </CardContent>
    </Card>
  );
}
