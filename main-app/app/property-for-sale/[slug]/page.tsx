"use client";
import React from "react";
// import { useLocation } from "react-router-dom";
// import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import "./Property.css";

import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "@/components/Map";
// import Map from "../../components/Map/Map";
// import { Button } from "@mantine/core";
// import { toast } from "react-toastify";
// import Heart from "../../components/Heart/Heart";
import { usePathname } from "next/navigation";

const Property = () => {
  const pathname = usePathname();
  const id = pathname.split("/").slice(-1)[0];

  console.log("ID: ", id);
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

  //   if (isError) {
  //     return (
  //       <div className="wrapper">
  //         <div className="flexCenter paddings">
  //           <span>Error while fetching the property details</span>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* like button */}
        <div className="like">{/* <Heart id={id}/> */}</div>

        {/* image */}
        {/* <img src={data?.image} alt="home image" /> */}

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              {/* <span className="primaryText">{data?.title}</span> */}
              {/* <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span> */}
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              {/* bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                {/* <span>{data?.facilities?.bathrooms} Bathrooms</span> */}
              </div>

              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                {/* <span>{data?.facilities.parkings} Parking</span> */}
              </div>

              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                {/* <span>{data?.facilities.bedrooms} Room/s</span> */}
              </div>
            </div>

            {/* description */}

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {/* {data?.description} */}
            </span>

            {/* address */}

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {/* {data?.address}{" "}
                {data?.city}{" "}
                {data?.country} */}
              </span>
            </div>

            {/* booking button */}
            {/* {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancel booking</span>
                </Button>
                <span>
                  Your visit already booked for date{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Book your visit
              </button>
            )} */}

            {/* <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            /> */}
          </div>

          {/* right side */}
          <div className="map">
            {/* <Map address={""} city={""} country={""} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
