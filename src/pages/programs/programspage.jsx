import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import ReactPlayer from "react-player";
import {
  Search,
  Video,
  X,
  Play,
  ExternalLink,
  Heart,
  Clock,
} from "lucide-react";

const mediaItems = [
  {
    id: 1,
    type: "video",
    title: "Guided Meditation for Inner Peace",
    excerpt: "A 10-minute session to calm your mind and reconnect with stillness.",
    category: "Video",
    duration: "10:25",
    level: "Beginner",
    teacher: "Sarah Wisdom",
    thumbnail:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200&h=720",
    url: "https://www.youtube.com/watch?v=4EaMJOo8Cuw",
    tags: ["Meditation", "Mindfulness", "Peace"],
  },
  {
    id: 2,
    type: "video",
    title: "Yoga Flow for Beginners",
    excerpt: "Gentle movements to align body and spirit with breath awareness.",
    category: "Video",
    duration: "25:40",
    level: "Beginner",
    teacher: "Michael Harmony",
    thumbnail:
      "https://images.unsplash.com/photo-1545205597-3D9d02c29597?auto=format&fit=crop&q=80&w=1200&h=720",
    url: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
    tags: ["Yoga", "Beginners", "Flow"],
  },
  {
    id: 3,
    type: "video",
    title: "Mindfulness for Stress Relief",
    excerpt: "Techniques to manage stress and cultivate present-moment awareness.",
    category: "Video",
    duration: "15:30",
    level: "All Levels",
    teacher: "Dr. Elena Tranquil",
    thumbnail:
      "https://images.unsplash.com/photo-1512438248247-f0f2c1cf3517?auto=format&fit=crop&q=80&w=1200&h=720",
    url: "https://www.youtube.com/watch?v=3nwwKbM_vJc",
    tags: ["Mindfulness", "Stress Relief", "Awareness"],
  },
  {
    id: 4,
    type: "video",
    title: "Deep Sleep Meditation",
    excerpt: "A gentle journey into restful sleep with soothing guidance.",
    category: "Video",
    duration: "35:15",
    level: "All Levels",
    teacher: "Luna Night",
    thumbnail:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200&h=720",
    url: "https://www.youtube.com/watch?v=IN5z1M38_io",
    tags: ["Sleep", "Meditation", "Relaxation"],
  },
  {
    id: 5,
    type: "video",
    title: "Morning Energy Activation",
    excerpt: "Start with energy and intention through breathwork and movement.",
    category: "Video",
    duration: "18:20",
    level: "Intermediate",
    teacher: "Rising Sun",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200&h=720",
    url: "https://www.youtube.com/watch?v=z6X5oE1L-4o",
    tags: ["Morning", "Energy", "Activation"],
  },
  {
    id: 6,
    type: "video",
    title: "Heart-Opening Compassion Practice",
    excerpt: "Cultivate compassion through a heart-centered meditation.",
    category: "Video",
    duration: "22:45",
    level: "Intermediate",
    teacher: "Compassion Heart",
    thumbnail:
      "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&q=80&w=1200&h=720",
    url: "https://www.youtube.com/watch?v=5JYqHYpDgRk",
    tags: ["Compassion", "Heart", "Loving-Kindness"],
  },
];

Modal.setAppElement("#root");

const headerMessages = [
  "Nurture Your Soul • Find Your Center",
  "Embrace Tranquility • Discover Inner Harmony",
  "Awaken Your Spirit • Transform Your Life",
  "Journey Within • Find Peace Beyond",
];

