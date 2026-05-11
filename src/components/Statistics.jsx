import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";
import { styles } from "../styles";

/* ── Stat Card ────────────────────────────────────────────────── */
const StatCard = ({ index, stat, label }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.5)}
    className="flex-1 flex flex-col items-center p-6 premium-glass-card glass-reflection inner-glow text-center group"
  >
    <h3 className="stat-number text-3xl font-black mb-1 drop-shadow-lg">{stat}</h3>
    <p className="text-white font-bold text-[12px] opacity-80 uppercase tracking-wider">{label}</p>
  </motion.div>
);

StatCard.propTypes = {
  index: PropTypes.number.isRequired,
  stat: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

/* ── Statistics Section ───────────────────────────────────────── */
const StatisticsContent = () => {
  const { data } = usePortfolio();
  const stats = (data?.stats ?? []).slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <motion.div variants={textVariant()} className="flex flex-col items-center text-center gap-2">
        <span className="section-badge">Key Metrics</span>
        <h2 className={styles.sectionHeadText}>Performance <span className="text-gradient">Statistics</span></h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {stats.map((item, index) => (
          <StatCard
            key={item.id || index}
            index={index}
            stat={item.stat}
            label={item.label}
          />
        ))}
      </div>
    </div>
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