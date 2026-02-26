import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";
import { statsData } from "../constants/statsData";

const StatCard = ({ index, stat, label, description }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    className="flex flex-col items-center p-6 rounded-xl bg-gradient-to-b from-tertiary to-black-200 border border-[#915EFF]/20 hover:border-[#915EFF]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#915EFF]/20 text-center"
  >
    <h3 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#915EFF] to-[#56ccf2] mb-2">
      {stat}
    </h3>
    <p className="text-white font-semibold text-lg">{label}</p>
    <p className="text-secondary text-sm mt-2 leading-relaxed">{description}</p>
  </motion.div>
);

StatCard.propTypes = {
  index: PropTypes.number.isRequired,
  stat: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Statistics = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="flex flex-col items-start gap-4">
        <span className="section-badge">
          Metrics & Achievements
        </span>

        <h2 className="text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Statistics
        </h2>

        <p className="text-secondary text-base sm:text-lg leading-relaxed">
          Proven track record of delivering high-quality solutions that drive business growth and user satisfaction. Here&apos;s what I&apos;ve accomplished:
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {statsData.map((item, index) => (
          <StatCard
            key={item.id}
            index={index}
            stat={item.stat}
            label={item.label}
            description={item.description}
          />
        ))}
      </div>
    </>
  );
};

const StatisticsSection = SectionWrapper(Statistics, "statistics");
export default StatisticsSection;