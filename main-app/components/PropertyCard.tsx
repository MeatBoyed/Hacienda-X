import React from "react";
import "./PropertyCard.css";
import Link from "next/link";
import { Property } from "@prisma/client";
import Image from "next/image";
import { Bath, Bed } from "lucide-react";
import { PropertyWithAddress } from "@/app/api/(utils)/utils";

export default function PropertyCard({
  property,
  max,
}: {
  max?: boolean;
  property: PropertyWithAddress;
}) {
  return (
    <div
      className={`sm:${
        max ? "max" : "min"
      }-w-[17rem] min-h-[17rem] flex justify-start items-center flex-col gap-3`}
    >
      <Link href={`../property-for-sale/${property.title}`}>
        <Image
          src={property.images[0]}
          alt={property.title + " - thumbnail."}
          className="w-full object-cover rounded-lg"
          width={500}
          height={700}
          // style={{
          //   width: "100%",
          //   height: "14rem",
          // }}
        />
      </Link>
      <div className="w-full flex justify-center items-start flex-col gap-1">
        {/* <p className="text-lg font-semibold">{property.title}</p> */}
        <div className="flex justify-center flex-col items-start ">
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
          <div className="flex justify-center items-center gap-1">
            <p className="text-sm font-medium leading-none">
              {property.bathrooms}
            </p>
            <Bath size={15} />
          </div>
          <div className="flex justify-center items-center gap-1">
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
