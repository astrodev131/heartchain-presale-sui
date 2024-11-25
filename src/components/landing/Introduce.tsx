import React from "react";
import { motion } from "framer-motion";

const Introduce = () => {
  return (
    <section
      className="text-white mt-70 pt-24 pb-50 px-10 md:px-50 bg-opacity-0"
      style={{
        backgroundImage: "url('./landing/Picture1.png')",
        backgroundSize: "1300px",
        backgroundPositionX: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="max-w-6xl text-center ml-auto mr-auto mb-16"
      >
        <h2 className=" text-5xl md:text-5xl lg:text-6xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text text-center font-extrabold">
          Introduction
        </h2>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-6xl mt-40 mx-auto text-center ">
        {/* Left Side - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className=" rounded-xl "
        >
          <div className="flex items-center">
            <p className=" text-17 leading-relaxed text-gray-200">
              HeartChain Inu (HTCN) is an innovative cryptocurrency project
              designed to revolutionize the online matchmaking landscape by
              leveraging the power of blockchain technology and non-fungible
              tokens (NFTs). <br />
              Built on the Sui blockchain, HeartChain Inu aims to create a
              decentralized platform where users can connect, communicate, and
              engage in meaningful relationships through unique digital assets.{" "}
              <br />
              The platform allows users to mint personalized NFTs that serve as
              their digital identity within the ecosystem and means of contact
              on the HeartChain Inu platform, enhancing authenticity and trust
              in online interactions, gamifying the courting process, and
              allowing individuals of both sexes to monetize the ability to chat
              with each other and profit from their courtship experience via
              staking rewards and NFT sales. The Platform will also offer the
              option of local advisors to provide wisdom and guidance, helping
              users avoid the myriad pitfalls that solo-flying “Passport bros”
              often fall victim to.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Introduce;
