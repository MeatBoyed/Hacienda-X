import React from "react";

const ContactFormPage = () => {
  return (
    <div>
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Location
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Store
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in, accusamus quisquam.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Address
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    123 Main St, Suite 100
                    <br />
                    Anytown, USA 12345
                  </dd>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Phone number
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    (555) 555-5555
                  </dd>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Email
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    info@ourstore.com
                  </dd>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Store Hours
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Monday - Friday: 9am to 8pm
                    <br />
                    Saturday: 10am to 6pm
                    <br />
                    Sunday: 12pm to 4pm
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <section className="body-font relative bg-gray-900 text-gray-400">
        <div className="container mx-auto px-5 py-24">
          <div className="mb-12 flex w-full flex-col text-center">
            <h1 className="title-font mb-4 text-2xl font-medium text-white sm:text-3xl">
              Contact Us
            </h1>
            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
              Feel free to reach out to us! Whether you have a question,
              feedback, or a collaboration proposal, we'd love to hear from you.
            </p>
          </div>
          <div className="mx-auto md:w-2/3 lg:w-1/2">
            <div className="mb-8 flex flex-wrap -m-2">
              <div className="w-1/2 p-2">
                <input
                  className="w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 px-4 py-2 text-base text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900"
                  placeholder="Name"
                  type="text"
                />
              </div>
              <div className="w-1/2 p-2">
                <input
                  className="w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 px-4 py-2 text-base text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div className="w-full p-2">
                <input
                  className="w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 px-4 py-2 text-base text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900"
                  placeholder="Subject"
                  type="text"
                />
              </div>
              <div className="w-full p-2">
                <textarea
                  className="h-32 w-full resize-none rounded border border-gray-700 bg-gray-800 bg-opacity-40 px-4 py-2 text-base text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900"
                  placeholder="Message"
                ></textarea>
              </div>
              <div className="w-full p-2">
                <button className="mx-auto flex rounded border-0 bg-indigo-500 px-8 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none">
                  Submit
                </button>
              </div>
              <div className="mt-8 w-full border-t border-gray-800 p-2 pt-8 text-center">
                <a className="text-indigo-400">info@ourstore.com</a>
                <p className="my-5 leading-normal">
                  123 Main St, Suite 100
                  <br />
                  Anytown, USA 12345
                </p>
                <span className="inline-flex justify-center">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3.3C13.7 2 12 3.8 12 6.3v3.4H9v3.6h3v9.3h3.8V13.3h2.7l.5-3.6h-3.3V6.6c0-.7.4-1.3 1.3-1.3H18V2z"></path>
                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.1 1.5 4.5 4.5 0 00-7.9 3.1c0 .3 0 .7.1 1A12.8 12.8 0 013 4s-4 9 5 13c-1 .2-2 .3-3 .1 2.2 7 11 4 11-3.1a4.5 4.5 0 004-4.1c.8-.6 1.5-1.2 2-2z"></path>
                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        width="20"
                        height="20"
                        x="2"
                        y="2"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.4a4 4 0 01-7.4 2.2A4 4 0 1112 8c.6 0 1.1.1 1.6.3"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="none"
                        d="M16 8a6 6 0 00-5.92 5.09 5.3 5.3 0 00-3.7 1.61 5.3 5.3 0 00-1.61 3.7A6 6 0 1016 8zm-8 6h.01M12 17a4 4 0 100-8 4 4 0 000 8zm0 0h.01"
                      ></path>
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactFormPage;
