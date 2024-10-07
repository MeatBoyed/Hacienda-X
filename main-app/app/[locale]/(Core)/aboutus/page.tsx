// TODO: Half done
import React from "react";
import "react-accessible-accordion/dist/fancy-example.css";
import "./aboutus.css";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { generateWebsiteConfig } from "@/config/siteConfig";
import Values from "../../_components/Value";
import OfferedSection from "../../_components/OfferedSection";
import { Metadata } from "next";
// Demo styles, see 'Styles' section below for some notes on use.

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations("WebsiteConfig.aboutus");
  return await generateWebsiteConfig(t);
}

export default async function Value() {
  const t = await getTranslations("AboutUs");
  return (
    
    <><div className="bg-white dark:bg-gray-800 overflow-hidden relative lg:flex lg:items-center">

      <div className="w-full mt-9 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl ">
          <span className="block">{t("heading")}</span>
        </h2>
        <p className="text-md mt-4 text-gray-400">{t("content1")}</p>
        <p>{t("content2")}</p>
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className="mt-12 inline-flex rounded-md shadow">
            <Link
              href="./sign-in"
              className="py-2 px-4  bg-blue-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8 p-8 lg:p-24">
        <Image src="/r1.png" className="w-1/2 rounded-lg" width={500} height={500} alt="TrHouse Imageee" />
        <div>
          <Image src="/r3.png" className="mb-8 rounded-lg" width={500} height={500} alt="House Image" />
          <Image src="/r2.png" className="rounded-lg" width={500} height={500} alt="House Image" />
        </div>
      </div>
      <div>

      </div>


    </div><div><Values /> <OfferedSection />  </div></>
   
  );
}
