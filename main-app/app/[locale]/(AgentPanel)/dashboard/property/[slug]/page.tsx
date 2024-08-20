"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import PropertyForm from "../_components/PropertyForm";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { PuffLoader } from "react-spinners";
import { useTranslations } from "next-intl";
import { fetcher } from "@/components/Upload-Shad/main/FileInputUtils";

// Allow user's to request property features for us to add
export default function ManageProperty() {
  const t = useTranslations("Dashboard.EditProperty");
  const params = useParams();

  const property_id = decodeURIComponent(typeof params.slug === "string" ? params.slug : "");

  // Fetch Proerpty from APi, and handle Fetching states
  const { data, error, isLoading } = useSWR<PropertyWithAddress>(`/api/dashboard/property/${property_id}`, fetcher);

  // TODO: (Possible) ensure the property's user matches current user

  return (
    <section id="createpropertyform" className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full my-24 pb-40 ">
      <div className="mx-auto grid lg:max-w-8xl flex-1 w-full auto-rows-max gap-4">
        {isLoading && (
          <div className="w-full flex justify-center items-center h-[50vh] bg-[#ffff] text-accent">
            <PuffLoader color="blue" />
          </div>
        )}
        {error && (
          <div className="w-full flex justify-center items-center h-[100vh] bg-[#ffff]">
            <span>{t("error")}</span>
          </div>
        )}
        {data && <PropertyForm initProperty={data} />}
      </div>
    </section>
  );
}
