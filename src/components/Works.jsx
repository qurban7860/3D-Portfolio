import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import PropTypes from "prop-types"; 
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../Home";
import { fadeIn, textVariant } from "../Animation/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full border border-[#915EFF]/20 hover:border-[#915EFF]/60 transition-all'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover gap-3'>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-[#915EFF]/50 transition-all'
              title="View on GitHub"
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </motion.div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px] leading-relaxed'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>

        <motion.a
          href={source_code_link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 5 }}
          className="mt-6 inline-flex items-center gap-2 text-[#915EFF] font-semibold hover:text-[#56ccf2] transition-colors"
        >
          View Repository → 
        </motion.a>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div
        variants={textVariant()}
        className="flex flex-col items-start gap-4"
      >
        <span className="section-badge">
          Portfolio
        </span>

        <h2 className="text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Projects & Case Studies
        </h2>

        <p className="text-secondary text-base sm:text-lg leading-relaxed">
          A collection of projects demonstrating my ability to build scalable, performant, and user-focused applications using modern technologies.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  image: PropTypes.string.isRequired,
  source_code_link: PropTypes.string.isRequired,
};

const WorksSection = SectionWrapper(Works, "projects");
export default WorksSection;
