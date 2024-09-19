import { Suspense } from "react";
import CallToAction from "../_components/CallToAction";
import Hero from "../_components/Hero";
import HowItWorks from "../_components/HowItWorks";
import OfferedSection from "../_components/OfferedSection";
import Residencies from "../_components/Residencies";
import Value from "../_components/Value";
import Contact from "../_components/Contact";
import CategoryGrid from "../_components/CategoryGrid";
import { getDictionary } from "@/messages/dictionaries";
import { Messages } from "@/global";
import Loader from "@/components/ui/loader";
import { generateWebsiteConfig } from "@/config/siteConfig";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import RentalProperties from "../_components/RentalProperties";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations("WebsiteConfig.home");
  return await generateWebsiteConfig(t);
}

// Translated
export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const dict: Messages = await getDictionary(locale);
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        <Hero dict={dict.Index.Hero} />
      </div>
      <Suspense fallback={<Loader className="max-h-24 mt-10" />}>
        <Residencies margin="mb-0">
          <Residencies.Head subHeading={dict.Index.Residencies.subHeading} heading={dict.Index.Residencies.heading} />
        </Residencies>
      </Suspense>
      <Suspense fallback={<Loader className="max-h-24 mt-10" />}>
        <RentalProperties margin="mb-0">
          <Residencies.Head subHeading={dict.Index.RentalProperties.subHeading} heading={dict.Index.RentalProperties.heading} />
        </RentalProperties>
      </Suspense>
      <CategoryGrid />
      <Value />
      <OfferedSection />
      <CallToAction />
      <Contact />
    </div>
  );
}
