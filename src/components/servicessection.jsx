import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import {
  Sparkles,
  Heart,
  Mic,
  Flower2,
  Headphones,
  HandHeart,
} from "lucide-react";
import { Link } from "react-router-dom";

const iconComponents = {
  Sparkles,
  Heart,
  Mic,
  Flower2,
  Headphones,
  HandHeart,
};

const ServicesSection = () => {
  const [services] = useState([
    {
      id: 1,
      title: "Spiritual Healing",
      description:
        "Align your inner energy and experience peace through guided healing sessions.",
      icon: "Flower2",
      slug: "spiritual-healing",
    },
    {
      id: 2,
      title: "Emotional Wellness",
      description:
        "Transform anxiety into calm and rediscover joy through emotional balance practices.",
      icon: "Heart",
      slug: "emotional-wellness",
    },
    {
      id: 3,
      title: "Meditation Therapy",
      description:
        "Personalized meditations crafted to help you slow down and reconnect within.",
      icon: "Sparkles",
      slug: "meditation-therapy",
    },
    {
      id: 4,
      title: "Healing Audio Sessions",
      description:
        "Listen to soulful audio journeys that guide you into serenity and awareness.",
      icon: "Headphones",
      slug: "audio-sessions",
    },
    {
      id: 5,
      title: "Video Podcasts",
      description:
        "Explore deep, healing conversations that nourish the mind and soul.",
      icon: "Mic",
      slug: "video-podcasts",
    },
    {
      id: 6,
      title: "Personal Guidance",
      description:
        "One-on-one sessions to help you find clarity, alignment, and emotional grounding.",
      icon: "HandHeart",
      slug: "personal-guidance",
    },
  ]);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax movement for glowing orbs
  const translateX = useTransform(mouseX, [0, 1], [-30, 30]);
  const translateY = useTransform(mouseY, [0, 1], [-20, 20]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-pink-50/80 via-rose-100/60 to-white/80 font-poppins transition-all duration-1000"
    >
      {/* Cinematic glowing orbs with responsive sizes */}
      <motion.div
        style={{ x: translateX, y: translateY }}
        className="absolute top-4 sm:top-8 left-4 sm:left-8 w-32 sm:w-40 h-32 sm:h-40 bg-rose-200/50 rounded-full blur-xl opacity-70 animate-pulse"
      ></motion.div>
      <motion.div
        style={{ x: translateY, y: translateX }}
        className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-48 sm:w-60 h-48 sm:h-60 bg-pink-300/40 rounded-full blur-xl opacity-60 animate-pulse"
      ></motion.div>

      {/* Heading with refined styling */}
      <motion.div
        className="relative text-center mb-8 sm:mb-10 md:mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-rose-800 mb-2 sm:mb-3 drop-shadow-[0_1px_4px_rgba(212,163,163,0.2)]">
          Healing & Therapy Services
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md sm:max-w-lg md:max-w-xl mx-auto leading-relaxed">
          Explore healing experiences through soulful podcasts, meditations, and personal guidance.
        </p>
      </motion.div>

      {/* Service Cards with enhanced grid and responsiveness */}
      <motion.div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4 md:px-6 lg:px-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service, i) => {
          const Icon = iconComponents[service.icon];
          return (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(212,163,163,0.3)" }}
              transition={{ duration: 0.5 }}
              className="relative group rounded-xl p-4 sm:p-6 text-center backdrop-blur-md bg-white/20 border border-white/20 shadow-md hover:shadow-lg transition-all duration-500"
            >
              {/* Inner light reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-pink-100/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>

              <div className="relative z-10 flex flex-col items-center space-y-3 sm:space-y-4">
                <div className="bg-gradient-to-br from-rose-200/60 to-pink-100/60 rounded-full p-3 sm:p-4 shadow-inner group-hover:shadow-pink-300/50 transition-shadow duration-300">
                  {Icon && <Icon size={32} sm:size={38} className="text-rose-700" />}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-rose-800 line-clamp-1">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2">
                  {service.description}
                </p>
                <Link
                  to={`/service/${service.slug}`}
                  className="mt-2 sm:mt-3 inline-block bg-gradient-to-r from-rose-500/90 to-pink-500/90 hover:from-pink-600 hover:to-rose-600 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium shadow-md hover:shadow-rose-300/40 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Contact CTA with improved styling */}
      <motion.div
        className="text-center mt-12 sm:mt-16 md:mt-20"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-rose-800 mb-4">
          Ready to Begin Your Healing Journey?
        </h3>
        <Link
          to="/contact"
          className="bg-gradient-to-r from-pink-500/90 to-rose-600/90 hover:from-rose-600 hover:to-pink-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold shadow-md hover:shadow-rose-300/50 transition-all duration-300"
        >
          Contact Me
        </Link>
      </motion.div>
    </section>
  );
};

export default ServicesSection;