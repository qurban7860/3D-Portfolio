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
        <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col hover:shadow-lg hover:shadow-[#915EFF]/50 transition-shadow duration-300 border border-[#915EFF]/10'>
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
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] w-full leading-[30px]"
      >
        I&apos;m a passionate Full Stack Developer with a Bachelor&apos;s degree in Software Engineering from Punjab University (PUCIT) and over 3+ years of professional experience building responsive, high-performance web and mobile applications. I specialize in creating scalable, user-centric solutions using modern technologies including React, Next.js, Node.js, Express, and MongoDB.
      </motion.p>

      <motion.p
        variants={fadeIn("", "", 0.15, 1)}
        className="mt-4 text-secondary text-[17px] w-full leading-[30px]"
      >
        My expertise spans across full-stack development, real-time applications, RESTful API design, performance optimization, and responsive UI/UX design. I&apos;m committed to writing clean, maintainable code and delivering innovative solutions that drive business growth and user satisfaction.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10 justify-evenly">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.75)}
        className="mt-20 overflow-hidden rounded-3xl bg-[#151030] border border-white/10 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/5 to-transparent pointer-events-none" />
        
        <div className="relative p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { emoji: "🚀", title: "Fast Delivery", desc: "Efficient development with rapid turnaround times." },
              { emoji: "🎯", title: "Quality Focus", desc: "High-quality, tested, and production-ready code." },
              { emoji: "🤝", title: "Collaboration", desc: "Excellent communication and team coordination." }
            ].map((item, i) => (
              <div key={i} className="group">
                <p className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300 w-fit">{item.emoji}</p>
                <p className="text-white font-bold text-[18px] mb-2">{item.title}</p>
                <p className="text-secondary text-[14px] leading-relaxed italic border-l-2 border-[#915EFF]/30 pl-4">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

const AboutSection = SectionWrapper(About, "about");
export default AboutSection;
