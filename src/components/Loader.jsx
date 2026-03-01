import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SHOP_CONFIG } from "../config/constants";

export default function Loader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-pink-50 via-white to-accent flex flex-col items-center justify-center"
        >
          {/* Floating petals background */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: i % 2 === 0 ? "rgba(200,104,140,0.2)" : "rgba(201,168,76,0.2)",
                top: `${10 + i * 11}%`,
                left: `${5 + i * 12}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}

          {/* Spinning rings */}
          <div className="relative w-28 h-28 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-primary/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border-2 border-gold/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border-2 border-primary/40 rounded-full border-t-transparent border-r-transparent"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6 border-2 border-gold/40 rounded-full border-b-transparent border-l-transparent"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-gold" />
            </motion.div>
          </div>

          {/* Brand name with letter animation */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-heading font-bold text-secondary mb-2"
          >
            {SHOP_CONFIG.name}
          </motion.h2>

          {/* Animated loading dots */}
          <div className="flex items-center gap-1 mt-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>

          {/* Bottom shimmer line */}
          <motion.div
            className="absolute bottom-20 w-48 h-0.5 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-gold to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: "200%" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
