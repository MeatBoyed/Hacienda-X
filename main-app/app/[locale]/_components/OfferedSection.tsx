import { CircleDollarSign, HomeIcon, MapPin, Server } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function Offered() {
  const t = useTranslations("Index.Offer");
  return (
    <div className="paddings innerWidth g-container">
      <div className="flexColCenter ">
        <section className="">
          <div className="py-12 bg-white border-4 	border-blue-600 rounded-3xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="font-heading mb-4 bg-orange-100 text-blue-800 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-black uppercase title-font">
                  {t("tag")}
                </h2>
                <p className="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  {t("heading")}
                </p>
                <p className="mt-4 max-w-2xl text-lg text-black lg:mx-auto">{t("sub-heading")}</p>
              </div>

              <div className="mt-10">
                <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-16">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <HomeIcon size={32} className="text-blue-700" />
                      </div>
                      <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">{t("offer1.heading")}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{t("offer1.content")}</dd>
                  </div>
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <MapPin size={32} className="text-blue-700" />
                      </div>
                      <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">{t("offer2.heading")}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{t("offer2.content")}</dd>
                  </div>
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <CircleDollarSign size={32} className="text-blue-700" />
                      </div>
                      <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">{t("offer3.heading")}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{t("offer3.content")}</dd>
                  </div>
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <Server size={32} className="text-blue-700" />
                      </div>
                      <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">{t("offer4.heading")}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{t("offer4.content")}</dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
