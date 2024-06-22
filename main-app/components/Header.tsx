import React from "react";
import Link from "next/link";
import { SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/HaciendaLogo.jpeg";

export const Header = () => {
  const { userId } = auth();

  return (
    <nav className="fixed w-full bg-white z-50 flex justify-center items-center border-b shadow-sm">
      <div className="py-4 justify-between flex items-center flex-wrap px-4 w-full sm:max-w-3xl lg:max-w-5xl">
        {/* logo */}
        <Link href="/" className="transition">
          <Image src={Logo} alt="HaciendaX Logo" width={40} height={40} />
        </Link>

        <div className="flex justify-center items-center gap-8 w-full lg:w-auto">
          {/* NavLinks for larger screens */}
          <div className="hidden md:flex w-full justify-center">
            <NavLinks />
          </div>

          {/* User button and signup */}
          <div className="flex items-center gap-4">
            {!userId ? (
              <SignUpButton mode="modal" forceRedirectUrl={"/onboarding"}>
                <p className="text-base text-white bg-blue-500 hover:bg-blue-700 transition px-4 py-2 rounded min-w-[100px] text-center cursor-pointer">
                  Sign Up
                </p>
              </SignUpButton>
            ) : (
              <UserButton />
            )}
          </div>

          {/* NavSlider for smaller screens */}
          <div className="md:hidden">
            <NavSlider />
          </div>
        </div>
      </div>
    </nav>
  );
};

function NavLinks() {
  return (
    <div className="flex justify-center gap-8 items-center">
      <Link href="/property-for-sale">
        <p className="text-lg text-black hover:text-gray-700 transition">
          Search
        </p>
      </Link>
      <Link href="/favourites">
        <p className="text-lg text-black hover:text-gray-700 transition">
          Favourites
        </p>
      </Link>
      <Link href="/dashboard">
        <p className="text-lg text-blue-500 hover:text-blue-700 transition">
          Sell your Property
        </p>
      </Link>
      <Link href="/pricingplan">
        <p className="text-lg text-black hover:text-gray-700 transition">
          Pricing
        </p>
      </Link>
      <Link href="/contact">
        <p className="text-lg text-black hover:text-gray-700 transition">
          Contact & Support
        </p>
      </Link>
    </div>
  );
}

function NavSlider() {
  "use client";

  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon size={25} />
      </SheetTrigger>
      <SheetContent className="flex justify-between py-80 items-start flex-col shadow-lg">
        <Link href="/property-for-sale">
          <p className="text-xl">Search</p>
        </Link>
        <Link href="/favourites">
          <p className="text-xl">Favourites</p>
        </Link>
        <Link href="/dashboard">
          <p className="text-xl text-blue-500">Sell your Property</p>
        </Link>
        <Link href="/pricing">
          <p className="text-xl">Pricing</p>
        </Link>
        <Link href="/contact">
          <p className="text-xl">Contact & Support</p>
        </Link>
      </SheetContent>
    </Sheet>
  );
}
