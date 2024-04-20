// Implement Data fetching

import React from "react";
// import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Residencies.css";
import { PuffLoader } from "react-spinners";
import PropertyCard from "@/components/PropertyCard";
import { sliderSettings } from "@/Utils/common";
import db from "@/Utils/db";
import { Property } from "@prisma/client";
import { useProperties } from "@/Utils/Hooks/useProperties";
import PropertiesCarousel from "@/components/PropertiesCarousel";

// async function createProperty() {
//   const response = await db.property.create({
//     data: {
//       title: "Modern Apartment in Downtown",
//       description:
//         "A stylish and modern 2-bedroom apartment located in the heart of the city.",
//       price: 200000,
//       address: "123 Main St",
//       city: "New York",
//       country: "USA",
//       image: "https://example.com/apartment1.jpg",
//       facilities: ["parking", "gym", "pool"],
//       // userEmail: "",
//     },
//   });

//   return response;
// }

export async function getAllProperties() {
  return await db.property.findMany();
}

export default async function Residencies() {
  // const { data, isError, isLoading } = useProperties();
  // console.log(createResult);

  const data = await getAllProperties();
  console.log(data);

  // const data = await createProperty();
  // console.log(data);

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
  //           //   height={80}
  //           //   width="80"
  //           //   radius={1}
  //           color="#4066ff"
  //           aria-label="puff-loading"
  //         />
  //       </div>
  //     );
  //   }

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
