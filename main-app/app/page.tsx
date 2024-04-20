import Image from "next/image";
import Hero from "./_components/Hero";
import Companies from "./_components/Companies";
import GetStarted from "./_components/GetStarted";
import Contact from "./_components/Contact";
import Value from "./_components/Value";
import Residencies from "./_components/Residencies";

export default function Home() {
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        <Hero />
      </div>
      <Companies />
      <Residencies />
      <Value />
      <Contact />
      <GetStarted />
    </div>
  );
}
