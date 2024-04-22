import React from "react";
import "./Property.css";

import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "@/components/Map";
import Residency from "@/Utils/Residency.json";

async function fetchProperty(title: string) {
  // const res = await fetch('https://api.example.com/posts');
  const res = Residency.find((prop) => prop.title === title);

  // if (!res.ok) {
  //   throw new Error('Failed to fetch data');
  // }
  if (!res?.title) {
    throw new Error("Failed to fetch data");
  }

  // return res.json();
  return res;
}

export default async function PropertyPage({
  params,
}: {
  params: { slug: string };
}) {
  const title = decodeURIComponent(params.slug);

  const data = await fetchProperty(title);

  // const { data, isLoading, isError } = useQuery(["resd", id], () =>
  //   getProperty(id)
  // );

  // const [modalOpened, setModalOpened] = useState(false);

  //   if (isLoading) {
  //     return (
  //       <div className="wrapper">
  //         <div className="flexCenter paddings">
  //           <PuffLoader />
  //         </div>
  //       </div>
  //     );
  //   }

  // if (isError) {
  //   return (
  //     <div className="wrapper">
  //       <div className="flexCenter paddings">
  //         <span>Error while fetching the property details</span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container text-black">
        {/* like button */}
        <div className="like">{/* <Heart id={id}/> */}</div>

        {/* image */}
        {/* Must be a carousel, and or, use slideshow features */}
        <img src={data?.image} alt="home image" />

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              {/* bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>

              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities.parkings} Parking</span>
              </div>

              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities.bedrooms} Room/s</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address} {data?.city} {data?.country}
              </span>
            </div>
          </div>

          {/* right side */}
          <div className="map">
            <Map
              address={data.address}
              city={data.city}
              country={data.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600;
