import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

// Generate random directions for each card
const getRandomDirection = () => {
  const directions = [
    { x: "-100%", y: "0%" }, // From left
    { x: "100%", y: "0%" }, // From right
    { x: "0%", y: "-100%" }, // From top
    { x: "0%", y: "100%" }, // From bottom
  ];
  return directions[Math.floor(Math.random() * directions.length)];
};

const cardData = [
  {
    title: "Team",
    description:
      "The HeartChain Inu team consists of experienced professionals from various fields, including blockchain development, digital marketing, and relationship psychology. Our diverse backgrounds enable us to create a platform that meets the needs of modern users while ensuring technological robustness.",
    image: "/landing/images (2).jpg", // Replace with actual image path
  },
  {
    title: "Addressing Potential Risks",
    description: (
      <ul className="text-gray-700 leading-relaxed space-y-3 list-disc list-inside pl-4">
        <li>
          <strong>Market Competition:</strong> We plan to differentiate
          ourselves through our unique features and strong community engagement.
        </li>
        <li>
          <strong>Regulatory Challenges:</strong> We will ensure compliance with
          all applicable laws to safeguard our users' and investors' interests.
        </li>
        <li>
          <strong>User Adoption:</strong> Gaining user trust is crucial. We will
          prioritize transparency and security throughout our platform's
          development and operation.
        </li>
        <li>
          <strong>Standards Adherence:</strong> Users will be held to strict yet
          reasonable standards of behaviour at all levels.
        </li>
      </ul>
    ),
    image: "/landing/imageswsd.jpg", // Replace with actual image path
  },
  {
    title: "Conclusion",
    description:
      "HeartChain Inu (HTCN) represents a groundbreaking approach to online matchmaking by combining blockchain technology with personalized NFTs. By fostering authentic connections through verified identities, we aim to create a safer and more engaging environment for users seeking meaningful relationships. Join us as we redefine love in the digital age!",
    image: "/landing/images (1).jpg", // Replace with actual image path
  },
];

const HeartChainInfo: React.FC = () => {
  return (
    <motion.section
      className="px-6 py-16 rounded-xl mb-50 max-w-screen-xl mx-auto text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeInUp}
    >
      {/* Header */}
      <motion.h2
        className="text-5xl md:text-5xl mt-80 lg:text-6xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text text-center font-extrabold"
        variants={fadeInUp}
      >
        HeartChain Inu
      </motion.h2>

      {/* Cards Container */}
      <div className="text-center mt-5 md:30 py-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cardData.map((card, index) => {
          const direction = getRandomDirection();
          return (
            <motion.div
              key={index}
              className={`group mt-30 relative cursor-pointer overflow-hidden bg-white rounded-2xl px-6 pt-20 pb-16 ring-1 ring-gray-900/5 transition-all duration-500 transform hover:scale-105 ${
                card.title === "Conclusion" ? ":col-span-2 lg:col-span-1" : ""
              }`} // Apply different class for "Conclusion" card
              initial={{
                opacity: 0,
                x: direction.x,
                y: direction.y,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                transition: { duration: 1, ease: "easeOut" },
              }}
            >
              {/* Image */}
              <div className="relative z-10 flex flex-col items-center">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-auto w-11/12 rounded-lg mb-6 object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
                />
                <motion.h3
                  className="text-2xl font-semibold text-blue-800 group-hover:text-purple-600 mb-4"
                  variants={fadeInUp}
                >
                  {card.title}
                </motion.h3>
                <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 text-start p-20">
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default HeartChainInfo;
