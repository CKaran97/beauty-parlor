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
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mt-2 mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full" />
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-gray-100 text-gray-600 hover:bg-accent"
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
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 transition-all hover:border-primary/20"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors"
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-bold text-secondary mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ₹{service.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider bg-gray-50 px-3 py-1 rounded-full">
                      {service.category}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
