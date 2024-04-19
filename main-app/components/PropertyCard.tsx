// Add Heart
"use client"
import React from "react";
import "./PropertyCard.css";
import { AiFillHeart } from "react-icons/ai";
import { truncate } from "lodash";
// import Heart from "../Heart/Heart";
import { useRouter } from "next/router";

const PropertyCard = ({ card }: { card: any }) => {
  const router = useRouter();
  return (
    <div
      className="flexColStart r-card"
      onClick={() => router.push(`../properties/${card.id}`)}
    >
      {/* <Heart id={card?.id}/> */}
      <img src={card.image} alt="home" />
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{card.price}</span>
      </span>
      <span className="primaryText">
        {truncate(card.title, { length: 15 })}
      </span>
      <span className="secondaryText">
        {truncate(card.description, { length: 80 })}
      </span>
    </div>
  );
};

export default PropertyCard;
