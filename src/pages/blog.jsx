import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const headerMessages = [
  "Discover Spiritual Wisdom",
  "Journey to Inner Peace",
  "Insights for Wellness",
];

const blogPosts = [
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
  {
    id: 6,
    title: "The Journey to Self-Discovery",
    excerpt: "Join Marina on a journey of self-discovery through holistic practices that nurture mind, body, and soul.",
    slug: "self-discovery",
    imageUrl: "https://blogs.chapman.edu/wp-content/uploads/sites/31/2020/03/meditation-1024x636-740x410.jpg",
  },
];

const BlogPage = () => {
  const [headerIndex, setHeaderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderIndex((prevIndex) => (prevIndex + 1) % headerMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const cardHover = {
    scale: 1.03,
    y: -5,
    boxShadow: "0 10px 20px rgba(236, 72, 153, 0.3)",
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <div className="font-sans bg-gradient-to-b from-pink-200 via-rose-200 to-pink-300 min-h-screen w-full">
      {/* ENHANCED FULL-WIDTH DYNAMIC HEADER */}
      <div 
        className="relative w-full py-20 sm:py-28 md:py-36 lg:py-48 text-white text-center overflow-hidden bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/374754/pexels-photo-374754.jpeg?auto=format&fit=crop&q=80&w=1920&h=600')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-rose-700/60 to-rose-900/40 backdrop-blur-sm"></div>

        <motion.div className="relative z-10 px-4">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-['Playfair_Display'] font-extrabold mb-6 tracking-wide drop-shadow-2xl"
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, type: "spring", damping: 12 }}
            whileHover={{ scale: 1.02, textShadow: "0 0 15px rgba(255,255,255,0.9)" }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-300">Insights & Inspirations</span>
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.h3
              key={headerIndex}
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-light italic text-white/90 max-w-3xl md:max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              {headerMessages[headerIndex]}
            </motion.h3>
          </AnimatePresence>
          <div className='h-6 sm:h-8 md:h-10'></div>
        </motion.div>
      </div>

      {/* BLOG POSTS SECTION */}
      <section className="py-16 sm:py-24 md:py-28 -mt-8 sm:-mt-12 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                className="p-4 sm:p-6 rounded-2xl bg-white/25 backdrop-blur-lg shadow-lg border border-white/30 hover:border-pink-400/50 transition-all duration-300 overflow-hidden"
                variants={itemVariants}
                whileHover={cardHover}
              >
                <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-xl mb-4">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-['Playfair_Display'] font-semibold text-rose-900 mb-3 tracking-tight">
                  {post.title}
                </h3>
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.slug}`}>
                  <motion.button
                    className="w-full py-2 sm:py-3 ${ACCENT_COLOR_CLASS} text-white rounded-xl shadow-md font-medium text-sm sm:text-base hover:from-pink-700 hover:to-rose-700 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read More
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;