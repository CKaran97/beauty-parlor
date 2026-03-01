import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES, SERVICE_CATEGORIES } from "../data/services";
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "../hooks/useScrollAnimation";

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { ref, controls } = useScrollAnimation(0.1);

  const filtered =
    activeCategory === "All"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-10 right-0 w-72 h-72 bg-pink-100/40 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <motion.span
            className="text-primary font-medium tracking-widest uppercase text-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            What We Offer
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mt-2 mb-4">
            Our <span className="pink-gradient-text">Services</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-primary via-gold to-primary mx-auto rounded-full"
          />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {SERVICE_CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-primary to-pink-400 text-white shadow-lg shadow-primary/25"
                  : "bg-pink-50 text-gray-500 hover:bg-pink-100 hover:text-primary"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={staggerItem}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 50px rgba(200,104,140,0.12)",
                  }}
                  className="group bg-white border border-pink-100 rounded-2xl p-6 transition-all hover:border-primary/20 card-shine"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    className="w-14 h-14 bg-gradient-to-br from-pink-50 to-accent rounded-xl flex items-center justify-center mb-4 group-hover:from-primary/10 group-hover:to-pink-100 transition-all"
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <motion.span
                      className="text-2xl font-bold text-primary"
                      whileHover={{ scale: 1.05 }}
                    >
                      ₹{service.price.toLocaleString("en-IN")}
                    </motion.span>
                    <span className="text-xs text-primary/60 uppercase tracking-wider bg-pink-50 px-3 py-1 rounded-full">
                      {service.category}
                    </span>
                  </div>

                  {/* Bottom hover line */}
                  <motion.div
                    className="mt-4 h-0.5 bg-gradient-to-r from-primary to-gold rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
