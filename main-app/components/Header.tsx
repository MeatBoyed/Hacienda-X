import React from "react";
import Link from "next/link";
import { SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Bookmark, HeartIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/newlogo.png";

export const Header = ({ isDashboard }: { isDashboard?: boolean }) => {
  const { userId } = auth();

  return (
    <nav className="fixed w-full bg-white z-50 flex justify-center items-center border-b shadow-sm">
      <div className="py-4 justify-between flex items-center flex-wrap px-4 w-full sm:max-w-3xl lg:max-w-5xl">
        {/* logo */}
        <Link href="/" className="transition">
          <Image src={Logo} alt="HaciendaX Logo" width={40} height={40} />
        </Link>

        <div className="flex justify-center items-center gap-8 lg:w-auto">
          {/* NavLinks for larger screens */}
          <div className="hidden md:flex w-full justify-center">
            {/* <NavLinks /> */}
            {isDashboard ? (
              <DashboardNavlinks />
            ) : (
              <MainNavlinks userId={!!userId} />
            )}
          </div>

          {/* User button and signup */}
          <div className="flex items-center gap-4">
            {!userId ? (
              <SignUpButton mode="modal" forceRedirectUrl={"/onboarding"}>
                <p className="text-base text-white bg-blue-500 hover:bg-blue-700 transition px-4 py-2 rounded min-w-[100px] text-center cursor-pointer">
                  {/* TODO: Should be Get Started and go to /pricing  */}
                  Sign Up
                </p>
              </SignUpButton>
            ) : (
              <UserButton />
            )}
            <Link href="/bookmarks">
              <Bookmark
                className="p-2 border rounded-full text-pink-500 hover:bg-pink-500 hover:text-white"
                size={35}
              />
            </Link>
          </div>

          {/* NavSlider for smaller screens */}
          <div className="md:hidden">
            {isDashboard ? <DashboardNavSlider /> : <MainNavSlider />}
          </div>
        </div>
      </div>
    </nav>
  );
};

function MainNavSlider() {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon size={25} />
      </SheetTrigger>
      <SheetContent className="flex justify-between py-80 items-start flex-col shadow-lg">
        <Link href="/property-for-sale">
          <p className="text-xl">Search</p>
        </Link>
        <Link href="/bookmarks">
          <p className="text-xl">Favorites</p>
        </Link>
        <Link href="/pricing">
          <p className="text-xl">Pricing</p>
        </Link>
        <Link href="/pricing">
          <p className="text-xl text-blue-500">Sell your Property</p>
        </Link>
        <Link href="/dashboard">
          <p className="text-xl">Dashboard</p>
        </Link>
        <Link href="/contactus">
          <p className="text-xl">Contact Us</p>
        </Link>
      </SheetContent>
    </Sheet>
  );
}

function DashboardNavSlider() {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon size={25} />
      </SheetTrigger>
      <SheetContent className="flex justify-between py-80 items-start flex-col shadow-lg">
        <Link href="/dashboard">
          <p className="text-base text-black hover:text-gray-700 transition">
            Dashboard
          </p>
        </Link>
        <Link href="/dashboard/property">
          <p className="text-base text-black hover:text-gray-700 transition">
            Property
          </p>
        </Link>
        <Link href="/">
          <p className="text-base text-black hover:text-gray-700 transition">
            Usage
          </p>
        </Link>
        <Link href="/contactus">
          <p className="text-base text-black hover:text-gray-700 transition">
            Contact Us
          </p>
        </Link>
      </SheetContent>
    </Sheet>
  );
}

function MainNavlinks({ userId }: { userId: boolean }) {
  return (
    <div className="flex justify-center gap-8 items-center">
      <Link href="/">
        <p className="text-base text-black hover:text-gray-700 transition">
          Home
        </p>
      </Link>
      <Link href="/property-for-sale">
        <p className="text-base text-black hover:text-gray-700 transition">
          Search
        </p>
      </Link>
      <Link href="/pricing">
        <p className="text-base text-black hover:text-gray-700 transition">
          Pricing
        </p>
      </Link>
      <Link href="/pricing">
        <p className="text-base text-black hover:text-gray-700 transition">
          Sell your property
        </p>
      </Link>
      {userId && (
        <Link href="/dashboard">
          <p className="text-base text-black hover:text-gray-700 transition">
            Dashboard
          </p>
        </Link>
      )}
      <Link href="/contactus">
        <p className="text-base text-black hover:text-gray-700 transition">
          Contact Us
        </p>
      </Link>
    </div>
  );
}

function DashboardNavlinks() {
  return (
    <div className="flex justify-center gap-8 items-center">
      <Link href="/dashboard">
        <p className="text-base text-black hover:text-gray-700 transition">
          Dashboard
        </p>
      </Link>
      <Link href="/dashboard/property">
        <p className="text-base text-black hover:text-gray-700 transition">
          Property
        </p>
      </Link>
      <Link href="/">
        <p className="text-base text-black hover:text-gray-700 transition">
          Usage
        </p>
      </Link>
      <Link href="/contactus">
        <p className="text-base text-black hover:text-gray-700 transition">
          Contact Us
        </p>
      </Link>
    </div>
  );
}
