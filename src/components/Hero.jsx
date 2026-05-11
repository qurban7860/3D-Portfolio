import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles";
import ComputersCanvas from "./canvas/Computers";
import { usePortfolio } from "../context/PortfolioContext";

const Hero = () => {
  const { data } = usePortfolio();
  const navigate = useNavigate();
  const hero = data?.settings?.hero ?? {};
  const headline = hero.headline || "Hi, I'm Qurban";
  const subtitle =
    hero.subtitle ||
    "Turning your ideas into powerful web and mobile solutions with clean code and smooth user experiences.";

  return (
    <section className="relative h-[calc(100vh-4rem)]">
      {/* Background & Overlays */}
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-40 z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary z-10" />

      {/* Ambient Animated Glows */}
      <div className="glow-orb top-[10%] left-[10%] w-[400px] h-[400px] bg-[#915EFF]/15 animate-slow-ping" />
      <div className="glow-orb bottom-[20%] right-[10%] w-[350px] h-[350px] bg-[#56ccf2]/10 animate-pulse" />

      <div className={`relative z-20 max-w-7xl mx-auto ${styles.paddingX} h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 pt-20`}>
        {/* Left Content */}
        <div className="flex flex-row items-start gap-6 flex-1 w-full mt-10 lg:mt-0">
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#915EFF] shadow-[0_0_25px_rgba(145,94,255,0.9)]" />
            <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#915EFF] via-[#915EFF]/50 to-transparent rounded-full" />
          </div>

          <div className="flex flex-col gap-8 w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={`${styles.heroHeadText} text-white`}>
                {headline.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={word === "Qurban" ? "text-gradient-shimmer inline-block" : ""}
                  >
                    {word}{" "}
                  </span>
                ))}
              </h1>
              
              <div className="mt-6 relative max-w-xl group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#915EFF]/20 to-[#56ccf2]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                <p className="relative z-10 text-secondary font-medium lg:text-[20px] sm:text-[18px] text-[15px] leading-relaxed p-6 rounded-3xl premium-glass border border-white/10 shadow-2xl">
                   {subtitle}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-5 z-30"
            >
              <button
                onClick={() => navigate("/portfolio")}
                className={`${styles.glassButtonPremium} px-10 py-4 text-[16px] tracking-wide shadow-2xl`}
              >
                🚀 Explore Projects
              </button>
              <button
                onClick={() => navigate("/contact")}
                className={`${styles.outlineButton} px-10 py-4 text-[16px] tracking-wide shadow-xl hover:shadow-[#915EFF]/20`}
              >
                🤝 Let&apos;s Connect
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right 3D Content */}
        <div className="w-full lg:flex-[1.2] h-[40vh] sm:h-[50vh] lg:h-[85vh] relative z-10 flex items-center justify-center">
           <ComputersCanvas />
           
           {/* Mobile Scroll Hint */}
           <div className="absolute bottom-10 w-full flex justify-center items-center lg:hidden">
              <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2 opacity-30">
                <motion.div
                  animate={{ y: [0, 24, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                  className="w-3 h-3 rounded-full bg-secondary mb-1"
                />
              </div>
           </div>
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary to-transparent z-10" />
    </section>
  );
};

export default Hero;
