import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SHOP_CONFIG } from "../config/constants";

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${SHOP_CONFIG.phone}?text=${encodeURIComponent(SHOP_CONFIG.whatsappMessage)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0, rotate: -180 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ delay: 2.5, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.2, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 cursor-pointer"
      style={{ animation: "pulse-glow 2s infinite" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />

      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: [0, 1, 1, 0], x: [10, 0, 0, -10] }}
        transition={{ delay: 4, duration: 3, times: [0, 0.1, 0.8, 1] }}
        className="absolute right-16 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
      >
        Chat with us!
        <span className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
      </motion.span>
    </motion.a>
  );
}
