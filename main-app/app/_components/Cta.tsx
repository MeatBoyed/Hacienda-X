import React from "react";
import "./cta.css"; // Import CSS file
import cta1 from "@/ctapic1/r1.jpg";

const CallToAction: React.FC = () => {
  return (
    <section className="articles">
      <article>
        <div className="article-wrapper">
          <figure>
            <img src="./ctapic2.jpg" alt="" />
          </figure>
          <div className="article-body">
            <h2>Sign Up Today</h2>
            <p>
              Sign Up Now! Personalized property alerts, and insider tips from
              our expert agents. Do not miss out on your dream home – join our
              community today!
            </p>
            <a href="./sign-in" className="button1 read-more">
              Sign UP<span className="sr-only">about this is some title</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
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
      <article>
        <div className="article-wrapper">
          <figure>
            <img src="./ctapic4.jpg" alt="" />
          </figure>
          <div className="article-body">
            <h2>Buy Property Now!</h2>
            <p>
              Ready to make your homeownership dreams a reality? Explore a
              diverse range of properties tailored to your preferences and
              budget.
            </p>
            <a href="./property-for-sale" className="button1 read-more">
              Browse Properties{" "}
              <span className="sr-only">about this is some title</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
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
      <article>
        <div className="article-wrapper">
          <figure>
            <img src="./ctapic5.jpg" alt="" />
          </figure>
          <div className="article-body">
            <h2>Discover Our Story!</h2>
            <p>
              We are your trusted partners in finding your perfect home. <br />
              Discover our story and let us help you write the next chapter of
              yours.
            </p>
            <a href="./aboutus" className="button1 read-more">
              Learn More{" "}
              <span className="sr-only">about this is some title</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
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
};

export default CallToAction;
