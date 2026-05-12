import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";
import { usePortfolio } from "../context/PortfolioContext";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn } from "../Animation/motion";
import { styles } from "../styles";
import { getIcon } from "../utils/iconMapping";

const EMAIL_CONFIG = {
  SERVICE_ID: "service_jki37si",
  TEMPLATE_ID: "template_6a3mcjg",
  PUBLIC_KEY: "8Eo4GHGaeD9coqIxx",
  RECIPIENT_NAME: "Qurban Hanif",
};

/* ── Form Input ──────────────────────────────────────────────── */
const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
  rows = null,
}) => (
  <label className="flex flex-col gap-2">
    <span className="text-white/80 font-medium text-[14px] uppercase tracking-widest">{label}</span>
    {rows ? (
      <textarea
        rows={rows}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-glass py-4 px-5 placeholder:text-white/25 text-white rounded-xl
                   font-medium resize-none text-[15px]"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-glass py-4 px-5 placeholder:text-white/25 text-white rounded-xl
                   font-medium text-[15px]"
      />
    )}
  </label>
);

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  rows: PropTypes.number,
};

/* ── Contact Method Card ─────────────────────────────────────── */
const ContactMethod = ({ icon, title, description, link, linkText }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -5, scale: 1.01 }}
    className="flex items-start gap-4 p-5 rounded-xl transition-all duration-400 group"
    style={{
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      background: "rgba(145,94,255,0.05)",
      border: "1px solid rgba(145,94,255,0.18)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.border = "1px solid rgba(145,94,255,0.45)";
      e.currentTarget.style.boxShadow = "0 6px 28px rgba(145,94,255,0.14)";
      e.currentTarget.style.background = "rgba(145,94,255,0.09)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.border = "1px solid rgba(145,94,255,0.18)";
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.background = "rgba(145,94,255,0.05)";
    }}
  >
    <div className="w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center text-2xl
                    bg-white/5 border border-white/10 group-hover:border-[#915EFF]/40 
                    group-hover:shadow-[0_0_16px_rgba(145,94,255,0.2)] transition-all duration-300 backdrop-blur-sm">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-white font-bold text-[15px] mb-0.5 group-hover:text-[#915EFF] transition-colors">{title}</h4>
      <p className="text-secondary text-[13px] mb-1">{description}</p>
      <p className="text-[#56ccf2] text-[13px] font-semibold truncate group-hover:underline">
        {linkText} →
      </p>
    </div>
  </motion.a>
);

ContactMethod.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

/* ── Main Contact Component ──────────────────────────────────── */
const Contact = () => {
  const { data } = usePortfolio();
  const contactSettings = data?.settings?.contact ?? {};
  const recipientEmail = contactSettings.email || "qurbanhanif120@gmail.com";
  const recipientName = contactSettings.name || EMAIL_CONFIG.RECIPIENT_NAME;

  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      setSubmitStatus(null);

      emailjs
        .send(
          EMAIL_CONFIG.SERVICE_ID,
          EMAIL_CONFIG.TEMPLATE_ID,
          {
            from_name: form.name,
            to_name: recipientName,
            from_email: form.email,
            to_email: recipientEmail,
            message: form.message,
          },
          EMAIL_CONFIG.PUBLIC_KEY
        )
        .then(
          () => {
            setLoading(false);
            setSubmitStatus("success");
            setForm({ name: "", email: "", message: "" });
            setTimeout(() => setSubmitStatus(null), 5000);
          },
          (error) => {
            setLoading(false);
            setSubmitStatus("error");
            console.error("Email submission error:", error);
            setTimeout(() => setSubmitStatus(null), 5000);
          }
        );
    },
    [form, recipientEmail, recipientName]
  );

  const extraMethods = (data?.socials ?? []).map(s => {
    const Icon = getIcon(s.icon);
    const initial = s.title?.charAt(0).toUpperCase() || "?";
    
    return {
      icon: Icon ? <Icon /> : <span className="font-black text-[15px]">{initial}</span>,
      title: s.title,
      description: `Connect via ${s.title}`,
      link: s.url,
      linkText: "Visit Link"
    };
  });

  const contactMethods = extraMethods;

  return (
    <>
      <div className="xl:mt-8 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
        {/* ── Contact Form ── */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] contact-glass rounded-2xl p-8 relative overflow-hidden"
        >
          {/* Ambient glow blob */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#915EFF]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col items-start gap-2 mb-8 relative z-10">
            <span className="text-[#915EFF] text-[12px] font-bold uppercase tracking-[0.25em]">
              Message Me
            </span>
            <h3 className="text-white font-black md:text-[42px] sm:text-[32px] text-[26px] leading-tight">
              Direct Contact
            </h3>
            <div className="w-16 h-[4px] rounded-full bg-white/10 relative overflow-hidden">
               <div className="absolute inset-0 bg-[#915EFF] animate-shimmer" style={{ backgroundSize: '200% auto' }} />
            </div>
          </div>

          {/* Status messages */}
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl flex items-center gap-3 relative z-10"
              style={{
                background: "rgba(52,211,153,0.10)",
                border: "1px solid rgba(52,211,153,0.40)",
              }}
            >
              <span className="text-green-400 text-lg">✓</span>
              <p className="text-green-400 text-[14px] font-medium">
                Thank you! I&apos;ll get back to you as soon as possible.
              </p>
            </motion.div>
          )}
          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl flex items-center gap-3 relative z-10"
              style={{
                background: "rgba(239,68,68,0.10)",
                border: "1px solid rgba(239,68,68,0.40)",
              }}
            >
              <span className="text-red-400 text-lg">✕</span>
              <p className="text-red-400 text-[14px] font-medium">
                Something went wrong. Please try again later.
              </p>
            </motion.div>
          )}

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 relative z-10"
          >
            <FormInput
              label="Your Name"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
            />
            <FormInput
              label="Your Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
            <FormInput
              label="Your Message"
              name="message"
              placeholder="What would you like to say?"
              value={form.message}
              onChange={handleChange}
              rows={7}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className={`${styles.glassButtonPremium} w-fit px-10 py-3 text-[15px] disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                "📧 Send Message"
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* ── Earth Canvas ── */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-[700px] lg:h-[600px] md:h-[550px] h-[350px]"
        >
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-[#915EFF]/5 rounded-full filter blur-3xl opacity-20" />
            <EarthCanvas />
          </div>
        </motion.div>
      </div>

      {/* ── Contact Method Cards ── */}
      <motion.div
        variants={fadeIn("up", "spring", 0.4, 0.75)}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {contactMethods.map((method, index) => (
          <motion.div
            key={index}
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
          >
            <ContactMethod {...method} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

const ContactSection = SectionWrapper(Contact, "contact");

export { Contact };
export default ContactSection;