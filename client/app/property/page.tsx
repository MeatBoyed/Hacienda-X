import React from "react";
import Searchbar from "@/components/Searchbar";
import PropertyCard from "@/components/PropertyCard";
import data from "@/lib/slider.json";
import "./property.css";

export default function PropertyPage() {
  // Function to chunk the data into arrays of size 4
  const chunkArray = (arr: any[], size: number) => {
    // Explicitly define types
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  // Chunk the data into arrays of size 4
  const chunkedProperties = chunkArray(data, 4);

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <Searchbar />
      </div>
      <div className="residenciestext">
        <h1>For Sale</h1>
      </div>

      {/* Iterate over the chunked properties and render them in rows */}
      {chunkedProperties.map((row, index) => (
        <div key={index} className="flex justify-start items-start">
          {" "}
          {/* Add "flex-start" to ensure items are aligned from the start */}
          {row.map(
            (
              property: any,
              i: number // Explicitly define types
            ) => (
              <PropertyCard
                key={i}
                name={property.name}
                detail={property.detail}
                image={property.image}
                price={property.price}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
}
