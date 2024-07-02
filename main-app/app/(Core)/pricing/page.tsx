// pricingplan.tsx
"use client";
import React, { ReactNode, useState } from "react";
import "./pricing.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { AccordionItem, List, PricingCard } from "../_components/PricingCard";

const Pricing = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Pricing Table
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Our Pricing Plan
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                Choose the plan that best suits your needs.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="-mx-4 flex flex-wrap">
            <PricingCard
              type="Enterprise"
              price="$499"
              subscription="year"
              description="Best for large real estate firms needing comprehensive features."
              buttonText="Choose Enterprise"
              classNameName="border-solid border-4 border-blue-600"
            >
              <List>Unlimited Property Listings</List>
              <List>Maximum Exposure</List>
              <List>Dedicated Account Manager</List>
              <List>Daily Analytics Report</List>
              <List>Premium Featured Listings</List>
              <List>Custom Branding Options</List>
            </PricingCard>

            <PricingCard
              type="Pro"
              price="$99"
              subscription="month"
              description="Perfect for small real estate teams."
              buttonText="Choose Pro"
              active
              classNameName="border-solid border-4 border-black"
            >
              <List>10 Property Listings</List>
              <List>Enhanced Exposure</List>
              <List>Priority Email Support</List>
              <List>Weekly Analytics Report</List>
              <List>Featured Listings</List>
            </PricingCard>
            <PricingCard
              type="Basic"
              price="$29"
              subscription="month"
              description="Ideal for individual agents starting out."
              buttonText="Choose Basic"
              classNameName="border-solid border-4 border-gray-400"
            >
              <List>1 Property Listing</List>
              <List>Standard Exposure</List>
              <List>Email Support</List>
              <List>Monthly Analytics Report</List>
            </PricingCard>
          </div>
        </div>
      </div>

      <section className="dark:bg-gray-100 dark:text-gray-800">
        <div className="container mx-auto p-6 overflow-x-auto">
          <table className="w-full">
            <caption className="sr-only">Pricing plan comparison</caption>
            <thead>
              <tr>
                <th></th>
                <th scope="col">
                  <h2 className="px-2 text-lg font-medium">Basic</h2>
                  <p className="mb-3">
                    <span className="text-2xl font-bold sm:text-4xl dark:text-gray-900">
                      $29
                    </span>
                    <span className="font-medium dark:text-gray-600">/mo</span>
                  </p>
                </th>
                <th scope="col">
                  <h2 className="px-2 text-lg font-medium">Pro</h2>
                  <p className="mb-3">
                    <span className="text-2xl font-bold sm:text-4xl dark:text-gray-900">
                      $99
                    </span>
                    <span className="font-medium dark:text-gray-600">/mo</span>
                  </p>
                </th>
                <th scope="col">
                  <h2 className="px-2 text-lg font-medium">Enterprise</h2>
                  <p className="mb-3">
                    <span className="text-2xl font-bold sm:text-4xl dark:text-gray-900">
                      $499
                    </span>
                    <span className="font-medium dark:text-gray-600">/yr</span>
                  </p>
                </th>
              </tr>
            </thead>
            <tbody className="space-y-6 text-center divide-y dark:divide-gray-300">
              <tr>
                <th scope="row" className="text-left">
                  <h3 className="py-3">Property Listings</h3>
                </th>
                <td>
                  <span className="block text-sm">1</span>
                </td>
                <td>
                  <span className="block text-sm">10</span>
                </td>
                <td>
                  <span className="block text-sm">Unlimited</span>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-left">
                  <h3 className="py-3">Exposure</h3>
                </th>
                <td>
                  <span className="block text-sm">Standard</span>
                </td>
                <td>
                  <span className="block text-sm">Enhanced</span>
                </td>
                <td>
                  <span className="block text-sm">Maximum</span>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-left">
                  <h3 className="py-3">Support</h3>
                </th>
                <td>
                  <span className="block text-sm">Email Support</span>
                </td>
                <td>
                  <span className="block text-sm">Priority Email Support</span>
                </td>
                <td>
                  <span className="block text-sm">
                    Dedicated Account Manager
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-left">
                  <h3 className="py-3">Analytics Report</h3>
                </th>
                <td>
                  <span className="block text-sm">Monthly</span>
                </td>
                <td>
                  <span className="block text-sm">Weekly</span>
                </td>
                <td>
                  <span className="block text-sm">Daily</span>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-left">
                  <h3 className="py-3">Featured Listings</h3>
                </th>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-label="Not included in Basic plan"
                    className="w-5 h-5 mx-auto dark:text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-label="Included in Pro plan"
                    className="w-5 h-5 mx-auto dark:text-violet-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-label="Included in Enterprise plan"
                    className="w-5 h-5 mx-auto dark:text-violet-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-left">
                  <h3 className="py-3">Custom Branding Options</h3>
                </th>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-label="Not included in Basic plan"
                    className="w-5 h-5 mx-auto dark:text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-label="Not included in Pro plan"
                    className="w-5 h-5 mx-auto dark:text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-label="Included in Enterprise plan"
                    className="w-5 h-5 mx-auto dark:text-violet-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
                <span className="mb-2 block text-lg font-semibold text-primary">
                  FAQ
                </span>
                <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
                  Any Questions? Look Here
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  We, Hacienda, are more than welcome to answer any questions
                  you may have!
                </p>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-1/2">
              <AccordionItem
                header="What is the process for buying a property?"
                text="Answer: The process for buying a property typically involves getting pre-approved for a mortgage, working with a real estate agent to find a suitable property, making an offer, conducting a home inspection, securing financing, and finally, closing the deal. Each step has its own set of details and requirements, so it's important to work closely with professionals throughout the process."
              />
              <AccordionItem
                header="How do I get my property listed on your website?"
                text="Answer: To list your property on our website, you need to contact us and we will guide you through the process. This includes providing details about your property, setting a competitive price, and creating a compelling listing. Our team will handle all the technical aspects and marketing to ensure your property reaches potential buyers."
              />
              <AccordionItem
                header="What should I consider when choosing a neighborhood?"
                text="Answer: When choosing a neighborhood, consider factors such as proximity to work or school, safety, amenities like parks and shopping centers, public transportation, and the overall vibe of the community. Researching school districts, local crime rates, and future development plans can also provide valuable insights into the suitability of a neighborhood for your needs."
              />
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <AccordionItem
                header="How can I determine the value of my home?"
                text="Answer: The value of your home can be determined through a professional appraisal, a comparative market analysis (CMA) conducted by a real estate agent, or online valuation tools. These methods take into account factors like the condition of your home, recent sales of similar properties in your area, and current market trends."
              />
              <AccordionItem
                header="What are the costs associated with buying a home?"
                text="Answer: The costs associated with buying a home include the down payment, closing costs (which can range from 2% to 5% of the purchase price), home inspection fees, appraisal fees, mortgage insurance (if applicable), and moving expenses. It's important to budget for these costs in addition to the purchase price of the home.
"
              />
              <AccordionItem
                header="Can I buy a property if I have bad credit?"
                text="Answer: Yes, it is possible to buy a property with bad credit, but it may be more challenging. Options include securing a loan through a specialized lender, making a larger down payment, finding a co-signer, or improving your credit score before applying for a mortgage. Consulting with a mortgage advisor can help you understand your options and find the best path forward."
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 z-[-1]">
          <svg
            width="1440"
            height="886"
            viewBox="0 0 1440 886"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="1308.65"
                y1="1142.58"
                x2="602.827"
                y2="-418.681"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3056D3" stopOpacity="0.36" />
                <stop offset="1" stopColor="#F5F2FD" stopOpacity="0" />
                <stop offset="1" stopColor="#F5F2FD" stopOpacity="0.096144" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </section>
  );
};

export default Pricing;
