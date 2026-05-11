/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";
import { styles } from "../styles";

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.05, 0.5)}
      className={`premium-glass rounded-2xl overflow-hidden ${isOpen ? "border-[#915EFF]/40 bg-[#915EFF]/5" : "border-white/5"} transition-all duration-300`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left group"
      >
        <h3 className="text-white font-bold text-sm leading-snug group-hover:text-[#915EFF] transition-colors">
          {question}
        </h3>
        <span className={`text-white/30 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#915EFF]' : ''}`}>
          ▼
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5"
          >
            <div className="px-6 py-4">
              <p className="text-secondary text-[13px] leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const { data } = usePortfolio();
  const faqs = (data?.settings?.faqs ?? []).slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* ── Left Side: Header & CTA ── */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <motion.div variants={textVariant()} className="flex flex-col gap-2">
          <span className="faq-badge-premium w-fit mb-4">FAQS & INQUIRIES</span>
          <h2 className={styles.sectionHeadText}>Common <span className="text-gradient">Inquiries</span></h2>
          <p className="text-secondary text-sm leading-relaxed max-w-sm mt-2 opacity-80">
            Answers to frequent technical and collaboration questions. Need more depth?
          </p>
        </motion.div>

        <motion.div 
          variants={fadeIn("up", "spring", 0.3, 0.8)}
          className="premium-glass-card p-6 border-dashed border-white/10"
        >
          <h4 className="text-white font-bold text-sm mb-3">Still have questions?</h4>
          <a href="/contact" className="text-[#915EFF] font-black text-sm hover:underline flex items-center gap-2">
            Talk to me directly <span>→</span>
          </a>
        </motion.div>
      </div>

      {/* ── Right Side: FAQ List ── */}
      <div className="lg:col-span-7 flex flex-col gap-3">
        {faqs.map((faq, index) => (
          <FAQItem key={faq.id || index} {...faq} index={index} />
        ))}
        <a href="/faq" className="text-white/40 hover:text-white text-[12px] font-bold text-center mt-2 transition-colors">
          View All Questions
        </a>
      </div>
    </div>
  );
};

export default SectionWrapper(FAQ, "faq", { noTopPadding: true });