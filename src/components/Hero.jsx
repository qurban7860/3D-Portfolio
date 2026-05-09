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
    <section
      className={`relative w-full h-screen mx-auto bg-primary isolate overflow-hidden`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-90 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 md:from-primary/20 via-transparent to-primary z-10" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#915EFF]/10 rounded-full blur-[100px] z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-[#56ccf2]/8 rounded-full blur-[80px] z-10 pointer-events-none" />

      {/* Content Container */}
      <div
        className={`relative z-20 max-w-7xl mx-auto ${styles.paddingX} pt-[120px] sm:pt-[150px] md:pt-[180px] lg:pt-[120px] min-h-screen flex flex-col lg:flex-row items-center justify-between gap-10`}
      >
        {/* Left Side: Text Content */}
        <div className="flex flex-row items-start gap-5 flex-1 w-full">
          {/* Accent bar */}
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#915EFF] shadow-[0_0_20px_rgba(145,94,255,0.8)]" />
            <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#915EFF] to-transparent rounded-full opacity-40" />
          </div>

          <div className="flex flex-col gap-6 w-full">
            {/* Headline */}
            <div>
              <h1
                className={`${styles.heroHeadText} text-white drop-shadow-2xl`}
              >
                {headline.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={
                      word === "Qurban" ? "text-gradient inline-block" : ""
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </h1>
              <p
                className={`${styles.heroSubText} mt-4 text-white-100 max-w-xl drop-shadow-xl p-5 -ml-5 rounded-3xl relative overflow-hidden group`}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow:
                    "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                }}
              >
                <span className="relative z-10">{subtitle}</span>
                <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </p>
            </div>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4 z-30"
            >
              <button
                onClick={() => navigate("/portfolio")}
                className={`${styles.glassButtonPremium} px-8 py-3.5 text-[15px] font-bold`}
              >
                🚀 Explore My Work
              </button>
              <button
                onClick={() => navigate("/contact")}
                className={`${styles.outlineButton} px-8 py-3.5 text-[15px] font-bold shadow-lg hover:shadow-[#915EFF]/20`}
              >
                🤝 Let&apos;s Talk
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right Side: 3D Canvas (on Desktop) */}
        <div className="w-full lg:flex-1 h-[35vh] sm:h-[45vh] lg:h-[75vh] relative z-10">
          <ComputersCanvas />
        </div>
      </div>
    </section>
  );
};

export default Hero;
