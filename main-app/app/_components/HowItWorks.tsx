import React from "react";
import cta1 from "@/ctapic1/r1.jpg";

export default function HowItWorks() {
  return (
    <section className="pt-14 gap-5 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <article className="rounded-lg shadow-lg bg-white transform transition-transform hover:scale-105">
        <div className="article-wrapper p-4">
          <figure className="mb-4">
            <img
              src="./ctapic2.jpg"
              alt=""
              className="w-full h-auto rounded-md"
            />
          </figure>
          <div className="article-body text-center">
            <h2 className="text-2xl font-bold mb-4">Sell Property</h2>
            <p className="mb-4">
              Sell Your Property Now! Personalized property creation. Control
              all your properties from the tips of your fingertips. Do not miss
              out on your home being sold – Sell today!
            </p>
            <a
              href="./sign-in"
              className="button1 read-more inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Sign UP<span className="sr-only">about this is some title</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </article>
      <article className="rounded-lg shadow-lg bg-white transform transition-transform hover:scale-105">
        <div className="article-wrapper p-4">
          <figure className="mb-4">
            <img
              src="./ctapic4.jpg"
              alt=""
              className="w-full h-auto rounded-md"
            />
          </figure>
          <div className="article-body text-center">
            <h2 className="text-2xl font-bold mb-4">Buy Property Now!</h2>
            <p className="mb-4">
              Ready to make your homeownership dreams a reality? Explore a
              diverse range of properties tailored to your preferences and
              budget.
            </p>
            <a
              href="./property-for-sale"
              className="button1 read-more inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Browse Properties
              <span className="sr-only">about this is some title</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </article>
      <article className="rounded-lg shadow-lg bg-white transform transition-transform hover:scale-105">
        <div className="article-wrapper p-4">
          <figure className="mb-4">
            <img
              src="./ctapic5.jpg"
              alt=""
              className="w-full h-auto rounded-md"
            />
          </figure>
          <div className="article-body text-center">
            <h2 className="text-2xl font-bold mb-4">Discover Our Story!</h2>
            <p className="mb-4">
              We are your trusted partners in finding your perfect home. <br />
              Discover our story and let us help you write the next chapter of
              yours.
            </p>
            <a
              href="./aboutus"
              className="button1 read-more inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Learn More
              <span className="sr-only">about this is some title</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
