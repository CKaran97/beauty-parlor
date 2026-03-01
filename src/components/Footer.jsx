import { motion } from "framer-motion";
import { Sparkles, Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";
import { SHOP_CONFIG, NAV_LINKS } from "../config/constants";
import { useScrollAnimation, fadeInUp, staggerContainer, staggerItem } from "../hooks/useScrollAnimation";

export default function Footer() {
  const { ref, controls } = useScrollAnimation(0.1);

  const handleLinkClick = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      className="bg-secondary text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          {/* Brand */}
          <motion.div variants={staggerItem}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-gold" />
              <span className="font-heading text-2xl font-bold">{SHOP_CONFIG.name}</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {SHOP_CONFIG.description}
            </p>
            <div className="flex gap-3">
              {SHOP_CONFIG.social.instagram && (
                <motion.a
                  href={SHOP_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold/20 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-white/70" />
                </motion.a>
              )}
              {SHOP_CONFIG.social.facebook && (
                <motion.a
                  href={SHOP_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold/20 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white/70" />
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <motion.button
                    onClick={() => handleLinkClick(link.href)}
                    whileHover={{ x: 5, color: "#d4af37" }}
                    className="text-white/50 hover:text-gold transition-colors text-sm cursor-pointer"
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={staggerItem}>
            <h3 className="font-heading font-bold text-lg mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
                <span className="text-white/50 text-sm">{SHOP_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span className="text-white/50 text-sm">+{SHOP_CONFIG.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span className="text-white/50 text-sm">{SHOP_CONFIG.email}</span>
              </div>
            </div>
          </motion.div>

          {/* Timings */}
          <motion.div variants={staggerItem}>
            <h3 className="font-heading font-bold text-lg mb-4">Working Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span className="text-white/50 text-sm">{SHOP_CONFIG.timingsDetail.weekdays}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span className="text-white/50 text-sm">{SHOP_CONFIG.timingsDetail.saturday}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold/50 shrink-0" />
                <span className="text-white/30 text-sm">{SHOP_CONFIG.timingsDetail.sunday}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} {SHOP_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-white/20 text-xs">
              Crafted with love
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
