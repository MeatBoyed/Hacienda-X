"use client";

import { useBookmarkService } from "@/lib/Hooks/useBookmarkService";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { Bed, Bath, Square, Mail, Bookmark } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "../ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PropertyCard({
  property,
  className,
}: {
  property: PropertyWithAddress;
  className?: string;
}) {
  const link = `/property-for-sale/${property.title}`;
  return (
    <Card
      key={property.property_id}
      className={cn("overflow-hidden min-w-fit max-w-lg", className)}
    >
      <Link href={link}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full max-h-48 object-cover"
        />
      </Link>
      <CardHeader className="px-3">
        <CardTitle>
          <Link href={link}>{property.title}</Link>
        </CardTitle>
        <CardDescription>{property.Address?.address}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pt-0 flex flex-col justify-between items-start gap-3 w-full ">
        <p className="font-semibold text-lg ">$ {property.price.toLocaleString()}</p>
        {/* Core Features */}
        <div className="flex justify-between">
          <span className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {property.bathrooms} Baths
          </span>
          <span className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.squareMeter?.toLocaleString()} sqft
          </span>
        </div>
        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {property.extraFeatures.map((amenity) => (
            <span
              key={amenity}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
            >
              {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center gap-3 px-3">
        <Button
          variant="default"
          size="sm"
          className="w-full bg-blue-500 text-white hover:bg-blue-600 "
        >
          <Link
            href={`/contact-agent/${property.property_id}`}
            className="w-full flex items-center justify-center"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Agent
          </Link>
        </Button>
        <BookmarkButton property={property} />
      </CardFooter>
    </Card>
  );
}

export function BookmarkButton({ property }: { property: PropertyWithAddress }) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkService();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        if (isBookmarked(property.property_id)) {
          removeBookmark(property.property_id);
        } else {
          addBookmark(property);
        }
      }}
      className={cn(
        "bg-white  border",
        isBookmarked(property.property_id) ? "bg-red-500" : "bg-white"
      )}
    >
      <Bookmark
        className={cn(
          "w-4 h-4 hover:text-white",
          isBookmarked(property.property_id) ? "text-white" : "text-muted-foreground"
        )}
      />
    </Button>
  );
}
