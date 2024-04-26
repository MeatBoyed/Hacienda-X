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
  const [className, setClassName] = useState<string | null>(null);
  return (
    <section
      id="value"
      className="my-12 w-full flex justify-between items-center px-5 md:px-10 lg:px-32"
    >
      <div className="paddings innerWidth flexCenter v-container">
        {/* left side */}
        <div className="v-left">
          <div className="image-container">
            <Image src={ValueImage} alt="hero image" />
          </div>
        </div>

        {/* right */}
        <div className="flexColStart v-right">
          <div className="flex justify-center items-start flex-col gap-5 w-full">
            <div className="flex justify-center items-start flex-col gap-1 w-full">
              <p className="text-lg font-semibold opacity-80 text-accent  w-full">
                Our Value
              </p>
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 w-full">
                Value We Give to You
              </h2>
            </div>

            <p className="leading-7 w-full text-muted-foreground">
              We always ready to help by providijng the best services for you.
              We beleive a good blace to live can make your life better
            </p>
          </div>

          <Accordion
            className="accordion"
            allowMultipleExpanded={false}
            preExpanded={[0]}
          >
            {data.map((item, i) => (
              <AccordionItem
                className={`accordionItem ${className}`}
                uuid={i}
                key={i}
              >
                <AccordionItemHeading>
                  <AccordionItemButton className="flexCenter accordionButton ">
                    {/* just for getting state of item */}
                    {/* <AccordionItemState>
                        {({ expanded }) =>
                          expanded
                            ? setClassName("expanded")
                            : setClassName("collapsed")
                        }
                      </AccordionItemState> */}
                    <div className="flexCenter icon">{item.icon}</div>
                    <span className="primaryText">{item.heading}</span>
                    <div className="flexCenter icon">
                      <MdOutlineArrowDropDown size={20} />
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p className="secondaryText">{item.detail}</p>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
