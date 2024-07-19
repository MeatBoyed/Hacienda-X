import { Suspense } from "react";
import CallToAction from "../_components/CallToAction";
import Hero from "../_components/Hero";
import HowItWorks from "../_components/HowItWorks";
import OfferedSection from "../_components/OfferedSection";
import Residencies from "../_components/Residencies";
import Value from "../_components/Value";
import Contact from "../_components/Contact";

export default async function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <div>
          <div className="white-gradient" />
          <Hero />
        </div>
        <Residencies subHeading="Featured Properties" heading="Popular Residencies" margin="mb-0" />
        <HowItWorks />
        <Value />
        <OfferedSection />
        <CallToAction />
        <Contact />
      </div>
    </Suspense>
  );
}
