import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Users, Clock, Star } from "lucide-react";
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
  {
    icon: Award,
    value: SHOP_CONFIG.experience,
    suffix: "+",
    label: "Years Experience",
  },
  { icon: Users, value: 5000, suffix: "+", label: "Happy Clients" },
  { icon: Star, value: 4.8, suffix: "", label: "Rating" },
  { icon: Clock, value: 15, suffix: "+", label: "Expert Stylists" },
];

export default function About() {
  const { ref: leftRef, controls: leftControls } = useScrollAnimation(0.2);
  const { ref: rightRef, controls: rightControls } = useScrollAnimation(0.2);
  const { ref: statsRef, controls: statsControls } = useScrollAnimation(0.2);

  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            ref={leftRef}
            initial="hidden"
            animate={leftControls}
            variants={fadeInLeft}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600"
                alt="Beauty Parlor Interior"
                className="w-full h-[400px] md:h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -right-4 md:right-8 bg-white rounded-2xl shadow-xl p-4 md:p-6"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary font-heading">
                <AnimatedCounter target={SHOP_CONFIG.experience} suffix="+" />
              </p>
              <p className="text-gray-500 text-sm">Years of Excellence</p>
            </motion.div>

            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold/30 rounded-2xl -z-10" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            ref={rightRef}
            initial="hidden"
            animate={rightControls}
            variants={fadeInRight}
          >
            <span className="text-primary font-medium tracking-widest uppercase text-sm">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mt-2 mb-6">
              Your Beauty, <br />
              <span className="gold-gradient-text">Our Passion</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At {SHOP_CONFIG.name}, we believe every person deserves to feel
              beautiful and confident. With over {SHOP_CONFIG.experience} years
              of experience, our team of skilled professionals is dedicated to
              providing you with the best beauty services in town.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              From trendy haircuts to luxurious bridal packages, we use premium
              products and latest techniques to ensure you leave our salon
              looking and feeling your absolute best. Your satisfaction is our
              priority.
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={rightControls}
                  variants={{
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.3 + i * 0.1 },
                    },
                    hidden: { opacity: 0, x: 20 },
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  <span className="text-gray-700">{item}</span>
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
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-accent/50 hover:bg-accent transition-colors"
              >
                <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-secondary font-heading">
                  {typeof stat.value === "number" && stat.value > 10 ? (
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                    />
                  ) : (
                    `${stat.value}${stat.suffix}`
                  )}
                </p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
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
          className="mt-16 rounded-2xl overflow-hidden shadow-lg"
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
