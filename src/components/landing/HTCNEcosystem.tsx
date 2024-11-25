import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const HTCNEcosystem: React.FC = () => {
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
        threshold: 0.2,
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
    <section className="text-white py-16 px-10 md:px-50 bg-gradient-to-r from-gray-800 to-blue-800 pt-100 pb-100">
      <div className=" text-5xl md:text-5xl lg:text-6xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text text-center font-extrabold">
        Utility and Use-Case of the HTCN Ecosystem
      </div>
      <div
        ref={ref}
        className="max-w-6xl md:mt-100 mt-30 mx-auto flex flex-col md:flex-row items-center "
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="md:w-1/2 space-y-6 text-center md:text-left"
        >
          <p className="text-17 text-gray-300 leading-relaxed">
            The HTCN ecosystem is designed to address modern relationship
            challenges. Through blockchain-backed, verifiable connections, it
            offers an authentic and secure platform for users seeking meaningful
            relationships. By minting NFTs, users create lasting digital
            memories of their connections. This innovative approach combines the
            emotional significance of traditional tokens with the transparency
            and value of blockchain assets, making it a unique solution in the
            relationship space.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0"
        >
          <img
            src="./landing/Picture17.png"
            alt="HTCN Ecosystem Illustration"
            className="w-full h-auto max-w-md rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HTCNEcosystem;
