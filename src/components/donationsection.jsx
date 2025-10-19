import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const JourneySection = () => {
  const [progress, setProgress] = useState(72); // Example: 72% towards wellness project goals

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-24 sm:py-32 font-poppins overflow-hidden bg-gradient-to-b from-[#fff6f6]/80 via-[#fbe9eb]/60 to-[#f9e0e1]/80 backdrop-blur-xl">
      {/* Floating Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(7)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-40 h-40 rounded-full bg-[#b08688]/25 blur-[120px]"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3,
            }}
            animate={{
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 40 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-14 lg:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
        >
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-[#2f2f2f] drop-shadow-[0_3px_8px_rgba(255,255,255,0.5)]">
              Join the Healing Journey
            </h2>
            <p className="text-base sm:text-lg text-gray-700 opacity-80 mb-8 max-w-xl mx-auto md:mx-0">
              We’re building a community of emotional balance, mindful awareness,
              and holistic healing. Be part of a movement that inspires peace,
              compassion, and renewal — within and around you.
            </p>
            <Link
              to="/join"
              className="inline-block px-8 py-3 bg-[#b08688] text-white rounded-full font-semibold shadow-lg hover:bg-[#a46c70] transition-all duration-500 hover:shadow-2xl hover:scale-[1.05]"
            >
              Join the Movement
            </Link>
          </div>

          {/* Right Column — “Community Growth” Visualization */}
          <div className="md:w-1/2 w-full">
            <motion.div
              className="p-8 bg-white/25 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-6 text-[#2f2f2f]">
                Our Collective Growth
              </h3>

              {/* Progress Bar */}
              <div className="bg-white/40 rounded-full h-4 mb-4">
                <motion.div
                  className="bg-gradient-to-r from-[#b08688] to-[#d2a1a4] h-full rounded-full shadow-md"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                ></motion.div>
              </div>

              <p className="text-sm sm:text-base text-gray-700 mb-8">
                {progress}% of our goal to reach 10,000 mindful souls
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-white/30 backdrop-blur-sm border border-white/30 rounded-2xl shadow-md"
                >
                  <div className="text-3xl font-bold text-[#b08688]">8.4k+</div>
                  <div className="text-sm text-[#2f2f2f]">Community Members</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-white/30 backdrop-blur-sm border border-white/30 rounded-2xl shadow-md"
                >
                  <div className="text-3xl font-bold text-[#b08688]">120+</div>
                  <div className="text-sm text-[#2f2f2f]">Healing Circles</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-white/30 backdrop-blur-sm border border-white/30 rounded-2xl shadow-md col-span-2 sm:col-span-1"
                >
                  <div className="text-3xl font-bold text-[#b08688]">50+</div>
                  <div className="text-sm text-[#2f2f2f]">Mindful Projects</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
