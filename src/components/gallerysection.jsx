import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Mic, Video } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MediaSection = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [activeMedia, setActiveMedia] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    setMediaItems([
      {
        id: 1,
        title: "Finding Inner Calm",
        type: "audio",
        thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
        embedUrl: "https://www.youtube.com/embed/1zyh3rNqVRo",
        externalUrl: "https://www.youtube.com/watch?v=1zyh3rNqVRo"
      },
      {
        id: 2,
        title: "The Power of Breath",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
        embedUrl: "https://www.youtube.com/embed/HM7X8cD5dyY",
        externalUrl: "https://www.youtube.com/watch?v=HM7X8cD5dyY"
      },
      {
        id: 3,
        title: "Healing Frequencies",
        type: "audio",
        thumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
        embedUrl: "https://www.youtube.com/embed/5q0H6f5q58Q",
        externalUrl: "https://www.youtube.com/watch?v=5q0H6f5q58Q"
      },
      {
        id: 4,
        title: "Letting Go Meditation",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=800&q=80",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        externalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      },
      {
        id: 5,
        title: "Morning Mindfulness",
        type: "audio",
        thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
        embedUrl: "https://www.youtube.com/embed/7x6QeQdPqYq",
        externalUrl: "https://www.youtube.com/watch?v=7x6QeQdPqYq"
      },
      {
        id: 6,
        title: "Guided Relaxation",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
        embedUrl: "https://www.youtube.com/embed/6T7pUEZ8dVM",
        externalUrl: "https://www.youtube.com/watch?v=6T7pUEZ8dVM"
      }
    ]);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    swipeToSlide: true,
    touchThreshold: 15,
    lazyLoad: "ondemand",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          arrows: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
          centerMode: true,
          centerPadding: "0px",
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
          centerMode: true,
          centerPadding: "0px",
          swipeToSlide: true,
          touchThreshold: 10,
        }
      }
    ]
  };

  const handlePlayMedia = (item) => {
    setActiveMedia(item);
  };

  const closeMediaModal = () => {
    setActiveMedia(null);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-8 sm:py-12 md:py-20 overflow-hidden font-sans bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100"
    >
      {/* Floating lights */}
      <motion.div
        className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-pink-200/30 rounded-full blur-2xl top-[-80px] left-[-80px] sm:left-[-100px] z-0"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-rose-200/30 rounded-full blur-2xl bottom-[-80px] right-[-80px] sm:right-[-100px] z-0"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      {/* Section Header */}
      <div className="relative text-center mb-6 sm:mb-8 md:mb-16 z-20 px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-3"
        >
          Listen & Watch
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-600 text-sm sm:text-base md:text-xl max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto"
        >
          Explore a serene collection of meditative podcasts and mindful videos.
        </motion.p>
      </div>

      {/* Media Carousel */}
      <div className="relative z-20 px-2 sm:px-4 md:px-8 max-w-7xl mx-auto">
        <Slider {...settings} className="media-slider">
          {mediaItems.map((item) => (
            <div key={item.id} className="px-1 sm:px-2 md:px-3 focus:outline-none">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <div className="relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl sm:rounded-2xl shadow-md overflow-hidden group h-full flex flex-col">
                  {/* Thumbnail */}
                  <div className="relative flex-1">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-28 sm:h-40 md:h-56 object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/800x480/FFB6C1/FFFFFF?text=${encodeURIComponent(item.title)}`;
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Media Type Badge */}
                    <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-black/60 backdrop-blur-sm text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-1">
                      {item.type === "audio" ? (
                        <Mic size={12} className="text-pink-300" />
                      ) : (
                        <Video size={12} className="text-pink-300" />
                      )}
                      <span className="text-xs font-medium capitalize">
                        {item.type}
                      </span>
                    </div>

                    {/* Play Button */}
                    <button
                      onClick={() => handlePlayMedia(item)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20"
                      aria-label={`Play ${item.title}`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-md hover:bg-white transition-colors"
                      >
                        <Play size={16} className="text-gray-900 fill-current" />
                      </motion.div>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-2 sm:p-4 flex-1 flex flex-col">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="mt-auto flex gap-1 sm:gap-2">
                      <button
                        onClick={() => handlePlayMedia(item)}
                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-1 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1"
                        aria-label={`Play ${item.title}`}
                      >
                        <Play size={12} />
                        Play
                      </button>
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                        aria-label={`Open ${item.title} on YouTube`}
                      >
                        Open
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Media Modal */}
      {activeMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={closeMediaModal}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-3xl sm:max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={closeMediaModal}
                className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 bg-white/90 hover:bg-white text-gray-900 rounded-full p-1 sm:p-2 transition-colors shadow-md"
                aria-label="Close modal"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="aspect-video w-full">
                <iframe
                  src={`${activeMedia.embedUrl}?autoplay=1`}
                  title={activeMedia.title}
                  className="w-full h-full border-0"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                  loading="lazy"
                />
              </div>
              
              <div className="p-2 sm:p-4">
                <div className="flex items-center gap-1 sm:gap-2 mb-2">
                  {activeMedia.type === "audio" ? (
                    <Mic size={16} className="text-pink-500" />
                  ) : (
                    <Video size={16} className="text-pink-500" />
                  )}
                  <span className="text-xs sm:text-sm font-medium text-gray-600 capitalize">
                    {activeMedia.type}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {activeMedia.title}
                </h3>
                <a
                  href={activeMedia.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-1 sm:py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors"
                  aria-label={`Open ${activeMedia.title} on YouTube`}
                >
                  Open in YouTube
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Custom CSS for slider dots */}
      <style jsx>{`
        .media-slider :global(.slick-dots li button:before) {
          color: #f9a8d4;
          opacity: 0.5;
          font-size: 6px;
          transition: all 0.3s ease;
        }
        .media-slider :global(.slick-dots li.slick-active button:before) {
          opacity: 1;
          color: #ec4899;
          font-size: 8px;
        }
        .media-slider :global(.slick-dots) {
          bottom: -30px;
        }
        .media-slider :global(.slick-arrow) {
          z-index: 10;
          width: 30px;
          height: 30px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .media-slider :global(.slick-arrow:before) {
          color: #ec4899;
          font-size: 16px;
        }
        .media-slider :global(.slick-prev) {
          left: -40px;
        }
        .media-slider :global(.slick-next) {
          right: -40px;
        }
        @media (max-width: 768px) {
          .media-slider :global(.slick-dots) {
            bottom: -25px;
          }
          .media-slider :global(.slick-arrow) {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .media-slider :global(.slick-dots) {
            bottom: -20px;
          }
          .media-slider :global(.slick-slide) {
            padding: 0 5px;
          }
        }
      `}</style>
    </section>
  );
};

export default MediaSection;