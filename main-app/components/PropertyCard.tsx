import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bath, BedDouble, Ruler } from "lucide-react";
import { PropertyWithAddress } from "@/app/api/(utils)/utils";
import { MdPool } from "react-icons/md";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

export function PropertyCard({
  property,
  className,
}: {
  property: PropertyWithAddress;
  className?: string;
}) {
  return (
    <Card className="border-0  md:min-w-fit min-w-max bg-transparent">
      <Link
        href={`/property-for-sale/${property.title}`}
        className="w-full h-full"
      >
        <div
          className={cn(
            "relative h-32 sm:h-48 md:h-52 w-full overflow-hidden rounded-xl  hover:cursor-pointer",
            className
          )}
        >
          <Image
            src={property.images[0]} // Assuming you have an array of images
            alt={"yess"}
            width={320}
            height={300}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
          />
          <p className="absolute top-0 right-0 mr-2 mt-2 rounded-sm bg-[#1f93ff] px-2 py-1 text-xs font-semibold text-white">
            {property.saleType}
          </p>
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
                <p className="leading-7">
                  {property.squareMeter.toLocaleString()} m&#178;
                </p>
              </div>
            )}
          </div>
          <p className="line-clamp-1 text-sm font-medium leading-none">
            {property.title}
          </p>
          <p className="text-lg font-semibold">
            R {property.price.toLocaleString()}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
