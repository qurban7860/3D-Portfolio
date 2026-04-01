import { motion } from "framer-motion";
import { BallCanvas } from "./canvas";
import { technologies } from "../Home";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../Animation/motion";

const Tech = () => {
  return (
    <>
      <motion.div
        variants={textVariant()}
        className="flex flex-col items-start gap-4"
      >
        <span className="section-badge"> Technology Stack </span>

        <h2 className="text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Tools & Technologies I Work With
        </h2>

        <p className="text-secondary text-base sm:text-lg leading-relaxed">
          Modern tools and frameworks I use to build scalable and production-ready applications.
        </p>
      </motion.div>

      {/* Tech Grid */}
      <div className="mt-16 flex flex-wrap justify-center gap-12">
        {technologies.map((technology) => (
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-300 hover:scale-110"
            key={technology.name}
          >
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </>
  );
};

const TechSection = SectionWrapper(Tech, "tech");
export default TechSection;
