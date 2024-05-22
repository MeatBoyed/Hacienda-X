// Half done
"use client";
import React from "react";
import "./Value.css";
import Image from "next/image";
import Link from "next/link";
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
                <span className="font-bold text-blue-500">At Hacienda</span>,
                our mission is to empower buyers and sellers with knowledge,
                support, and personalized service. Driven by a passion for
                people and properties, we strive to exceed expectations and
                build lasting relationships. Our listings feature unbeatable
                prices and incredible deals, making it easy to find your perfect
                home without breaking the bank. Whether you're looking for a
                cozy starter home or a luxurious estate, Hacienda combines
                affordability with quality. We are committed to excellence in
                every transaction, focusing on integrity, transparency, and
                professionalism to achieve your real estate goals and earn your
                trust. Discover what sets us apart at Hacienda.
                <br />
                <br />
              </p>
              <Link
                href="/aboutus"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
