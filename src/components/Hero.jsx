import { motion } from "framer-motion";
import { ChevronDown, Phone, Calendar, Sparkles, Heart } from "lucide-react";
import { SHOP_CONFIG } from "../config/constants";

const floatingIcons = [Sparkles, Heart, Sparkles, Heart, Sparkles];

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
      {/* Light pink gradient background */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-rose-light/40 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.5, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating sparkle icons */}
      {floatingIcons.map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${15 + i * 16}%`,
            left: `${8 + i * 18}%`,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            rotate: [0, 360],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 5 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        >
          <Icon className="w-4 h-4 text-primary/30" />
        </motion.div>
      ))}

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${3 + (i % 3) * 2}px`,
            height: `${3 + (i % 3) * 2}px`,
            background: i % 3 === 0 ? "rgba(200,104,140,0.25)" : i % 3 === 1 ? "rgba(201,168,76,0.25)" : "rgba(244,194,194,0.3)",
            top: `${8 + i * 7}%`,
            left: `${5 + ((i * 17) % 90)}%`,
          }}
          animate={{
            y: [0, -35, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 text-primary border border-primary/20 rounded-full text-sm tracking-widest uppercase glass-card-light">
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.span>
            Welcome to
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-secondary mb-6 leading-tight"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {SHOP_CONFIG.name.split(" ")[0]}
          </motion.span>
          <motion.span
            className="pink-gradient-text"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {SHOP_CONFIG.name.split(" ").slice(1).join(" ")}
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-500 mb-4 max-w-2xl mx-auto"
        >
          {SHOP_CONFIG.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-sm md:text-base text-gray-400 mb-10 max-w-xl mx-auto"
        >
          {SHOP_CONFIG.description}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-32 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-10"
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05, boxShadow: "0 12px 35px rgba(200,104,140,0.35)" }}
            whileTap={{ scale: 0.95 }}
            animate={{ boxShadow: ["0 4px 20px rgba(200,104,140,0.2)", "0 4px 30px rgba(200,104,140,0.4)", "0 4px 20px rgba(200,104,140,0.2)"] }}
            transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
            className="group flex items-center gap-2 bg-gradient-to-r from-primary to-pink-400 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg cursor-pointer"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Calendar className="w-5 h-5" />
            </motion.span>
            Book Appointment
          </motion.button>

          <motion.a
            href={`https://wa.me/${SHOP_CONFIG.phone}?text=${encodeURIComponent(SHOP_CONFIG.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(200,104,140,0.08)" }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 border-2 border-primary/30 text-secondary px-8 py-4 rounded-full font-semibold text-lg transition-colors"
          >
            <Phone className="w-5 h-5 text-primary group-hover:animate-bounce" />
            Chat with Us
          </motion.a>
        </motion.div>

        {/* Shop Timings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-gray-400 text-sm"
        >
          <motion.span
            whileHover={{ color: "#c8688c" }}
            className="transition-colors"
          >
            {SHOP_CONFIG.timings}
          </motion.span>
          <span className="hidden sm:inline text-primary/30">|</span>
          <motion.span
            whileHover={{ color: "#c8688c" }}
            className="transition-colors"
          >
            {SHOP_CONFIG.address}
          </motion.span>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/40 hover:text-primary transition-colors cursor-pointer"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  );
}
