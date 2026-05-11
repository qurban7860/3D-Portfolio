import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";
import { styles } from "../styles";

const HomeIntro = () => {
  const { data } = usePortfolio();
  const about = data?.settings?.about ?? {};
  const overview =
    about.overview ||
    "I'm a passionate Software Engineer specializing in building high-performance web applications.";

  return (
    <div className="flex flex-col gap-16">
      <motion.div
        variants={textVariant()}
        className="flex flex-col items-start gap-4"
      >
        <span className="section-badge">Architecture & Philosophy</span>
        <h2 className={styles.sectionHeadText}>
          Engineering <span className="text-gradient">Digital Excellence</span>
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 items-stretch justify-between">
        <motion.div
          variants={fadeIn("right", "spring", 0.2, 1)}
          className="flex-[1.4]"
        >
          <div className="premium-glass-card p-10 lg:p-12 h-full flex flex-col justify-between">
            <div>
              <p className="text-white text-xl sm:text-2xl leading-relaxed font-medium mb-8">
                <span className="text-[#915EFF] font-bold">Bridging</span> the gap between complex logic and <span className="text-[#56ccf2] font-bold">seamless user experiences</span>.
              </p>
              <p className="text-secondary text-lg leading-relaxed opacity-90">
                {overview.replace(/^I'm a passionate/i, "As a dedicated Software Engineer, I specialize in")} My approach combines robust architectural patterns with cutting-edge technologies to deliver solutions that are not just functional, but truly impactful.
              </p>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-6">
              <Link
                to="/about"
                className={`${styles.glassButtonPremium} px-10 py-4 text-[15px] group shadow-xl`}
                onClick={() => window.scrollTo(0, 0)}
              >
                The Full Story <span className="group-hover:translate-x-1 transition-transform ml-2">→</span>
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 text-[15px] font-bold text-white/70 hover:text-white transition-all border-b-2 border-white/5 hover:border-[#915EFF]/50"
                onClick={() => window.scrollTo(0, 0)}
              >
                View Capabilities
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", "spring", 0.4, 1)}
          className="flex-1 w-full flex flex-col gap-6"
        >
          <div className="group relative h-full">
             <div className="premium-glass-card p-8 h-full border-[#915EFF]/20 hover:border-[#915EFF]/40 transition-all flex flex-col gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#915EFF]/10 flex items-center justify-center text-3xl shadow-[inset_0_0_20px_rgba(145,94,255,0.2)] group-hover:scale-110 transition-transform">
                    💡
                  </div>
                  <div>
                    <p className="text-white text-xl font-bold">Solution Architect</p>
                    <p className="text-secondary text-sm mt-1 opacity-80">
                      Designing scalable, enterprise-grade systems with modularity in mind.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#56ccf2]/10 flex items-center justify-center text-3xl shadow-[inset_0_0_20px_rgba(86,204,242,0.25)] group-hover:scale-110 transition-transform">
                    🚀
                  </div>
                  <div>
                    <p className="text-white text-xl font-bold">Performance Expert</p>
                    <p className="text-secondary text-sm mt-1 opacity-80">
                      Optimizing critical paths for peak speed and exceptional UX.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#00cea8]/10 flex items-center justify-center text-3xl shadow-[inset_0_0_20px_rgba(0,206,168,0.2)] group-hover:scale-110 transition-transform">
                    🛡️
                  </div>
                  <div>
                    <p className="text-white text-xl font-bold">Quality Obsessed</p>
                    <p className="text-secondary text-sm mt-1 opacity-80">
                      Writing clean, maintainable code backed by industry standards.
                    </p>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(HomeIntro, "about");
