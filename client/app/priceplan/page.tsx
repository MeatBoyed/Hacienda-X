import React from "react";

const PricingPlan: React.FC = () => {
  return (
    <div className="container">
      <h1 className="title">Pricing Plan</h1>
      <div className="pricingPlans">
        <div className="pricingPlanCard">
          <div className="pricingPlan">
            <div className="planHeader">
              <h2>Basic Plan</h2>
              <p>$10/month</p>
            </div>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
            <button className="button">Sign Up</button>
          </div>
        </div>
        <div className="pricingPlanCard">
          <div className="pricingPlan">
            <div className="planHeader">
              <h2>Standard Plan</h2>
              <p>$20/month</p>
            </div>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
              <li>Feature 4</li>
            </ul>
            <button className="button">Sign Up</button>
          </div>
        </div>
        <div className="pricingPlanCard">
          <div className="pricingPlan">
            <div className="planHeader">
              <h2>Premium Plan</h2>
              <p>$30/month</p>
            </div>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
              <li>Feature 4</li>
              <li>Feature 5</li>
            </ul>
            <button className="button">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
