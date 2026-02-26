import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const SkillCard = ({ skill, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ 
      y: -5,
      backgroundColor: "rgba(145, 94, 255, 0.2)",
      borderColor: "#915EFF" 
    }} 
    className="w-[160px] h-[45px] flex-shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 shadow-xl transition-colors duration-300 group cursor-default flex items-center"
  >
    <h3 className="text-white text-[14px] font-medium tracking-wide flex items-center gap-2 w-full">
      <span className="w-1.5 h-1.5 rounded-full bg-[#915EFF] group-hover:animate-pulse flex-shrink-0" />
      
      <span className="truncate line-clamp-1" title={skill}>
        {skill}
      </span>
    </h3>
  </motion.div>
);

SkillCard.propTypes = { skill: PropTypes.string.isRequired, index: PropTypes.number.isRequired };
const skills = ["TypeScript", "MERN", "Next.js", "Tailwind CSS"];

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen sm:h-screen mx-auto flex flex-col">
      <div className={`relative sm:absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-20`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="w-full">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I&apos;m <span className="text-[#915EFF]">Qurban</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 max-w-3xl`}>
            Turning your ideas into powerful web and mobile solutions with clean
            code and smooth user experiences.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 sm:hidden mt-10">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>

          <div className="mt-10 mb-10 flex justify-center items-center sm:hidden">
            <a href="#about">
              <div className="w-[30px] h-[50px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
                <motion.div
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                  className="w-2 h-2 rounded-full bg-secondary mb-1"
                />
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="hidden sm:block absolute inset-0 top-[15%] w-full h-full z-10">
        <ComputersCanvas />
      </div>
    </section>
  );
};

export default Hero;