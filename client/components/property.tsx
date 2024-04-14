import React from "react";
import Searchbar from "./Searchbar";
import useProperties from "@/app/hooks/useProperties";
import PropertyCard from "./PropertyCard";

const Property = () => {
  const { data, isError, isLoading } = useProperties();

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <Searchbar />

        {/* I really wanted this page to be like error handling page. but i cant do it so i will just leave it like this. */}
        {/* dont delete it, we might need it later */}
      </div>
    </div>
  );
};

export default Property;
