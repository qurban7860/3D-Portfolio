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
    <section className={`relative w-full h-screen mx-auto bg-primary isolate overflow-hidden`}>
      {/* Background */}
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-90 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 md:from-primary/20 via-transparent to-primary z-10" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#915EFF]/10 rounded-full blur-[100px] z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-[#56ccf2]/8 rounded-full blur-[80px] z-10 pointer-events-none" />

      {/* Content */}
      <div
        className={`relative z-20 max-w-7xl mx-auto ${styles.paddingX} pt-[100px] sm:pt-[120px] md:pt-[150px] flex flex-row items-start gap-5`}
      >
        {/* Accent bar */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF] shadow-[0_0_20px_rgba(145,94,255,0.8)]" />
          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#915EFF] to-transparent rounded-full opacity-40" />
        </div>

        <div className="flex flex-col gap-6">
          {/* Headline */}
          <div>
            <h1 className={`${styles.heroHeadText} text-white drop-shadow-2xl`}>
              {headline.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={
                    word === "Qurban"
                      ? "text-gradient inline-block"
                      : ""
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </h1>
            <p
              className={`${styles.heroSubText} mt-2 text-white-100 max-w-2xl drop-shadow-xl glass rounded-xl p-3 -ml-2`}
            >
              {subtitle}
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
              className={`${styles.gradientButton} px-7 py-3 text-[15px]`}
            >
              🚀 Explore My Work
            </button>
            <button
              onClick={() => navigate("/contact")}
              className={`${styles.outlineButton} px-7 py-3 text-[15px]`}
            >
              🤝 Let&apos;s Talk
            </button>
          </motion.div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] sm:h-[55vh] md:h-[65vh] z-10 pointer-events-none">
        <ComputersCanvas />
      </div>
    </section>
  );
};

export default Hero;