"use client";

import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";

export default function Hero() {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "ease-in",
              }}
            >
              Discover <br />
              Your
              <br /> Next Home
            </motion.h1>
          </div>
          <div className="flexColStart secondaryText flexhero-des">
            <span>
              Find a variety of properties that suit your everyday needs
            </span>
            <span>Forget all difficulties in finding your next home</span>
          </div>

          <SearchBar />
        </div>

        {/* right side */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            className="image-container"
          >
            <img src="./houselogo1.jpg" alt="houses" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
