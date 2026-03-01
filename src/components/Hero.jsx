import { motion } from "framer-motion";
import { ChevronDown, Phone, Calendar } from "lucide-react";
import { SHOP_CONFIG } from "../config/constants";

export default function Hero() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-rose/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gold/30 rounded-full"
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 text-gold border border-gold/30 rounded-full text-sm tracking-widest uppercase glass-card">
            Welcome to
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 leading-tight"
        >
          <span className="block">{SHOP_CONFIG.name.split(" ")[0]}</span>
          <span className="gold-gradient-text">
            {SHOP_CONFIG.name.split(" ").slice(1).join(" ")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/70 mb-4 max-w-2xl mx-auto"
        >
          {SHOP_CONFIG.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm md:text-base text-white/50 mb-10 max-w-xl mx-auto"
        >
          {SHOP_CONFIG.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 bg-gradient-to-r from-gold to-primary-light text-secondary px-8 py-4 rounded-full font-semibold text-lg shadow-lg cursor-pointer"
          >
            <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Book Appointment
          </motion.button>

          <motion.a
            href={`https://wa.me/${SHOP_CONFIG.phone}?text=${encodeURIComponent(SHOP_CONFIG.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
          >
            <Phone className="w-5 h-5 group-hover:animate-bounce" />
            Chat with Us
          </motion.a>
        </motion.div>

        {/* Shop Timings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-white/50 text-sm"
        >
          <span>{SHOP_CONFIG.timings}</span>
          <span className="hidden sm:inline">|</span>
          <span>{SHOP_CONFIG.address}</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToServices}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: { delay: 1.5, duration: 1.5, repeat: Infinity },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-gold transition-colors cursor-pointer"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  );
}
