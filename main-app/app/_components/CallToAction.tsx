import React from "react";
import "./CallToAction.css";

export default function CallToAction() {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Want To Sell Your Property?</span>
          <span className="secondaryText">
            Sell Your Properties With Hacienda.
            <br />
            Click now to get started
          </span>
          <button className="button">
            <a href="./pricing">Get Started</a>
          </button>
        </div>
      </div>
    </div>
  );
}
