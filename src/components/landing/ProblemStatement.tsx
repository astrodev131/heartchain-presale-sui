import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProblemStatement: React.FC = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isInView]);

  return (
    <section ref={ref} className="text-white pb-16 ">
      {/* Problem Statement Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="max-w-full mx-auto bg-gradient-to-r from-gray-800 to-blue-800 shadow-xl mb-16"
      >
        <div className="text-center">
          <h2 className="text-5xl mb-40 pt-80 md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text">
            Problem Statement
          </h2>
          <p className="text-gray-300 px-10 md:px-50 text-17 md:text-2xl leading-relaxed max-w-4xl mx-auto">
            HeartChain Inu aims to solve key challenges in crypto-based online
            matchmaking, including authenticity, privacy, and gender balance.{" "}
            <br />
            By using facially verified NFTs, our platform ensures users are who
            they claim to be, creating a trustworthy environment. We also
            address privacy concerns by implementing KYC without storing
            sensitive data, and we incentivize balanced participation through
            airdrops and dedicated support for female users.
          </p>
        </div>
        <div className="flex justify-center mb-40">
          <img
            src="./landing/Picture6.png"
            alt="HeartChain Inu Illustration"
            className="w-full max-w-md md:max-w-2xl h-auto rounded-lg"
          />
        </div>
      </motion.div>
      {/* NFT Types Section */}
    </section>
  );
};

export default ProblemStatement;
