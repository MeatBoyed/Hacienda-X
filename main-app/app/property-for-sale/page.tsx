import React, { useState } from "react";
import "./Properties.css";
import { PuffLoader } from "react-spinners";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import Residency from "@/Utils/Residency.json";
import SearchProperty from "./_components/SearchProperty";

// Handler for the API request (Server Side)
async function fetchProperties() {
  // Example standard Fetch request to the API
  // const res = await fetch('https://api.example.com/posts');
  const res = Residency; // using dummy json data for now

  // Handle Errors
  // - Property Not Found
  // - Data fetching error
  // - Catch all
  // if (!res.ok) {
  //   throw new Error('Failed to fetch data');
  // }
  if (!res) {
    throw new Error("Failed to fetch data");
  }

  // Return the data on success
  // return res.json();
  return res;
}

export default async function PropertiesSearch() {
  //   const { data, isError, isLoading } = useProperties();

  // Client Request to the API
  // - Should include/handle Loading, Error, and Success states
  // - Should redirect to 404 or show custom page for non-existing properties
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
        {/* Hanldes the Client Side functionality of Searching Properties */}
        <SearchProperty properties={data} />
      </div>
    </div>
  );
}
