"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Input } from "./ui/input";
import { HomeIcon, MapPin, Search, SlidersHorizontal } from "lucide-react";
import SearchFilters from "@/app/_components/SearchFilters";
import { Button, buttonVariants } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBar({
  classname,
  mapView,
}: {
  classname?: string;
  mapView?: boolean;
}) {
  return (
    <div
      id="searchbar"
      className={cn(
        "w-full flex justify-center items-center flex-col gap-2",
        classname
      )}
    >
      {/* <Input
        type="text"
        placeholder="Search town, city, provience"
        className="border-0 bg-white text-black shadow-lg "
      /> */}

      <div className="flex justify-center w-full items-center gap-3 flex-col sm:flex-row">
        <Dialog>
          <DialogTrigger className="w-full">
            {/* <p className="text-lg bg-prima">Filter</p> */}
            <Button
              size={"lg"}
              // className="bg-transparent text-text w-full hover:text-primary gap-3"
              className="bg-white w-full shadow-lg hover:border-background hover:bg-gray-100 hover:border rounded-md"
            >
              <div className="text-black w-full flex justify-center items-center gap-3">
                <SlidersHorizontal size={15} className="" />
                <p className="text-text ">Filter</p>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter your search</DialogTitle>
            </DialogHeader>

            <div className="mt-5">
              <SearchFilters />
            </div>
          </DialogContent>
        </Dialog>

        {!mapView && (
          <Button
            size={"lg"}
            className="bg-white w-full lg:hidden text-black hover:border-background hover:bg-accent hover:text-white shadow-lg gap-3 hover: rounded-md"
          >
            <Link
              href="/property-for-sale/map"
              className="flex justify-center items-center gap-3"
            >
              <MapPin size={15} /> Map Search
            </Link>
          </Button>
        )}
        {mapView && (
          <Button
            size={"lg"}
            className="bg-white w-full text-black hover:border-background hover:bg-accent hover:text-white shadow-lg gap-3 hover: rounded-md"
          >
            <Link
              href="/property-for-sale"
              className="flex justify-center items-center gap-3"
            >
              <HomeIcon size={15} /> Property Search
            </Link>
          </Button>
        )}
        <Button
          size={"lg"}
          className="bg-accent w-full text-white hover:bg-blue-600  hover:text-white shadow-lg gap-3"
        >
          <Search size={15} /> Search
        </Button>
      </div>
    </div>
  );
}

export function HomePageSearchBar() {
  return (
    <div
      id="searchbar"
      className={cn("w-full flex justify-center items-center flex-col gap-2")}
    >
      <div className="flex justify-center w-full items-center gap-3 flex-col sm:flex-row">
        <Link
          href={"/property-for-sale"}
          className={buttonVariants({
            size: "lg",
            variant: "default",
            className:
              "bg-white w-full shadow-lg hover:border-background hover:bg-gray-100 hover:border rounded-md",
          })}
        >
          <div className="text-black w-full flex justify-center items-center gap-3">
            <SlidersHorizontal size={15} className="" />
            <p className="text-text ">Filter</p>
          </div>
        </Link>

        <Button
          size={"lg"}
          className="bg-white w-full  text-black hover:border-background hover:bg-accent hover:text-white shadow-lg gap-3 hover: rounded-md"
        >
          <Link
            href="/property-for-sale"
            className="flex justify-center items-center gap-3"
          >
            <MapPin size={15} />
            <p className="text-text ">Map Search</p>
          </Link>
        </Button>
        <Button
          size={"lg"}
          className="bg-accent w-full text-white hover:bg-blue-600  hover:text-white shadow-lg gap-3"
        >
          <Link
            href="/property-for-sale"
            className="w-full h-full flex justify-center items-center gap-3"
          >
            <Search size={15} />
            <p className="text-text ">Search</p>
          </Link>
        </Button>
      </div>
    </div>
  );
}
