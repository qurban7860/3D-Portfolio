import { motion } from "framer-motion";
import { HiOutlineExternalLink } from "react-icons/hi";
import PropTypes from "prop-types";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";
import { getIcon } from "../utils/iconMapping";

/* ── Certification Card ────────────────────────────────────────── */
const CertificationCard = ({ index, title, issuer, date, credentialUrl, icon }) => {
  const firstLetter = title?.charAt(0).toUpperCase() || "?";
  const hasUrl = credentialUrl && credentialUrl.trim() !== "";
  
  const CardWrapper = hasUrl ? motion.a : motion.div;
  const wrapperProps = hasUrl ? {
    href: credentialUrl,
    target: "_blank",
    rel: "noopener noreferrer",
  } : {};
  
  return (
    <CardWrapper
      {...wrapperProps}
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`block rounded-2xl p-6 group transition-all duration-400
                 premium-glass-card glass-reflection inner-glow relative overflow-hidden ${hasUrl ? "cursor-pointer" : "cursor-default"}`}
    >
      {/* Decorative background glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-3xl group-hover:bg-[var(--accent)]/10 transition-all duration-500" />
      
      <div className="flex items-start gap-5 relative z-10">
        {/* Icon badge */}
        <div
          className="w-14 h-14 flex-shrink-0 rounded-2xl flex items-center justify-center text-2xl
                      bg-gradient-to-br from-[var(--accent)]/20 to-[var(--secondary)]/10
                      border border-white/10 group-hover:border-[var(--accent)]/50
                      group-hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.25)] transition-all duration-500
                      shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
        >
          {(() => {
            if (!icon) return <span className="font-black text-white/50">{firstLetter}</span>;
            const Icon = getIcon(icon);
            return Icon ? <Icon className="text-[#c4a7ff]" /> : <span className="font-black text-white/50">{firstLetter}</span>; 
          })()}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-black text-[17px] mb-1 leading-snug
                         group-hover:text-gradient transition-all duration-300">
            {title}
          </h3>
          <p className="text-white/40 font-bold text-[13px] mb-3 uppercase tracking-wider">{issuer}</p>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span
              className="text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-lg"
              style={{
                background: "rgba(var(--accent-rgb), 0.1)",
                border: "1px solid rgba(var(--accent-rgb), 0.2)",
                color: "var(--accent)",
              }}
            >
              📅 {date}
            </span>
            {hasUrl && (
              <div className="relative group/btn">
                <motion.div
                  variants={fadeIn("up", "spring", index * 0.2 + 0.25, 0.75)}
                  className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/20 to-[var(--secondary)]/10 rounded-lg blur opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                />
                <span className="relative flex items-center gap-2 px-3 py-2 text-[12px] font-bold text-white/80 uppercase tracking-wider bg-[var(--secondary)]/20 backdrop-blur-sm rounded-lg border border-white/10 
                                 group-hover:bg-[var(--accent)]/30 group-hover:border-[var(--accent)]/50
                                 group-hover:text-white transition-all duration-300">
                  View Certificate <HiOutlineExternalLink />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

CertificationCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  issuer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  credentialUrl: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

/* ── Certifications Section ────────────────────────────────────── */
const Certifications = () => {
  const { data } = usePortfolio();

  return (
    <>
      <motion.div variants={textVariant()} className="flex flex-col items-start gap-4">
        <span className="section-badge mt-8 sm:mt-0">Professional Growth</span>
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
