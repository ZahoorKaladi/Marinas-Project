import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from 'react';
const CTA_COLOR_CLASS = "bg-[#B08688] hover:bg-[#c060a1]";

const dummyPosts = [
  {
    id: 1,
    title: "Embracing Mindfulness in Daily Life",
    excerpt: "Learn how to integrate mindfulness practices into your routine to foster peace and clarity amidst the chaos of everyday life.",
    slug: "embracing-mindfulness",
    imageUrl: "https://elohee.org/wp-content/uploads/2025/04/image_5b3cb4f6041283aface23c0db6b086c9-scaled.jpg",
  },
  {
    id: 2,
    title: "The Power of Breathwork for Healing",
    excerpt: "Explore the transformative effects of breathwork and how it can release stress and unlock your body's natural energy flow.",
    slug: "power-of-breathwork",
    imageUrl: "https://www.shutterstock.com/image-photo/experience-serene-beauty-yoga-on-260nw-2455852459.jpg",
  },
  {
    id: 3,
    title: "Finding Balance Through Guided Meditation",
    excerpt: "Discover the benefits of guided meditation to achieve emotional balance and spiritual awakening in this insightful post.",
    slug: "guided-meditation",
    imageUrl: "https://www.shutterstock.com/image-vector/spiritual-therapy-body-mind-harmony-260nw-1852509394.jpg",
  },
  {
    id: 4,
    title: "The Art of Spiritual Clarity",
    excerpt: "Uncover practical wisdom to ground your spirit and illuminate your path towards a more meaningful life.",
    slug: "spiritual-clarity",
    imageUrl: "https://nandinibali.com/storage/images/page/hero_image/B0002506_cr.jpg",
  },
  {
    id: 5,
    title: "Harnessing Energy for Inner Healing",
    excerpt: "Dive into the techniques of energy work and heart-centered awareness to foster deep emotional healing.",
    slug: "inner-healing",
    imageUrl: "https://www.shutterstock.com/image-photo/yoga-meditation-outdoors-glowing-seven-260nw-2359553275.jpg",
  },
];

const BlogSection = () => {
  const [x, setX] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setX((prev) => (prev - 350 <= -dummyPosts.length * 350 ? 0 : prev - 350));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardHover = {
    scale: 1.03,
    y: -5,
    boxShadow: "0 10px 20px rgba(236, 72, 153, 0.3)",
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 font-['Playfair_Display'] overflow-hidden bg-transparent"
    >
      {/* FLOATING GLOW EFFECTS */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-pink-400/20 to-rose-600/20 blur-[80px]"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0.4,
            }}
            animate={isInView ? { y: [null, Math.random() * 100 + "%"], opacity: [0.4, 0.6, 0.4] } : {}}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* SECTION HEADING */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-900 mb-3 drop-shadow-[0_2px_6px_rgba(236,72,153,0.3)]">
            From Marina’s Journal
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-800 max-w-xl mx-auto leading-relaxed italic">
            Soulful reflections and practices to nurture your mind, body, and spirit.
          </p>
        </motion.div>

        {/* CAROUSEL */}
        <div className="overflow-hidden relative max-w-7xl mx-auto">
          <motion.div
            className="flex space-x-6 sm:space-x-8"
            animate={{ x }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              duration: 1.5,
            }}
          >
            {[...dummyPosts, ...dummyPosts].map((post, index) => (
              <Link
                to={`/blog/${post.slug}`}
                key={index}
                className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] bg-white/25 backdrop-blur-lg border border-white/30 rounded-2xl overflow-hidden shadow-lg hover:border-pink-400/50 transition-all duration-500"
              >
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={cardHover}
                >
                  {/* IMAGE */}
                  <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden rounded-t-2xl">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-600/50 to-transparent"></div>
                  </div>

                  {/* CONTENT */}
                  
                  <div className="p-4 sm:p-5 text-center">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-rose-900 mb-2 hover:text-pink-600 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-800 leading-snug mb-3 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="inline-block px-3 sm:px-4 py-1.5 text-sm text-white bg-gradient-to-r from-rose-200 to-pink-300 rounded-full shadow-md hover:from-pink-700 hover:to-rose-700 transition-all duration-300">
                      Read More
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;