import React from "react";
import "./Properties.css";
import SearchProperty from "./_components/SearchProperty";

export default async function PropertiesSearch() {
  //   const { data, isError, isLoading } = useProperties();

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        {/* Hanldes the Client Side functionality of Searching Properties */}
        <SearchProperty />
      </div>
    </div>
  );
}
