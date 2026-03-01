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
  Sparkles,
  Heart,
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
  const [status, setStatus] = useState(null);
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
      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/5 rounded-full blur-3xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating icons */}
      {[Sparkles, Heart, Sparkles].map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: `${20 + i * 25}%`, right: `${5 + i * 10}%` }}
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, delay: i }}
        >
          <Icon className="w-5 h-5 text-gold/30" />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <span className="text-gold-light font-medium tracking-widest uppercase text-sm inline-flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            Get in Touch
            <Sparkles className="w-3 h-3" />
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-2 mb-4">
            Contact Us
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-gradient-to-r from-gold via-primary to-gold mx-auto rounded-full"
          />
          <p className="text-white/50 mt-4 max-w-lg mx-auto">
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
            whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            className="glass-card rounded-2xl p-6 text-center group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 20, scale: 1.2 }}
              animate={{ y: [0, -3, 0] }}
              transition={{ y: { duration: 2, repeat: Infinity } }}
              className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <MessageCircle className="w-8 h-8 text-green-400" />
            </motion.div>
            <h3 className="text-white font-heading font-bold text-xl mb-2">WhatsApp</h3>
            <p className="text-white/50 text-sm">
              Chat directly on WhatsApp. Quick response guaranteed!
            </p>
            <motion.span
              className="inline-block mt-4 text-green-400 font-medium text-sm"
              whileHover={{ x: 5 }}
            >
              Open WhatsApp →
            </motion.span>
          </motion.a>

          {/* Email */}
          <motion.a
            href={emailUrl}
            variants={staggerItem}
            whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            className="glass-card rounded-2xl p-6 text-center group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 20, scale: 1.2 }}
              animate={{ y: [0, -3, 0] }}
              transition={{ y: { duration: 2.5, repeat: Infinity } }}
              className="w-16 h-16 bg-rose/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="w-8 h-8 text-rose" />
            </motion.div>
            <h3 className="text-white font-heading font-bold text-xl mb-2">Email Us</h3>
            <p className="text-white/50 text-sm">
              Send us an email. We'll get back within 24 hours.
            </p>
            <motion.span
              className="inline-block mt-4 text-rose font-medium text-sm"
              whileHover={{ x: 5 }}
            >
              Send Email →
            </motion.span>
          </motion.a>

          {/* Call */}
          <motion.a
            href={`tel:+${SHOP_CONFIG.phone}`}
            variants={staggerItem}
            whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            className="glass-card rounded-2xl p-6 text-center group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 20, scale: 1.2 }}
              animate={{ y: [0, -3, 0] }}
              transition={{ y: { duration: 3, repeat: Infinity } }}
              className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Phone className="w-8 h-8 text-gold" />
            </motion.div>
            <h3 className="text-white font-heading font-bold text-xl mb-2">Call Us</h3>
            <p className="text-white/50 text-sm">
              Speak directly with our team for quick bookings.
            </p>
            <motion.span
              className="inline-block mt-4 text-gold font-medium text-sm"
              whileHover={{ x: 5 }}
            >
              Call Now →
            </motion.span>
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
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/10 border border-pink-50">
              <h3 className="text-2xl font-heading font-bold text-secondary mb-2">
                Send Us Your Details
              </h3>
              <p className="text-gray-400 text-sm mb-6">We'll get back to you shortly</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: "name", label: "Name", type: "text", required: true, placeholder: "Your full name" },
                  { name: "phone", label: "Phone Number", type: "tel", required: true, placeholder: "10-digit phone number", maxLength: 10 },
                  { name: "email", label: "Email", type: "email", required: false, placeholder: "your@email.com" },
                ].map((field, i) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {field.label} {field.required ? <span className="text-primary">*</span> : <span className="text-gray-300">(optional)</span>}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                      maxLength={field.maxLength}
                      className="w-full px-4 py-3 rounded-xl border border-pink-100 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all bg-pink-50/30 hover:bg-pink-50/50"
                    />
                  </motion.div>
                ))}

                {/* Service dropdown */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Service Interested In
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-pink-100 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all bg-pink-50/30 hover:bg-pink-50/50"
                  >
                    <option value="">Select a service</option>
                    {uniqueServices.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us what you're looking for..."
                    className="w-full px-4 py-3 rounded-xl border border-pink-100 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all resize-none bg-pink-50/30 hover:bg-pink-50/50"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(200,104,140,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed transition-all ${
                    status === "success"
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-primary to-pink-400 text-white shadow-lg shadow-primary/25"
                  } disabled:opacity-80`}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : status === "success" ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Thank you! We'll get back to you soon.
                    </motion.span>
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
              <h3 className="text-white font-heading font-bold text-xl mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" />
                Visit Us
              </h3>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Address", value: SHOP_CONFIG.address },
                  { icon: Clock, label: "Timings", value: [SHOP_CONFIG.timingsDetail.weekdays, SHOP_CONFIG.timingsDetail.saturday, SHOP_CONFIG.timingsDetail.sunday] },
                  { icon: Phone, label: "Phone", value: `+${SHOP_CONFIG.phone}` },
                  { icon: Mail, label: "Email", value: SHOP_CONFIG.email },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      className="w-10 h-10 bg-gold/15 rounded-xl flex items-center justify-center shrink-0"
                    >
                      <item.icon className="w-5 h-5 text-gold" />
                    </motion.div>
                    <div>
                      <p className="text-white/80 font-medium text-sm">{item.label}</p>
                      {Array.isArray(item.value) ? (
                        item.value.map((v, j) => (
                          <p key={j} className="text-white/45 text-sm">{v}</p>
                        ))
                      ) : (
                        <p className="text-white/45 text-sm">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp CTA */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: "0 12px 30px rgba(37,211,102,0.3)" }}
              whileTap={{ scale: 0.97 }}
              animate={{ boxShadow: ["0 4px 15px rgba(37,211,102,0.2)", "0 4px 25px rgba(37,211,102,0.35)", "0 4px 15px rgba(37,211,102,0.2)"] }}
              transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
              className="block w-full bg-green-500 text-white text-center py-4 rounded-2xl font-semibold hover:bg-green-600 transition-colors"
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
