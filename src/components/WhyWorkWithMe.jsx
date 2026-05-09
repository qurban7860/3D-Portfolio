import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { fadeIn } from "../Animation/motion";
import { SectionWrapper } from "../hoc";

/* ── Why Card ────────────────────────────────────────────────── */
const WhyCard = ({ emoji, title, desc, delay }) => (
  <motion.div
    variants={fadeIn("up", "spring", delay, 0.6)}
    whileHover={{ y: -6, scale: 1.02 }}
    className="glass-purple rounded-xl p-5 flex flex-col gap-3 hover:bg-[#915EFF]/10 transition-all duration-500 glow-purple group"
  >
    {/* Icon badge */}
    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                    bg-white/5 border border-white/10 group-hover:border-[#915EFF]/50 
                    group-hover:shadow-[0_0_16px_rgba(145,94,255,0.25)] transition-all duration-300 backdrop-blur-sm">
      {emoji}
    </div>
    <h4 className="text-white font-bold text-[17px]">{title}</h4>
    <p className="text-secondary text-[14px] leading-relaxed">{desc}</p>
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
    <motion.div
      variants={fadeIn("up", "spring", 0.2, 0.75)}
      className="rounded-2xl overflow-hidden relative backdrop-blur-2xl bg-white/[0.04] border border-white/10 shadow-2xl"
    >
      {/* Decorative glow blobs */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#915EFF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#56ccf2]/8 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            ⭐
          </div>
          <h3 className="text-[22px] font-bold text-white">Why Work With Me</h3>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {whyPoints.map((item, i) => (
            <WhyCard key={i} {...item} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SectionWrapper(WhyWorkWithMe, "why-me", { noTopPadding: true });
