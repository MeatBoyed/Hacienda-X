"use client"
import ImageGallery from "@/app/[locale]/(Property)/property-for-sale/[slug]/_components/ImageGallery";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge, Bed, Bath, Square, MapPin,  } from "lucide-react";
import { useMapContext } from "./MapContext";
import Link from "next/link";

export default function PropertyInfoCard({ className }: { className?: string }) {
    const { mainProperty } = useMapContext();
    return (
      <div className={cn("flex flex-col justify-center items-center gap-3", className)}>
        <ImageGallery defaultImages={mainProperty.images} />
        <CardContent style={{padding: 0}} className="">
          <h3 className="font-semibold text-lg  line-clamp-1">{mainProperty.title}</h3>
          <Badge className="bg-primary text-primary-foreground">{mainProperty.price}</Badge>
          <div className="grid grid-cols-2 gap-2 text-sm ">
            <div className="flex items-center">
              <Bed className="mr-1 h-4 w-4" />
              <span>{mainProperty.bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-1 h-4 w-4" />
              <span>{mainProperty.bathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <Square className="mr-1 h-4 w-4" />
              <span>{mainProperty.squareMeter} sq ft</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              <span className="truncate">{mainProperty.Address?.address}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="w-full pt-0" style={{padding: 0}}>
          <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
            <Link href={`/property/${mainProperty.property_id}`}>View Property</Link>
          </Button>
        </CardFooter>
      </div>
    );
  }