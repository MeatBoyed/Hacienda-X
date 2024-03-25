import Image from "next/image";
import MapViewer from "../components/MapViewer";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
export default function Home() {
  return (
    <main className="App">
      <div className="App">
        <div>
          <div className="white-gradient" />
          <Navbar />
          <Hero />
        </div>
      </div>
    </main>
  );
}
