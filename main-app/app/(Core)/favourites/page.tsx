"use client";
import React, { useContext, useState } from "react";
import { PuffLoader } from "react-spinners";
// import "../(Property)/property-for-sale/Properties.css";
import { SearchBar } from "@/components/SearchBar";

export default function Favourites() {
  //   const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");

  //   const {
  //     userDetails: { favourites },
  //   } = useContext(UserDetailContext);

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
        {/* <SearchBar filter={filter} setFilter={setFilter} /> */}

        <div className="paddings flexCenter properties">
          {
            // data.map((card, i)=> (<PropertyCard card={card} key={i}/>))
            // data
            //   .filter((property) => favourites.includes(property.id))
            //   .filter(
            //     (property) =>
            //       property.title.toLowerCase().includes(filter.toLowerCase()) ||
            //       property.city.toLowerCase().includes(filter.toLowerCase()) ||
            //       property.country.toLowerCase().includes(filter.toLowerCase())
            //   )
            //   .map((card, i) => (
            //     <PropertyCard card={card} key={i} />
            //   ))
          }
        </div>
      </div>
    </div>
  );
}
