import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const ContactCard = ({ title, icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <div className="w-12 h-12 bg-tertiary rounded-full flex justify-center items-center hover:bg-opacity-80 transition duration-300 ease-in-out transform hover:scale-110">
      <img
        src={icon}
        alt={title}
        className="w-8 h-8 object-contain rounded-full"
      />
    </div>
  </a>
);

ContactCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const SkillCard = ({ skill }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="bg-tertiary rounded-lg p-4 shadow-md"
  >
    <h3 className="text-white text-[16px] font-bold text-center max-md:text-sm">
      {skill}
    </h3>
  </motion.div>
);

SkillCard.propTypes = {
  skill: PropTypes.string.isRequired,
};

const skills = ["Mern", "Material-UI", "Next.js", "React Native"];

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto flex flex-col justify-between">
      {/* Content Header */}
      <div
        className={`mt-16 sm:mt-[100px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col sm:flex-row items-start gap-5`}
      >
        <div className="hidden sm:flex flex-col justify-center items-center">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white mt-10 sm:mt-0`}>
            Hi, I&apos;m <span className="text-[#915EFF]">Qurban</span>
            <span className={`${styles.subText} text-[20px] text-white-100`}>
              {" "}
              Software Engineer
            </span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 mb-6 text-white-100`}>
            Turning your ideas into powerful web and mobile solutions with clean
            code and smooth user experiences.
          </p>
        </div>
      </div>

      {/* Separator between Intro and Skills */}
      <div className="flex flex-col justify-center items-center sm:hidden">
        <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
        <div className="w-1 sm:h-80 h-80 violet-gradient" />
      </div>

      {/* Skills on Mobile Only */}
      <div className="flex flex-wrap justify-center gap-4 px-4 mb-10 sm:hidden">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>

      {/* Canvas on Desktop Only */}
      <div className="hidden sm:block absolute inset-0 z-0">
        <ComputersCanvas />
      </div>
    </section>
  );
};

export default Hero;
