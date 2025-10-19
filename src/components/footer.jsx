import React from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-rose-200 via-pink-300 to-rose-400 text-gray-800 font-sans overflow-hidden">
      {/* Subtle floral ambient effects */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <div className="absolute top-[-15%] right-[-15%] w-80 h-80 bg-pink-400/20 rounded-full blur-[120px] md:w-96 md:h-96"></div>
      <div className="absolute bottom-[-15%] left-[-15%] w-80 h-80 bg-rose-400/20 rounded-full blur-[120px] md:w-96 md:h-96"></div>

      <div className="relative container mx-auto px-4 py-10 sm:py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* About Marina */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 relative after:content-[''] after:absolute after:w-10 after:h-[2px] after:bg-pink-500 after:bottom-0 after:left-0">
            About Marina
          </h3>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            Reconnect with inner peace through mindfulness and holistic wellness guidance.
          </p>
          <div className="flex gap-2 sm:gap-3 mt-4">
            {[Instagram, Linkedin, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-pink-500/50 transition-all duration-300 hover:scale-110"
                aria-label={`${Icon.name} link`}
              >
                <Icon size={16} className="text-pink-600" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 relative after:content-[''] after:absolute after:w-10 after:h-[2px] after:bg-pink-500 after:bottom-0 after:left-0">
            Explore
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/services", label: "Services" },
              { to: "/testimonials", label: "Testimonials" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  to={item.to}
                  className="hover:text-pink-600 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 relative after:content-[''] after:absolute after:w-10 after:h-[2px] after:bg-pink-500 after:bottom-0 after:left-0">
            Contact
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="text-pink-600" size={16} />
              <span>Dubai, UAE</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="text-pink-600" size={16} />
              <span>+971 555 123456</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="text-pink-600" size={16} />
              <span>hello@marinawellness.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 relative after:content-[''] after:absolute after:w-10 after:h-[2px] after:bg-pink-500 after:bottom-0 after:left-0">
            Stay Mindful
          </h3>
          <p className="text-xs sm:text-sm opacity-80">
            Get weekly mindfulness tips and updates.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 bg-white/20 rounded-lg overflow-hidden backdrop-blur-sm">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 sm:p-3 text-gray-800 bg-white/50 focus:outline-none text-xs sm:text-sm rounded"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-5 py-2 bg-pink-500 hover:bg-pink-600 transition-all text-white font-medium rounded text-xs sm:text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="relative border-t border-white/20 text-center py-4 text-xs sm:text-sm opacity-80">
        <p>© 2025 Marina Wellness. All Rights Reserved.</p>
        <p className="mt-1 text-pink-600">Crafted with love by Marina 🌸</p>
      </div>
    </footer>
  );
};

export default Footer;