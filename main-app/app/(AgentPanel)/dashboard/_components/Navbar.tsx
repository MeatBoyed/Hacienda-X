import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Search } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full h-full flex justify-center items-center pb-3 mt-5 border-b">
      <div className="w-full flex justify-center items-center gap-5 flex-col lg:max-w-7xl">
        <div className="w-full flex justify-between items-center">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
            Hacienda X
          </h2>

          <div className=" flex justify-center items-center gap-4">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <UserActions />
          </div>
        </div>

        <div className="flex justify-start items-center w-full gap-4">
          <p className="leading-7">Dashboard</p>
          <p className="leading-7">Properties</p>
          <p className="leading-7">Profile</p>
          <p className="leading-7">Usage</p>
          <p className="leading-7">Settings</p>
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
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
