import React from "react";
import "./Properties.css";
import SearchProperty from "./_components/SearchProperty";
import PostHogClient from "@/components/Posthog";
import { auth } from "@clerk/nextjs/server";

export default async function PropertiesSearch() {
  //   const { data, isError, isLoading } = useProperties();

  // const { userId } = auth();
  // const posthog = PostHogClient();

  // if (userId) {
  //   posthog.identify({
  //     distinctId: userId, // replace with a user's distinct ID
  //   });
  // }

  return (
    <div className="bg-background">
      <div className="flex justify-center items-center w-full py-20">
        {/* Hanldes the Client Side functionality of Searching Properties */}
        <SearchProperty />
      </div>
    </div>
  );
}
