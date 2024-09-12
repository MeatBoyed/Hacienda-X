import React from "react";
import Link from "next/link";
import { SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Bookmark, HeartIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/newlogo.png";
import LocalSwitcher from "./local-switcher";
import { useTranslations } from "next-intl";

export const Header = ({ isDashboard }: { isDashboard?: boolean }) => {
  const t = useTranslations("NavbarComp");
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
              <DashboardNavlinks
                dict={{
                  dashboard: t("dashboard"),
                  property: t("property"),
                  usage: t("usage"),
                  contact: t("contactUs"),
                }}
              />
            ) : (
              <MainNavlinks
                userId={!!userId}
                dict={{
                  dashboard: t("dashboard"),
                  home: t("home"),
                  search: t("search"),
                  pricing: t("pricing"),
                  sellYourProperty: t("sellYourProperty"),
                  contactUs: t("contactUs"),
                }}
              />
            )}
          </div>

          {/* User button and signup */}
          <div className="flex items-center gap-4">
            {!userId ? (
              <SignUpButton mode="modal" forceRedirectUrl={"/onboarding"}>
                <p className="text-base text-white bg-blue-500 hover:bg-blue-700 transition px-4 py-2 rounded min-w-[100px] text-center cursor-pointer">
                  {/* TODO: Should be Get Started and go to /pricing  */}
                  {t("signup")}
                </p>
              </SignUpButton>
            ) : (
              <UserButton />
            )}
            <Link href="/bookmarks">
              <Bookmark
                className="p-2 border rounded-full text-black hover:bg-slate-900 hover:text-white"
                size={35}
              />
            </Link>
          </div>

          {/* NavSlider for smaller screens */}
          <div className="md:hidden">
            {isDashboard ? (
              <DashboardNavSlider
                dict={{
                  dashboard: t("dashboard"),
                  property: t("property"),
                  usage: t("usage"),
                  contact: t("contactUs"),
                }}
              />
            ) : (
              <MainNavSlider
                dict={{
                  search: t("search"),
                  favorites: t("favorites"),
                  pricing: t("pricing"),
                  sellYourProperty: t("sellYourProperty"),
                  dashboard: t("dashboard"),
                  contact: t("contactUs"),
                }}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

function MainNavSlider({
  dict: { search, favorites, pricing, sellYourProperty, dashboard, contact },
}: {
  dict: {
    search: string;
    favorites: string;
    pricing: string;
    sellYourProperty: string;
    dashboard: string;
    contact: string;
  };
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon size={25} />
      </SheetTrigger>
      <SheetContent className="flex justify-between py-80 items-start flex-col shadow-lg">
        <Link href="/property-for-sale">
          <p className="text-xl">{search}</p>
        </Link>
        <Link href="/bookmarks">
          <p className="text-xl">{favorites}</p>
        </Link>
        <Link href="/pricing">
          <p className="text-xl">{pricing}</p>
        </Link>
        <Link href="/dashboard">
          <p className="text-xl">{dashboard}</p>
        </Link>
        <Link href="/contactus">
          <p className="text-xl">{contact}</p>
        </Link>
        <LocalSwitcher />
      </SheetContent>
    </Sheet>
  );
}

function DashboardNavSlider({
  dict: { dashboard, property, usage, contact },
}: {
  dict: { dashboard: string; property: string; usage: string; contact: string };
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon size={25} />
      </SheetTrigger>
      <SheetContent className="flex justify-between py-80 items-start flex-col shadow-lg">
        <Link href="/dashboard">
          <p className="text-base text-black hover:text-gray-700 transition">{dashboard}</p>
        </Link>
        <Link href="/dashboard/property">
          <p className="text-base text-black hover:text-gray-700 transition">{property}</p>
        </Link>
        <Link href="/usage">
          <p className="text-base text-black hover:text-gray-700 transition">{usage}</p>
        </Link>
        <Link href="/contactus">
          <p className="text-base text-black hover:text-gray-700 transition">{contact}</p>
        </Link>
        <LocalSwitcher />
      </SheetContent>
    </Sheet>
  );
}

function MainNavlinks({
  userId,
  dict: { home, search, pricing, sellYourProperty, dashboard, contactUs },
}: {
  userId: boolean;
  dict: {
    home: string;
    search: string;
    pricing: string;
    sellYourProperty: string;
    dashboard: string;
    contactUs: string;
  };
}) {
  return (
    <div className="flex justify-center gap-8 items-center">
      <Link href="/property-for-sale">
        <p className="text-base text-black hover:text-gray-700 transition">{search}</p>
      </Link>
      <Link href="/pricing">
        <p className="text-base text-black hover:text-gray-700 transition">{pricing}</p>
      </Link>
      {userId && (
        <Link href="/dashboard">
          <p className="text-base text-black hover:text-gray-700 transition">{dashboard}</p>
        </Link>
      )}
      <Link href="/contactus">
        <p className="text-base text-black hover:text-gray-700 transition">{contactUs}</p>
      </Link>
      <LocalSwitcher />
    </div>
  );
}

function DashboardNavlinks({
  dict: { dashboard, property, usage, contact },
}: {
  dict: { dashboard: string; property: string; usage: string; contact: string };
}) {
  return (
    <div className="flex justify-center gap-8 items-center">
      <Link href="/dashboard">
        <p className="text-base text-black hover:text-gray-700 transition">{dashboard}</p>
      </Link>
      <Link href="/usage">
        <p className="text-base text-black hover:text-gray-700 transition">{usage}</p>
      </Link>
      <Link href="/contactus">
        <p className="text-base text-black hover:text-gray-700 transition">{contact}</p>
      </Link>
      <LocalSwitcher />
    </div>
  );
}
