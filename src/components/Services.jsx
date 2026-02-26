import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";
import { servicesOffered } from "../constants/statsData";

const ServiceCard = ({ index, title, description, icon, features }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    whileHover={{ y: -10 }} 
    className="w-full"
  >
    <div className="bg-gradient-to-br from-tertiary to-black-200 rounded-2xl p-8 border border-[#915EFF]/20 hover:border-[#915EFF]/60 transition-all duration-300 h-full hover:shadow-lg hover:shadow-[#915EFF]/20 flex flex-col">
      <div className="text-5xl mb-4">{icon}</div>
      
      <h3 className="text-white font-bold text-[24px] mb-3">{title}</h3>
      
      <p className="text-secondary text-[16px] mb-6 leading-relaxed">
        {description}
      </p>

      <div className="mb-6 flex-grow">
        <p className="text-white text-[14px] font-semibold mb-3">Includes:</p>
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="text-secondary text-[14px] flex items-center gap-2">
              <span className="text-[#915EFF]">✓</span> {feature}
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => window.location.href = '#contact'} 
        className="w-full bg-gradient-to-r from-[#915EFF] to-[#56ccf2] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#915EFF]/50 mt-auto"
      >
        Get Started
      </motion.button>
    </div>
  </motion.div>
);

ServiceCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const Services = () => {
  return (
    <>
      <motion.div
        variants={textVariant()}
        className="flex flex-col items-start gap-4"
      >
        <span className="section-badge">
          What I Offer
        </span>

        <h2 className="text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Services & Solutions
        </h2>

        <p className="text-secondary text-base sm:text-lg leading-relaxed">
          From concept to deployment, I build scalable, high-quality web and mobile applications tailored to your business goals.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {servicesOffered.map((service, index) => (
          <ServiceCard
            key={service.id || index}
            index={index}
            {...service}
          />
        ))}
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 0.4, 0.75)}
        className="mt-10 p-10 bg-tertiary rounded-2xl border border-white/5 text-center"
      >
        <p className="text-white text-lg font-semibold mb-3">
          Don&apos;t see exactly what you need?
        </p>

        <p className="text-secondary text-base mb-8 mx-auto">
          I customize solutions based on your specific requirements. Let&apos;s discuss your project and craft the right approach together.
        </p>

        <a
          href="#contact"
          className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#915EFF] to-[#56ccf2] hover:shadow-lg hover:shadow-[#915EFF]/40 transition-all duration-300"
        >
          Schedule a Consultation →
        </a>
      </motion.div>
    </>
  );
};

const ServicesSection = SectionWrapper(Services, "services");

export default ServicesSection;