import React from "react";
import data from "../lib/contactslider.json";

const Contact = () => {
  return (
    <section className="overflow-hidden w-full flex flex-col gap-10">
      <div className="mt-8 flex justify-between items-center">
        <span className="text-orange-500 text-2xl font-semibold">
          Contact Our Agents
        </span>
        <span className="text-[#1f3e72] font-bold text-4xl">
          Meet Our Dedicated Team
        </span>
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
    </section>
  );
};

export default Contact;
