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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBar({ classname }: { classname?: string }) {
  return (
    <div
      id="searchbar"
      className={cn(
        "w-full flex justify-center items-center flex-col gap-2",
        classname
      )}
    >
      <Input
        type="text"
        placeholder="Search town, city, provience"
        className="border-0 bg-white text-black shadow-lg "
      />

      <div className="flex justify-center w-full items-center gap-3 flex-col sm:flex-row">
        <Dialog>
          <DialogTrigger className="bg-white w-full shadow-lg text-black hover:border-background hover:border hover:text-black hover: rounded-md">
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
          className="sm:hidden bg-white w-full lg:hidden text-black hover:border-background hover:bg-blue-600 hover:text-white shadow-lg gap-3 hover: rounded-md"
        >
          <Link
            href="/property-for-sale"
            className="flex justify-center items-center gap-3"
          >
            <MapPin size={15} /> Map Search
          </Link>
        </Button>
        <Button
          size={"sm"}
          className="bg-accent w-full text-white hover:bg-blue-600 hover:border hover:text-white shadow-lg gap-3"
        >
          <Search size={15} /> Search
        </Button>
      </div>
    </div>
  );
}