const ProgramsPage = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [headerIndex, setHeaderIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const sectionRef = useRef(null);

  const categories = useMemo(
    () => ["All", ...new Set(mediaItems.flatMap((item) => [item.category, ...item.tags]))],
    []
  );
  const levels = useMemo(() => ["All", ...new Set(mediaItems.map((item) => item.level))], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderIndex((prev) => (prev + 1) % headerMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = useCallback((item) => {
    setSelectedMedia(item);
    setModalIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
    setSelectedMedia(null);
    document.body.style.overflow = "unset";
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const filteredAndSortedMedia = useMemo(() => {
    let filtered = mediaItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        item.teacher.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        item.category === selectedCategory ||
        item.tags.includes(selectedCategory);
      const matchesLevel = selectedLevel === "All" || item.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "title")
        comparison = a.title.localeCompare(b.title);
      else if (sortBy === "duration") {
        const durA =
          parseInt(a.duration.split(":")[0]) * 60 +
          parseInt(a.duration.split(":")[1]);
        const durB =
          parseInt(b.duration.split(":")[0]) * 60 +
          parseInt(b.duration.split(":")[1]);
        comparison = durA - durB;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedLevel, sortBy, sortOrder]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const cardHover = {
    scale: 1.02,
    y: -5,
    boxShadow: "0 10px 20px rgba(236, 72, 153, 0.15)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="font-['Inter'] min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-pink-50/50 overflow-hidden">
      {/* Optimized Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-60">
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-r from-pink-200/10 to-rose-200/10 rounded-full blur-2xl -top-36 -left-36"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-r from-purple-200/10 to-blue-200/10 rounded-full blur-2xl top-1/2 -right-36"
          animate={{
            ...floatingAnimation,
            y: [0, 15, 0],
            transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>

      {/* Hero Section */}
      <div
        className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/374754/pexels-photo-374754.jpeg?auto=format&fit=crop&q=80&w=1920&h=1080"
            alt="Serene spiritual background"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-pink-900/40 backdrop-blur-[1px]"></div> {/* Pinkish overlay for contrast */}
        </div>

        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            id="hero-title"
            className="text-4xl sm:text-5xl md:text-6xl font-['Playfair_Display'] font-bold mb-6 leading-tight tracking-wide"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-100 to-rose-200 drop-shadow-md">
              Listen & Watch
            </span>
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={headerIndex}
              className="text-lg sm:text-xl md:text-2xl text-white/85 mb-8 font-light leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {headerMessages[headerIndex]}
            </motion.p>
          </AnimatePresence>

          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Animated Profile Picture Frame */}
            <motion.div
              className="mb-6 w-40 h-40 rounded-full overflow-hidden shadow-lg bg-white/10"
              animate={{
                scale: [1, 1.02, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(236, 72, 153, 0.3)" }}
            >
              <img
                src="https://images.pexels.com/photos/6919996/pexels-photo-6919996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Placeholder, replace with actual profile image
                alt="Marina's profile"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Centered Text */}
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-['Playfair_Display'] font-bold tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-rose-300 drop-shadow-md">
                Marina • Host & Therapist
              </span>
            </motion.h2>

            <motion.button
              className="mt-8 px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-xl font-medium text-base flex items-center gap-2 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Start your spiritual journey"
            >
              <Play size={18} />
              Start Journey
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          aria-hidden="true"
        >
          <div className="w-5 h-8 border-2 border-white/35 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-white/45 rounded-full mt-1.5"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      <section
        ref={sectionRef}
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
        aria-labelledby="programs-section"
      >
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            className={`mb-12 p-6 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border border-rose-100/30 transition-all duration-300 ${
              isScrolled ? "sticky top-0 z-40 py-4" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-40px" }}
          >
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              <div className="relative w-full lg:w-2/3">
                <input
                  type="search"
                  placeholder="Search by title, topic, or instructor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-rose-200/50 focus:ring-2 focus:ring-rose-400/30 bg-white/90 text-sm text-rose-800 font-medium placeholder-rose-400/60 transition-all"
                  aria-label="Search spiritual programs"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400/70"
                />
              </div>

              <div className="flex flex-wrap gap-2 items-center w-full lg:w-1/3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-rose-200/50 bg-white/90 text-sm text-rose-800 font-medium focus:ring-2 focus:ring-rose-400/30 transition-all"
                  aria-label="Select category"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-rose-200/50 bg-white/90 text-sm text-rose-800 font-medium focus:ring-2 focus:ring-rose-400/30 transition-all"
                  aria-label="Select level"
                >
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-base text-gray-600 font-medium" aria-live="polite">
              Showing{" "}
              <span className="text-rose-600 font-semibold">
                {filteredAndSortedMedia.length}
              </span>{" "}
              of {mediaItems.length} sessions
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {filteredAndSortedMedia.length === 0 ? (
              <motion.div
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Video className="inline-block mr-2 text-rose-400" size={28} />
                <p className="text-lg text-gray-500 font-medium">
                  No sessions match your criteria.
                </p>
                <p className="text-gray-400 mt-1 text-sm">
                  Try adjusting your filters or search.
                </p>
              </motion.div>
            ) : (
              filteredAndSortedMedia.map((item) => (
                <motion.div
                  key={item.id}
                  className="group relative bg-white/95 backdrop-blur-sm border border-rose-100/30 rounded-2xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer h-full flex flex-col"
                  variants={itemVariants}
                  whileHover={cardHover}
                  onClick={() => openModal(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openModal(item)}
                  aria-label={`Open ${item.title}`}
                >
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-3 right-3 z-20 bg-white/80 hover:bg-white text-rose-500 p-2 rounded-full shadow-md transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={
                      favorites.includes(item.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <Heart
                      size={16}
                      fill={favorites.includes(item.id) ? "currentColor" : "none"}
                      strokeWidth={2}
                    />
                  </motion.button>

                  <div className="relative flex-shrink-0 overflow-hidden">
                    <motion.img
                      src={item.thumbnail}
                      alt={`Thumbnail for ${item.title}`}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/800x480/FFB6C1/FFFFFF?text=${encodeURIComponent(
                          item.title.slice(0, 20) + "..."
                        )}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-xs">
                      <div className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1.5">
                        <Video size={12} className="text-pink-200" />
                        <span className="font-medium">{item.duration}</span>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                        <span className="font-medium">{item.level}</span>
                      </div>
                    </div>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"
                      aria-hidden="true"
                    >
                      <motion.div
                        className="bg-white/90 p-3 rounded-full shadow-md"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <Play size={20} className="text-rose-900" />
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-rose-50/80 text-rose-600 rounded-md text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-snug line-clamp-2 font-['Playfair_Display']">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1 mb-3 font-light">
                      {item.excerpt}
                    </p>

                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <div className="w-6 h-6 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {item.teacher.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-gray-600 font-medium">
                        {item.teacher}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(item);
                        }}
                        className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white py-2 px-3 rounded-lg font-medium text-sm flex items-center justify-center gap-1.5 transition-all"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        aria-label={`Play ${item.title}`}
                      >
                        <Play size={14} />
                        Play
                      </motion.button>
                      <motion.a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 py-2 px-3 rounded-lg font-medium text-sm transition-all"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        aria-label={`Open ${item.title} externally`}
                      >
                        <ExternalLink size={14} />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))
            )
        }           
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedMedia && modalIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg w-full max-w-3xl max-h-[85vh] overflow-y-auto border border-rose-100/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <motion.button
                  onClick={closeModal}
                  className="absolute top-3 right-3 z-30 bg-white/85 hover:bg-white text-gray-800 rounded-lg p-2 shadow-md transition-all"
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </motion.button>

                <div className="aspect-video w-full bg-black">
                  {selectedMedia.type === "video" && (
                    <ReactPlayer
                      url={selectedMedia.url}
                      controls
                      playing={true}
                      width="100%"
                      height="100%"
                      config={{
                        youtube: {
                          playerVars: {
                            autoplay: 1,
                            modestbranding: 1,
                            rel: 0,
                            iv_load_policy: 3,
                          },
                        },
                      }}
                      onError={() => console.error("Video load error")}
                    />
                  )}
                </div>

                <div className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-5 mb-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1 bg-rose-50/80 text-rose-600 px-2 py-1 rounded-lg text-sm font-medium">
                          <Video size={14} />
                          <span>Video Session</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          <Clock size={12} />
                          <span>{selectedMedia.duration}</span>
                        </div>
                      </div>

                      <h3
                        id="modal-title"
                        className="text-xl font-semibold text-gray-800 mb-3 font-['Playfair_Display']"
                      >
                        {selectedMedia.title}
                      </h3>

                      <p className="text-sm text-gray-500 mb-5 font-light">
                        {selectedMedia.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {selectedMedia.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-rose-50/80 text-rose-600 rounded-md text-xs font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:w-64 space-y-3">
                      <div className="bg-rose-50/80 rounded-xl p-4 border border-rose-100/50">
                        <h4 className="font-medium text-gray-800 mb-2 text-sm">
                          Details
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Instructor</span>
                            <span className="text-gray-700">
                              {selectedMedia.teacher}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Level</span>
                            <span className="text-gray-700">
                              {selectedMedia.level}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Duration</span>
                            <span className="text-gray-700">
                              {selectedMedia.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <motion.a
                        href={selectedMedia.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        aria-label="Open on YouTube"
                      >
                        <ExternalLink size={16} />
                        Open on YouTube
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgramsPage;