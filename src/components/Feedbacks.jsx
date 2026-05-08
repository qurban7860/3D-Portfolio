import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";
import { usePortfolio } from "../context/PortfolioContext";

/* ── Feedback Card ─────────────────────────────────────────────── */
const FeedbackCard = ({ index, testimonial, name, imageUrl }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.4, 0.75)}
    whileHover={{ y: -6 }}
    className="xs:w-[320px] w-full rounded-2xl p-7 flex flex-col gap-4 transition-all duration-500
               hover:shadow-[0_12px_40px_rgba(145,94,255,0.16)]"
    style={{
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      background:
        "linear-gradient(145deg, rgba(145,94,255,0.07) 0%, rgba(255,255,255,0.04) 100%)",
      border: "1px solid rgba(145,94,255,0.20)",
    }}
  >
    {/* Quote mark */}
    <div className="text-[52px] leading-none font-black text-gradient select-none -mb-2">
      &quot;
    </div>

    {/* Testimonial text */}
    <p className="text-white/85 text-[15px] leading-relaxed tracking-wide flex-grow">
      {testimonial}
    </p>

    {/* Divider */}
    <div className="h-px bg-gradient-to-r from-[#915EFF]/40 to-transparent" />

    {/* Author */}
    <div className="flex items-center gap-3">
      <div className="relative">
        <img
          src={imageUrl}
          alt={`feedback by ${name}`}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-[#915EFF]/50"
        />
        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#050816]" />
      </div>
      <div>
        <p className="text-white font-bold text-[14px]">
          <span className="text-gradient">@</span> {name}
        </p>
        <p className="text-white/40 text-[12px]">Verified Client</p>
      </div>
    </div>
  </motion.div>
);

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
