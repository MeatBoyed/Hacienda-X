import { Button } from "@/components/ui/button";

import InfoCardSection from "./(components)/InfoCardSection";
import FaqSection from "./(components)/FaqSection";
import TestimonialSection from "./(components)/TestimonialSection";
import WhyChooseUsSection from "./(components)/WhyChooseUsSection";
import { generateWebsiteConfig } from "@/config/siteConfig";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PricingEstimator from "./(components)/PricingEstimator";
import { SignInButton } from "@clerk/nextjs";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("WebsiteConfig.pricing");
  return await generateWebsiteConfig(t);
}

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16 mt-16 max-w-5xl space-y-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          List your property on HaciendaX for free
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our pricing scales to fit your needs with no commitments, termination fees, or usage
          limits.
        </p>
      </div>
   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 w-full  ">
        <PricingEstimator />
        <WhyChooseUsSection />
      </div>
      <InfoCardSection />
      {/* <TestimonialSection /> */}
      <FaqSection />
      <div className="text-center">
        <SignInButton mode="modal">
          <Button size="lg" className="text-lg px-8 bg-blue-500 hover:bg-blue-800">
            Get started Today
          </Button>
        </SignInButton>
        <p className="mt-4 text-muted-foreground">
          Experience the power of our platform risk-free.
        </p>
      </div>
    </div>
  );
}
