import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";
import { faqs } from "../constants/seoConfig";

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className="bg-tertiary border border-[#915EFF]/20 hover:border-[#915EFF]/60 rounded-xl overflow-hidden transition-all"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-black-200 transition-colors"
      >
        <h3 className="text-white font-bold text-[16px] text-left">
          {question}
        </h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#915EFF] text-[24px] flex-shrink-0 ml-4"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-[#915EFF]/20"
          >
            <div className="px-6 py-4 bg-black-200/50">
              <p className="text-secondary text-[14px] leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

FAQItem.propTypes = {
  id: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const FAQ = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="section-badge">Help & Support</p>
        <p className={styles.sectionSubText}>Common Questions</p>
        <h2 className={styles.sectionHeadText}>FAQ</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] w-full leading-[30px]"
      >
        Find answers to common questions about my services, processes, and working arrangements. Can&apos;t find what you need? Feel free to reach out!
      </motion.p>

      <div className="mt-16 space-y-4 w-full">
        {faqs.map((faq, index) => (
          <FAQItem
            key={faq.id}
            {...faq}
            index={index}
          />
        ))}
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        className="mt-16 p-8 bg-gradient-to-r from-[#915EFF]/10 to-[#56ccf2]/10 rounded-xl border border-[#915EFF]/30 text-center"
      >
        <p className="text-white text-[18px] font-semibold mb-4">
          Still have questions?
        </p>
        <p className="text-secondary text-[16px] mb-6">
          I&apos;m always happy to discuss your project needs. Reach out anytime!
        </p>
        <a
          href="#contact"
          className="inline-block bg-gradient-to-r from-[#915EFF] to-[#56ccf2] text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg hover:shadow-[#915EFF]/50 transition-all duration-300"
        >
          Get in Touch
        </a>
      </motion.div>
    </>
  );
};

const FAQSection = SectionWrapper(FAQ, "faq");
export default FAQSection;