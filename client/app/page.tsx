import MapViewer from "../components/MapViewer";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Contact from "@/components/Contacts";
import CallToAction from "@/components/CallToAction";
import PropertyRender from "@/components/PropertyRender";
import data from "../lib/rentalslider.json";
import db from "@/lib/db";

// Example DB query of properties
async function fetchProperties() {
  return await db.property.findMany();
}

export default async function Home() {
  const properties = await fetchProperties();

  return (
    <div className="w-full flex justify-center items-center flex-col gap-20">
      <Hero />
      {properties.map((data) => (
        <p>{data.title}</p>
      ))}
      <PropertyRender title={"Popular Rentals"} properties={data} />
      <PropertyRender title={"Popular Sales"} properties={data} />
      <AboutUs />
      <Contact />
      <CallToAction />
    </div>
  );
}
