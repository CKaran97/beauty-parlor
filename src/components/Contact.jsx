import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Send,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { SHOP_CONFIG } from "../config/constants";
import { SERVICES } from "../data/services";
import {
  useScrollAnimation,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
} from "../hooks/useScrollAnimation";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // "loading" | "success" | "error"
  const { ref, controls } = useScrollAnimation(0.1);
  const { ref: formRef, controls: formControls } = useScrollAnimation(0.1);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    if (!/^\d{10}$/.test(formData.phone)) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    if (
      !SHOP_CONFIG.googleScriptURL ||
      SHOP_CONFIG.googleScriptURL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"
    ) {
      // Demo mode - simulate success
      await new Promise((r) => setTimeout(r, 1500));
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", service: "", message: "" });
      setTimeout(() => setStatus(null), 4000);
      return;
    }

    try {
      await fetch(SHOP_CONFIG.googleScriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toLocaleString("en-IN"),
        }),
      });
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", service: "", message: "" });
      setTimeout(() => setStatus(null), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus(null), 4000);
    }
  };

  const whatsappUrl = `https://wa.me/${SHOP_CONFIG.phone}?text=${encodeURIComponent(SHOP_CONFIG.whatsappMessage)}`;
  const emailUrl = `mailto:${SHOP_CONFIG.email}?subject=${encodeURIComponent("Enquiry - Beauty Parlor Services")}`;

  const uniqueServices = [...new Set(SERVICES.map((s) => s.name))];

  return (
    <section id="contact" className="section-padding gradient-bg relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <span className="text-gold font-medium tracking-widest uppercase text-sm">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-2 mb-4">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full" />
          <p className="text-white/60 mt-4 max-w-lg mx-auto">
            Choose your preferred way to reach us. We'd love to hear from you!
          </p>
        </motion.div>

        {/* Quick Contact Cards */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {/* WhatsApp */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variants={staggerItem}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card rounded-2xl p-6 text-center group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.2 }}
              className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <MessageCircle className="w-8 h-8 text-green-400" />
            </motion.div>
            <h3 className="text-white font-heading font-bold text-xl mb-2">
              WhatsApp
            </h3>
            <p className="text-white/60 text-sm">
              Chat directly on WhatsApp. Quick response guaranteed!
            </p>
            <span className="inline-block mt-4 text-green-400 font-medium text-sm group-hover:underline">
              Open WhatsApp →
            </span>
          </motion.a>

          {/* Email */}
          <motion.a
            href={emailUrl}
            variants={staggerItem}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card rounded-2xl p-6 text-center group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.2 }}
              className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="w-8 h-8 text-blue-400" />
            </motion.div>
            <h3 className="text-white font-heading font-bold text-xl mb-2">
              Email Us
            </h3>
            <p className="text-white/60 text-sm">
              Send us an email. We'll get back within 24 hours.
            </p>
            <span className="inline-block mt-4 text-blue-400 font-medium text-sm group-hover:underline">
              Send Email →
            </span>
          </motion.a>

          {/* Call */}
          <motion.a
            href={`tel:+${SHOP_CONFIG.phone}`}
            variants={staggerItem}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card rounded-2xl p-6 text-center group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.2 }}
              className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Phone className="w-8 h-8 text-gold" />
            </motion.div>
            <h3 className="text-white font-heading font-bold text-xl mb-2">
              Call Us
            </h3>
            <p className="text-white/60 text-sm">
              Speak directly with our team for quick bookings.
            </p>
            <span className="inline-block mt-4 text-gold font-medium text-sm group-hover:underline">
              Call Now →
            </span>
          </motion.a>
        </motion.div>

        {/* Form + Info */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial="hidden"
            animate={formControls}
            variants={fadeInLeft}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-heading font-bold text-secondary mb-6">
                Send Us Your Details
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="10-digit phone number"
                    maxLength={10}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </motion.div>

                {/* Service */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Interested In
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                  >
                    <option value="">Select a service</option>
                    {uniqueServices.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us what you're looking for..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Thank you! We'll get back to you soon.
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Please enter a valid 10-digit phone number.
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial="hidden"
            animate={formControls}
            variants={fadeInRight}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-white font-heading font-bold text-xl mb-6">
                Visit Us
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-white/80 font-medium">Address</p>
                    <p className="text-white/50 text-sm">
                      {SHOP_CONFIG.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-white/80 font-medium">Timings</p>
                    <p className="text-white/50 text-sm">
                      {SHOP_CONFIG.timingsDetail.weekdays}
                    </p>
                    <p className="text-white/50 text-sm">
                      {SHOP_CONFIG.timingsDetail.saturday}
                    </p>
                    <p className="text-white/50 text-sm">
                      {SHOP_CONFIG.timingsDetail.sunday}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-white/80 font-medium">Phone</p>
                    <p className="text-white/50 text-sm">
                      +{SHOP_CONFIG.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-white/80 font-medium">Email</p>
                    <p className="text-white/50 text-sm">
                      {SHOP_CONFIG.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp CTA */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="block w-full bg-green-500 text-white text-center py-4 rounded-2xl font-semibold shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors"
            >
              <span className="flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Quick Chat on WhatsApp
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
