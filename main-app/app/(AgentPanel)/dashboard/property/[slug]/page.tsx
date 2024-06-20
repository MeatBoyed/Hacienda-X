"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useParams } from "next/navigation";
import PropertyForm from "../_components/PropertyForm";
import { SelectPropertyResponse } from "@/app/api/(utils)/utils";
import { PuffLoader } from "react-spinners";
import { SignIn, useUser } from "@clerk/nextjs";

// Allow user's to request property features for us to add
export default function ManageProperty() {
  const user = useUser();
  const params = useParams();

  const slug = decodeURIComponent(
    typeof params.slug === "string" ? params.slug : ""
  );

  // Fetch Proerpty from APi, and handle Fetching states
  const { data, error, isLoading } = useSWR<SelectPropertyResponse>(
    `/api/properties/${slug}`,
    fetcher
  );

  if (user.isSignedIn === false) return SignIn;
  console.log(data);

  // Return to 403 Page if Property doesn't exists
  if (data?.notFound) {
    return (
      <div className="w-full flex justify-center items-center h-[99vh] bg-[#ffff]">
        <span>
          This property does not exist. It may have been removed by the agent
        </span>
        <p>Checkout other properties that are available</p>
      </div>
    );
  }

  return (
    <section
      id="createpropertyform"
      className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full my-10 pb-40 "
    >
      <div className="mx-auto grid lg:max-w-8xl flex-1 w-full auto-rows-max gap-4">
        {isLoading && (
          <div className="w-full flex justify-center items-center h-[50vh] bg-[#ffff] text-accent">
            <PuffLoader color="blue" />
          </div>
        )}
        {error && (
          <div className="w-full flex justify-center items-center h-[100vh] bg-[#ffff]">
            <span>Error while fetching the property details</span>
          </div>
        )}
        {data?.results && <PropertyForm initProperty={data} />}
      </div>
    </section>
  );
}
