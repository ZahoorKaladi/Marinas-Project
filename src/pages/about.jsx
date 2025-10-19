import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mic, Video, Heart, Sparkles, Zap, Feather } from 'lucide-react';

const headerMessages = [
  "Spiritual Master & Wellness Guide",
  "Guiding You to Inner Peace",
  "Healing Mind, Body, and Soul",
];

const AboutPage = () => {
  const [headerIndex, setHeaderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderIndex((prevIndex) => (prevIndex + 1) % headerMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const cardHover = {
    scale: 1.03,
    y: -5,
    boxShadow: "0 10px 20px rgba(236, 72, 153, 0.4)",
    transition: { type: "spring", stiffness: 300 },
  };

  const profileImageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 1.2, 
        type: "spring", 
        damping: 10,
        stiffness: 80 
      }
    },
    hover: { 
      scale: 1.05, 
      rotate: 2,
      boxShadow: "0 15px 40px rgba(236, 72, 153, 0.5)",
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="font-sans bg-gradient-to-b from-pink-200 via-rose-200 to-pink-300 min-h-screen w-full">
      
      {/* ENHANCED FULL-WIDTH DYNAMIC HEADER WITH SUBTLE PARALLAX AND GRADIENT OVERLAY */}
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-300">The Heart Behind the Healing</span>
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
      
      {/* PROFILE & MISSION SECTION WITH ENHANCED GLASSMORPHISM AND DARKER BACKDROP */}
      <section className="py-16 sm:py-20 md:py-24 -mt-8 sm:-mt-12 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            className="p-8 sm:p-10 md:p-12 rounded-3xl bg-white/20 backdrop-blur-xl shadow-2xl border border-white/30"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div 
                className="relative mb-10 group"
                variants={profileImageVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <motion.img
                  src="https://images.pexels.com/photos/6919996/pexels-photo-6919996.jpeg?auto=format&fit=crop&q=80&w=300&h=300"
                  alt="Marina"
                  className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full object-cover border-4 border-pink-200/80 group-hover:border-pink-400 transition-all duration-300"
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/0 to-pink-600/0 group-hover:from-pink-400/25 group-hover:to-pink-600/25 opacity-0 group-hover:opacity-100 transition-all duration-500"
                />
              </motion.div>
              
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-['Playfair_Display'] text-rose-900 mb-6 font-bold tracking-tight"
                variants={itemVariants}
              >
                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-300"><span className="text-rose-800">MARI</span><span className="text-pink-500">NA</span></span>
                
              </motion.h2>
              
              <motion.p
                className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl italic"
                variants={itemVariants}
              >
                Born in the majestic landscapes of Austria, Marina discovered her calling in <span className="font-semibold text-rose-800">spiritual guidance and holistic healing</span> at a young age. Her profound connection with nature and ancient wisdom traditions led her on a lifelong quest for inner mastery.
              </motion.p>
              
              <motion.p
                className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mt-6 border-t border-pink-300/40 pt-6"
                variants={itemVariants}
              >
                Today, she shares her transformative insights globally, blending <span className="font-semibold text-rose-800">Austrian alpine tranquility with deep spiritual wisdom</span>. Her guidance—delivered through captivating audio and video—is a journey to emotional balance, clarity, and true spiritual awakening.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CORE OFFERINGS SECTION WITH DARKER GLASSMORPHISM CARDS */}
      <section className="py-16 sm:py-20 md:py-24 bg-pink-200/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] text-rose-900 mb-10 md:mb-14 text-center font-bold tracking-wide"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            Marina's Pillars of Transformation
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerVariants}
          >
            {[
              { title: "Audio Therapies", icon: Mic, description: "Guided meditations and sound bath sessions to soothe the nervous system.", color: "pink-700" },
              { title: "Video Journeys", icon: Video, description: "Visualizations for deep mindfulness and self-discovery practices.", color: "purple-700" },
              { title: "Inner Healing", icon: Heart, description: "Focus on emotional release, energy work, and heart-centered awareness.", color: "red-700" },
              { title: "Spiritual Clarity", icon: Sparkles, description: "Practical wisdom for grounding your spirit and illuminating your path.", color: "yellow-700" },
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="p-6 sm:p-8 rounded-2xl bg-white/25 backdrop-blur-lg shadow-lg border border-white/20 hover:border-pink-500/50 transition-all duration-300 overflow-hidden"
                variants={itemVariants}
                whileHover={cardHover}
              >
                <div className="relative">
                  <feature.icon size={40} className={`mx-auto mb-4 text-${feature.color} drop-shadow-lg`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-200/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-rose-900 mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* IN-DEPTH JOURNEY SECTION WITH DARKER ACCORDION-LIKE ITEMS */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] text-rose-900 mb-10 md:mb-12 text-center font-bold tracking-wide"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            The Transformative Power
          </motion.h2>

          <motion.div 
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerVariants}
          >
            <motion.div className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-pink-200/40 border-l-8 border-rose-700/80 shadow-lg hover:shadow-xl transition-shadow duration-300" variants={itemVariants}>
              <Zap size={24} className="text-rose-700 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-rose-900 mb-2 tracking-tight">Empowerment Through Breath</h3>
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed">Marina's signature <span className="font-semibold text-rose-800">breathwork techniques</span> are designed to release long-held stress and unlock your body's natural energy flow, leading to immediate emotional relief and mental clarity.</p>
              </div>
            </motion.div>

            <motion.div className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-pink-200/40 border-l-8 border-rose-700/80 shadow-lg hover:shadow-xl transition-shadow duration-300" variants={itemVariants}>
              <Feather size={24} className="text-rose-700 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-rose-900 mb-2 tracking-tight">Visualizations for Lasting Change</h3>
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed">Utilizing the power of the subconscious mind, her <span className="font-semibold text-rose-800">guided visualizations</span> help you reprogram old patterns and manifest a life aligned with your highest self. Change starts from within.</p>
              </div>
            </motion.div>

            <motion.p
              className="text-gray-800 text-center text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto pt-6 italic"
              variants={itemVariants}
            >
              Join her global community and take the next step on your path to self-discovery, where every guidance session is an investment in a more balanced, joyful, and deeply meaningful life.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CALL TO ACTION WITH ENHANCED GRADIENT BUTTON */}
      <section className="bg-gradient-to-r from-rose-300 to-pink-300 text-white py-12 sm:py-16 md:py-20 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] mb-6 font-bold tracking-wide drop-shadow-xl">Ready to find your inner calm?</h2>
          <p className="text-base sm:text-lg opacity-95 mb-8 md:mb-10 max-w-xl md:max-w-2xl mx-auto leading-relaxed">
            Book a one-on-one session with Marina and experience personalized transformation.
          </p>
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link
              to="/sessionbooking"
              className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-white/95 text-rose-800 rounded-full shadow-2xl font-bold tracking-wide transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.9)]"
            >
              Book Your Session Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;