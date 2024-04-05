import Image from "next/image";
import MapViewer from "../components/MapViewer";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Residencies from "@/components/Residencies";
import Rentals from "@/components/Rentals";

export default function Home() {
  return (
    <main className="App">
      <div className="App">
        <div>
          <div className="white-gradient" />
          <Navbar />
          <Hero />
        </div>
        <Residencies />
        <Rentals />
      </div>
    </main>
  );
}
