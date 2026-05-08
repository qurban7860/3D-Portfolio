import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";

/* ── Certification Card ────────────────────────────────────────── */
const CertificationCard = ({ index, title, issuer, date, credentialUrl, icon }) => (
  <motion.a
    href={credentialUrl}
    target="_blank"
    rel="noopener noreferrer"
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    whileHover={{ y: -6, scale: 1.01 }}
    className="block rounded-xl p-6 group transition-all duration-400
               hover:shadow-[0_10px_36px_rgba(145,94,255,0.18)] cursor-pointer"
    style={{
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      background:
        "linear-gradient(145deg, rgba(145,94,255,0.07) 0%, rgba(255,255,255,0.04) 100%)",
      border: "1px solid rgba(145,94,255,0.20)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.border = "1px solid rgba(145,94,255,0.50)";
      e.currentTarget.style.background =
        "linear-gradient(145deg, rgba(145,94,255,0.12) 0%, rgba(255,255,255,0.06) 100%)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.border = "1px solid rgba(145,94,255,0.20)";
      e.currentTarget.style.background =
        "linear-gradient(145deg, rgba(145,94,255,0.07) 0%, rgba(255,255,255,0.04) 100%)";
    }}
  >
    <div className="flex items-start gap-4">
      {/* Icon badge */}
      <div
        className="w-13 h-13 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                    bg-gradient-to-br from-[#915EFF]/25 to-[#56ccf2]/15
                    border border-[#915EFF]/30 group-hover:border-[#915EFF]/60
                    group-hover:shadow-[0_0_16px_rgba(145,94,255,0.3)] transition-all duration-300"
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-white font-bold text-[16px] mb-1 leading-snug
                       group-hover:text-[#915EFF] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-secondary text-[13px] mb-2">{issuer}</p>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span
            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
            style={{
              background: "rgba(145,94,255,0.12)",
              border: "1px solid rgba(145,94,255,0.30)",
              color: "#c4a7ff",
            }}
          >
            📅 {date}
          </span>
          <span className="text-gradient text-[12px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Credential →
          </span>
        </div>
      </div>
    </div>
  </motion.a>
);

CertificationCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  issuer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  credentialUrl: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

/* ── Certifications Section ────────────────────────────────────── */
const Certifications = () => {
  const { data } = usePortfolio();

  return (
    <>
      <motion.div variants={textVariant()} className="flex flex-col items-start gap-4">
        <span className="section-badge">Professional Growth</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Certifications &amp; Continuous Learning
        </h2>
        <p className="text-secondary text-base sm:text-lg leading-relaxed">
          I continuously invest in expanding my expertise through recognized certifications and
          structured professional development.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {(data?.certifications ?? []).map((cert, index) => (
          <CertificationCard key={cert.id || index} index={index} {...cert} />
        ))}
      </div>
    </>
  );
};

const CertificationsSection = SectionWrapper(Certifications, "certifications");
export default CertificationsSection;
