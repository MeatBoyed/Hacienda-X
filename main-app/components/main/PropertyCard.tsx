"use client";

import { useBookmarkService } from "@/lib/services/BookmarkService";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { Bed, Bath, Square, Mail, Bookmark } from "lucide-react";
import { MdPool } from "react-icons/md";
import { cn } from "../ImagesInput/FileInputUtils";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "../ui/card";
import Link from "next/link";

export default function PropertyCard({ property, className }: { property: PropertyWithAddress, className?: string }) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkService();
  const link = `/property-for-sale/${property.title}`;
  return (
    <Card key={property.property_id} className={cn("overflow-hidden min-w-fit max-w-lg", className)}>
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
      <CardContent className="px-4  justify-between ">
        <p className="font-semibold text-lg mb-4">$ {property.price.toLocaleString()}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-2" />
            <span>{property.bedrooms?.toLocaleString()} beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-2" />
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-2" />
            <span>{property.squareMeter?.toLocaleString()} sqm</span>
          </div>
          <div className="flex items-center">
            <MdPool className="w-4 h-4 mr-2" />
            <span>{property.pool}</span>
          </div>
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
