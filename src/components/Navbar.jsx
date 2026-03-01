import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { SHOP_CONFIG, NAV_LINKS } from "../config/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href) => {
    setIsOpen(false);
    // Delay scroll until menu close animation (300ms) completes
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        const navHeight = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 350);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      {/* Top shimmer line */}
      {scrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles
                className={`w-6 h-6 ${scrolled ? "text-gold" : "text-gold-light"}`}
              />
            </motion.div>
            <span
              className={`font-heading text-xl md:text-2xl font-bold transition-colors duration-300 ${
                scrolled ? "text-secondary" : "text-white"
              }`}
            >
              {SHOP_CONFIG.name}
            </span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`relative font-medium transition-colors cursor-pointer ${
                  scrolled
                    ? "text-gray-600 hover:text-primary"
                    : "text-white/90 hover:text-gold-light"
                }`}
                whileHover={{ y: -2 }}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-gold rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
            <motion.button
              onClick={() => handleLinkClick("#contact")}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(200,104,140,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-pink-400 text-white px-6 py-2.5 rounded-full font-medium text-sm shadow-md cursor-pointer"
            >
              Book Now
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.9, rotate: 90 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 cursor-pointer ${scrolled ? "text-secondary" : "text-white"}`}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-pink-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => handleLinkClick(link.href)}
                  className="block w-full text-left py-3 px-4 text-gray-600 hover:text-primary hover:bg-pink-50 rounded-xl transition-all font-medium cursor-pointer"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => handleLinkClick("#contact")}
                className="block w-full text-center bg-gradient-to-r from-primary to-pink-400 text-white py-3 rounded-full font-medium mt-3 cursor-pointer shadow-md"
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
