import React from "react";
import { Home } from "lucide-react";

export default function Offered() {
  return (
    <div className="paddings innerWidth g-container">
      <div className="flexColCenter ">
        <section className="">
          <div className="py-12 bg-white border-4 	border-blue-600 rounded-3xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="font-heading mb-4 bg-orange-100 text-blue-800 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-black uppercase title-font">
                  Why choose us?
                </h2>
                <p className="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  We are Hacienda.
                </p>
                <p className="mt-4 max-w-2xl text-lg text-black lg:mx-auto">
                  We know how to handle your needs for finding a new home. We
                  care for <span className="font-bold text-blue-700">YOU</span>{" "}
                  and your needs.
                </p>
              </div>

              <div className="mt-10">
                <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-16">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="blue"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-home"
                        >
                          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      </div>
                      <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                        Personalized Home Search
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Our team offers a personalized home search experience,
                      ensuring that we match you with the perfect property that
                      suits your lifestyle and preferences. We listen to your
                      needs and use our extensive network to find your dream
                      home.
                    </dd>
                  </div>
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="blue"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-map-pin"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                        Expert Market Analysis
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      We provide in-depth market analysis to help you make
                      informed decisions. Our experts analyze current market
                      trends, property values, and neighborhood insights to
                      guide you through the home buying process with confidence.
                    </dd>
                  </div>
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="blue"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-circle-dollar-sign"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                          <path d="M12 18V6" />
                        </svg>
                      </div>
                      <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                        Seamless Transaction Process
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      At Hacienda, we simplify the home buying process. Our
                      experienced agents handle all the details, from
                      negotiations to closing, ensuring a smooth and stress-free
                      transaction. We prioritize your convenience and
                      satisfaction.
                    </dd>
                  </div>
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="blue"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-server"
                        >
                          <rect
                            width="20"
                            height="8"
                            x="2"
                            y="2"
                            rx="2"
                            ry="2"
                          />
                          <rect
                            width="20"
                            height="8"
                            x="2"
                            y="14"
                            rx="2"
                            ry="2"
                          />
                          <line x1="6" x2="6.01" y1="6" y2="6" />
                          <line x1="6" x2="6.01" y1="18" y2="18" />
                        </svg>
                      </div>
                      <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                        Comprehensive Support Services
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Our commitment to you goes beyond just finding a home. We
                      offer comprehensive support services, including mortgage
                      advice, legal assistance, and post-purchase support, to
                      make your transition as seamless as possible.
                    </dd>
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
