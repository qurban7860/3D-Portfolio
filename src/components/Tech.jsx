import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { BallCanvas } from "./canvas";
import { technologies } from "../Home";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../Animation/motion";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="section-badge">Technology Stack</p>
        <h2 className={`${styles.sectionHeadText}`}>Tools & Technologies</h2>
      </motion.div>
      <div className="flex flex-row flex-wrap justify-center gap-10 mt-10">
        {technologies.map((technology) => (
          <div className="w-28 h-28" key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </>
  );
};

Tech.propTypes = {
  // Component takes no required props
};

export default SectionWrapper(Tech, "tech");
