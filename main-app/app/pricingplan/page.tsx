import React from "react";
import "./pricingplan.css";

const PricingPlan = () => {
  return (
    <div className="container">
      <header>
        <div className="pricingHeader">
          <h1 className="heading">Pricing</h1>
          <p className="subheading">
            Quickly build an effective pricing table for your potential
            customers. It’s built with minimal styling for easy customization.
          </p>
        </div>
      </header>

      <main>
        {/* Pricing Cards */}
        <div className="pricingCards">
          <div className="card">
            <h2>Starter</h2>
            <p>$0/month</p>
            <ul>
              <li>10 users included</li>
              <li>2 GB of storage</li>
              <li>Email support</li>
              <li>Help center access</li>
            </ul>
            <button>Sign up for free</button>
          </div>
          <div className="card">
            <h2>Pro</h2>
            <p>$15/month</p>
            <ul>
              <li>20 users included</li>
              <li>10 GB of storage</li>
              <li>Priority email support</li>
              <li>Help center access</li>
            </ul>
            <button>Get started</button>
          </div>
          <div className="card">
            <h2>Enterprise</h2>
            <p>$29/month</p>
            <ul>
              <li>30 users included</li>
              <li>15 GB of storage</li>
              <li>Phone and email support</li>
              <li>Help center access</li>
            </ul>
            <button>Contact us</button>
          </div>
        </div>

        {/* Pricing Comparison Table */}
        <h2 className="comparisonHeader">Compare plans</h2>
        <div className="tableResponsive">
          <table className="comparisonTable">
            <thead>
              <tr>
                <th></th>
                <th>Starter</th>
                <th>Pro</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Users included</td>
                <td>10</td>
                <td>20</td>
                <td>30</td>
              </tr>
              <tr>
                <td>Storage</td>
                <td>2 GB</td>
                <td>10 GB</td>
                <td>15 GB</td>
              </tr>
              <tr>
                <td>Support</td>
                <td>Email</td>
                <td>Priority email</td>
                <td>Phone and email</td>
              </tr>
              <tr>
                <td>Help center access</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default PricingPlan;
