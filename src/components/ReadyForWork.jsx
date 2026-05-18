/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  HiOutlineLightningBolt,
  HiOutlineCalendar,
  HiOutlineGlobe,
  HiOutlineBriefcase,
} from "react-icons/hi";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";
import { styles } from "../styles";
import { premium_collaboration } from "../assets";

const HiringPoint = ({ icon: Icon, title, desc, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.5)}
    className="premium-glass-card glass-reflection inner-glow flex flex-col gap-3 p-5 rounded-2xl border-white/10 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.15)] transition-all duration-500 group cursor-default h-full relative overflow-hidden"
  >
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/10 rounded-full blur-[24px] group-hover:bg-accent/30 transition-colors pointer-events-none" />
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center border border-white/10 group-hover:border-accent/50 transition-colors z-10 shadow-inner">
      <Icon className="text-2xl text-accent group-hover:scale-110 transition-transform shrink-0 drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.8)]" />
    </div>
    <div className="z-10 mt-1">
      <h4 className="text-white text-[15px] font-black tracking-wide mb-1.5">
        {title}
      </h4>
      <p className="text-secondary text-[12px] leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
        {desc}
      </p>
    </div>
  </motion.div>
);

// const QuickFact = ({ value, label }) => (
//   <div className="flex flex-col items-center px-4 sm:px-6 border-r border-white/10 last:border-0 min-w-fit flex-1 shrink-0">
//     <span className="text-white font-black text-sm sm:text-lg whitespace-nowrap">
//       {value}
//     </span>
//     <span className="text-secondary text-[9px] sm:text-[10px] uppercase tracking-widest text-center whitespace-nowrap">
//       {label}
//     </span>
//   </div>
// );

const ReadyForWork = () => {
  const { data } = usePortfolio();
  const { username } = useParams();
  const stats = data?.stats ?? [];
  const contact = data?.settings?.contact ?? {};
  const availabilityStatus = contact.availabilityStatus || "Open for Work";

  const hiringPoints = [
    { icon: HiOutlineLightningBolt, title: "24h Response", desc: "Rapid communication and swift issue resolution across global timezones." },
    { icon: HiOutlineCalendar, title: "Flexible Sync", desc: "Adaptable scheduling for seamless asynchronous remote collaboration." },
    { icon: HiOutlineGlobe, title: "Remote Ready", desc: "Fully equipped and experienced in distributed team environments." },
    { icon: HiOutlineBriefcase, title: "Professional", desc: "Enterprise-grade code standards and clear, concise documentation." },
  ];

  return (
    <div className="flex flex-col gap-6 w-full overflow-hidden">
      {/* ── Header Section ── */}
      <div className="flex flex-col items-center text-center gap-4">
        <motion.div
          variants={textVariant()}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-green-400/10 border border-green-400/20 shadow-[0_0_15px_rgba(74,222,128,0.1)]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
            <p className="text-green-400 font-black text-[10px] sm:text-[12px] uppercase tracking-widest">
              {availabilityStatus}
            </p>
          </div>
          <h2 className={`${styles.sectionHeadText} break-words`}>
            Ready for Collaboration
          </h2>
          <p className="text-secondary text-base sm:text-lg leading-relaxed opacity-80 max-w-2xl px-4 sm:px-0">
            Seeking high-impact opportunities where I can apply my architectural
            expertise to solve complex business challenges. Let&apos;s discuss
            your vision.
          </p>
        </motion.div>

        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {stats.slice(0, 4).map((fact, i) => (
            <motion.div
              key={i}
              variants={fadeIn("up", "spring", i * 0.1, 0.5)}
              className="flex flex-col items-center p-4 premium-glass-card glass-reflection inner-glow border border-white/10 shadow-inner hover:border-accent/30 transition-colors duration-500"
            >
              <span className="text-white font-black text-xl sm:text-2xl drop-shadow-md">
                {fact.stat}
              </span>
              <span className="text-secondary text-[9px] sm:text-[10px] uppercase tracking-widest text-center mt-1">
                {fact.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
        <motion.div
          variants={fadeIn("up", "spring", 0.3, 0.8)}
          className="lg:col-span-7 flex flex-col items-center lg:items-start gap-8"
        >
          <div className="premium-glass-card p-6 w-full border-white/5 bg-white/[0.02]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {hiringPoints.map((point, i) => (
                <HiringPoint key={i} {...point} index={i} />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("up", "spring", 0.5, 0.8)}
          className="lg:col-span-5 flex justify-center lg:justify-end w-full"
        >
          <div className="premium-glass-card glass-reflection inner-glow group p-1 w-full max-w-md overflow-hidden border-white/10 shadow-[0_0_50px_rgba(var(--accent-rgb),0.15)]">
            <div className="relative h-48 sm:h-56 overflow-hidden rounded-[1.5rem]">
              <img
                src={premium_collaboration}
                alt="Collaboration"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <h4 className="text-white font-black text-xl uppercase tracking-tighter">
                  Strategic Partnership
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  <p className="text-secondary text-[10px] uppercase tracking-[0.2em] font-bold">
                    24h Response SLA
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col gap-6">
              <p className="text-secondary text-[13px] leading-relaxed opacity-70">
                Ready to transform your vision into a scalable digital reality.
                Let&apos;s discuss your next breakthrough.
              </p>
              <Link
                to={`${username ? `/${username}` : ''}/contact`}
                className={`${styles.glassButtonPremium} w-full py-4 text-[14px] flex items-center justify-center gap-4 relative z-10`}
                onClick={() => window.scrollTo(0, 0)}
              >
                📧 Start Consultation
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(ReadyForWork, "ready-for-work", {
  noTopPadding: true,
});
