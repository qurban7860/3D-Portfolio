const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-12 py-5",
  padding: "sm:px-16 px-6 sm:py-12 py-8",

  heroHeadText:
    "font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] tracking-tight",
  heroSubText:
    "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",

  sectionHeadText:
    "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] tracking-tight",
  sectionSubText:
    "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider font-semibold",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-start items-start",
  flexBetween: "flex justify-between items-center",

  transition: "transition-all duration-300 ease-in-out",
  hoverScale: "hover:scale-110 transform",

  gradientButton:
    "inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#915EFF] to-[#56ccf2] text-white font-bold rounded-xl hover:shadow-[0_0_24px_rgba(145,94,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-300",

  outlineButton:
    "inline-flex items-center justify-center gap-2 border border-[#915EFF]/60 text-[#915EFF] font-bold rounded-xl backdrop-blur-sm bg-[#915EFF]/5 hover:bg-[#915EFF]/20 hover:border-[#915EFF] hover:shadow-[0_0_20px_rgba(145,94,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300",

  outlineButtonCyan:
    "inline-flex items-center justify-center gap-2 border border-[#56ccf2]/60 text-[#56ccf2] font-bold rounded-xl backdrop-blur-sm bg-[#56ccf2]/5 hover:bg-[#56ccf2]/20 hover:border-[#56ccf2] hover:shadow-[0_0_20px_rgba(86,204,242,0.3)] hover:scale-105 active:scale-95 transition-all duration-300",

  ghostButton:
    "inline-flex items-center justify-center gap-2 text-white/70 font-semibold border border-white/10 rounded-xl hover:border-white/30 backdrop-blur-sm hover:bg-white/5 hover:text-white transition-all duration-300",

  ctaButton:
    "inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#915EFF] to-[#56ccf2] text-white font-bold rounded-xl hover:shadow-[0_0_24px_rgba(145,94,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-300",

  /* ── Glassmorphism Cards ───────────────────────────────────── */
  glassCard:
    "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl hover:border-[#915EFF]/40 hover:shadow-[0_8px_40px_rgba(145,94,255,0.12)] transition-all duration-500",

  glassCardStrong:
    "backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] rounded-2xl shadow-2xl",

  glassCardPurple:
    "backdrop-blur-md bg-[#915EFF]/5 border border-[#915EFF]/20 rounded-2xl hover:border-[#915EFF]/50 hover:shadow-[0_8px_40px_rgba(145,94,255,0.18)] hover:bg-[#915EFF]/8 transition-all duration-500",

  glassNeuomorphism:
    "backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl",

  card: "bg-tertiary rounded-xl p-6 border border-[#915EFF]/20 hover:border-[#915EFF]/60 transition-all duration-300",
  sectionBadge: "text-[#915EFF] text-[14px] font-bold uppercase tracking-wider",
};

export { styles };