import MapViewer from "../components/MapViewer";
import Hero from "@/components/Hero";
import Rentals from "@/components/Rentals";
import AboutUs from "@/components/AboutUs";
import Contact from "@/components/Contacts";
import CallToAction from "@/components/CallToAction";
import PropertyRender from "@/components/PropertyRender";
import data from "../lib/rentalslider.json";

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center flex-col gap-20">
      <Hero />
      <PropertyRender title={"Popular Rentals"} properties={data} />
      <PropertyRender title={"Popular Sales"} properties={data} />
      <AboutUs />
      <Contact />
      <CallToAction />
    </div>
  );
}
