import React from "react";
import data from "../lib/rentalslider.json";
import PropertyCard from "./PropertyCard";
import PrimaryButton from "./ui/Custom/PrimaryButton";

export default function Residencies() {
  return (
    <section className="w-full flex flex-col overflow-hidden gap-10">
      <div className="mt-8 flex flex-col justify-start items-start gap-1  ">
        <span className="text-orange-500 text-2xl font-semibold">
          Best Choices
        </span>
        <span className="text-[#1f3e72] font-bold text-4xl">
          Popular Rentals
        </span>
      </div>

      <div className="flex justify-start items-start">
        {data.map((card, i) => (
          <PropertyCard
            key={i}
            name={card.name}
            detail={card.detail}
            image={card.image}
            price={card.price}
          />
        ))}
      </div>

      <div className="flex justify-center items-center">
        <PrimaryButton content="Explore more" />
      </div>
    </section>
  );
}
