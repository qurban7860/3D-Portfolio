import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";
import { styles } from "../styles";

/* ── Service Card ─────────────────────────────────────────────── */
const ServiceCard = ({ index, title, description, icon, features }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.18, 0.75)}
    whileHover={{ y: -8 }}
    className="w-full"
  >
    <div
      className="rounded-2xl p-8 flex flex-col h-full transition-all duration-500
                  hover:shadow-[0_12px_48px_rgba(145,94,255,0.18)]"
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background:
          "linear-gradient(145deg, rgba(145,94,255,0.08) 0%, rgba(255,255,255,0.04) 60%, rgba(86,204,242,0.04) 100%)",
        border: "1px solid rgba(145,94,255,0.22)",
      }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-5
                    bg-gradient-to-br from-[#915EFF]/25 to-[#56ccf2]/15
                    border border-[#915EFF]/30"
      >
        {icon}
      </div>

      <h3 className="text-white font-bold text-[22px] mb-3">{title}</h3>
      <p className="text-secondary text-[15px] mb-5 leading-relaxed">{description}</p>

      {/* Features list */}
      <div className="mb-6 flex-grow">
        <p className="text-white/60 text-[12px] font-semibold uppercase tracking-widest mb-3">
          Includes
        </p>
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="text-secondary text-[14px] flex items-start gap-2">
              <span className="text-gradient mt-[2px] text-[15px] font-bold flex-shrink-0">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => (window.location.href = "/contact")}
        className={`${styles.outlineButton} w-full py-3 px-6 mt-auto justify-center`}
      >
        Get Started →
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
        <span className="section-badge">What I Offer</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Services &amp; Solutions
        </h2>
        <p className="text-secondary text-base sm:text-lg leading-relaxed">
          From concept to deployment, I build scalable, high-quality web and mobile applications
          tailored to your business goals.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {(data?.services ?? []).map((service, index) => (
          <ServiceCard key={service.id || index} index={index} {...service} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        variants={fadeIn("up", "spring", 0.4, 0.75)}
        className="mt-10 p-10 rounded-2xl text-center relative overflow-hidden"
        style={{
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          background:
            "linear-gradient(135deg, rgba(145,94,255,0.08) 0%, rgba(86,204,242,0.05) 100%)",
          border: "1px solid rgba(145,94,255,0.20)",
        }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#915EFF]/10 rounded-full blur-3xl pointer-events-none" />
        <p className="text-white text-lg font-semibold mb-3 relative z-10">
          Don&apos;t see exactly what you need?
        </p>
        <p className="text-secondary text-base mb-8 mx-auto max-w-lg relative z-10">
          I customize solutions based on your specific requirements. Let&apos;s discuss your project
          and craft the right approach together.
        </p>
        <a
          href="/contact"
          className={`${styles.gradientButton} px-8 py-3 text-[15px] relative z-10`}
        >
          Schedule a Consultation →
        </a>
      </motion.div>
    </>
  );
};

const ServicesSection = SectionWrapper(Services, "services");

export { Services };
export default ServicesSection;