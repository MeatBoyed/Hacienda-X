import React from "react";
import PrimaryButton from "./ui/Custom/PrimaryButton";

const CallToAction = () => {
  return (
    <section className="w-full bg-white flex flex-col justify-center items-center p-20 gap-10 mt-40">
      <h1 className="text-[#1f3e72] font-bold text-4xl">
        Want To Add Your Properties?
      </h1>
      <PrimaryButton content="Start Now" />
    </section>
  );
};

export default CallToAction;
