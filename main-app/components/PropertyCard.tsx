// Add Heart
// "use client"
import React from "react";
import "./PropertyCard.css";
import { AiFillHeart } from "react-icons/ai";
import { truncate } from "lodash";
// import Heart from "../Heart/Heart";
import Link from "next/link";
import { Property } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Bath, Bed } from "lucide-react";
import { PropertyWithAddress } from "@/app/api/[[...route]]/utils";

export default function PropertyCard({
  property,
}: {
  property: PropertyWithAddress;
}) {
  return (
    <div className="min-w-[17rem] flex justify-center items-center flex-col gap-5 w-full">
      <Link href={`../property-for-sale/${property.title}`}>
        <Image
          src={property.images[0]}
          alt={property.title + " - thumbnail."}
          className="w-full object-cover rounded-lg"
          width={500}
          height={700}
          style={{
            width: "100%",
            height: "14rem",
          }}
        />
      </Link>
      <div className="w-full flex justify-center items-start flex-col gap-3">
        {/* <p className="text-lg font-semibold">{property.title}</p> */}
        <div className="flex justify-start items-center gap-4">
          <Link href={`../property-for-sale/${property.title}`}>
            <p className="text-lg font-medium">{property.title}</p>
          </Link>
          <Link href={`../property-for-sale/${property.title}`}>
            <p className="text-lg font-semibold">
              USD {property.price?.toLocaleString()}
            </p>
          </Link>
        </div>

        <div className="flex justify-start items-center w-full gap-3">
          <div className="flex justify-center items-center gap-3">
            <p className="text-sm font-medium leading-none">
              {property.bathrooms}
            </p>
            <Bath size={15} />
          </div>
          <div className="flex justify-center items-center gap-3">
            <p className="text-sm font-medium leading-none">
              {property.bedrooms}
            </p>
            <Bed size={15} />
          </div>
        </div>

        <p className="text-base text-muted-foreground">
          {property.Address?.address}
        </p>
      </div>
    </div>
  );
}

function PropertyCard2({ property }: { property: Property }) {
  return (
    <div className="flexColStart r-card">
      {/* <Heart id={card?.id}/> */}
      {/* <img src={property.image} alt="home" /> */}
      <span className="secondaryText r-price">
        <p className="">$ {property.price}</p>
      </span>
      <Link href={`../property-for-sale/${property.title}`}>
        <p className="">
          {/* {truncate(property.title, { length: 15 })} */}
          {property.title}
        </p>
      </Link>
      <p className="secondaryText">
        {/* {truncate(property.description, { length: 80 })} */}
      </p>
    </div>
  );
}
