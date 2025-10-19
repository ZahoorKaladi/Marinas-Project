import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- Constants ---
const audioTracks = [
  {
    id: 1,
    title: "Guided Calm Meditation",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    thumb: "https://images.pexels.com/photos/3822623/pexels-photo-3822623.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 2,
    title: "Breath & Grounding Practice",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    thumb: "https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 3,
    title: "Evening Reflection Audio",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    thumb: "https://images.pexels.com/photos/3822617/pexels-photo-3822617.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];

const blogCards = [
  {
    title: "Healing Through Sound",
    text: "Discover how therapeutic frequencies calm the nervous system and promote balance.",
    image: "https://images.pexels.com/photos/3822623/pexels-photo-3822623.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Mindfulness in Motion",
    text: "Explore gentle movements that connect your breath and body for deep peace.",
    image: "https://images.pexels.com/photos/3822617/pexels-photo-3822617.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "The Art of Stillness",
    text: "Learn how to cultivate stillness and awareness through guided meditations.",
    image: "https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export default function MissionSection() {
  const [hovered, setHovered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" }); // Animation trigger on scroll

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY * 0.2);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const orbs = useMemo(() => {
    if (prefersReducedMotion) return [];
    const orbCount = isSmallScreen ? 3 : isTablet ? 5 : 7;
    const maxSize = isSmallScreen ? 50 : isTablet ? 70 : 90;
    return Array.from({ length: orbCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 25 + Math.random() * maxSize,
      opacity: 0.1 + Math.random() * 0.15,
    }));
  }, [isSmallScreen, isTablet, prefersReducedMotion]);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: !prefersReducedMotion,
    autoplaySpeed: 7000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isSmallScreen,
    pauseOnHover: true,
    adaptiveHeight: true,
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      { breakpoint: 1024, settings: { arrows: false } },
      { breakpoint: 640, settings: { arrows: false, dots: true } },
    ],
  };

  // Dynamic background images for desktop and mobile
  const bgImage = isSmallScreen
    ? "https://images.pexels.com/photos/45201/pexels-photo-45201.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200" // Mobile: Softer nature scene
    : "https://images.pexels.com/photos/6341545/pexels-photo-6341545.jpeg?auto=compress&cs=tinysrgb&w=1600"; // Desktop: Original floral

  return (
    <section
      ref={containerRef}
      className="relative py-12 sm:py-16 md:py-24 lg:py-28 overflow-hidden rounded-2xl min-h-screen font-poppins"
      style={{
        backgroundImage: isSmallScreen
          ? `linear-gradient(180deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.25)), linear-gradient(180deg, rgba(255, 170, 180, 0.2), rgba(255, 182, 193, 0.15)), url('${bgImage}')` // Darker overlay for mobile contrast
          : `linear-gradient(180deg, rgba(7, 3, 3, 0.3), rgba(12, 7, 10, 0.2)), url('${bgImage}')`,
        backgroundSize: isSmallScreen ? "contain" : "cover",
        backgroundPosition: "center",
        backgroundPositionY: isSmallScreen ? "center" : `${scrollY}px`, // Parallax effect on non-mobile
        backgroundRepeat: "no-repeat",
        backgroundAttachment: isSmallScreen ? "scroll" : "fixed",
      }}
    >
      {!prefersReducedMotion && orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full pointer-events-none animate-pulseLight"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: "radial-gradient(circle at 30% 30%, rgba(255, 170, 180, 0.5), rgba(255,255,255,0.05))",
            filter: `blur(8px)`,
            zIndex: 10,
          }}
          animate={{
            y: [0, isSmallScreen ? 5 : 15, 0],
            opacity: [orb.opacity, orb.opacity + 0.15, orb.opacity],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white font-poppins"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
<div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 lg:gap-12 text-center md:text-left">
  <motion.div
    className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full p-[3px] backdrop-blur-sm border border-white/30 shadow-lg transition-transform flex-shrink-0 mx-auto"
    onMouseEnter={() => !isSmallScreen && setHovered(true)}
    onMouseLeave={() => !isSmallScreen && setHovered(false)}
    whileTap={{ scale: isSmallScreen ? 1.05 : 1 }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={isInView ? { opacity: 1, scale: 1 } : {}}
    whileHover={{
      scale: 1.1,
      boxShadow: "0 0 25px rgba(212, 163, 163, 0.8)",
    }}
    transition={{
      duration: 0.4,
      ease: "easeOut",
      scale: { type: "spring", stiffness: 300, damping: 20 },
      boxShadow: { duration: 0.6, repeat: Infinity, repeatType: "reverse" },
    }}
  >
    <img
      src="https://images.pexels.com/photos/6919996/pexels-photo-6919996.jpeg?auto=compress&cs=tinysrgb&w=900"
      alt="Therapist"
      className="w-full h-full object-cover rounded-full"
      loading="lazy"
    />
  </motion.div>

  <div className="flex-1 mt-6 md:mt-0 text-center md:text-left px-4 sm:px-6">
    <motion.h3
      className="font-semibold text-white drop-shadow-md text-balance text-[1.25rem] xs:text-[1.4rem] sm:text-3xl md:text-4xl lg:text-5xl leading-snug sm:leading-tight tracking-tight"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <span className="text-[#d4a3a3]">Marina</span> Spiritual Therapist & Host
    </motion.h3>
    <motion.p
      className="mt-3 sm:mt-5 text-[0.85rem] xs:text-[0.9rem] sm:text-base md:text-lg text-white/85 max-w-md sm:max-w-lg md:max-w-xl mx-auto md:mx-0 leading-relaxed sm:leading-loose tracking-wide"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      Guiding you through sound healing, mindfulness, and deep emotional clarity.
      Join me in exploring meditative audio journeys and soulful reflections
      crafted to calm your inner world.
    </motion.p>
  </div>


          <motion.div
            className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 max-w-[300px] sm:max-w-none mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button className="w-full sm:w-auto px-4 py-3 min-h-[44px] text-[0.7rem] sm:text-sm rounded-lg bg-white/15 border border-white/20 hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
              Book a Session
            </button>
            <button className="w-full sm:w-auto px-4 py-3 min-h-[44px] text-[0.7rem] sm:text-sm rounded-lg bg-[#B08688]/85 hover:bg-[#9c7375] focus:outline-none focus:ring-2 focus:ring-[#B08688]/50 transition-all duration-300 transform hover:scale-105">
              Explore Podcasts
            </button>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 sm:mt-14 lg:mt-20 px-4 sm:px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h4 className="text-white font-semibold text-center text-[1.25rem] xs:text-[1.4rem] sm:text-2xl lg:text-3xl leading-snug sm:leading-tight tracking-tight mb-6 sm:mb-8">
            Featured Audio Experiences
          </h4>
          <div className="mt-6 sm:mt-10 lg:mt-16 px-3 xs:px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-full xs:max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
              <Slider {...settings} className="relative z-30">
                {audioTracks.map((t, idx) => (
                  <motion.div
                    key={t.id}
                    className="px-2 py-3 xs:px-3 sm:px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: idx * 0.1 + 0.7 }}
                  >
                    <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-pink-200/30 bg-gradient-to-br from-white/10 via-pink-50/5 to-fuchsia-100/10 backdrop-blur-md shadow-lg hover:shadow-pink-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50">
                      <div className="relative aspect-video">
                        <img
                          src={t.thumb}
                          alt={t.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                        <div className="absolute left-3 xs:left-4 sm:left-5 bottom-3 xs:bottom-4 sm:bottom-5 text-white">
                          <h5 className="font-semibold text-sm xs:text-base sm:text-lg md:text-xl leading-tight drop-shadow-md max-w-[85%] line-clamp-2">
                            {t.title}
                          </h5>
                          <p className="text-xs xs:text-sm text-white/70 mt-1">Session {idx + 1}</p>
                        </div>
                      </div>
                      <div className="p-2 xs:p-3 sm:p-4 bg-white/5">
                        <div className="flex items-center space-x-2 xs:space-x-3">
                          <button className="p-1.5 xs:p-2 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-lg hover:shadow-pink-500/30 transition-all min-w-[36px] min-h-[36px] flex-shrink-0">
                            <svg className="w-3 h-3 xs:w-4 xs:h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </button>
                          <div className="flex-1 mx-1 xs:mx-2 min-w-0">
                            <div className="w-full bg-gray-200/30 rounded-full h-1.5 xs:h-2">
                              <div className="bg-gradient-to-r from-pink-500 to-fuchsia-600 h-1.5 xs:h-2 rounded-full w-1/3"></div>
                            </div>
                          </div>
                          <span className="text-[0.65rem] xs:text-xs text-gray-300 font-medium flex-shrink-0">
                            0:00 / 3:45
                          </span>
                        </div>
                        <div className="mt-2 xs:mt-3 w-full">
                          <audio
                            controls
                            src={t.src}
                            className="w-full rounded-lg bg-white/10 border border-pink-200/20 h-8 xs:h-9 [&::-webkit-media-controls-panel]:bg-gradient-to-r [&::-webkit-media-controls-panel]:from-pink-500 [&::-webkit-media-controls-panel]:to-fuchsia-600 [&::-webkit-media-controls-current-time-display]:text-white [&::-webkit-media-controls-time-remaining-display]:text-white [&::-webkit-media-controls-timeline]:bg-white/30 [&::-webkit-media-controls-timeline]:rounded-full [&::-webkit-media-controls-volume-slider]:bg-white/30 text-xs"
                          >
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Slider>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 flex flex-col items-center sm:flex-none">
            {blogCards.map((card, i) => (
              <motion.div
                key={i}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer animate-pulseLight w-full max-w-md sm:max-w-none mx-auto sm:mx-0 flex flex-col"
                style={{ minWidth: 0 }}
                whileHover={{ y: isSmallScreen ? 0 : -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.9 }}
              >
                <div className="relative aspect-video w-full">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 xs:p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <h5 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold mb-1 xs:mb-2 line-clamp-2 text-white break-words">
                    {card.title}
                  </h5>
                  <p className="text-xs xs:text-sm sm:text-base text-white/85 mb-2 xs:mb-3 leading-relaxed line-clamp-3 flex-1 break-words">
                    {card.text}
                  </p>
                  <button className="text-[#B08688] hover:text-[#d1a3a3] text-xs xs:text-sm font-medium transition-colors duration-300 focus:outline-none focus:underline self-start">
                    Read More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}