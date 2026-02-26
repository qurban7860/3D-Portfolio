import PropTypes from "prop-types";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { experiences, educations } from "../Home"; 
import { SectionWrapper } from "../hoc";
import { textVariant } from "../Animation/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
        border: "1px solid rgba(145, 94, 255, 0.2)",
        borderRadius: "0.75rem",
        boxShadow: "0 4px 15px rgba(145, 94, 255, 0.1)"
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <a
            href={experience.instituteUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex justify-center items-center w-full h-full'
          >
            <img
              src={experience.icon}
              alt={experience.company_name}
              className='w-[60%] h-[60%] object-contain hover:bg-opacity-80 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer'
            />
          </a>
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconBg: PropTypes.string.isRequired,
    instituteUrl: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const EducationCard = ({ education }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className='flex flex-col mb-8 rounded-2xl bg-gradient-to-br from-tertiary to-black-200 text-white p-6 relative border border-[#915EFF]/20 hover:border-[#915EFF]/60 transition-all'
    >
      <a
        href={education.instituteUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='absolute top-6 right-6'
        title={education.institute_name}
      >
        <img
          src={education.image}
          alt={`${education.institute_name} logo`}
          className='w-12 h-12 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer'
        />
      </a>
      <h3 className='text-[24px] font-bold'>{education.degree}</h3>
      <p className='text-[16px] font-semibold mt-2 text-[#915EFF]'>{education.institute_name}</p>
      <ul className='mt-5 list-disc pl-5 space-y-2'>
        {education.points.map((point, index) => (
          <li
            key={`education-point-${index}`}
            className='text-white-100 text-[14px] pl-2 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

EducationCard.propTypes = {
  education: PropTypes.shape({
    degree: PropTypes.string.isRequired,
    institute_name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    instituteUrl: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="flex flex-col items-start gap-2">
        <span className="section-badge inline-block">Career Path</span>
        <h2 className="text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">Education</h2>
      </motion.div>

      <div className="mt-8">
        {educations.map((edu, idx) => (
          <EducationCard key={idx} education={edu} />
        ))}
      </div>

      <motion.div variants={textVariant()} className="mt-12">
        <span className="section-badge inline-block">Professional Journey</span>
        <h2 className="text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">Work Experience</h2>
      </motion.div>

      <div className="mt-6">
        <VerticalTimeline>
          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} experience={exp} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

const ExperienceSection = SectionWrapper(Experience, "experience");
export default ExperienceSection;