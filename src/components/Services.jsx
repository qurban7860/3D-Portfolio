import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";
import { styles } from "../styles";

/* ── Service Card ─────────────────────────────────────────────── */
const ServiceCard = ({ index, title, description, icon, features }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.15, 0.75)}
    className="w-full"
  >
    <div
      className="rounded-3xl p-8 flex flex-col h-full transition-all duration-500
                  bg-white/[0.02] backdrop-blur-2xl border border-white/5
                  hover:bg-white/[0.05] hover:border-[#915EFF]/30
                  hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5),0_0_20px_rgba(145,94,255,0.1)] group relative overflow-hidden"
    >
      {/* Decorative Gradient Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#915EFF]/5 rounded-full blur-3xl group-hover:bg-[#915EFF]/10 transition-colors duration-500" />

      {/* Icon Frame */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6
                    bg-white/5 border border-white/10 group-hover:border-[#915EFF]/40 
                    group-hover:scale-110 transition-all duration-500 shadow-xl"
      >
        <span className="group-hover:drop-shadow-[0_0_8px_rgba(145,94,255,0.5)] transition-all">
          {icon}
        </span>
      </div>

      <h3 className="text-white font-bold text-2xl mb-4 group-hover:text-[#915EFF] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-secondary text-[15px] mb-6 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
        {description}
      </p>

      {/* Features list with premium icons */}
      <div className="mb-8 flex-grow">
        <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
          Core Expertise
        </p>
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="text-secondary text-[14px] flex items-center gap-3 group/item">
              <div className="w-1.5 h-1.5 rounded-full bg-[#915EFF]/40 group-hover/item:bg-[#915EFF] transition-colors" />
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
        className="mt-auto py-3.5 px-6 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-[14px]
                   hover:bg-[#915EFF] hover:border-[#915EFF] hover:shadow-[0_0_20px_rgba(145,94,255,0.4)]
                   transition-all duration-300 flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
      >
        Plan Your Project
        <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
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
        <span className="section-badge">Solutions</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-5xl leading-tight max-w-3xl tracking-tight">
          Services &amp; <span className="text-gradient">Specializations</span>
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
        className="mt-20 p-8 sm:p-12 rounded-[2.5rem] text-center relative overflow-hidden premium-glass border border-white/10"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#915EFF]/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#56ccf2]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        
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
              className={`${styles.glassButtonPremium} px-10 py-4 text-[15px] shadow-2xl shadow-purple-500/20`}
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