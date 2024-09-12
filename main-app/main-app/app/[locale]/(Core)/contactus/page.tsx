import React from "react";
import { getTranslations } from "next-intl/server";

export default async function ContactUs() {
  const t = await getTranslations("Contact");

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase"></h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">{t("companyName")}</p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">{t("mission")}</p>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-5 py-24">
        <div className="flex flex-wrap items-start justify-center gap-12">
          <div className="flex flex-col w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="title-font mb-4 text-2xl font-medium text-white sm:text-3xl">{t("contactUs")}</h1>
            <p className="text-base leading-relaxed mb-4 text-gray-400">{t("contactMessage")}</p>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-200">{t("emailLabel")}</dt>
                  <dd className="mt-2 text-base text-gray-400">{t("email")}</dd>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-200">{t("phoneLabel")}</dt>
                  <dd className="mt-2 text-base text-gray-400">{t("phone")}</dd>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-black mb-2 text-center">{t("enquiryPrompt")}</h2>
            <p className="text-gray-500 mb-4 text-center">{t("assistanceMessage")}</p>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                {t("formLabels.name")}
              </label>
              <input
                id="name"
                className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-base text-gray-800 outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                placeholder={t("formLabels.name")}
                type="text"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                {t("formLabels.email")}
              </label>
              <input
                id="email"
                className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-base text-gray-800 outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                placeholder={t("formLabels.email")}
                type="email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                {t("formLabels.subject")}
              </label>
              <input
                id="subject"
                className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-base text-gray-800 outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                placeholder={t("formLabels.subject")}
                type="text"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                {t("formLabels.message")}
              </label>
              <textarea
                id="message"
                className="h-32 w-full resize-none rounded border border-gray-300 bg-gray-100 px-4 py-2 text-base text-gray-800 outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                placeholder={t("formLabels.message")}
              ></textarea>
            </div>
            <button className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-lg text-white hover:bg-blue-600 focus:outline-none">
              {t("formLabels.submit")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
