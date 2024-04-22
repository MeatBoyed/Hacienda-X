import React, { useState } from "react";
import "./Properties.css";
import { PuffLoader } from "react-spinners";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import Residency from "@/Utils/Residency.json";
import SearchProperty from "./_components/SearchProperty";

async function fetchProperties() {
  // const res = await fetch('https://api.example.com/posts');
  const res = Residency;

  // if (!res.ok) {
  //   throw new Error('Failed to fetch data');
  // }
  if (!res) {
    throw new Error("Failed to fetch data");
  }

  // return res.json();
  return res;
}

export default async function PropertiesSearch() {
  //   const { data, isError, isLoading } = useProperties();

  const data = await fetchProperties();

  //   if (isError) {
  //     return (
  //       <div className="wrapper">
  //         <span>Error while fetching data</span>
  //       </div>
  //     );
  //   }

  //   if (isLoading) {
  //     return (
  //       <div className="wrapper flexCenter" style={{ height: "60vh" }}>
  //         <PuffLoader
  //           height="80"
  //           width="80"
  //           radius={1}
  //           color="#4066ff"
  //           aria-label="puff-loading"
  //         />
  //       </div>
  //     );
  //   }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchProperty properties={data} />
      </div>
    </div>
  );
}
