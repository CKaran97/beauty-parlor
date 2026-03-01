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
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
      style={{ animation: "pulse-glow 2s infinite" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />

      {/* Ping animation ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
    </motion.a>
  );
}
