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
           <div className="relative w-full aspect-square max-w-[350px] mx-auto group">
              <div className="absolute inset-0 bg-[#915EFF]/20 rounded-full blur-[100px] animate-pulse opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-700 glass-reflection">
                 <img 
                    src={premium_tech} 
                    alt="Premium Tech" 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <div className="absolute bottom-6 left-6 right-6">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-2">
                       <HiOutlineCubeTransparent className="text-[#915EFF] text-xl" />
                    </div>
                    <p className="text-white text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Architecture v2.0</p>
                 </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#915EFF]/30 rounded-tr-3xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#915EFF]/30 rounded-bl-3xl" />
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
