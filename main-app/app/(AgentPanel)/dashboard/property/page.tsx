"use client";
import { buttonVariants } from "@/components/ui/button";
import Properties from "./_components/Properties";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";

export default function ViewProperties() {
  // Auth user via Clerk & in Dashboard
  const router = useRouter();
  const { data, error, isLoading } = useSWR<boolean>(
    "/api/dashboard/authuser",
    fetcher
  );

  if (!data || error) {
    return router.push("/onboarding");
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex justify-start items-center gap-10  pb-20  my-5 flex-col px-3 sm:px-5 min-h-screen  ">
      <div className="flex w-full justify-between items-center sm:px-5 lg:max-w-7xl ">
        <p className="scroll-m-20 text- sm:text-lg font-semibold tracking-tight">
          Your Properties
        </p>
        <Link
          href="/dashboard/property/create"
          className={buttonVariants({
            variant: "outline",
            className: "gap-2",
            size: "sm",
          })}
        >
          <PlusCircle size={16} />
          Add Property
        </Link>
      </div>

      <div className="w-full sm:px-5 lg:max-w-7xl ">{/* <Properties /> */}</div>
    </div>
  );
}
