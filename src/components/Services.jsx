import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";
import { styles } from "../styles";
import { getIcon } from "../utils/iconMapping";

/* ── Service Card ─────────────────────────────────────────────── */
const ServiceCard = ({ index, title, description, icon, features }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.75)}
    className="w-full"
  >
    <div
      className="rounded-[2.5rem] p-6 sm:p-8 flex flex-col h-full transition-all duration-700
                  premium-glass-card glass-reflection inner-glow group relative overflow-hidden"
    >
      {/* Decorative Gradient Glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-[var(--accent)]/5 rounded-full blur-[80px] group-hover:bg-[var(--accent)]/15 transition-all duration-700" />

      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5
                    bg-white/5 border border-white/10 group-hover:border-[var(--accent)]/40 
                    group-hover:scale-105 group-hover:shadow-[0_0_20px_var(--glow-color)] transition-all duration-500 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 text-[var(--accent)]  group-hover:drop-shadow-[0_0_12px_var(--glow-color)] transition-all duration-300">
          {(() => {
            if (!icon) return <span className="text-[var(--accent)]/40 text-xl font-black">{title?.charAt(0).toUpperCase()}</span>;
            if (typeof icon === 'string') {
              const Icon = getIcon(icon);
              return Icon ? <Icon /> : <span className="text-[var(--accent)]/40 text-xl font-black">{title?.charAt(0).toUpperCase()}</span>;
            }
            return icon;
          })()}
        </span>
      </div>

      <h3 className="text-white font-black text-[21px] mb-2 tracking-tight group-hover:text-gradient transition-all duration-300 leading-tight">
        {title}
      </h3>
      <p className="text-secondary text-[14px] mb-5 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
        {description}
      </p>

      {/* Features list with premium markers */}
      <div className="mb-6 flex-grow">
        <p className="text-[var(--accent)]/50 text-[9px] font-black uppercase tracking-[0.3em] mb-3 group-hover:text-[var(--accent)]/80 transition-colors duration-500">
          Key Capabilities
        </p>
        <ul className="space-y-2.5">
          {features.map((feature, idx) => (
            <li key={idx} className="text-secondary text-[13px] flex items-center gap-3 group/item">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/30 group-hover/item:bg-[var(--accent)] group-hover/item:scale-125 transition-all" />
              <span className="group-hover/item:text-white transition-colors">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => (window.location.href = "/contact")}
        className="mt-auto py-3 px-6 rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 text-white font-bold text-[12px] uppercase tracking-widest
                   hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:shadow-[0_12px_24px_rgba(var(--accent-rgb),0.3)]
                   transition-all duration-500 flex items-center justify-center gap-3 shadow-inner"
      >
        Initiate Project
        <span className="group-hover:translate-x-1.5 transition-transform">→</span>
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

/* ── Services Section ─────────────────────────────────────────── */
const Services = () => {
  const { data } = usePortfolio();
  return (
    <>
      <motion.div variants={textVariant()} className="flex flex-col items-start gap-4">
        <span className="section-badge">Expertise</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-5xl leading-tight max-w-3xl tracking-tight">
          Technical <span className="text-gradient">Solutions</span>
        </h2>
        <p className="text-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
          Engineered for performance and scale. I deliver end-to-end digital solutions 
          that combine technical precision with exceptional user experiences.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
        {(data?.services ?? []).map((service, index) => (
          <ServiceCard key={service.id || index} index={index} {...service} />
        ))}
      </div>

      {/* Premium Bottom CTA */}
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.8)}
        className="mt-20 p-8 sm:p-12 rounded-[2.5rem] text-center relative overflow-hidden premium-glass-card glass-reflection inner-glow border border-white/10"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--accent)]/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[var(--secondary)]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        
        <div className="relative z-10">
          <h3 className="text-white text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
            Need a <span className="text-gradient">Tailored Solution?</span>
          </h3>
          <p className="text-secondary text-base sm:text-lg mb-10 mx-auto max-w-2xl leading-relaxed">
            Every project has unique challenges. If you don&apos;t see exactly what you&apos;re looking for, 
            I customize my approach and technology stack to perfectly match your specific business requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="/contact"
              className={`${styles.glassButtonPremium} px-10 py-4 text-[15px] shadow-2xl shadow-[var(--accent)]/20`}
            >
              Start a Conversation
            </a>
            <p className="text-white/40 text-sm font-medium italic">
              Response time: &lt; 12 hours
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const ServicesSection = SectionWrapper(Services, "services");

export { Services };
export default ServicesSection;