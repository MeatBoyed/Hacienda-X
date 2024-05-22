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
import "./aboutus.css";
import data from "@/Utils/accordion";
import Image from "next/image";
// Demo styles, see 'Styles' section below for some notes on use.

export default function Value() {
  const [className, setClassName] = useState<string | null>(null);
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden relative lg:flex lg:items-center">
      <div className="w-full mt-9 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl ">
          <span className="block">HaciendaX Real Estate</span>
        </h2>
        <p className="text-md mt-4 text-gray-400">
          We are committed to empowering buyers and sellers with knowledge,
          support, and personalized service. At Hacienda, our passion for people
          and properties drives us to exceed expectations and create lasting
          relationships. <br />
          Discover what sets us apart at Hacienda. We strive for excellence in
          every transaction, aiming to surpass industry standards and client
          expectations. With a focus on integrity, transparency, and
          professionalism, we are dedicated to achieving your real estate goals
          and earning your trust.
        </p>
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className="mt-12 inline-flex rounded-md shadow">
            <a href="./sign-in">
              {" "}
              <button
                type="button"
                className="py-2 px-4  bg-blue-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Get started
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8 p-8 lg:p-24">
        <Image
          src="/r1.png"
          className="w-1/2 rounded-lg"
          width={500}
          height={500}
          alt="TrHouse Imageee"
        />
        <div>
          <Image
            src="/r3.png"
            className="mb-8 rounded-lg"
            width={500}
            height={500}
            alt="House Image"
          />
          <Image
            src="/r2.png"
            className="rounded-lg"
            width={500}
            height={500}
            alt="House Image"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
