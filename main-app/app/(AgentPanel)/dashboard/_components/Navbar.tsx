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
              <div className="flex justify-center items-center gap-4">
                <UserActions />
                {/* // <UserButton /> */}
              </div>
            </div>

            <div className="flex justify-start items-center w-full gap-4">
              <Link className="leading-7 text-sm sm:text-lg" href="/dashboard">
                Dashboard
              </Link>
              <Link
                className="leading-7 text-sm sm:text-lg "
                href="/dashboard/property"
              >
                Property
              </Link>
              <Link
                className="leading-7 text-sm  sm:text-lg"
                href="/dashboard/"
              >
                Profile
              </Link>
              <Link
                className="leading-7 text-sm sm:text-lg "
                href="/dashboard/"
              >
                Usage
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
        <Link href="/dashboard">
          <p className="text-xl">Dashboard</p>
        </Link>
        <Link href="/dashboard/property">
          <p className="text-xl">Create Property</p>
        </Link>
        <Link href="/dashboard/">
          <p className="text-xl">Profile</p>
        </Link>
        <Link href="/dashboard/">
          <p className="text-xl text-blue-500">Usage</p>
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
