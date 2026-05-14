/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineCubeTransparent, HiOutlineLightningBolt, HiOutlineShieldCheck } from "react-icons/hi";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../Animation/motion";
import { styles } from "../styles";
import { premium_tech } from "../assets";

const FeatureCard = ({ icon: Icon, title, desc, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.5)}
    whileHover={{ y: -5, scale: 1.01 }}
    className="premium-glass-card glass-reflection inner-glow p-6 h-full flex flex-col gap-4 group cursor-default border-white/5 hover:border-[#915EFF]/30 transition-all duration-500"
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-xl shadow-xl border border-white/10 group-hover:border-[#915EFF]/50 transition-all duration-500 inner-glow">
      <Icon className="text-[#915EFF] group-hover:scale-110 transition-transform" />
    </div>
    <div>
      <h3 className="text-white text-base font-black mb-1 group-hover:text-[#915EFF] transition-colors tracking-tight">{title}</h3>
      <p className="text-secondary text-[13px] leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity line-clamp-2">{desc}</p>
    </div>
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
      icon: HiOutlineCubeTransparent,
      title: "System Architect",
      desc: "Designing scalable, cloud-native ecosystems with modular architecture."
    },
    {
      icon: HiOutlineLightningBolt,
      title: "Performance",
      desc: "Optimizing critical paths for sub-second latency and speed."
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Quality",
      desc: "Delivering enterprise-grade, maintainable codebases and standards."
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
        <motion.div
          variants={fadeIn("right", "spring", 0.2, 0.8)}
          className="flex-1 pt-12 sm:pt-0"
        >
          <span className="section-badge mb-8 block sm:inline-block">Profile Summary</span>
          <h2 className={styles.sectionHeadText}>
            Engineering <span className="text-gradient">Professional Solutions</span>
          </h2>
          <p className="mt-4 text-secondary text-base leading-relaxed max-w-2xl opacity-80">
            {overview.substring(0, 150)}... I specialize in high-performance solutions that bridge complex logic and user engagement.
          </p>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/about"
              className={`${styles.glassButtonPremium} group`}
              onClick={() => window.scrollTo(0, 0)}
            >
              Full Bio <span className="group-hover:translate-x-1 transition-transform ml-2">→</span>
            </Link>
            <Link
              to="/services"
              className="px-6 py-2.5 text-[13px] font-bold text-white/50 hover:text-white transition-all border-b border-white/5"
              onClick={() => window.scrollTo(0, 0)}
            >
              Technical Stack
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", "spring", 0.4, 0.8)}
          className="flex-1 hidden lg:block"
        >
          <div className="relative w-full aspect-square max-w-[400px] mx-auto group perspective-1000">
            {/* ── Background Glows ── */}
            <div className="absolute inset-0 bg-[#915EFF]/20 rounded-full blur-[120px] animate-pulse opacity-40 group-hover:opacity-70 transition-opacity duration-1000" />
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#915EFF]/10 via-transparent to-[#56ccf2]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* ── Floating Main Container ── */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotateZ: [0, 2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 w-full h-full rounded-[3rem] p-1 overflow-hidden border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] group-hover:shadow-[0_48px_96px_-24px_rgba(145,94,255,0.3)] transition-all duration-700 glass-reflection bg-white/[0.01]"
            >
              <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden">
                <motion.img
                  src={premium_tech}
                  alt="Premium Tech"
                  whileHover={{ scale: 1.15, rotate: -2 }}
                  transition={{ duration: 1.2, ease: "circOut" }}
                  className="w-full h-full object-cover opacity-90 brightness-110 contrast-110"
                />
                
                {/* ── Dynamic Overlays ── */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-white/5 opacity-60" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(145,94,255,0.1),transparent_70%)]" />
                
                {/* ── Scanning Line Effect ── */}
                <motion.div 
                  animate={{ top: ["-10%", "110%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#915EFF]/40 to-transparent z-20"
                />

                <div className="absolute bottom-8 left-8 right-8 z-30">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center shadow-2xl group-hover:bg-[#915EFF]/20 transition-colors duration-500">
                      <HiOutlineCubeTransparent className="text-[#915EFF] text-2xl drop-shadow-[0_0_8px_rgba(145,94,255,0.8)]" />
                    </div>
                    <div>
                      <p className="text-white text-[11px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-90 transition-opacity">System Architecture</p>
                      <h4 className="text-white font-bold text-lg leading-tight mt-1">Industrial Solutions v2.4</h4>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ── Decorative Orbits ── */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 border border-white/5 rounded-full pointer-events-none opacity-20"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-16 border border-white/5 rounded-full pointer-events-none opacity-10"
            />
            
            {/* ── Corner Accents ── */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-[#915EFF]/20 rounded-tr-[4rem] group-hover:border-[#915EFF]/50 transition-colors duration-700" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-[#915EFF]/20 rounded-bl-[4rem] group-hover:border-[#915EFF]/50 transition-colors duration-700" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(HomeIntro, "about", { noTopPadding: true });
