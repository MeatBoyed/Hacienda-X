import React from "react";
<<<<<<< HEAD
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="call-to-action">
      <h1 className="primaryText">Want To Add Your Properties?</h1>
      <Link href="/priceplan">
        <button className="learn-more-button">Learn More</button>
      </Link>
=======
import PrimaryButton from "./ui/Custom/PrimaryButton";

const CallToAction = () => {
  return (
    <section className="w-full bg-white flex flex-col justify-center items-center p-20 gap-10 mt-40">
      <h1 className="text-[#1f3e72] font-bold text-4xl">
        Want To Add Your Properties?
      </h1>
      <PrimaryButton content="Start Now" />
>>>>>>> d23ab02ea820264bf0e33569a91cec91dcf189f1
    </section>
  );
};

export default CallToAction;
