import React from "react";

const About = () => {
  return (
    <section className="about" id="about">
      <h1>About us</h1>
      <div className="card-container">
        <div className="card card-left">
          <img src="./houselogo1.jpg" alt="hero image" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="card card-right">
          <img src="./houselogo1.jpg" alt="hero image" />
          <p className="pcolor">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="card card-left">
          <img src="./houselogo1.jpg" alt="hero image" />
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
