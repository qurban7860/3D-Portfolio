import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { fadeIn, textVariant } from "../Animation/motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";

/* ── Why Card ────────────────────────────────────────────────── */
const WhyCard = ({ emoji, title, desc, delay }) => (
  <motion.div
    variants={fadeIn("up", "spring", delay, 0.6)}
    whileHover={{ y: -10, scale: 1.02 }}
    className="premium-glass-card glass-reflection inner-glow p-8 flex flex-col gap-6 group"
  >
    {/* Icon badge */}
    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                    bg-white/5 border border-white/10 group-hover:border-[#915EFF]/50 
                    group-hover:shadow-[0_0_25px_rgba(145,94,255,0.3)] transition-all duration-500 backdrop-blur-sm">
      {emoji}
    </div>
    <h4 className="text-white font-black text-xl group-hover:text-[#915EFF] transition-colors">{title}</h4>
    <p className="text-secondary text-base leading-relaxed opacity-80">{desc}</p>
  </motion.div>
);

WhyCard.propTypes = {
  emoji: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

/* ── Why Work With Me Section ────────────────────────────── */
const WhyWorkWithMe = () => {
  const whyPoints = [
    {
      emoji: "🚀",
      title: "Fast Delivery",
      desc: "Efficient development with rapid turnaround times — shipping production-ready features without cutting corners.",
    },
    {
      emoji: "🎯",
      title: "Quality Focus",
      desc: "High-quality, tested, and production-ready code that scales gracefully as your business grows.",
    },
    {
      emoji: "🤝",
      title: "Collaboration",
      desc: "Excellent communication and team coordination — I treat your project as if it were my own.",
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      <motion.div variants={textVariant()} className="flex flex-col items-center text-center gap-4 mb-8">
        <span className="section-badge">Strategic Value</span>
        <h2 className={styles.sectionHeadText}>
          Why Work <span className="text-gradient">With Me</span>
        </h2>
        <p className="text-secondary text-lg sm:text-xl leading-relaxed max-w-3xl mt-4">
          I don&apos;t just write code; I build solutions that drive results. 
          Here&apos;s how I bring value to your projects.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {whyPoints.map((item, i) => (
          <WhyCard key={i} {...item} delay={i * 0.15} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(WhyWorkWithMe, "why-me", { noTopPadding: true });
