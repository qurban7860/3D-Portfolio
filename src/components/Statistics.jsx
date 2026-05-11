import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";

/* ── Stat Card ────────────────────────────────────────────────── */
const StatCard = ({ index, stat, label, description }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.15, 0.75)}
    whileHover={{ y: -8, scale: 1.02 }}
    className="flex flex-col items-center p-8 premium-glass-card glass-reflection inner-glow text-center group"
  >
    {/* Ambient glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#915EFF]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#915EFF]/20 transition-colors" />

    <h3 className="stat-number text-4xl sm:text-5xl font-black mb-4 relative z-10 drop-shadow-lg">
      {stat}
    </h3>
    <p className="text-white font-bold text-lg mb-2 relative z-10">{label}</p>
    <p className="text-secondary text-sm leading-relaxed relative z-10 opacity-80">{description}</p>
  </motion.div>
);

StatCard.propTypes = {
  index: PropTypes.number.isRequired,
  stat: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

/* ── Statistics Section ───────────────────────────────────────── */
const StatisticsContent = () => {
  const { data } = usePortfolio();
  const stats = data?.stats ?? [];

  return (
    <>
      <motion.div variants={textVariant()} className="flex flex-col items-start gap-4">
        <span className="section-badge">Metrics &amp; Achievements</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Statistics
        </h2>
        <p className="text-secondary text-base sm:text-lg leading-relaxed">
          Proven track record of delivering high-quality solutions that drive business growth and
          user satisfaction. Here&apos;s what I&apos;ve accomplished:
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {stats.map((item, index) => (
          <StatCard
            key={item.id || index}
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

const WrappedStatistics = SectionWrapper(StatisticsContent, "statistics", { noTopPadding: true });

const Statistics = () => {
  const { data } = usePortfolio();
  const stats = data?.stats ?? [];

  if (!stats || stats.length === 0) return null;

  return <WrappedStatistics />;
};

export default Statistics;