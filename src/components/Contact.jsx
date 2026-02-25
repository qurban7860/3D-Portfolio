import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn } from "../Animation/motion";

const EMAIL_CONFIG = {
  SERVICE_ID: "service_jki37si",
  TEMPLATE_ID: "template_6a3mcjg",
  PUBLIC_KEY: "8Eo4GHGaeD9coqIxx",
  RECIPIENT_NAME: "Qurban Hanif",
  RECIPIENT_EMAIL: "qurbanhanif120@gmail.com",
};

const FormInput = ({ label, name, type = "text", placeholder, value, onChange, required = true, rows = null }) => (
  <label className="flex flex-col">
    <span className="text-white font-medium mb-4">{label}</span>
    {rows ? (
      <textarea
        rows={rows}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-[#915EFF]/20 font-medium focus:ring-2 focus:ring-[#915EFF] transition-all hover:border-[#915EFF]/60"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-[#915EFF]/20 font-medium focus:ring-2 focus:ring-[#915EFF] transition-all hover:border-[#915EFF]/60"
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

const SubmitButton = ({ isLoading }) => (
  <button
    type="submit"
    className="bg-gradient-to-r from-[#915EFF] to-[#56ccf2] hover:shadow-lg hover:shadow-[#915EFF]/50 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold transition-all duration-300 hover:scale-105 transform"
  >
    {isLoading ? (
      <span className="flex items-center gap-2">
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        Sending...
      </span>
    ) : (
      "📧 Send Message"
    )}
  </button>
);

SubmitButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const ContactMethod = ({ icon, title, description, link, linkText }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -5 }}
    className="flex items-start gap-4 p-4 bg-tertiary border border-[#915EFF]/20 rounded-lg hover:border-[#915EFF]/60 hover:shadow-lg hover:shadow-[#915EFF]/20 transition-all duration-300"
  >
    <div className="text-3xl flex-shrink-0">{icon}</div>
    <div className="flex-1">
      <h4 className="text-white font-bold text-[16px] mb-1">{title}</h4>
      <p className="text-secondary text-[14px] mb-2">{description}</p>
      <p className="text-[#915EFF] text-[14px] font-semibold hover:text-[#56ccf2] transition-colors">{linkText} →</p>
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

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    emailjs
      .send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: EMAIL_CONFIG.RECIPIENT_NAME,
          from_email: form.email,
          to_email: EMAIL_CONFIG.RECIPIENT_EMAIL,
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
  }, [form]);

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      description: "Send me a direct email",
      link: "mailto:qurbanhanif120@gmail.com",
      linkText: "qurbanhanif120@gmail.com"
    },
    {
      icon: "💬",
      title: "Direct Message",
      description: "Connect with me on LinkedIn",
      link: "https://www.linkedin.com/in/qurban015",
      linkText: "Open LinkedIn"
    },
    {
      icon: "☎️",
      title: "Phone Call",
      description: "Call me for quick discussion",
      link: "tel:+923085651015",
      linkText: "+92-308-5651015"
    }
  ];

  return (
    <>
      <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl border border-[#915EFF]/10"
        >
          <p className="section-badge">Let&apos;s Connect</p>
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact Me</h3>

          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg text-green-400 flex items-center gap-2"
            >
              <span>✓</span> Thank you! I&apos;ll get back to you as soon as possible.
            </motion.div>
          )}
          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400 flex items-center gap-2"
            >
              <span>✕</span> Something went wrong. Please try again later.
            </motion.div>
          )}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8"
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

            <SubmitButton isLoading={loading} />
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}

          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
          <div className="w-full h-full">
            <EarthCanvas />
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 0.4, 0.75)}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {contactMethods.map((method, index) => (
          <motion.div key={index} variants={fadeIn("up", "spring", index * 0.1, 0.75)}>
            <ContactMethod {...method} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

const ContactSection = SectionWrapper(Contact, "contact");

export default ContactSection;