import React from "react";
import logo from "../app/Lib/Imgs/logo.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <img src={logo.src} alt="logo" width={100} />
        <div className="flexCenter h-menu">
          <Link className="valuestransition" href="/property">
            Residencies
          </Link>
          <a className="valuestransition" href="#about">
            Our Values
          </a>
          <a className="valuestransition" href="#about">
            Contact Us
          </a>
          <a className="valuestransition" href="#about">
            Get Started
          </a>
          <button className="button">
            <a href="#contact">Contact</a>
          </button>
        </div>
      </div>
    </nav>
  );
}
