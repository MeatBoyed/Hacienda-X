// Half done
"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import {
  MdOutlineArrowDropDown,
  MdOutlineArrowDropDownCircle,
} from "react-icons/md";
import "./Value.css";
import data from "@/Utils/accordion";
import Image from "next/image";
import ValueImage from "@/public/r1.png";
// Demo styles, see 'Styles' section below for some notes on use.

export default function Value() {
  return (
    <section
      id="value"
      className="my-12 w-full flex justify-between items-center px-5 md:px-10 lg:px-32"
    >
      <div className="paddings innerWidth flexCenter v-container">
        <div className="sm:flex items-center max-w-screen-xl">
          <div className="sm:w-1/2 p-10">
            <div className="image object-center text-center ">
              <Image
                src="https://i.imgur.com/WbQnbas.png"
                alt="Side Image"
                width={400} // Replace with the actual width of the image
                height={300} // Replace with the actual height of the image
              />
            </div>
          </div>
          <div className="sm:w-1/2 p-5">
            <div className="text">
              <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">
                About us
              </span>
              <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
                About <span className="text-indigo-600">Our Company</span>
              </h2>
              <p className="text-gray-700">
                <h4 className="font-bold ">Our Mission:</h4> <br />
                We're committed to empowering buyers and sellers with knowledge,
                support, and personalized service. At Hacienda, our passion for
                people and properties drives us to exceed expectations and
                create lasting relationships.
                <br />
                <br />
                <h4 className="font-bold ">Unbeatable Prices:</h4> <br />
                Explore our listings featuring unbeatable prices and incredible
                deals. From cozy starter homes to luxurious estates, find your
                perfect property without breaking the bank. At Hacienda,
                affordability meets quality, making your dream home more
                attainable than ever.
                <br />
                <br />
                <h4 className="font-bold ">What We Strive For:</h4> <br />
                Discover what sets us apart at Hacienda. We strive for
                excellence in every transaction, aiming to surpass industry
                standards and client expectations. With a focus on integrity,
                transparency, and professionalism, we're dedicated to achieving
                your real estate goals and earning your trust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
