"use client";

import React from "react";
import "./Property.css";

import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "@/components/Map";
import { notFound, useParams } from "next/navigation";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { SelectPropertyResponse } from "@/app/api/[[...route]]/utils";
import { PuffLoader } from "react-spinners";

// Handler for the API request (Server Side)
export default function PropertyPage() {
  // Get the slug (/properties/:slug)
  const params = useParams();
  const slug = decodeURIComponent(
    typeof params.slug === "string" ? params.slug : ""
  );

  // Fetch Proerpty from APi, and handle Fetching states
  const { data, error, isLoading } = useSWR<SelectPropertyResponse>(
    `/api/properties/${slug}`,
    fetcher
  );
  console.log(data);

  // const [modalOpened, setModalOpened] = useState(false);

  // Return to 404 Page if Property doesn't exists
  // if (!data?.results && isLoading === false) {
  //   return notFound();
  // }

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings text-black text-lg">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container text-black">
        {/* like button */}
        <div className="like">{/* <Heart id={id} /> */}</div>

        {/* image */}
        {/* Must be a carousel, and or, use slideshow features */}
        <img src={""} alt="home image" />

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.results.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.results.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              {/* bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.results.bathrooms} Bathrooms</span>
              </div>

              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{"Not a Field"} Parking</span>
              </div>

              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.results.bathrooms} Room/s</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.results.description}
            </span>

            {/* address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.results.address} {data?.results.city}{" "}
                {data?.results.country}
              </span>
            </div>
          </div>

          {/* right side */}
          <div className="map">
            {/* <Map
              address={data?.results.address}
              city={data?.results.city}
              country={data?.results.country}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// export const revalidate = 3600;
