import React from "react";

const Contactus = () => {
  return (
    <div>
      <section className="body-font relative bg-gray-900 text-gray-400">
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                Location
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Hacienda
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                At Hacienda, our mission is to empower buyers and sellers with
                knowledge, support, and personalized service. Driven by a
                passion for people and properties, we strive to exceed
                expectations and build lasting relationships.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
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
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
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
              </dl>
            </div>
          </div>
        </div>
      </section>
      <section className="body-font relative bg-gray-900 text-gray-400">
        <div className="container mx-auto px-5 py-24">
          <div className="mb-12 flex w-full flex-col text-center">
            <h1 className="title-font mb-4 text-2xl font-medium text-white sm:text-3xl">
              Contact Us
            </h1>
            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
              Feel free to reach out to us! Whether you have a question,
              feedback, or a collaboration proposal, we&apos;d love to hear from
              you.
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
                <p className="my-5 leading-normal">Email Us!</p>
                <a className="text-blue-400">hacienda@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contactus;
