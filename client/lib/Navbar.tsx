"use client";
import { SignedOut, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs";

export default function NavbarAuth() {
  return (
    <>
      <SignedOut>
        <div className="rounded-sm font-medium tracking-widest pl-6 pr-6 pt-2 pb-2 buttonTail text-primary-foreground">
          <SignUpButton />
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
