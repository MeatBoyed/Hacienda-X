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

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center items-center pb-3 px-3 sm:px-5 pt-5 border-b">
      <div className="w-full flex justify-center items-center gap-10 lg:max-w-7xl flex-col">
        <div className="w-full flex justify-between items-center">
          <Link
            href="/dashboard"
            className="text-xl sm:text-4xl font-semibold tracking-tight"
          >
            Hacienda X
          </Link>

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
          <Link className="leading-7 text-sm  sm:text-lg" href="/dashboard/">
            Profile
          </Link>
          <Link className="leading-7 text-sm sm:text-lg " href="/dashboard/">
            Usage
          </Link>
        </div>
      </div>
    </nav>
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
