import Image from "next/image";
import MapViewer from "../components/MapViewer";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Rentals from "@/components/Rentals";
import AboutUs from "@/components/AboutUs";
import Contact from "@/components/Contacts";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Residencies from "@/components/Residencies";

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center flex-col gap-20">
      <Hero />
      <Residencies />
      <Rentals />
      <AboutUs />
      <Contact />
      <CallToAction />
    </div>
  );
}
