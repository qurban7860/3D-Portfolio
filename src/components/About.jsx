import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { services } from "../Home";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt
      options={{ max: 25, scale: 1, speed: 400 }}
      className="xs:w-[250px] w-full"
    >
      <motion.div
        variants={fadeIn("right", "spring", index * 0.3, 0.75)}
        className="w-full p-[1px] rounded-2xl green-pink-gradient shadow-card"
      >
        <div className="bg-tertiary rounded-2xl py-5 px-10 min-h-[280px] flex flex-col justify-center items-center border border-[#915EFF]/10 hover:shadow-lg hover:shadow-[#915EFF]/50 transition-all duration-300">
          <img
            src={icon}
            alt={title}
            className="w-16 h-16 object-contain hover:scale-110 transition-transform duration-300"
          />
          <h3 className="text-white text-[20px] font-bold text-center mt-4">
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
      <motion.div
        variants={textVariant()}
        className="flex flex-col items-start gap-4"
      >
        <span className="section-badge mt-12">About Me</span>

        <h2 className="text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Overview
        </h2>

        <p className="text-secondary text-base sm:text-lg leading-relaxed mt-2">
          I&apos;m a passionate Full Stack Developer with a Bachelor&apos;s degree in Software Engineering from Punjab University (PUCIT) and over 3+ years of professional experience building responsive, high-performance web and mobile applications. I specialize in creating scalable, user-centric solutions using modern technologies including React, Next.js, Node.js, Express, and MongoDB.
        </p>

        <p className="text-secondary text-base sm:text-lg leading-relaxed mt-4">
          My expertise spans full-stack development, real-time applications, RESTful API design, performance optimization, and responsive UI/UX design. I&apos;m committed to writing clean, maintainable code and delivering innovative solutions that drive business growth and user satisfaction.
        </p>
      </motion.div>

      <div className="mt-16 flex flex-wrap gap-10 justify-evenly">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.75)}
        whileHover={{ y: -5 }}
        className="mt-10 flex flex-col rounded-2xl bg-gradient-to-br from-tertiary to-black-200 p-8 border border-[#915EFF]/20 hover:border-[#915EFF]/60 transition-all hover:shadow-lg hover:shadow-[#915EFF]/20"
      >
        <h3 className="text-[24px] font-bold text-white mb-6">
          Why Work With Me
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
              { emoji: "🚀", title: "Fast Delivery", desc: "Efficient development with rapid turnaround times." },
              { emoji: "🎯", title: "Quality Focus", desc: "High-quality, tested, and production-ready code." },
              { emoji: "🤝", title: "Collaboration", desc: "Excellent communication and team coordination." }
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col p-4 rounded-lg bg-[#151030] border border-[#915EFF]/10 hover:border-[#915EFF]/30 transition-all"
            >
              <p className="text-4xl mb-4">{item.emoji}</p>
              <h4 className="text-white font-bold text-[18px] mb-2">
                {item.title}
              </h4>
              <p className="text-secondary text-[14px] leading-relaxed italic">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

const AboutSection = SectionWrapper(About, "about");
export default AboutSection;