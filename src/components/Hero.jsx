import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const SkillCard = ({ skill }) => (
  <motion.div whileHover={{ scale: 1.1 }} className="bg-tertiary rounded-lg p-4 shadow-md">
    <h3 className="text-white text-[16px] font-bold text-center max-md:text-sm">{skill}</h3>
  </motion.div>
);

SkillCard.propTypes = { skill: PropTypes.string.isRequired };
const skills = ["MERN", "Material-UI", "Next.js", "React Native"];

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

          <div className="mt-20 mb-10 flex justify-center items-center sm:hidden">
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