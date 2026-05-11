/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";
import { styles } from "../styles";

const HiringPoint = ({ icon, title, index }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.1, 0.5)}
    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#915EFF]/30 transition-all group"
  >
    <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
    <h4 className="text-white text-[12px] font-bold leading-tight">{title}</h4>
  </motion.div>
);

const QuickFact = ({ value, label }) => (
  <div className="flex flex-col items-center px-6 border-r border-white/10 last:border-0">
    <span className="text-white font-black text-lg">{value}</span>
    <span className="text-secondary text-[11px] uppercase tracking-widest">{label}</span>
  </div>
);

const ReadyForWork = () => {
  const { data } = usePortfolio();
  const contact = data?.settings?.contact ?? {};
  const availabilityStatus = contact.availabilityStatus || "Open for Work";

  const hiringPoints = [
    { icon: "⚡", title: "24h Response" },
    { icon: "📅", title: "Flexible" },
    { icon: "🌍", title: "Remote Ready" },
    { icon: "💼", title: "Professional" },
  ];

  const quickFacts = [
    { value: "3+ Years", label: "Exp." },
    { value: "50+", label: "Projects" },
    { value: "Global", label: "Clients" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* ── Top Header Strip ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8">
        <motion.div variants={textVariant()} className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
             <p className="text-green-400 font-black text-[12px] uppercase tracking-widest">{availabilityStatus}</p>
          </div>
          <h2 className={styles.sectionHeadText}>Ready for Collaboration</h2>
        </motion.div>

        <div className="flex items-center bg-white/5 p-4 rounded-2xl border border-white/10">
          {quickFacts.map((fact, i) => (
            <QuickFact key={i} {...fact} />
          ))}
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <motion.div 
          variants={fadeIn("right", "spring", 0.3, 0.8)}
          className="lg:col-span-7 flex flex-col gap-4"
        >
          <p className="text-secondary text-base leading-relaxed opacity-80">
            Seeking high-impact opportunities where I can apply my architectural expertise to solve complex business challenges. Let&apos;s discuss your vision.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
            {hiringPoints.map((point, i) => (
              <HiringPoint key={i} {...point} index={i} />
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={fadeIn("left", "spring", 0.5, 0.8)}
          className="lg:col-span-5 flex justify-end"
        >
          <div className="premium-glass-card p-8 w-full max-w-sm flex flex-col gap-5 border-[#915EFF]/20 shadow-[0_0_50px_rgba(145,94,255,0.1)]">
             <h4 className="text-white font-black text-center text-lg">Direct Channel</h4>
             <a href="/contact" className={`${styles.glassButtonPremium} w-full py-4 text-[15px] flex items-center justify-center gap-3`}>
               📧 Start Consultation
             </a>
             <p className="text-secondary text-[11px] text-center opacity-50 italic">Expect a response within 24 hours.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(ReadyForWork, "ready-for-work", { noTopPadding: true });
