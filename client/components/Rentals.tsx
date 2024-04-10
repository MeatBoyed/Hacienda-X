// components/Rentals.tsx

import React from "react";
import Link from "next/link";
import data from "../lib/rentalslider.json";

const Rentals = () => {
  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Rentals</span>
        </div>

        <div className="r-card-container flexRowStart">
          {data.map((card, i) => (
            <div key={i} className="flexColStart r-card">
              <Link href="/property" passHref>
                <img src={card.image} alt="home" />
                <span className="secondaryText r-price">
                  <span>$</span>
                  <span>{card.price}</span>
                </span>
                <span className="primaryText">{card.name}</span>
                <span className="secondaryText">{card.detail}</span>
              </Link>
            </div>
          ))}
        </div>

        <button className="r-head flexColStart button">Explore More</button>
      </div>
    </section>
  );
};

export default Rentals;
