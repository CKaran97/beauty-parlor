import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Users, Clock, Star, Sparkles } from "lucide-react";
import { SHOP_CONFIG } from "../config/constants";
import {
  useScrollAnimation,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
} from "../hooks/useScrollAnimation";

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useScrollAnimation(0.5);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { icon: Award, value: SHOP_CONFIG.experience, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 5000, suffix: "+", label: "Happy Clients" },
  { icon: Star, value: 4.8, suffix: "", label: "Rating" },
  { icon: Clock, value: 15, suffix: "+", label: "Expert Stylists" },
];

export default function About() {
  const { ref: leftRef, controls: leftControls } = useScrollAnimation(0.2);
  const { ref: rightRef, controls: rightControls } = useScrollAnimation(0.2);
  const { ref: statsRef, controls: statsControls } = useScrollAnimation(0.2);

  return (
    <section id="about" className="section-padding bg-white overflow-hidden relative">
      {/* Decorative blobs */}
      <motion.div
        className="absolute top-0 right-0 w-80 h-80 bg-pink-50 rounded-full blur-3xl opacity-60"
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-60 h-60 bg-gold/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            ref={leftRef}
            initial="hidden"
            animate={leftControls}
            variants={fadeInLeft}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-primary/10">
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600"
                alt="Beauty Parlor Interior"
                className="w-full h-[400px] md:h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />

              {/* Animated corner accents */}
              <motion.div
                className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold/60 rounded-tl-xl"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              />
              <motion.div
                className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold/60 rounded-br-xl"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-4 md:right-8 bg-white rounded-2xl shadow-xl shadow-primary/10 p-4 md:p-6 border border-pink-50"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary font-heading">
                <AnimatedCounter target={SHOP_CONFIG.experience} suffix="+" />
              </p>
              <p className="text-gray-400 text-sm">Years of Excellence</p>
            </motion.div>

            {/* Decorative dots */}
            <div className="absolute -top-6 -left-6 grid grid-cols-3 gap-2 opacity-30">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-gold rounded-full"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            ref={rightRef}
            initial="hidden"
            animate={rightControls}
            variants={fadeInRight}
          >
            <motion.span
              className="text-primary font-medium tracking-widest uppercase text-sm inline-flex items-center gap-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-3 h-3" />
              About Us
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mt-2 mb-6">
              Your Beauty, <br />
              <span className="pink-gradient-text">Our Passion</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              At {SHOP_CONFIG.name}, we believe every person deserves to feel
              beautiful and confident. With over {SHOP_CONFIG.experience} years
              of experience, our team of skilled professionals is dedicated to
              providing you with the best beauty services in town.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              From trendy haircuts to luxurious bridal packages, we use premium
              products and latest techniques to ensure you leave our salon
              looking and feeling your absolute best.
            </p>

            {/* Highlights */}
            <div className="space-y-4 mb-8">
              {[
                "Premium international products",
                "Expert & certified professionals",
                "Hygienic & relaxing environment",
                "Affordable luxury for everyone",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={rightControls}
                  variants={{
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.3 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    },
                    hidden: { opacity: 0, x: 30 },
                  }}
                  className="flex items-center gap-3 group"
                >
                  <motion.div
                    className="w-2.5 h-2.5 bg-gradient-to-r from-primary to-gold rounded-full"
                    whileHover={{ scale: 1.5 }}
                  />
                  <span className="text-gray-600 group-hover:text-primary transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial="hidden"
          animate={statsControls}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.03, boxShadow: "0 15px 40px rgba(200,104,140,0.12)" }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-white border border-pink-100 hover:border-primary/20 transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="inline-block"
                >
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                </motion.div>
                <p className="text-3xl font-bold text-secondary font-heading">
                  {typeof stat.value === "number" && stat.value > 10 ? (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  ) : (
                    `${stat.value}${stat.suffix}`
                  )}
                </p>
                <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 rounded-2xl overflow-hidden shadow-lg shadow-primary/5 border border-pink-100"
        >
          <iframe
            src={SHOP_CONFIG.googleMapsEmbed}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Shop Location"
          />
        </motion.div>
      </div>
    </section>
  );
}
