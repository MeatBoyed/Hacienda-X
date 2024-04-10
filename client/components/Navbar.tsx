import React from "react";
import logo from "../app/Lib/Imgs/logo.png";
<<<<<<< HEAD
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <img src={logo.src} alt="logo" width={100} />
        <div className="flexCenter h-menu">
          <Link className="valuestransition" href="/property">
=======
import { Button } from "./ui/button";
import PrimaryButton from "./ui/Custom/PrimaryButton";
export default function Navbar() {
  return (
    <nav className="text-primary-foreground mb-16">
      <div className="flex justify-between items-center w-full ">
        <img src={logo.src} alt="logo" width={100}></img>
        <div className="flex justify-center items-center gap-8">
          <a className="valuestransition" href="">
>>>>>>> d23ab02ea820264bf0e33569a91cec91dcf189f1
            Residencies
          </Link>
          <a className="valuestransition" href="#about">
            Our Values
          </a>
          <a className="valuestransition" href="#about">
            Contact Us
          </a>
<<<<<<< HEAD
          <a className="valuestransition" href="#about">
            Get Started
          </a>
          <button className="button">
            <a href="#contact">Contact</a>
          </button>
=======
          <PrimaryButton content="Get started" />
>>>>>>> d23ab02ea820264bf0e33569a91cec91dcf189f1
        </div>
      </div>
    </nav>
  );
}
