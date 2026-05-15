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
    className="relative group p-[1px] rounded-3xl overflow-hidden hover:scale-[1.05] transition-all duration-500 shadow-2xl"
  >
    {/* Animated Border Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[#915EFF]/20 opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
    
    <div className="relative bg-[#050816]/60 backdrop-blur-2xl p-8 rounded-[23px] h-full flex flex-col items-center justify-center border border-white/5 group-hover:border-[#915EFF]/30 transition-all duration-500 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#915EFF]/10 blur-3xl rounded-full group-hover:bg-[#915EFF]/20 transition-all" />
      
      <h3 className="stat-number text-4xl sm:text-5xl font-black mb-3 drop-shadow-[0_0_20px_rgba(145,94,255,0.4)] transition-all group-hover:scale-110 tracking-tight">
        {stat}
      </h3>
      
      <div className="h-[2px] w-10 bg-white/5 mb-4 group-hover:w-16 group-hover:bg-[#915EFF]/50 transition-all duration-700 rounded-full" />
      
      <p className="text-secondary font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-opacity text-center leading-tight">
        {label}
      </p>
      
      {/* Glass Reflection Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-transparent pointer-events-none" />
    </div>
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