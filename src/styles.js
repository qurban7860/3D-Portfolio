const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-8 py-4",
  padding: "sm:px-16 px-6 sm:py-6 py-4",

  heroHeadText:
    "font-black text-white lg:text-[72px] sm:text-[54px] xs:text-[42px] text-[34px] lg:leading-[1] tracking-tighter drop-shadow-2xl",
  heroSubText:
    "text-[#dfd9ff] font-medium lg:text-[20px] sm:text-[17px] xs:text-[15px] text-[14px] lg:leading-[1.6] opacity-90",

  sectionHeadText:
    "text-white font-black md:text-[36px] sm:text-[30px] xs:text-[24px] text-[22px] tracking-tight leading-tight",
  sectionSubText:
    "sm:text-[14px] text-[12px] text-secondary uppercase tracking-[0.3em] font-black opacity-60",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-start items-start",
  flexBetween: "flex justify-between items-center",

  transition: "transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)",
  hoverScale: "hover:scale-105 transform transition-transform duration-500",

  glassButton:
    "inline-flex items-center justify-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 hover:border-white/40 hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all duration-300",

  glassButtonPurple:
    "inline-flex items-center justify-center gap-2 backdrop-blur-md bg-[#915EFF]/10 border border-[#915EFF]/30 text-white font-bold rounded-xl hover:bg-[#915EFF]/20 hover:border-[#915EFF]/60 hover:shadow-[0_8px_32px_rgba(145,94,255,0.25)] hover:scale-105 active:scale-95 transition-all duration-300",

  glassButtonCyan:
    "inline-flex items-center justify-center gap-2 backdrop-blur-md bg-[#56ccf2]/10 border border-[#56ccf2]/30 text-white font-bold rounded-xl hover:bg-[#56ccf2]/20 hover:border-[#56ccf2]/60 hover:shadow-[0_8px_32px_rgba(86,204,242,0.25)] hover:scale-105 active:scale-95 transition-all duration-300",

  glassButtonPremium:
    "inline-flex items-center justify-center gap-2 backdrop-blur-xl bg-[#915EFF]/10 border border-white/10 text-white font-bold rounded-2xl hover:bg-[#915EFF]/30 hover:border-[#915EFF]/50 hover:shadow-[0_0_30px_rgba(145,94,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden group",

  outlineButton:
    "inline-flex items-center justify-center gap-2 border border-white/20 text-white font-bold rounded-2xl backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all duration-300",

  outlineButtonCyan:
    "inline-flex items-center justify-center gap-2 border border-[#56ccf2]/40 text-[#56ccf2] font-bold rounded-2xl backdrop-blur-sm bg-[#56ccf2]/5 hover:bg-[#56ccf2]/15 hover:border-[#56ccf2] hover:shadow-[0_0_20px_rgba(86,204,242,0.2)] hover:scale-105 active:scale-95 transition-all duration-300",

  ghostButton:
    "inline-flex items-center justify-center gap-2 text-white/60 font-semibold border border-white/5 rounded-xl hover:border-white/20 backdrop-blur-sm hover:bg-white/5 hover:text-white transition-all duration-300",

  ctaButton:
    "inline-flex items-center gap-2 px-8 py-3 backdrop-blur-md bg-[#915EFF]/20 border border-[#915EFF]/50 text-white font-bold rounded-xl hover:bg-[#915EFF]/30 hover:border-[#915EFF] hover:shadow-[0_0_32px_rgba(145,94,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]",

  /* ── Glassmorphism Cards ───────────────────────────────────── */
  glassCard:
    "backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-[2rem] hover:border-[#915EFF]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(145,94,255,0.1)] transition-all duration-700",

  glassCardStrong:
    "backdrop-blur-2xl bg-white/[0.08] border border-white/[0.15] rounded-[2.5rem] shadow-2xl",

  glassCardPurple:
    "backdrop-blur-xl bg-[#915EFF]/5 border border-[#915EFF]/20 rounded-[2rem] hover:border-[#915EFF]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(145,94,255,0.2)] hover:bg-[#915EFF]/10 transition-all duration-700",

  glassNeuomorphism:
    "backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl",

  card: "bg-tertiary rounded-xl p-6 border border-[#915EFF]/20 hover:border-[#915EFF]/60 transition-all duration-300",
  sectionBadge: "text-[#915EFF] text-[14px] font-bold uppercase tracking-wider",
};

export { styles };