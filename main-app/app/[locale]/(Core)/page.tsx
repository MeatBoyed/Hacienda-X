import { Suspense } from "react";
import CallToAction from "../_components/CallToAction";
import Hero from "../_components/Hero";
import HowItWorks from "../_components/HowItWorks";
import OfferedSection from "../_components/OfferedSection";
import Residencies from "../_components/Residencies";
import Value from "../_components/Value";
import Contact from "../_components/Contact";

import { getDictionary } from "@/messages/dictionaries";
import { Messages } from "@/global";

// Translated
export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const dict: Messages = await getDictionary(locale);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <div>
          <div className="white-gradient" />
          <Hero dict={dict.Index.Hero} />
        </div>
        <Residencies subHeading={dict.Index.Residencies.subHeading} heading={dict.Index.Residencies.heading} margin="mb-0" />
        <HowItWorks />
        <Value />
        <OfferedSection />
        <CallToAction />
        <Contact />
      </div>
    </Suspense>
  );
}
