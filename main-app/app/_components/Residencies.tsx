// Implement Data fetching

import React from "react";
import "swiper/css";
import "./Residencies.css";
import { PuffLoader } from "react-spinners";
import db from "@/Utils/db";
import { Property } from "@prisma/client";
import PropertiesCarousel from "@/components/PropertiesCarousel";

export async function getAllProperties() {
  return await db.property.findMany();
}

export default async function Residencies() {
  let isLoading: boolean = true;
  let data: Property[] | null = null;
  let isError: boolean | null = null;

  try {
    // data = await getAllProperties();
    data = [];
    isLoading = false;
  } catch (error) {
    isError = true;
    console.error(error); // eslint-disable-line no-console
  }

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          //   height={80}
          //   width="80"
          //   radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div id="residencies" className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>
        <PropertiesCarousel data={data} />
      </div>
    </div>
  );
}
