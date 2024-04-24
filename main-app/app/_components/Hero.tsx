// Hero.tsx

import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <div
        className="bubble-element Group baTaKsaT bubble-r-container flex column"
        style={{
          maxWidth: "unset",
          maxHeight: "unset",
          backgroundColor: "rgba(255, 255, 255, 0)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundImage:
            "url('https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0460680b1035424a401b6fc2a5844d47.cdn.bubble.io%2Ff1704496205509x573597491559759040%2Fcover-hd.png?w=1536&h=684&auto=compress&fit=crop&dpr=1')",
        }}
      >
        <div
          className="bubble-element Group baTaKrd bubble-r-container flex column"
          style={{
            backgroundColor: "rgba(var(--color_text_default_rgb), 0.4)",
          }}
        >
          <div
            className="bubble-element Group baTaLaQr0 bubble-r-container flex column flexCenter"
            style={{ height: "100%", justifyContent: "center" }}
          >
            <h1 className="bubble-element Text baTaKri">
              Find the Perfect Home
            </h1>
            {/* <div className="bubble-element Text baTaKrj">
              Discover Properties
              <br />
              That Match Your Lifestyle
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
