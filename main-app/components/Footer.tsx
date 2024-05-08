import React from "react";
import "./Footer.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src="./HaciendaLogo.jpeg" alt="" width={120} />
          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">Bolivia</span>
          <div className="flexCenter f-menu">
            <Link href="/property-for-sale">
              <p className="valuestransition">Property</p>
            </Link>
            <Link href="/property-for-sale">
              <p className="valuestransition">About Us</p>
            </Link>
            <Link href="/pricing">
              <p className="valuestransition">Pricing</p>
            </Link>
            <Link href="/contact">
              <p className="valuestransition">Contacts</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
