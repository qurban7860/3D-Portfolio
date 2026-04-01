import { styles } from "../styles";
import ComputersCanvas from "./canvas/Computers"; 

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto overflow-hidden bg-primary isolate">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-90 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary z-10" />
      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-20 pointer-events-none`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="pointer-events-auto">
          <h1 className={`${styles.heroHeadText} text-white drop-shadow-2xl`}>
            Hi, I&apos;m <span className="text-[#915EFF]">Qurban</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 max-w-3xl drop-shadow-xl`}>
            Turning your ideas into powerful web and mobile solutions with clean
            code and smooth user experiences.
          </p>
        </div>
      </div>

      <div className="absolute inset-0 top-[15%] w-full h-full z-10">
        <ComputersCanvas />
      </div>
    </section>
  );
};

export default Hero;