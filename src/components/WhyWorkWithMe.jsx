/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { HiOutlineTruck, HiOutlineBadgeCheck, HiOutlineUserGroup } from "react-icons/hi";
import { fadeIn, textVariant } from "../Animation/motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";

/* ── Why Card ────────────────────────────────────────────────── */
const WhyCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    variants={fadeIn("up", "spring", delay, 0.4)}
    whileHover={{ y: -5, scale: 1.01 }}
    className="premium-glass-card glass-reflection inner-glow p-6 flex items-center gap-5 group"
  >
    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl
                    bg-white/5 border border-white/10 group-hover:border-accent/50 
                    transition-all duration-500 backdrop-blur-sm shrink-0">
      <Icon className="text-accent group-hover:scale-110 transition-transform" />
    </div>
    <div>
      <h4 className="text-white font-black text-base group-hover:text-accent transition-colors">{title}</h4>
      <p className="text-secondary text-[12px] opacity-70 line-clamp-1">{desc}</p>
    </div>
  </motion.div>
);

const WhyWorkWithMe = () => {
  const whyPoints = [
    { icon: HiOutlineTruck, title: "Fast Delivery", desc: "Efficient development with rapid turnaround." },
    { icon: HiOutlineBadgeCheck, title: "Quality Focus", desc: "High-quality, tested, and production-ready code." },
    { icon: HiOutlineUserGroup, title: "Collaboration", desc: "Excellent communication and team coordination." },
  ];

  return (
    <div className="flex flex-col gap-6">
      <motion.div variants={textVariant()} className="flex flex-col items-center text-center gap-2 mb-4">
        <span className="section-badge">Strategic Value</span>
        <h2 className={styles.sectionHeadText}>Why Work <span className="text-gradient">With Me</span></h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {whyPoints.map((item, i) => (
          <WhyCard key={i} {...item} delay={i * 0.1} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(WhyWorkWithMe, "why-me", { noTopPadding: true });
