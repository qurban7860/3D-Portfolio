import { styles } from "../styles";
import ComputersCanvas from "./canvas/Computers"; 

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden bg-primary hero-section">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-90 bg-scroll sm:bg-fixed will-change-transform pointer-events-none z-10" 
        style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'scroll' }}
      />
      <div className={`absolute inset-0 top-[100px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-30 pointer-events-none`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>
        <div className="w-full">
          <h1 className={`${styles.heroHeadText} text-white drop-shadow-2xl`}>
            Hi, I&apos;m <span className="text-[#915EFF]">Qurban</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 max-w-3xl drop-shadow-xl`}>
            Turning your ideas into powerful web and mobile solutions with clean
            code and smooth user experiences.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 top-1/4 z-20 w-full h-3/4 pointer-events-none"
        style={{ contain: 'paint strict' }}
      >
        <ComputersCanvas />
      </div>
    </section>
  );
};

export default Hero;