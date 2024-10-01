// Half done
"use client";
import React from "react";
import "./Value.css";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Value() {
  const t = useTranslations("Index.AboutUs");

  return (
    <section id="value" className="my-12 w-full flex justify-between items-center px-5 md:px-10 lg:px-32">
      <div className="paddings innerWidth flexCenter v-container">
        <div className="sm:flex items-center max-w-screen-xl">
          <div className="sm:w-1/2 p-10">
            <div className="image object-center text-center ">
              <Image
                src="https://i.imgur.com/WbQnbas.png"
                alt="Side Image"
                width={400} // TODO: Replace with the actual width of the image
                height={300} // TODO: Replace with the actual height of the image
              />
            </div>
          </div>
          <div className="sm:w-1/2 p-5">
            <div className="text">
              <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">{t("sub-heading")}</span>
              <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
                {t("heading").split(" ")[0]} <span className="text-indigo-600">{t("heading").split(" ")[1]}</span>
              </h2>
              <div className="space-y-2">
                <h4 className="font-bold">{t("content-heading")}</h4>
                <h3 className="text-gray-700">{t("content")}</h3>
              </div>
              <Link href="/aboutus" className=" bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                {t("button")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
