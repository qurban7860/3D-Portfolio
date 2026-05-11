import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { styles } from "../styles";
import ComputersCanvas from "./canvas/Computers";
import { usePortfolio } from "../context/PortfolioContext";

const Hero = () => {
  const { data } = usePortfolio();
  const navigate = useNavigate();
  const hero = data?.settings?.hero ?? {};
  const contact = data?.settings?.contact ?? {};
  const headline = hero.headline || "Hi, I'm Qurban";
  const subtitle = hero.subtitle || "Building high-performance web applications with precision.";

  return (
    <section className="relative w-full h-[calc(100vh-4rem)] mx-auto overflow-hidden">
      {/* ── Advanced Background Layers ── */}
      <div className="absolute inset-0 bg-[#050816] z-0" />
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-20 z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-dot-pattern opacity-10 z-0" />
      
      {/* Immersive Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#915EFF]/10 rounded-full blur-[120px] animate-slow-ping z-0" />
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#56ccf2]/5 rounded-full blur-[100px] animate-pulse z-0" />

      {/* ── Main Content Container ── */}
      <div className={`relative z-20 max-w-7xl mx-auto ${styles.paddingX} h-full flex flex-col lg:flex-row items-center justify-center gap-10 pt-4`}>
        
        {/* Left Section: Branding & CTA */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-4 py-1.5 rounded-full glass-badge-hero w-fit"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-white/60 text-[11px] font-black uppercase tracking-[0.2em]">Available for projects</span>
          </motion.div>

          <div className="flex flex-col gap-5">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white font-black lg:text-[68px] sm:text-[52px] text-[38px] leading-[1.1] tracking-tighter"
            >
              {headline.split(" ").map((word, i) => (
                <span key={i} className={word === "Qurban" ? "text-gradient-shimmer" : ""}>
                  {word}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-secondary font-medium lg:text-[18px] text-[15px] max-w-xl leading-relaxed opacity-80"
            >
              {subtitle}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-row items-center gap-5 mt-4"
          >
            <button
              onClick={() => navigate("/portfolio")}
              className={`${styles.glassButtonPremium} px-8 py-3.5 text-[14px] shadow-2xl shadow-purple-500/20`}
            >
              View Work
            </button>
            <button
              onClick={() => navigate("/contact")}
              className={`${styles.outlineButton} px-8 py-3.5 text-[14px] shadow-xl`}
            >
              Contact
            </button>
            
            {/* Quick Socials */}
            <div className="flex items-center gap-4 ml-4 border-l border-white/10 pl-6 h-10">
               {contact.linkedin && (
                 <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#915EFF] transition-colors">
                   <FaLinkedinIn size={20} />
                 </a>
               )}
               {contact.github && (
                 <a href={contact.github} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                   <FaGithub size={20} />
                 </a>
               )}
            </div>
          </motion.div>
        </div>

        {/* Right Section: 3D Visualization */}
        <div className="flex-1 w-full h-[50vh] lg:h-[80vh] relative z-10">
          <ComputersCanvas />
          
          {/* Subtle Decorative Elements */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#915EFF]/30 to-transparent" />
        </div>
      </div>

      {/* ── Scroll Indicator (Desktop only) ── */}
      <div className="absolute bottom-5 w-full hidden lg:flex justify-center items-center">
        <a href="#about">
          <div className="w-[28px] h-[48px] rounded-3xl border-2 border-white/10 flex justify-center items-start p-1.5 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-1.5 h-1.5 rounded-full bg-[#915EFF]"
            />
          </div>
        </a>
      </div>
      
      {/* Global Transition Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-primary to-transparent z-10" />
    </section>
  );
};

export default Hero;
