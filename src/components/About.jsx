import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";

import { resolveAssetUrl } from "../utils/assetResolver";

const ServiceCard = ({ index, title, icon }) => {
  const resolvedIcon = resolveAssetUrl(icon);
  const isEmoji =
    icon &&
    !icon.startsWith("http") &&
    !icon.includes(".") &&
    !icon.includes("/");

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
          {!isEmoji ? (
            <img
              src={resolvedIcon}
              alt={title}
              className="w-16 h-16 object-contain hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = "none";
                const fallback = e.target.nextSibling;
                if (fallback) fallback.style.display = "block";
              }}
            />
          ) : (
            <p className="text-5xl mb-2 hover:scale-110 transition-transform duration-300">
              {icon || "💼"}
            </p>
          )}
          {/* Fallback for broken images */}
          <p className="hidden text-5xl mb-2">💼</p>

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
  const { data } = usePortfolio();
  const services = data?.services ?? [];
  const about = data?.settings?.about ?? {};
  const overview =
    about.overview ||
    "I'm a passionate Full Stack Developer with a Bachelor's degree in Software Engineering from Punjab University (PUCIT) and over 3+ years of professional experience building responsive, high-performance web and mobile applications. I specialize in creating scalable, user-centric solutions using modern technologies including React, Next.js, Node.js, Express, and MongoDB.";
  const summary =
    about.summary ||
    "My expertise spans full-stack development, real-time applications, RESTful API design, performance optimization, and responsive UI/UX design. I'm committed to writing clean, maintainable code and delivering innovative solutions that drive business growth and user satisfaction.";
  const details = about.details || "";

  return (
    <>
      <motion.div
        variants={textVariant()}
        className="flex flex-col items-start gap-4 md:mt-0 -mt-8"
      >
        <span className="section-badge">About Me</span>

        <h2 className="text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Overview
        </h2>

        <p className="text-secondary text-base sm:text-lg leading-relaxed mt-2">
          {overview}
        </p>

        <p className="text-secondary text-base sm:text-lg leading-relaxed mt-4">
          {summary}
        </p>
        {details && (
          <p className="text-secondary text-base sm:text-lg leading-relaxed mt-4">
            {details}
          </p>
        )}
      </motion.div>

      <div className="mt-16 flex flex-wrap gap-10 justify-evenly">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.75)}
        whileHover={{ y: -5 }}
        className="mt-6 flex flex-col rounded-2xl bg-gradient-to-br from-tertiary to-black-200 p-8 border border-[#915EFF]/20 hover:border-[#915EFF]/60 transition-all hover:shadow-lg hover:shadow-[#915EFF]/20"
      >
        <h3 className="text-[24px] font-bold text-white mb-6">
          Why Work With Me
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              emoji: "🚀",
              title: "Fast Delivery",
              desc: "Efficient development with rapid turnaround times.",
            },
            {
              emoji: "🎯",
              title: "Quality Focus",
              desc: "High-quality, tested, and production-ready code.",
            },
            {
              emoji: "🤝",
              title: "Collaboration",
              desc: "Excellent communication and team coordination.",
            },
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

{
  /* <div className="absolute bottom-10 w-full flex justify-center items-center z-30">
        <a href="#about">
          <div className="w-[30px] h-[50px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-2 h-2 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div> */
}
