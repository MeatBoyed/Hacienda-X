import Image from "next/image";
import Hero from "./_components/Hero";
import Companies from "./_components/Companies";
import GetStarted from "./_components/GetStarted";
import Contact from "./_components/Contact";
import Value from "./_components/Value";
import Residencies from "./_components/Residencies";
import SearchFilters from "./_components/SearchFilters";
import { Suspense } from "react";
import PostHogClient from "@/components/Posthog";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  // const { userId } = auth();
  // const posthog = PostHogClient();

  // if (userId) {
  //   posthog.identify({
  //     distinctId: userId, // replace with a user's distinct ID
  //   });
  // }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <div>
          <div className="white-gradient" />
          <Hero />
        </div>
        <Residencies />
        <Value />
        <Contact />
        <GetStarted />
      </div>
    </Suspense>
  );
}
