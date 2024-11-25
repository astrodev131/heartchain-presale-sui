import React from "react";
import { motion } from "framer-motion";

// Animation for fadeIn effect
const fadeIn = {
  hidden: { opacity: 0, y: 50 }, // Start slightly below
  visible: {
    opacity: 1,
    y: 0, // Move to original position
    transition: { duration: 1.5, ease: "easeIn" },
  },
};

const Roadmap: React.FC = () => {
  return (
    <motion.div
      id="roadmap-section"
      className="px-4 py-16 content-center bg-gradient-to-r from-gray-800 to-blue-800 shadow-xl text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Trigger animation when 10% of the component is visible
      variants={fadeIn}
    >
      <h2 className="mt-50 text-5xl mb-16 pt-16 md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text">
        Roadmap
      </h2>
      <img
        className="max-w-full mx-auto rounded-lg"
        src="./landing/roadmap.png"
        alt="Roadmap Visual"
      />
    </motion.div>
  );
};

export default Roadmap;
