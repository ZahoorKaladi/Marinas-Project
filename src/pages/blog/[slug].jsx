import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "Embracing Mindfulness in Daily Life",
    author: "Marina",
    date: "October 10, 2025",
    slug: "embracing-mindfulness",
    excerpt: "Learn how to integrate mindfulness practices into your routine to foster peace and clarity amidst the chaos of everyday life.",
    fullContent: `
      <p>Mindfulness is the art of being fully present in the moment, and it can transform the way you experience life. By cultivating awareness of your thoughts, emotions, and surroundings, you create a foundation for inner peace and resilience.</p>
      <h2>Why Mindfulness Matters</h2>
      <p>In our fast-paced world, it's easy to get lost in the whirlwind of daily responsibilities. Mindfulness offers a way to pause, breathe, and reconnect with yourself. Studies show that regular mindfulness practice can reduce stress, improve focus, and enhance emotional well-being.</p>
      <h2>Practical Tips for Daily Mindfulness</h2>
      <ul>
        <li><strong>Morning Meditation:</strong> Start your day with 5-10 minutes of guided meditation to set a calm tone.</li>
        <li><strong>Mindful Eating:</strong> Savor each bite, noticing the textures and flavors of your food.</li>
        <li><strong>Breath Awareness:</strong> Take short breaks to focus on your breath, especially during stressful moments.</li>
      </ul>
      <p>By incorporating these simple practices, you can bring mindfulness into every aspect of your life, fostering a deeper sense of peace and clarity.</p>
    `,
    imageUrl: "https://elohee.org/wp-content/uploads/2025/04/image_5b3cb4f6041283aface23c0db6b086c9-scaled.jpg",
  },
  {
    id: 2,
    title: "The Power of Breathwork for Healing",
    author: "Marina",
    date: "October 5, 2025",
    slug: "power-of-breathwork",
    excerpt: "Explore the transformative effects of breathwork and how it can release stress and unlock your body's natural energy flow.",
    fullContent: `
      <p>Breathwork is a powerful tool for healing and transformation. By consciously controlling your breath, you can release pent-up stress, balance your energy, and connect with your inner self.</p>
      <h2>The Science Behind Breathwork</h2>
      <p>Breathwork influences the autonomic nervous system, helping to calm the mind and reduce anxiety. Research indicates that deep, intentional breathing can lower cortisol levels and improve overall mental clarity.</p>
      <h2>How to Practice Breathwork</h2>
      <ul>
        <li><strong>Box Breathing:</strong> Inhale for 4 seconds, hold for 4, exhale for 4, and hold again for 4. Repeat for 5 minutes.</li>
        <li><strong>Diaphragmatic Breathing:</strong> Focus on deep belly breathing to activate the relaxation response.</li>
        <li><strong>Guided Sessions:</strong> Join Marina’s breathwork sessions for a guided experience tailored to emotional release.</li>
      </ul>
      <p>Start small, and with practice, breathwork can become a cornerstone of your wellness journey.</p>
    `,
    imageUrl: "https://www.shutterstock.com/image-photo/experience-serene-beauty-yoga-on-260nw-2455852459.jpg",
  },
  {
    id: 3,
    title: "Finding Balance Through Guided Meditation",
    author: "Marina",
    date: "September 28, 2025",
    slug: "guided-meditation",
    excerpt: "Discover the benefits of guided meditation to achieve emotional balance and spiritual awakening in this insightful post.",
    fullContent: `
      <p>Guided meditation is a powerful practice that allows you to tap into your subconscious mind, fostering emotional balance and spiritual growth. With Marina’s soothing guidance, you can embark on a journey of self-discovery.</p>
      <h2>Benefits of Guided Meditation</h2>
      <p>Guided meditation helps reduce stress, improve focus, and cultivate a deeper connection with your inner self. It’s particularly effective for beginners who may find it challenging to meditate on their own.</p>
      <h2>How to Get Started</h2>
      <ul>
        <li><strong>Find a Quiet Space:</strong> Choose a calm environment where you won’t be disturbed.</li>
        <li><strong>Use Audio Guides:</strong> Follow Marina’s audio meditations for a structured experience.</li>
        <li><strong>Practice Regularly:</strong> Even 10 minutes a day can lead to profound changes over time.</li>
      </ul>
      <p>Join our community and experience the transformative power of guided meditation today.</p>
    `,
    imageUrl: "https://www.shutterstock.com/image-vector/spiritual-therapy-body-mind-harmony-260nw-1852509394.jpg",
  },
];

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = blogPosts.find((p) => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
    } else {
      setPost(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (!post) {
    return (
      <div className="font-['Playfair_Display'] bg-gradient-to-b from-pink-200 via-rose-200 to-pink-300 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-900 mb-4 tracking-tight">404 - Post Not Found</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-800">The blog post you are looking for does not exist.</p>
          <Link
            to="/blog"
            className="mt-6 inline-block px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl shadow-xl font-semibold text-sm sm:text-base hover:from-pink-700 hover:to-rose-700 transition-all duration-300"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="font-['Playfair_Display'] bg-gradient-to-b from-pink-200 via-rose-200 to-pink-300 min-h-screen pt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div
          className="p-6 sm:p-10 rounded-3xl bg-white/25 backdrop-blur-xl shadow-xl border border-white/30"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* POST HERO IMAGE */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl mb-8">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-rose-900 mb-4 tracking-tight"
            variants={itemVariants}
          >
            {post.title}
          </motion.h1>
          <motion.div
            className="text-gray-800 text-sm sm:text-base mb-6 italic"
            variants={itemVariants}
          >
            By <span className="font-semibold text-rose-800">{post.author}</span> on {post.date}
          </motion.div>

          <motion.div
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.fullContent }}
            variants={itemVariants}
          />

          <motion.div
            className="flex justify-between items-center mt-12 pt-6 border-t border-pink-200/50"
            variants={itemVariants}
          >
            <Link
              to="/blog"
              className="text-rose-800 font-semibold text-sm sm:text-base hover:text-rose-600 transition-all duration-300"
            >
              &larr; Back to All Posts
            </Link>
          </motion.div>
        </motion.div>

        {/* RELATED POSTS SECTION */}
        <motion.section
          className="py-12 sm:py-16 md:py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-rose-900 mb-8 text-center tracking-tight">
            Related Posts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts
              .filter((relatedPost) => relatedPost.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <motion.div
                  key={relatedPost.id}
                  className="p-4 sm:p-6 rounded-2xl bg-white/25 backdrop-blur-lg shadow-lg border border-white/30 hover:border-pink-400/50 transition-all duration-300 overflow-hidden"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    y: -5,
                    boxShadow: "0 10px 20px rgba(236, 72, 153, 0.3)",
                    transition: { type: "spring", stiffness: 300 },
                  }}
                >
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-xl mb-4">
                    <img
                      src={relatedPost.imageUrl}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-rose-900 mb-3 tracking-tight">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-4">
                    {relatedPost.excerpt}
                  </p>
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <motion.button
                      className="w-full py-2 sm:py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl shadow-md font-medium text-sm sm:text-base hover:from-pink-700 hover:to-rose-700 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read More
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default BlogPostPage;