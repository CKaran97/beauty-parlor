import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { SHOP_CONFIG } from "../config/constants";
import { GALLERY_FALLBACK } from "../data/services";
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "../hooks/useScrollAnimation";

function convertDriveUrl(url) {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}

export default function Gallery() {
  const [images, setImages] = useState(GALLERY_FALLBACK);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const { ref, controls } = useScrollAnimation(0.1);

  useEffect(() => {
    if (
      !SHOP_CONFIG.galleryScriptURL ||
      SHOP_CONFIG.galleryScriptURL === "YOUR_GALLERY_APPS_SCRIPT_URL_HERE"
    )
      return;

    fetch(SHOP_CONFIG.galleryScriptURL)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const mapped = data.map((item) => ({
            url: convertDriveUrl(item.ImageURL || item.url),
            caption: item.Caption || item.caption || "",
            category: item.Category || item.category || "Other",
          }));
          setImages(mapped);
        }
      })
      .catch(() => {
        // Fallback images already set
      });
  }, []);

  const categories = ["All", ...new Set(images.map((img) => img.category))];
  const filtered =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  return (
    <section id="gallery" className="section-padding bg-gray-50">
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
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mt-2 mb-4">
            Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full" />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeFilter === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-white text-gray-600 hover:bg-accent"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Image Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filtered.map((image, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ scale: 1.03 }}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-white font-medium text-sm">
                      {image.caption}
                    </p>
                    <p className="text-white/60 text-xs">{image.category}</p>
                  </motion.div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-4 right-4 text-white/70 hover:text-white z-50 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="max-w-4xl max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <p className="text-white text-lg font-heading font-bold">
                  {selectedImage.caption}
                </p>
                <p className="text-white/60 text-sm">
                  {selectedImage.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
