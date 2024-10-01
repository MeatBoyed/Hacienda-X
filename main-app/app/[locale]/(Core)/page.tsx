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
import { generateWebsiteConfig } from "@/config/siteConfig";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import RentalProperties from "../_components/RentalProperties";
import { Loader } from "lucide-react";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("WebsiteConfig.home");
  return await generateWebsiteConfig(t);
}

// Translated
export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const dict: Messages = await getDictionary(locale);

  // Create a URL Search Param object to make a search query to api
  const searchQuery = new URLSearchParams();
  // Set your query values like this
  searchQuery.set("bedrooms", "4");
  // searchQuery.set("propertyType", "apartments") // Example implementation for property type search query (filter)

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
      {/* Ensure you pass the searchQuery to the comp */}
      {/* <Residencies margin="mb-0">
        <Residencies.Head
          subHeading={dict.Index.Residencies.subHeading}
          heading={dict.Index.Residencies.heading}
        />
      </Residencies> */}
      {/* <Residencies margin="mb-0" searchQuery={searchQuery}>
        <Residencies.Head
          subHeading={dict.Index.Residencies.subHeading}
          heading={dict.Index.Residencies.heading}
        />
      </Residencies> */}
     <HowItWorks /> 
      {/* <Value /> */}
      <OfferedSection />
      <CallToAction />
      <Contact />
    </div>
  );
}
