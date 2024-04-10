import React from "react";
import logo from "../app/public/HaciendaLogo.jpeg";
import { Button } from "./ui/button";
import PrimaryButton from "./ui/Custom/PrimaryButton";
export default function Navbar() {
  return (
    <nav className="text-primary-foreground mb-16">
      <div className="flex justify-between items-center w-full ">
        <img src={logo.src} alt="logo" width={100}></img>
        <div className="flex justify-center items-center gap-8">
          <a className="valuestransition" href="">
            Residencies
          </a>
          <a className="valuestransition" href="#about">
            Our Values
          </a>
          <a className="valuestransition" href="#about">
            Contact Us
          </a>
          <PrimaryButton content="Get started" />
        </div>
      </div>
    </nav>
  );
}
