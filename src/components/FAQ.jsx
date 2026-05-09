import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";
import { styles } from "../styles";

/* ── FAQ Item ─────────────────────────────────────────────────── */
const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.08, 0.75)}
      className={`faq-glass rounded-xl overflow-hidden ${isOpen ? "border-[#915EFF]/50" : ""}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between
                   hover:bg-[#915EFF]/8 transition-colors duration-300 text-left group"
      >
        <h3 className="text-white font-semibold text-[15px] leading-snug pr-4 group-hover:text-[#915EFF] transition-colors duration-300">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                      border transition-all duration-300
                      ${isOpen
                        ? "bg-[#915EFF]/20 border-[#915EFF]/60 text-[#915EFF]"
                        : "border-white/15 text-white/50 group-hover:border-[#915EFF]/40 group-hover:text-[#915EFF]"
                      }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="faq-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            className="border-t border-[#915EFF]/20"
          >
            <div
              className="px-6 py-5"
              style={{
                background: "rgba(145,94,255,0.04)",
              }}
            >
              <p className="text-secondary text-[14px] leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

FAQItem.propTypes = {
  id: PropTypes.number,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

/* ── FAQ Section ──────────────────────────────────────────────── */
const FAQ = () => {
  const { data } = usePortfolio();

  return (
    <>
      <motion.div variants={textVariant()} className="flex flex-col items-start gap-3">
        <span className="section-badge">Help &amp; Support</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-secondary text-base sm:text-lg">
          Find answers to common questions about my services, processes, and working arrangements.
        </p>
      </motion.div>

      <div className="mt-12 space-y-3 w-full">
        {(data?.settings?.faqs ?? []).map((faq, index) => (
          <FAQItem key={faq.id || index} {...faq} index={index} />
        ))}
      </div>

      {/* Still have questions CTA */}
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        className="mt-14 p-8 rounded-2xl text-center relative overflow-hidden backdrop-blur-2xl bg-white/[0.04] border border-white/10 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#915EFF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#56ccf2]/8 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <p className="text-3xl mb-3">💬</p>
          <p className="text-white text-[18px] font-bold mb-2">Still have questions?</p>
          <p className="text-secondary text-[15px] mb-7 max-w-md mx-auto">
            I&apos;m always happy to discuss your project needs. Reach out anytime!
          </p>
          <a href="/contact" className={`${styles.glassButtonPremium} px-8 py-3 text-[15px]`}>
            Get in Touch
          </a>
        </div>
      </motion.div>
    </>
  );
};

const FAQSection = SectionWrapper(FAQ, "faq");
export default FAQSection;