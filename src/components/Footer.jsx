import { motion } from "framer-motion";
import { Sparkles, Instagram, Facebook, MapPin, Phone, Mail, Clock, Heart } from "lucide-react";
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
      className="bg-secondary text-white relative overflow-hidden"
    >
      {/* Top decorative line */}
      <div className="h-1 bg-gradient-to-r from-primary via-gold to-primary" />

      {/* Background decorations */}
      <motion.div
        className="absolute top-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

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
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-gold" />
              </motion.div>
              <span className="font-heading text-2xl font-bold">{SHOP_CONFIG.name}</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              {SHOP_CONFIG.description}
            </p>
            <div className="flex gap-3">
              {SHOP_CONFIG.social.instagram && (
                <motion.a
                  href={SHOP_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
                  className="w-10 h-10 bg-white/8 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-primary/20 hover:to-pink-400/20 transition-all border border-white/5"
                >
                  <Instagram className="w-5 h-5 text-white/60" />
                </motion.a>
              )}
              {SHOP_CONFIG.social.facebook && (
                <motion.a
                  href={SHOP_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3, rotate: -5 }}
                  className="w-10 h-10 bg-white/8 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-primary/20 hover:to-pink-400/20 transition-all border border-white/5"
                >
                  <Facebook className="w-5 h-5 text-white/60" />
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              Quick Links
              <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <motion.button
                    onClick={() => handleLinkClick(link.href)}
                    whileHover={{ x: 8, color: "#c8688c" }}
                    className="text-white/40 hover:text-primary transition-colors text-sm cursor-pointer flex items-center gap-2"
                  >
                    <motion.span
                      className="w-1 h-1 bg-gold/50 rounded-full"
                      whileHover={{ scale: 2 }}
                    />
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={staggerItem}>
            <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              Contact Info
              <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            </h3>
            <div className="space-y-4">
              {[
                { icon: MapPin, text: SHOP_CONFIG.address },
                { icon: Phone, text: `+${SHOP_CONFIG.phone}` },
                { icon: Mail, text: SHOP_CONFIG.email },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 group"
                  whileHover={{ x: 3 }}
                >
                  <item.icon className="w-4 h-4 text-gold mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                  <span className="text-white/40 text-sm group-hover:text-white/60 transition-colors">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timings */}
          <motion.div variants={staggerItem}>
            <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              Working Hours
              <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            </h3>
            <div className="space-y-3">
              {[
                { text: SHOP_CONFIG.timingsDetail.weekdays, active: true },
                { text: SHOP_CONFIG.timingsDetail.saturday, active: true },
                { text: SHOP_CONFIG.timingsDetail.sunday, active: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Clock className={`w-4 h-4 shrink-0 ${item.active ? "text-gold" : "text-gold/30"}`} />
                  <span className={`text-sm ${item.active ? "text-white/40" : "text-white/20"}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/8 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/25 text-sm">
              &copy; {new Date().getFullYear()} {SHOP_CONFIG.name}. All rights reserved.
            </p>
            <motion.p
              className="text-white/20 text-xs flex items-center gap-1"
              whileHover={{ color: "rgba(200,104,140,0.6)" }}
            >
              Crafted with <Heart className="w-3 h-3 text-primary/50" /> and care
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
