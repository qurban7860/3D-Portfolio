import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";
import { certificationsData } from "../constants/statsData";

const CertificationCard = ({ index, title, issuer, date, credentialUrl, icon }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.3, 0.75)}
    className="bg-gradient-to-r from-tertiary to-black-200 p-6 rounded-lg border border-[#915EFF]/20 hover:border-[#915EFF]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#915EFF]/20 group cursor-default"
  >
    <div className="flex items-start gap-4">
      <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-white font-bold text-[18px] mb-2 group-hover:text-[#915EFF] transition-colors">
          {title}
        </h3>
        <p className="text-secondary text-[14px] mb-2">{issuer}</p>
        <div className="flex justify-between items-center">
          <p className="text-secondary text-[12px]">📅 {date}</p>
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#915EFF] text-[12px] hover:text-[#56ccf2] transition-colors font-semibold"
          >
            {/* View Credential → */}
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

CertificationCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  issuer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  credentialUrl: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

const Certifications = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="section-badge">Professional Growth</p>
        <p className={styles.sectionSubText}>Credentials & Certifications</p>
        <h2 className={styles.sectionHeadText}>Certifications</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] w-full leading-[30px]"
      >
        Continuously upgrading skills and staying ahead with industry-standard certifications and professional development.
      </motion.p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {certificationsData.map((cert, index) => (
          <CertificationCard
            key={cert.id}
            index={index}
            {...cert}
          />
        ))}
      </div>
    </>
  );
};

const CertificationsSection = SectionWrapper(Certifications, "certifications");
export default CertificationsSection;   
