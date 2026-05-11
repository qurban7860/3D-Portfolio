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
      className={`premium-glass rounded-[1.5rem] overflow-hidden ${isOpen ? "border-[#915EFF]/40" : "border-white/5"} transition-all duration-500`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between
                   hover:bg-[#915EFF]/5 transition-colors duration-300 text-left group"
      >
        <h3 className="text-white font-bold text-lg leading-snug pr-4 group-hover:text-[#915EFF] transition-colors duration-300">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                      border transition-all duration-300
                      ${isOpen
                        ? "bg-[#915EFF]/20 border-[#915EFF]/60 text-[#915EFF]"
                        : "border-white/10 text-white/30 group-hover:border-[#915EFF]/40 group-hover:text-[#915EFF]"
                      }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
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
            className="border-t border-white/5"
          >
            <div
              className="px-8 py-6 bg-[#915EFF]/[0.02]"
            >
              <p className="text-secondary text-base leading-relaxed opacity-90">{answer}</p>
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
  const faqs = data?.settings?.faqs ?? [];

  if (faqs.length === 0) return null;

  return (
    <div className="flex flex-col gap-12">
      <motion.div variants={textVariant()} className="flex flex-col items-center text-center gap-4">
        <span className="section-badge">Common Queries</span>
        <h2 className={styles.sectionHeadText}>
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
        <p className="text-secondary text-lg sm:text-xl max-w-3xl mt-4">
          Everything you need to know about my workflow, technical stack, and engagement models.
        </p>
      </motion.div>

      <div className="mt-8 space-y-5 w-full max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem key={faq.id || index} {...faq} index={index} />
        ))}
      </div>

      {/* Still have questions CTA */}
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        className="mt-16 p-12 premium-glass-card text-center relative overflow-hidden"
      >
        <div className="glow-orb -top-20 -right-20 w-80 h-80 bg-[#915EFF]/10 animate-slow-ping" />
        <div className="glow-orb -bottom-20 -left-20 w-80 h-80 bg-[#56ccf2]/10 animate-pulse" />

        <div className="relative z-10">
          <div className="w-20 h-20 bg-[#915EFF]/10 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl shadow-[inset_0_0_20px_rgba(145,94,255,0.2)] border border-[#915EFF]/20">
             💬
          </div>
          <h3 className="text-white text-2xl font-black mb-4">Still have questions?</h3>
          <p className="text-secondary text-lg mb-10 max-w-lg mx-auto opacity-80">
            I&apos;m always available for a technical deep-dive or a project consultation. 
            Let&apos;s discuss how I can help your team.
          </p>
          <a href="/contact" className={`${styles.glassButtonPremium} px-12 py-4 text-[16px]`}>
            Start a Conversation
          </a>
        </div>
      </motion.div>
    </div>
  );
};

const FAQSection = SectionWrapper(FAQ, "faq", { noTopPadding: true });
export default FAQSection;