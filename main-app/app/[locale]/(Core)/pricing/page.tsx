// pricingplan.tsx
"use client";
import React from "react";
import "./pricing.css";
import "reactjs-popup/dist/index.css";
import { AccordionItem, List, PricingCard } from "../_components/PricingCard";
import { useTranslations } from "next-intl";

export default function PricingPage() {
  const t = useTranslations("Pricing");
  return (
    <section className="relative z-10 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <span className="mb-2 block text-lg font-semibold text-primary">{t("subHeading")}</span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                {t("heading")}
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">{t("content")}</p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="-mx-4 flex flex-wrap">
            <PricingCard
              type={t("enterprisePlan.type")}
              price={t("enterprisePlan.price")}
              subscription={t("enterprisePlan.subscription")}
              description={t("enterprisePlan.description")}
              buttonText={t("enterprisePlan.button")}
              className="border-solid border-4 border-blue-600"
            >
              <List>{t("enterprisePlan.feature1")}</List>
              <List>{t("enterprisePlan.feature2")}</List>
              <List>{t("enterprisePlan.feature3")}</List>
              <List>{t("enterprisePlan.feature4")}</List>
              <List>{t("enterprisePlan.feature5")}</List>
              <List>{t("enterprisePlan.feature6")}</List>
            </PricingCard>

            <PricingCard
              type={t("proPlan.type")}
              price={t("proPlan.price")}
              subscription={t("proPlan.subscription")}
              description={t("proPlan.description")}
              buttonText={t("proPlan.button")}
              active
              className="border-solid border-4 border-black"
            >
              <List>{t("proPlan.feature1")}</List>
              <List>{t("proPlan.feature2")}</List>
              <List>{t("proPlan.feature3")}</List>
              <List>{t("proPlan.feature4")}</List>
              <List>{t("proPlan.feature5")}</List>
            </PricingCard>
            <PricingCard
              type={t("basicPlan.type")}
              price={t("basicPlan.price")}
              subscription={t("basicPlan.subscription")}
              description={t("basicPlan.description")}
              buttonText={t("basicPlan.button")}
              className="border-solid border-4 border-gray-400"
            >
              <List>{t("basicPlan.feature1")}</List>
              <List>{t("basicPlan.feature2")}</List>
              <List>{t("basicPlan.feature3")}</List>
              <List>{t("basicPlan.feature4")}</List>
            </PricingCard>
          </div>
        </div>
      </div>

      {/* TODO: Kay-Daniel - Translate the table */}
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
                    <span className="text-2xl font-bold sm:text-4xl dark:text-gray-900">$29</span>
                    <span className="font-medium dark:text-gray-600">/mo</span>
                  </p>
                </th>
                <th scope="col">
                  <h2 className="px-2 text-lg font-medium">Pro</h2>
                  <p className="mb-3">
                    <span className="text-2xl font-bold sm:text-4xl dark:text-gray-900">$99</span>
                    <span className="font-medium dark:text-gray-600">/mo</span>
                  </p>
                </th>
                <th scope="col">
                  <h2 className="px-2 text-lg font-medium">Enterprise</h2>
                  <p className="mb-3">
                    <span className="text-2xl font-bold sm:text-4xl dark:text-gray-900">$499</span>
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
                  <span className="block text-sm">Dedicated Account Manager</span>
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
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
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
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
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
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
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
                <span className="mb-2 block text-lg font-semibold text-primary">{t("FAQ.subHeading")}</span>
                <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">{t("FAQ.heading")}</h2>
                <p className="text-base text-body-color dark:text-dark-6">{t("FAQ.content")}</p>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-1/2">
              <AccordionItem header="{t('question1.question')}" text="{t('question1.answer')}" />
              <AccordionItem header="{t('question2.question')}" text="{t('question2.answer')}" />
              <AccordionItem header="{t('question3.question')}" text="{t('question3.answer')}" />
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <AccordionItem header="{t('question4.question')}" text="{t('question4.answer')}" />
              <AccordionItem header="{t('question5.question')}" text="{t('question5.answer')}" />
              <AccordionItem header="{t('question6.question')}" text="{t('question6.answer')}" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 z-[-1]">
          <svg width="1440" height="886" viewBox="0 0 1440 886" fill="none" xmlns="http://www.w3.org/2000/svg">
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
}
