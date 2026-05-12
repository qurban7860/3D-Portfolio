import { motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";
import { usePortfolio } from "../context/PortfolioContext";

/* ── Feedback Card ─────────────────────────────────────────────── */
const FeedbackCard = ({ index, testimonial, name, imageUrl }) => {
  const [error, setError] = useState(false);
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.4, 0.75)}
      whileHover={{ y: -6 }}
      className={`${styles.glassCard} w-full p-7 flex flex-col gap-4 transition-all duration-500 hover:border-[#915EFF]/30 hover:shadow-[0_10px_30px_rgba(145,94,255,0.1)]`}
    >
      {/* Quote mark */}
      <div className="text-[52px] leading-none font-black text-gradient select-none -mb-2">
        &quot;
      </div>

      {/* Testimonial text */}
      <p className="text-white/85 text-[15px] leading-relaxed tracking-wide flex-grow italic">
        {testimonial}
      </p>

      {/* Divider */}
      <div className="h-px bg-white/10 relative overflow-hidden mt-2">
         <div className="absolute inset-0 bg-[#915EFF] animate-shimmer" style={{ backgroundSize: '200% auto' }} />
      </div>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-[#915EFF]/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          {!error && imageUrl ? (
            <img
              src={imageUrl}
              alt={`feedback by ${name}`}
              onError={() => setError(true)}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#915EFF]/30 relative z-10"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#915EFF]/20 to-[#56ccf2]/20 border border-white/10 flex items-center justify-center text-white font-black text-sm relative z-10">
              {initials}
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#050816] z-20" />
        </div>
        <div className="min-w-0">
          <p className="text-white font-black text-[15px] truncate">
            <span className="text-gradient">@</span> {name}
          </p>
          <p className="text-white/40 text-[11px] font-bold uppercase tracking-wider">Professional Client</p>
        </div>
      </div>
    </motion.div>
  );
};

FeedbackCard.propTypes = {
  index: PropTypes.number.isRequired,
  testimonial: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

/* ── Feedbacks Section ─────────────────────────────────────────── */
const Feedbacks = () => {
  const { data } = usePortfolio();

  return (
    <div
      className="rounded-3xl overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, rgba(145,94,255,0.08) 0%, rgba(5,8,22,0.95) 50%, rgba(86,204,242,0.05) 100%)",
        border: "1px solid rgba(145,94,255,0.18)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#915EFF]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#56ccf2]/6 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className={`${styles.padding} py-14 relative z-10`}>
        <motion.div variants={textVariant()} className="flex flex-col items-start gap-4">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-2xl">
            What others say
          </h2>
          <p className="text-secondary text-base sm:text-lg leading-relaxed">
            Real feedback from collaborators and clients who&apos;ve experienced my work and
            dedication firsthand.
          </p>
        </motion.div>
      </div>

      {/* Cards */}
      <div
        className={`pb-10 ${styles.paddingX} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10`}
      >
        {(data?.testimonials ?? []).map((testimonial, index) => (
          <FeedbackCard
            key={`${testimonial.name}-${testimonial.id ?? index}`}
            index={index}
            {...testimonial}
          />
        ))}
      </div>
    </div>
  );
};

const FeedbacksSection = SectionWrapper(Feedbacks, "feedbacks");
export default FeedbacksSection;
