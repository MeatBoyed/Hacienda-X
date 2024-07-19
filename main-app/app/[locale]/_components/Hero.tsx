// Hero.tsx
// "use client"

import "./Hero.css";
import React from "react";
import BannerImage from "@/public/bannerImg.jpg";
import Image from "next/image";
import { HomePageSearchBar, SearchBar } from "@/components/SearchBar";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Index.Hero");

  return (
    <section id="hero" className="w-full h-[70vh] flex justify-center items-center">
      <div className="flex justify-center items-center w-full flex-col z-10 gap-8 text-white px-4 pt-20 sm:max-w-2xl sm:px-2 sm:pt-0 lg:max-w-4xl">
        <div className="flex justify-center items-center flex-col gap-2">
          <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{t("heading")}</h1>
          <p className="text-lg font-semibold text-center text-white">{t("sub-heading")}</p>
        </div>

        <div className="w-full">
          <HomePageSearchBar />
        </div>
      </div>
      <div className="bg-black w-full opacity-60 absolute z-0 h-[70vh]">
        <Image src={BannerImage} alt="Hero Image" className="w-full bg-cover object-cover h-[70vh]" priority />
      </div>
    </section>
  );
}
