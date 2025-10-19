import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Flower2, Clock, Mail, Phone, MessageCircle, Instagram, Facebook } from "lucide-react";

const headerMessages = [
  {
    title: "Book Your Healing Journey",
    subtitle: "Unlock peace and clarity with personalized sessions.",
  },
  {
    title: "Transform Your Soul",
    subtitle: "Secure a private session to nurture your inner self.",
  },
];

const SessionBookingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sessionType: "Meditation",
    dateTime: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState("initial");
  const navigate = useNavigate();
  const [headerIndex, setHeaderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderIndex((prevIndex) => (prevIndex + 1) % headerMessages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmissionStatus("success");
    } catch (error) {
      console.error("Error booking session:", error);
      setSubmissionStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.2 
      } 
    },
  };

  const headerTextVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeInOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.7, ease: "easeInOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="font-['Playfair_Display'] bg-gradient-to-b from-pink-200 via-rose-200 to-pink-300 min-h-screen w-full">
      {/* ENHANCED HEADER WITH PARALLAX AND DARKER OVERLAY */}
      <div
        className="relative w-full py-16 sm:py-20 md:py-28 lg:py-36 text-white text-center overflow-hidden bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1624600/pexels-photo-1624600.jpeg?auto=format&fit=crop&q=80&w=1920')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-rose-700/60 to-rose-900/40 backdrop-blur-sm"></div>
        <AnimatePresence mode="wait">
          <motion.div
            key={headerIndex}
            className="relative z-10 px-4"
            variants={headerTextVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3 drop-shadow-2xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-300">{headerMessages[headerIndex].title}</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light italic text-white/90 max-w-xl md:max-w-2xl mx-auto px-4">
              {headerMessages[headerIndex].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="h-6 sm:h-8 md:h-10"></div>
      </div>

      {/* MAIN BOOKING SECTION */}
      <section className="py-12 sm:py-16 md:py-20 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            className="w-full lg:flex lg:gap-8 lg:items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {/* FORM SECTION */}
            <div className="w-full lg:w-2/3 p-6 sm:p-8 md:p-10 bg-white/25 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 mb-6 lg:mb-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-rose-900 mb-8 text-center tracking-tight">
                Book Your Session
              </h2>

              {/* SUBMISSION STATUS */}
              {submissionStatus === "success" && (
                <motion.div
                  className="bg-green-100/90 border border-green-500/50 text-green-800 p-4 rounded-xl text-center mb-6 shadow-md"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="font-semibold text-sm sm:text-base">Booking Confirmed!</p>
                  <p className="text-xs sm:text-sm">We will contact you soon.</p>
                </motion.div>
              )}

              {submissionStatus === "error" && (
                <motion.div
                  className="bg-red-100/90 border border-red-500/50 text-red-800 p-4 rounded-xl text-center mb-6 shadow-md"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="font-semibold text-sm sm:text-base">Booking Failed.</p>
                  <p className="text-xs sm:text-sm">Please try again or contact us. (Check console for error)</p>
                </motion.div>
              )}

              {/* FORM */}
              {submissionStatus !== "submitting" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-rose-800 tracking-wide"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-2 block w-full p-3 sm:p-4 border border-rose-300/80 rounded-xl focus:ring-2 focus:ring-rose-600 focus:border-rose-600 bg-white/90 text-sm shadow-md transition-all duration-300 hover:border-rose-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-rose-800 tracking-wide"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2 block w-full p-3 sm:p-4 border border-rose-300/80 rounded-xl focus:ring-2 focus:ring-rose-600 focus:border-rose-600 bg-white/90 text-sm shadow-md transition-all duration-300 hover:border-rose-500"
                      placeholder="Enter your email"
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-rose-800 tracking-wide"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-2 block w-full p-3 sm:p-4 border border-rose-300/80 rounded-xl focus:ring-2 focus:ring-rose-600 focus:border-rose-600 bg-white/90 text-sm shadow-md transition-all duration-300 hover:border-rose-500"
                      placeholder="Enter your phone number"
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-rose-800 tracking-wide">
                      Session Type
                    </label>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {["Meditation", "Sound Therapy", "Personal Guidance"].map(
                        (type) => (
                          <motion.button
                            key={type}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, sessionType: type })
                            }
                            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium text-sm transition-all shadow-md ${
                              formData.sessionType === type
                                ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white"
                                : "bg-white/80 text-rose-800 hover:bg-rose-100/90 border border-rose-300/80 hover:shadow-lg"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {type}
                          </motion.button>
                        )
                      )}
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="dateTime"
                      className="block text-sm font-semibold text-rose-800 tracking-wide"
                    >
                      Preferred Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      id="dateTime"
                      name="dateTime"
                      value={formData.dateTime}
                      onChange={handleInputChange}
                      className="mt-2 block w-full p-3 sm:p-4 border border-rose-300/80 rounded-xl focus:ring-2 focus:ring-rose-600 focus:border-rose-600 bg-white/90 text-sm shadow-md transition-all duration-300 hover:border-rose-500"
                      required
                    />
                  </motion.div>
                  <motion.button
                    type="submit"
                    className="w-full py-3 sm:py-4 px-6 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl shadow-xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 text-sm sm:text-base disabled:opacity-50"
                    disabled={submissionStatus === "submitting"}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {submissionStatus === "submitting" ? (
                      "Sending Request..."
                    ) : (
                      "Book Now"
                    )}
                  </motion.button>
                  <p className="text-xs text-rose-800 text-center font-medium mt-3">
                    * We will contact you after submission.
                  </p>
                </form>
              )}
            </div>

            {/* CONTACT INFO SECTION */}
            <motion.div
              className="w-full lg:w-1/3 p-6 sm:p-8 md:p-10 bg-white/25 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-rose-900 mb-6 tracking-tight">
                Connect With Us
              </h2>
              <ul className="space-y-5">
                <motion.li
                  className="flex items-center gap-3"
                  variants={itemVariants}
                >
                  <Flower2 size={22} className="text-rose-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-rose-900 text-sm">Location</h4>
                    <p className="text-rose-800 text-xs sm:text-sm">123 Serenity Lane, Pakistan</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-center gap-3"
                  variants={itemVariants}
                >
                  <Phone size={22} className="text-rose-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-rose-900 text-sm">Phone</h4>
                    <p className="text-rose-800 text-xs sm:text-sm">+92 300 1234567</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-center gap-3"
                  variants={itemVariants}
                >
                  <Mail size={22} className="text-rose-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-rose-900 text-sm">Email</h4>
                    <p className="text-rose-800 text-xs sm:text-sm">healing@serenity.com</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-center gap-3"
                  variants={itemVariants}
                >
                  <Clock size={22} className="text-rose-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-rose-900 text-sm">Hours</h4>
                    <p className="text-rose-800 text-xs sm:text-sm">Mon-Fri: 9 AM - 6 PM</p>
                  </div>
                </motion.li>
              </ul>

              {/* SOCIAL LINKS */}
              <div className="mt-8 pt-4 border-t border-rose-300/50">
                <h4 className="font-semibold text-rose-900 mb-3 text-sm">Follow Us</h4>
                <div className="flex gap-4 text-rose-800">
                  <motion.a
                    href="#"
                    className="hover:text-rose-600 transition-colors"
                    aria-label="Facebook"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Facebook size={24} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="hover:text-rose-600 transition-colors"
                    aria-label="Instagram"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram size={24} />
                  </motion.a>
                  <motion.a
                    href="https://wa.me/+923001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-600 transition-colors"
                    aria-label="WhatsApp"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MessageCircle size={24} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SessionBookingPage;