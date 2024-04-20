// Add Heart
// "use client"
import React from "react";
import "./PropertyCard.css";
import { AiFillHeart } from "react-icons/ai";
import { truncate } from "lodash";
// import Heart from "../Heart/Heart";
import Link from "next/link";
import { Property } from "@prisma/client";

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <div className="flexColStart r-card">
      {/* <Heart id={card?.id}/> */}
      <img src={property.image} alt="home" />
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{property.price}</span>
      </span>
      <Link href={`../property-for-sale/${property.title}`}>
        <span className="primaryText">
          {truncate(property.title, { length: 15 })}
        </span>
      </Link>
      <span className="secondaryText">
        {truncate(property.description, { length: 80 })}
      </span>
    </div>
  );
};

export default PropertyCard;
