/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-refresh/only-export-components */
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import PropTypes from "prop-types"; 
import { styles } from "../styles";
import { services } from "../Home";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";


const ServiceCard = ({ index, title, icon }) => {
  const tiltOptions = {
    max: 45,
    scale: 1,
    speed: 450,
  };

  return (
    <Tilt options={tiltOptions} className='xs:w-[250px] w-full'>
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col hover:shadow-lg transition-shadow duration-300'>
          <img
            src={icon}
            alt={title}
            className='w-16 h-16 object-contain hover:scale-110 transition-transform duration-300'
          />

          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

ServiceCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="section-badge">About Me</p>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Summary</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] w-full leading-[30px]"
      >
        Skilled Full Stack Developer with a Bachelor’s degree in Software
        Engineering from Punjab University (PUCIT) and over 3+ years of hands-on
        experience building responsive, high-performance web and mobile
        applications with clean, scalable code. Proficient in React, Next, Node,
        Express and MongoDB, with expertise in API integration, problem-solving,
        performance optimization and role-based UI design across diverse
        projects. Committed to delivering innovative solutions and contributing
        to product success.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10 justify-evenly">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
