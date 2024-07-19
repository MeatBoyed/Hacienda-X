"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Input } from "./ui/input";
import { HomeIcon, MapPin, Search, SlidersHorizontal } from "lucide-react";
import SearchFilters from "@/app/[locale]/_components/SearchFilters";
import { Button, buttonVariants } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { cn } from "@/components/ImagesInput/FileInputUtils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBar({ classname, mapView }: { classname?: string; mapView?: boolean }) {
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <div id="searchbar" className={cn("w-full flex justify-center items-center flex-col gap-2", classname)}>
      {/* <Input
        type="text"
        placeholder="Search town, city, provience"
        className="border-0 bg-white text-black shadow-lg "
      /> */}

      <div className="flex justify-center w-full items-center gap-3 flex-col sm:flex-row">
        <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
          <DialogTrigger className="w-full">
            <Button
              size={"sm"}
              className="bg-accent text-white hover:text-black w-full shadow-md hover:border-background hover:bg-gray-100 hover:border rounded-md"
            >
              <div className=" w-full flex justify-center items-center gap-3">
                <SlidersHorizontal size={15} className="" />
                <p className="text-text ">Filter</p>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter your search</DialogTitle>
            </DialogHeader>
            <div className="">
              <SearchFilters onSubmit={() => setFilterOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>

        {!mapView ? (
          <Button
            size={"sm"}
            className="bg-white w-full lg:hidden text-black hover:border-background hover:bg-accent hover:text-white shadow-md gap-3 hover: rounded-md"
          >
            <Link href="/property-for-sale/map" className="flex justify-center items-center gap-3">
              <MapPin size={15} /> Map Search
            </Link>
          </Button>
        ) : (
          <Link href="/property-for-sale" className="flex justify-center items-center gap-3 w-full">
            <Button
              size={"sm"}
              className="bg-white w-full text-black hover:border-background hover:bg-accent hover:text-white shadow-md gap-3 hover: rounded-md"
            >
              <HomeIcon size={15} /> Property Search
            </Button>
          </Link>
        )}
        {/* <Button
          size={"lg"}
          className="bg-accent w-full text-white hover:bg-blue-600  hover:text-white shadow-lg gap-3"
        >
          <Search size={15} /> Search
        </Button> */}
      </div>
    </div>
  );
}

export function HomePageSearchBar() {
  return (
    <div id="searchbar" className={cn("w-full flex justify-center items-center flex-col gap-2")}>
      <div className="flex justify-center w-full items-center gap-3 flex-col sm:flex-row">
        <Link href="/property-for-sale/map" className="flex justify-center items-center gap-3 w-full">
          <Button
            size={"lg"}
            className="bg-white w-full  text-black hover:border-background hover:bg-accent hover:text-white shadow-lg gap-3 hover: rounded-md"
          >
            <MapPin size={15} />
            <p className="text-text ">Map Search</p>
          </Button>
        </Link>
        <Link href="/property-for-sale" className="w-full h-full flex justify-center items-center gap-3">
          <Button size={"lg"} className="bg-accent w-full text-white hover:bg-blue-600  hover:text-white shadow-lg gap-3">
            <Search size={15} />
            <p className="text-text ">Find properties</p>
          </Button>
        </Link>
      </div>
    </div>
  );
}
