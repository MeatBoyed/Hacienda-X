// Add Heart
// "use client"
import React from "react";
import "./PropertyCard.css";
import { AiFillHeart } from "react-icons/ai";
import { truncate } from "lodash";
// import Heart from "../Heart/Heart";
import Link from "next/link";
import { Property } from "@prisma/client";

// const PropertyCard = ({ property }: { property: Property }) => {
const PropertyCard = ({ property }: { property: any }) => {
  return (
    <div className="flexColStart r-card">
      {/* <Heart id={card?.id}/> */}
      <img src={property.image} alt="home" />
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
        {truncate(property.description, { length: 80 })}
      </p>
    </div>
  );
};

export default PropertyCard;
