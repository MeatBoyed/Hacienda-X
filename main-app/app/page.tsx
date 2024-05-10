import Image from "next/image";
import Hero from "./_components/Hero";
import Companies from "./_components/Companies";
import GetStarted from "./_components/CallToAction";
import Contact from "./_components/Contact";
import Value from "./_components/Value";
import Residencies from "./_components/Residencies";
import SearchFilters from "./_components/SearchFilters";
import { Suspense } from "react";
import PostHogClient from "@/components/Posthog";
import { auth } from "@clerk/nextjs/server";
import CallToAction from "./_components/CallToAction";
import HowItWorks from "./_components/HowItWorks";

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
        <HowItWorks />
        <Residencies />
        <Value />
        <CallToAction />
        <Contact />
      </div>
    </Suspense>
  );
}
