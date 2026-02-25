import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";

const AvailabilityBadge = ({ status, icon }) => (
  <motion.div
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500 rounded-full w-fit"
  >
    <span className="text-2xl">{icon}</span>
    <p className="text-green-400 font-bold text-[16px]">{status}</p>
    <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
  </motion.div>
);

AvailabilityBadge.propTypes = {
  status: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

const HireCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="flex flex-col items-center gap-4 p-6 rounded-xl bg-tertiary border border-[#915EFF]/20 hover:border-[#915EFF]/60 transition-all"
  >
    <div className="text-5xl">{icon}</div>
    <h3 className="text-white font-bold text-[18px] text-center">{title}</h3>
    <p className="text-secondary text-[14px] text-center">{description}</p>
  </motion.div>
);

HireCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const ReadyForWork = () => {
  const hiringPoints = [
    {
      icon: "⚡",
      title: "Quick Response",
      description: "Get in touch and receive response within 24 hours"
    },
    {
      icon: "📅",
      title: "Flexible Timeline",
      description: "Full-time, part-time, or project-based engagement"
    },
    {
      icon: "🌍",
      title: "Remote Ready",
      description: "Available for international projects and collaborations"
    },
    {
      icon: "💼",
      title: "Professional",
      description: "Industry-standard practices and communication"
    }
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="section-badge">Get In Touch</p>
        <p className={styles.sectionSubText}>Collaboration</p>
        <h2 className={styles.sectionHeadText}>Available For New Opportunities</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("up", "spring", 0.1, 0.75)}
        className="mt-8 flex justify-start"
      >
        <AvailabilityBadge status="Open for Work" icon="🚀" />
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.2, 1)}
        className="mt-8 text-secondary text-[17px] w-full leading-[30px]"
      >
        I&apos;m actively looking for exciting opportunities to collaborate with innovative teams and tackle challenging problems. Whether you need a full-time developer, a freelance expert for a specific project, or a technical consultant, I&apos;m ready to bring value to your organization.
      </motion.p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {hiringPoints.map((item, index) => (
          <motion.div key={index} variants={fadeIn("up", "spring", index * 0.1, 0.75)}>
            <HireCard {...item} />
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        className="mt-16 flex flex-col sm:flex-row gap-6 justify-center"
      >
        <a
          href="#contact"
          className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#915EFF] to-[#56ccf2] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#915EFF]/50 transition-all duration-300 hover:scale-105"
        >
          📧 Start a Conversation
        </a>
        <a
          href="mailto:qurbanhanif120@gmail.com"
          className="inline-flex items-center justify-center px-8 py-4 border border-[#915EFF] text-[#915EFF] font-bold rounded-lg hover:bg-[#915EFF]/10 transition-all duration-300"
        >
          ✉️ Send Email Directly
        </a>
        <a
          href="https://www.linkedin.com/in/qurban015"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 border border-[#56ccf2] text-[#56ccf2] font-bold rounded-lg hover:bg-[#56ccf2]/10 transition-all duration-300"
        >
          💼 Connect on LinkedIn
        </a>
      </motion.div>

      <motion.div
        variants={fadeIn("up", "spring", 0.6, 0.75)}
        className="mt-16 p-8 bg-black-100 rounded-xl border border-[#915EFF]/20"
      >
        <p className="text-white text-[18px] font-bold mb-3">Quick Facts:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-[#915EFF] text-[24px] font-bold">3+ Years</p>
            <p className="text-secondary text-[14px]">Professional Development</p>
          </div>
          <div>
            <p className="text-[#915EFF] text-[24px] font-bold">50+ Projects</p>
            <p className="text-secondary text-[14px]">Successfully Delivered</p>
          </div>
          <div>
            <p className="text-[#915EFF] text-[24px] font-bold">Global Clients</p>
            <p className="text-secondary text-[14px]">From 5+ Countries</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const ReadyForWorkSection = SectionWrapper(ReadyForWork, "ready-for-work");

export default ReadyForWorkSection;
