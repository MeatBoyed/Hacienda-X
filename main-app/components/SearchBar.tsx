"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Input } from "./ui/input";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import SearchFilters from "@/app/_components/SearchFilters";
import { Button } from "./ui/button";
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

export function SearchBar({
  filter,
  setFilter,
  mapActive,
  setMapActive,
  classname,
}: {
  mapActive?: boolean;
  setMapActive?: Dispatch<SetStateAction<boolean>>;
  filter?: string;
  setFilter?: Dispatch<SetStateAction<string>>;
  classname?: string;
}) {
  return (
    <div
      id="searchbar"
      className={cn(
        "w-full flex justify-center items-center flex-col gap-2",
        classname
      )}
    >
      <Input
        placeholder="Search town, city, provience"
        className="border-0 bg-white text-black shadow-lg "
        type="text"
        value={filter}
        onChange={(e) => setFilter !== undefined && setFilter(e.target.value)}
      />

      <div className="flex justify-center w-full items-center gap-3 flex-col sm:flex-row">
        <Dialog>
          <DialogTrigger className="bg-white w-full shadow-lg text-black hover:border-background hover:border hover:text-primary hover: rounded-md">
            {/* <p className="text-lg bg-prima">Filter</p> */}
            <Button
              size={"sm"}
              className="bg-transparent text-text w-full hover:text-primary gap-3"
            >
              <SlidersHorizontal size={15} /> Filter
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

        <Button
          size={"sm"}
          className="bg-white w-full lg:hidden text-black hover:border-background hover:border hover:text-primary shadow-lg gap-3"
          onClick={() =>
            mapActive !== undefined &&
            setMapActive !== undefined &&
            setMapActive(!mapActive)
          }
        >
          {mapActive !== undefined ? (
            <>
              <MapPin size={15} /> Map Search
            </>
          ) : (
            <Link
              href="/property-for-sale"
              className="flex justify-center items-center gap-3"
            >
              <MapPin size={15} /> Map Search
            </Link>
          )}
        </Button>
        <Button
          size={"sm"}
          className="bg-accent w-full text-white hover:border-background hover:border hover:text-primary shadow-lg gap-3"
        >
          <Search size={15} /> Search
        </Button>
      </div>
    </div>
  );
}
