// Hero.tsx

import "./Hero.css";
import React from "react";
import BannerImage from "@/public/bannerImg.jpg";
import Image from "next/image";
import { SearchBoxNonFunc } from "@/components/SearchBar";

export default function Hero() {
  return (
    <section
      id="hero"
      className="w-full h-[70vh] flex justify-center items-center"
    >
      <div className="flex justify-center items-center w-full flex-col z-10 gap-8 text-white px-4 pt-5 sm:max-w-2xl sm:px-2 sm:pt-0 lg:max-w-4xl">
        <div className="flex justify-center items-center flex-col gap-2">
          <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Find the Perfect Home
          </h1>
          <p className="text-lg font-semibold text-center">
            Discover Properties That Match Your Lifestyle
          </p>
        </div>

        <div className="w-full">
          <SearchBoxNonFunc />
        </div>
      </div>
      <div className="bg-black w-full opacity-60 absolute z-0 h-[70vh]">
        <Image
          src={BannerImage}
          alt="Hero Image"
          className="w-full bg-cover object-cover h-[70vh]"
          priority
        />
      </div>
    </section>
  );
}

function Hero0() {
  return (
    <div className="hero-wrapper">
      <div
        className="bubble-element Group baTaKsaT bubble-r-container flex column"
        style={{
          maxWidth: "unset",
          maxHeight: "unset",
          backgroundColor: "rgba(255, 255, 255, 0)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundImage:
            "url('https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0460680b1035424a401b6fc2a5844d47.cdn.bubble.io%2Ff1704496205509x573597491559759040%2Fcover-hd.png?w=1536&h=684&auto=compress&fit=crop&dpr=1')",
        }}
      >
        <div
          className="bubble-element Group baTaKrd bubble-r-container flex column"
          style={{
            backgroundColor: "rgba(var(--color_text_default_rgb), 0.4)",
          }}
        >
          <div className="">
            <h1 className="bubble-element Text baTaKri">
              Find the Perfect Home
            </h1>
            <div className="bubble-element Text baTaKrj">
              Discover Properties
              <br />
              That Match Your Lifestyle
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
