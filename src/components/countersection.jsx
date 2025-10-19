import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import counterData from '../data/counterData';

const CounterSection = () => {
  const [counterItems, setCounterItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCounterItems(counterData);
      setIsLoading(false);
    }, 800);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  if (isLoading) {
    return (
      <section className="flex items-center justify-center min-h-[300px] bg-gradient-to-r from-pink-200 to-rose-100 font-poppins">
        <div className="w-16 h-16 border-4 border-white border-t-rose-400 rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-white py-16 sm:py-20 font-poppins">
      {/* Glowing floating orbs */}
      <div className="absolute -top-10 left-10 w-40 h-40 bg-rose-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
        >
          {counterItems.map((item) => (
            <CounterItem key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CounterItem = ({ item }) => {
  const count = useMotionValue(0);
  const roundedCount = useTransform(count, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, item.endValue, {
        duration: 2.5,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [isInView, item.endValue, count]);

  return (
    <motion.div
      ref={ref}
      className="relative backdrop-blur-md bg-white/30 border border-white/50 rounded-2xl shadow-xl p-6 hover:bg-white/40 transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-4xl sm:text-5xl font-extrabold text-rose-700 drop-shadow-lg">
        <motion.span>{roundedCount}</motion.span>
        {item.suffix}
      </div>
      <div className="mt-2 text-base sm:text-lg font-medium text-gray-700 opacity-90">
        {item.text}
      </div>
      <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-20 transition duration-300"></div>
    </motion.div>
  );
};

export default CounterSection;
