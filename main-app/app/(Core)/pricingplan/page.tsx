// pricingplan.tsx
"use client";
// pricingplan.tsx// pricingplan.tsx
import React, { useState } from "react";
import "./pricingplan.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const PricingPlan = () => {
  const [selectMonthly, setSelectMonthly] = useState(true);

  return (
    <div className="PricingApp">
      <div className="app-container">
        {/* header */}
        <header>
          <h1 className="header-topic">
            Our Pricing Plans For Floof Cloud Sharing
          </h1>
          <div className="header-row">
            <p>Annually</p>
            <label className="price-switch">
              <input
                className="price-checkbox"
                onChange={() => {
                  setSelectMonthly((prev) => !prev);
                }}
                type="checkbox"
              />
              <div className="switch-slider"></div>
            </label>
            <p>Monthly</p>
          </div>
        </header>
        <div className="pricing-cards">
          <div className="PricingCard">
            <header>
              <p className="card-title">Basic</p>
              <h1 className="card-price">
                {selectMonthly ? "$2.99" : "$35.88"}
              </h1>
            </header>
            {/* features */}
            <div className="card-features">
              <div className="card-storage">100 GB Storage</div>
              <div className="card-users-allowed">Up To 5 users</div>
            </div>
            {/* text popup when pressing button */}
            <Popup trigger={<button className="card-btn">READ MORE</button>}>
              <div>This app was made in React.js</div>
            </Popup>
          </div>
          <div className="PricingCard">
            <header>
              <p className="card-title">Premium (Most Popular!)</p>
              <h1 className="card-price">
                {selectMonthly ? "$9.99" : "$119.88"}
              </h1>
            </header>
            {/* features */}
            <div className="card-features">
              <div className="card-storage">500 GB Storage</div>
              <div className="card-users-allowed">Up to 10 users</div>
            </div>
            {/* text popup when pressing button */}
            <Popup trigger={<button className="card-btn">READ MORE</button>}>
              <div>This app was made in React.js</div>
            </Popup>
          </div>
          <div className="PricingCard">
            <header>
              <p className="card-title">Professional</p>
              <h1 className="card-price">
                {selectMonthly ? "$19.99" : "$239.88"}
              </h1>
            </header>
            {/* features */}
            <div className="card-features">
              <div className="card-storage">1 TB Storage</div>
              <div className="card-users-allowed">Up to 20 users</div>
            </div>
            {/* text popup when pressing button */}
            <Popup trigger={<button className="card-btn">READ MORE</button>}>
              <div>This app was made in React.js</div>
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
