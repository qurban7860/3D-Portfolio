import { styles } from "../styles";
import ComputersCanvas from "./canvas/Computers";
import { usePortfolio } from "../context/PortfolioContext";

const Hero = () => {
  const { data } = usePortfolio();
  const hero = data?.settings?.hero ?? {};
  const headline = hero.headline || "Hi, I'm Qurban";
  const subtitle = hero.subtitle || "Turning your ideas into powerful web and mobile solutions with clean code and smooth user experiences.";

  return (
    <section className={`relative w-full h-screen mx-auto bg-primary isolate overflow-hidden`}>
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-90 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 md:from-primary/20 via-transparent to-primary z-10" />
      
      <div className={`relative z-20 max-w-7xl mx-auto ${styles.paddingX} pt-[100px] sm:pt-[120px] md:pt-[150px] flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className={`${styles.heroHeadText} text-white drop-shadow-2xl`}>
              {headline.split(" ").map((word, i) => (
                <span key={i} className={word === "Qurban" ? "text-[#915EFF]" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100 max-w-2xl drop-shadow-xl bg-black/10 backdrop-blur-[2px] rounded-lg p-2 -ml-2`}>
              {subtitle}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 z-30">
            <button 
              onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
              className={styles.ctaButton}
            >
              🚀 Explore My Work
            </button>
            <button 
              onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
              className={styles.outlineButton + " px-8 py-3"}
            >
              🤝 Let&apos;s Talk
            </button>
          </div>
        </div>
      </div>

      {/* 3D Model Container - Adjusted height and positioning to avoid overlap */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] sm:h-[55vh] md:h-[65vh] z-10 pointer-events-none">
        <ComputersCanvas />
      </div>
    </section>
  );
};

export default Hero;