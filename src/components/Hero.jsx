import { styles } from "../styles";
import ComputersCanvas from "./canvas/Computers";
import { usePortfolio } from "../context/PortfolioContext";

const Hero = () => {
  const { data } = usePortfolio();
  const hero = data?.settings?.hero ?? {};
  const headline = hero.headline || "Hi, I'm Qurban";
  const subtitle = hero.subtitle || "Turning your ideas into powerful web and mobile solutions with clean code and smooth user experiences.";

  return (
    <section className="relative w-full md:min-h-[100dvh] min-h-[70vh] mx-auto bg-primary isolate">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-90 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 md:from-primary/20 via-transparent to-primary z-10" />
      <div className={`relative z-20 max-w-7xl mx-auto ${styles.paddingX} pt-[64px] sm:pt-[100px] md:pt-[120px] flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white drop-shadow-2xl`}>
            {headline}
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 max-w-3xl drop-shadow-xl`}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[46vh] sm:h-[60vh] md:h-[70vh] z-10 pointer-events-none">
        <ComputersCanvas />
      </div>
    </section>
  );
};

export default Hero;