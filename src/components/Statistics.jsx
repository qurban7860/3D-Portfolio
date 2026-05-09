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
    className="flex flex-col items-center p-7 rounded-2xl text-center relative overflow-hidden
               transition-all duration-500 glow-purple"
    style={{
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      background:
        "linear-gradient(145deg, rgba(145,94,255,0.10) 0%, rgba(255,255,255,0.04) 60%, rgba(86,204,242,0.06) 100%)",
      border: "1px solid rgba(145,94,255,0.22)",
    }}
  >
    {/* Ambient glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#915EFF]/15 rounded-full blur-2xl pointer-events-none" />

    <h3 className="stat-number text-4xl sm:text-5xl font-extrabold mb-2 relative z-10">
      {stat}
    </h3>
    <p className="text-white font-semibold text-base mb-1 relative z-10">{label}</p>
    <p className="text-secondary text-sm leading-relaxed relative z-10">{description}</p>
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