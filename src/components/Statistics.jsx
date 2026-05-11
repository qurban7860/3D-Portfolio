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
    whileHover={{ y: -8, scale: 1.02 }}
    className="flex-1 flex flex-col items-center p-8 premium-glass-card glass-reflection group overflow-hidden relative"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <h3 className="stat-number text-4xl sm:text-5xl font-black mb-2 drop-shadow-[0_0_15px_rgba(145,94,255,0.4)] transition-all group-hover:scale-110">
      {stat}
    </h3>
    <p className="text-secondary font-black text-[11px] sm:text-[12px] uppercase tracking-[0.25em] opacity-60 group-hover:opacity-100 transition-opacity">
      {label}
    </p>
    {/* Subtle underline decoration */}
    <div className="w-10 h-1 rounded-full bg-white/10 mt-4 group-hover:w-16 group-hover:bg-[#915EFF] transition-all duration-500" />
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