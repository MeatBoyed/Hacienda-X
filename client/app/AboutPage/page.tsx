"use client";

import React, { useState } from "react";

const AboutPage = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (openAccordion === index) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(index);
    }
  };

  const accordionData = [
    {
      title: "Introduction",
      content:
        "Welcome to our real estate agency! We specialize in helping clients find their dream homes and investment properties. Our team of experts is dedicated to providing top-notch service and guidance throughout the buying and selling process.",
    },
    {
      title: "Our Mission",
      content:
        "Our mission is to make the real estate experience as seamless and enjoyable as possible for our clients. Whether you're a first-time homebuyer or a seasoned investor, we are here to support you every step of the way.",
    },
    {
      title: "Our Services",
      content:
        "We offer a wide range of services tailored to meet your individual needs. From property search and valuation to negotiation and closing, we handle every aspect of the transaction with professionalism and expertise.",
    },
    {
      title: "Why Choose Us",
      content:
        "With years of experience in the industry, we have built a reputation for excellence and integrity. Our clients trust us to deliver results and exceed expectations. Choose us for your real estate needs and experience the difference!",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">About Us</h1>
      <div className="space-y-4">
        {accordionData.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded-lg">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <h2 className="text-lg font-semibold py-4 px-6">{item.title}</h2>
              <svg
                className={`w-6 h-6 transition-transform transform ${
                  openAccordion === index ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {openAccordion === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
