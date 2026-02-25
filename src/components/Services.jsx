import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";
import { servicesOffered } from "../constants/statsData";

const ServiceCard = ({ index, title, description, icon, features }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    whileHover={{ y: -10 }} // Clean lift effect instead of tilt
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
        onClick={() => window.location.href = '#contact'} // Functional link
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
      <motion.div variants={textVariant()}>
        <p className="section-badge">What I Offer</p>
        <p className={styles.sectionSubText}>Services</p>
        <h2 className={styles.sectionHeadText}>Services & Solutions</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] w-full leading-[30px]"
      >
        Comprehensive web and mobile development services tailored to your business needs. 
        From idea to deployment, I provide end-to-end solutions with professional quality 
        and proven expertise.
      </motion.p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
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
        className="mt-16 p-8 bg-gradient-to-r from-[#915EFF]/10 to-[#56ccf2]/10 rounded-xl border border-[#915EFF]/30 text-center"
      >
        <p className="text-white text-[18px] font-semibold mb-3">
          Don&apos;t see what you&apos;re looking for?
        </p>
        <p className="text-secondary text-[16px] mb-6">
          I can customize packages based on your specific requirements. Let&apos;s discuss your project needs.
        </p>
        <a
          href="#contact"
          className="inline-block bg-gradient-to-r from-[#915EFF] to-[#56ccf2] text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg hover:shadow-[#915EFF]/50 transition-all duration-300"
        >
          Schedule a Consultation
        </a>
      </motion.div>
    </>
  );
};

const ServicesSection = SectionWrapper(Services, "services");

export default ServicesSection;