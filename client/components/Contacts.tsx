import React from "react";
import "./Contact.css";
import data from "../lib/contactslider.json";

const Contact = () => {
  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head contact-container">
          <span className="orangeText">Contact Our Agents</span>
          <span className="primaryText">Meet Our Dedicated Team</span>
        </div>

        <div className="r-card contact-card">
          {data.map((card, i) => (
            <div key={i} className="contact-card-container flexStart">
              <div className="circle-image">
                <img src={card.image} alt="agent" />
              </div>
              <div className="contact-details">
                <span className="primaryText">{card.name}</span>
                <span className="secondaryText">{card.phone}</span>
                <button className="button">Contact Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
