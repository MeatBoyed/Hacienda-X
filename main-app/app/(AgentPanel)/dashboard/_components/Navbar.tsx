import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

import React from "react";

import { auth } from "@clerk/nextjs/server";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Bookmark, HeartIcon, MenuIcon } from "lucide-react";

import Logo from "@/public/newlogo.png";

export const Header = () => {
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
          </div>

          <div className="md:hidden">
            <NavSlider />
          </div>
        </div>
      </div>
    </nav>
  );
};

function NavSlider() {
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

async function UserActions() {
  const user = await currentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={user?.imageUrl || ""}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton>Logout</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
