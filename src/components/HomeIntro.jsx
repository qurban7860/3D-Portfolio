import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";
import { styles } from "../styles";

const FeatureCard = ({ emoji, title, desc, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    whileHover={{ y: -10, scale: 1.02 }}
    className="premium-glass-card glass-reflection p-8 h-full flex flex-col gap-6 group cursor-default"
  >
    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl shadow-2xl border border-white/10 group-hover:border-[#915EFF]/50 transition-all duration-500 inner-glow">
      {emoji}
    </div>
    <div>
      <h3 className="text-white text-xl font-black mb-3 group-hover:text-[#915EFF] transition-colors">{title}</h3>
      <p className="text-secondary text-base leading-relaxed opacity-80">{desc}</p>
    </div>
    {/* Subtle animated border line on hover */}
    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#915EFF] to-[#56ccf2] w-0 group-hover:w-full transition-all duration-700" />
  </motion.div>
);

const HomeIntro = () => {
  const { data } = usePortfolio();
  const about = data?.settings?.about ?? {};
  const overview =
    about.overview ||
    "I'm a passionate Software Engineer specializing in building high-performance web applications.";

  const features = [
    {
      emoji: "💡",
      title: "Solution Architect",
      desc: "Designing scalable, enterprise-grade systems with modularity in mind."
    },
    {
      emoji: "🚀",
      title: "Performance Expert",
      desc: "Optimizing critical paths for peak speed and exceptional UX."
    },
    {
      emoji: "🛡️",
      title: "Quality Obsessed",
      desc: "Writing clean, maintainable code backed by industry standards."
    }
  ];

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
        <motion.div
          variants={fadeIn("right", "spring", 0.2, 1)}
          className="flex-1"
        >
          <span className="section-badge mb-6">Architecture & Philosophy</span>
          <h2 className={styles.sectionHeadText}>
            Engineering <span className="text-gradient">Digital Excellence</span>
          </h2>
          <p className="mt-8 text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl">
            {overview.replace(/^I'm a passionate/i, "As a dedicated Software Engineer, I specialize in")} My approach combines robust architectural patterns with cutting-edge technologies.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-6">
            <Link
              to="/about"
              className={`${styles.glassButtonPremium} px-10 py-4 text-[15px] group`}
              onClick={() => window.scrollTo(0, 0)}
            >
              The Full Story <span className="group-hover:translate-x-1 transition-transform ml-2">→</span>
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 text-[15px] font-bold text-white/70 hover:text-white transition-all border-b-2 border-white/5 hover:border-[#915EFF]/50"
              onClick={() => window.scrollTo(0, 0)}
            >
              Capabilities
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", "spring", 0.4, 1)}
          className="flex-1 hidden lg:block"
        >
           <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-[#915EFF]/10 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-2 border-[#915EFF]/20 rounded-full animate-slow-ping" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border-2 border-[#56ccf2]/10 rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[100px] drop-shadow-2xl opacity-60">
                💎
              </div>
           </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(HomeIntro, "about");
