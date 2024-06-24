import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bath, Bed } from "lucide-react";
import { PropertyWithAddress } from "@/app/api/(utils)/utils";

export default function PropertyCard({
  property,
  max,
}: {
  max?: boolean;
  property: PropertyWithAddress;
}) {
  return (
    <div
      className={`sm:${
        max ? "max" : "min"
      }-w-[17rem] min-h-[17rem] flex justify-start items-center flex-col gap-3`}
    >
      <Link href={`../property-for-sale/${property.title}`}>
        <div className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="relative flex h-52 justify-center overflow-hidden rounded-lg">
              <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                <Image
                  src={property.images[0]}
                  alt={`${property.title} - thumbnail.`}
                  className="absolute inset-0 object-cover rounded-lg"
                  width={500}
                  height={700}
                />
              </div>
            </div>

            <div className="absolute bottom-0 left-5 mb-3 flex">
              <p className="flex items-center font-medium text-white shadow-sm">
                <i className="fa fa-camera mr-2 text-xl text-white"></i>
                {property.images.length}
              </p>
            </div>

            <span className="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#1f93ff] px-2 py-1 text-xs font-semibold text-white">
              {" "}
              Residential{" "}
            </span>
            <div className="mt-4">
              <h2
                className="line-clamp-1 text-2xl font-medium text-gray-800 md:text-lg"
                title={property.title}
              >
                {property.title}
              </h2>
              <p className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                <span className="text-sm uppercase"> USD </span>
                <span className="text-2xl">
                  {property.price?.toLocaleString()}
                </span>
              </p>
            </div>

            <div className="mt-4">
              <p className="line-clamp-2 mt-2 text-lg text-gray-800">
                {property.description}
              </p>
            </div>

            <div className="justify-center">
              <div className="mt-4 flex space-x-3 overflow-hidden rounded-lg px-1 py-1">
                <p className="flex items-center font-medium text-gray-800">
                  <i className="fa fa-bed mr-2 text-blue-900"></i>
                  {property.bedrooms}
                </p>
                <p className="flex items-center font-medium text-gray-800">
                  <i className="fa fa-bath mr-2 text-blue-900"></i>
                  {property.bathrooms}
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2">
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-6 w-6 rounded-full bg-gray-200 md:h-8 md:w-8"></div>
                  <span className="bg-primary-red absolute top-0 right-0 inline-block h-3 w-3 rounded-full"></span>
                </div>
              </div>

              <div className="flex justify-end">
                <button>
                  <i className="fa fa-sms mx-1 rounded-md bg-[#0174E1] py-1 px-3 text-2xl text-white"></i>
                </button>
                <button>
                  <i className="fa fa-phone rounded-md bg-[#0174E1] py-1 px-3 text-2xl text-white"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
