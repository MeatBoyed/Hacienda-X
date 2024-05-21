import { Suspense } from "react";
import Hero from "../_components/Hero";
import HowItWorks from "../_components/HowItWorks";
import Residencies from "../_components/Residencies";
import Value from "../_components/Value";
import CallToAction from "../_components/CallToAction";
import Contact from "../_components/Contact";
import OfferedSection from "../_components/OfferedSection";

export default async function Home() {
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
        <OfferedSection />
        <CallToAction />
        <Contact />
      </div>
    </Suspense>
  );
}
