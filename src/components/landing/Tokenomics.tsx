import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const Tokenomics: React.FC = () => {
  return (
    <motion.section
      className="text-gray-800 py-16 px-4 max-w-screen-2xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeInUp}
    >
      {/* Header */}
      <motion.h2
        className="text-4xl mt-80 md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-800 text-transparent text-center bg-clip-text mb-12"
        variants={fadeInUp}
      >
        HTCN Tokenomics
      </motion.h2>

      {/* Token Utility */}
      <div className="text-center mt-60 py-12">
        <div className="gap-20 flex justify-center flex-wrap">
          {/* Card Template */}
          {[
            {
              title: "Minting & Purchasing",
              description: "Minting and purchasing Flirt, FM2TM.",
              svgPath:
                "M12 8c-3.31 0-6 1.79-6 4s2.69 4 6 4 6-1.79 6-4-2.69-4-6-4zM12 4v4M8 12h.01M16 12h.01M12 16v2",
            },
            {
              title: "Governance",
              description:
                "Participating in platform governance through voting on key decisions.",
              svgPath: "M6 12h12M6 8h12M6 16h12M4 6h16v12H4z",
            },
            {
              title: "Rewards",
              description:
                "Rewarding users for engagement and contributions to the community.",
              svgPath:
                "M12 8.5c1.381 0 2.5 1.119 2.5 2.5s-1.119 2.5-2.5 2.5-2.5-1.119-2.5-2.5 1.119-2.5 2.5-2.5zM12 2v4m0 12v4m4.39-10.11l2.83-2.83m-14.83 2.83L7.61 8.89m0 6.22L4.78 18.94m14.83-2.83L16.39 15.11",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="group relative cursor-pointer overflow-hidden bg-white rounded-2xl mx-auto px-6 pt-20 pb-16 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-500 transform hover:scale-105 justify-center flex flex-wrap hover:shadow-3xl min-w-10 w-full xl:max-w-sm max-w-2xl"
              variants={fadeInUp}
            >
              <span className="absolute top-0 left-0 z-0 h-42 w-42 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-75 transition-all duration-500 transform group-hover:scale-[20]" />
              <div className="relative z-0 mx-auto max-w-xs">
                <span className="grid h-50 w-50 place-items-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 transform group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-yellow-500">
                  <svg
                    className="h-30 w-30 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={card.svgPath}
                    />
                  </svg>
                </span>
                <div className="space-y-6 pt-6 text-lg leading-8 text-gray-700 transition-all duration-500 group-hover:text-white">
                  <h3 className="text-2xl  text-blue-800 font-semibold group-hover:text-white">
                    {card.title}
                  </h3>
                  <p className="font-medium">{card.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <br></br>
      <motion.div
        className="items-center mx-auto flex-col xl:flex-row justify-around xl:flex mb-16"
        variants={fadeInUp}
      >
        <div className="w-full xl:w-1/2 mb-4 xl:mb-0">
          <img
            src="./landing/Picture101.png"
            alt="HeartChain Inu Illustration"
            className="w-11/12 md:max-w-2xl h-auto mx-auto rounded-lg"
          />
        </div>
        <div className="w-full xl:w-1/2">
          <img
            src="./landing/Picture105png.png"
            alt="HTCN Token"
            className="w-11/12 md:max-w-2xl mx-auto h-auto rounded-lg"
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Tokenomics;
