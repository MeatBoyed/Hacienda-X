"use client";

import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

export default function SearchProperty({ properties }: { properties: any[] }) {
  const [filter, setFilter] = useState("");

  return (
    <div className="flexColCenter paddings innerWidth properties-container">
      <SearchBar filter={filter} setFilter={setFilter} />
      <div className="paddings flexCenter properties">
        {properties
          .filter(
            (property) =>
              property.title.toLowerCase().includes(filter.toLowerCase()) ||
              property.city.toLowerCase().includes(filter.toLowerCase()) ||
              property.country.toLowerCase().includes(filter.toLowerCase())
          )
          .map((card, i) => (
            <PropertyCard property={card} key={i} />
          ))}
      </div>
    </div>
  );
}
