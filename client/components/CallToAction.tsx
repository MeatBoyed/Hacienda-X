import React from "react";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="call-to-action">
      <h1 className="primaryText">Want To Add Your Properties?</h1>
      <Link href="/priceplan">
        <button className="learn-more-button">Learn More</button>
      </Link>
    </section>
  );
};

export default CallToAction;
