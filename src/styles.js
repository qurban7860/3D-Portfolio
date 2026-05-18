const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-8 py-4",
  padding: "sm:px-16 px-6 sm:py-6 py-4",

  heroHeadText:
    "font-black text-[var(--text-primary)] lg:text-[72px] sm:text-[54px] xs:text-[42px] text-[34px] lg:leading-[1] tracking-tighter drop-shadow-2xl",
  heroSubText:
    "text-[var(--text-secondary)] font-medium lg:text-[20px] sm:text-[17px] xs:text-[15px] text-[14px] lg:leading-[1.6] opacity-90",

  sectionHeadText:
    "text-[var(--text-primary)] font-black md:text-[40px] sm:text-[32px] xs:text-[28px] text-[26px] tracking-tight leading-[1.1]",
  sectionSubText:
    "sm:text-[13px] text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.25em] font-bold opacity-60",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-start items-start",
  flexBetween: "flex justify-between items-center",

  transition: "transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)",
  hoverScale: "hover:scale-105 transform transition-transform duration-500",

  glassButton:
    "inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-[13px] sm:text-[14px] backdrop-blur-[var(--glass-blur)] bg-white/10 border border-white/20 text-[var(--text-primary)] font-bold rounded-2xl hover:bg-white/20 hover:border-white/40 hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all duration-300",

  glassButtonPurple:
    "inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-[13px] sm:text-[14px] backdrop-blur-[var(--glass-blur)] bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--text-primary)] font-bold rounded-2xl hover:bg-[var(--primary)]/20 hover:border-[var(--primary)]/60 hover:shadow-[0_8px_32px_var(--glow-color)] hover:scale-105 active:scale-95 transition-all duration-300",

  glassButtonCyan:
    "inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-[13px] sm:text-[14px] backdrop-blur-[var(--glass-blur)] bg-[var(--secondary)]/10 border border-[var(--secondary)]/30 text-[var(--text-primary)] font-bold rounded-2xl hover:bg-[var(--secondary)]/20 hover:border-[var(--secondary)]/60 hover:shadow-[0_8px_32px_var(--glow-color)] hover:scale-105 active:scale-95 transition-all duration-300",

  glassButtonPremium:
    "inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-[13px] sm:text-[14px] backdrop-blur-xl bg-[var(--primary)]/10 border border-white/10 text-[var(--text-primary)] font-bold rounded-2xl hover:bg-[var(--primary)]/30 hover:border-[var(--primary)]/50 hover:shadow-[0_0_30px_var(--glow-color)] hover:scale-105 active:scale-95 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden group",

  outlineButton:
    "inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-[13px] sm:text-[14px] border border-white/20 text-[var(--text-primary)] font-bold rounded-2xl backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all duration-300",

  outlineButtonCyan:
    "inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-[13px] sm:text-[14px] border border-[var(--secondary)]/40 text-[var(--secondary)] font-bold rounded-2xl backdrop-blur-sm bg-[var(--secondary)]/5 hover:bg-[var(--secondary)]/15 hover:border-[var(--secondary)] hover:shadow-[0_0_20px_var(--glow-color)] hover:scale-105 active:scale-95 transition-all duration-300",

  ghostButton:
    "inline-flex items-center justify-center gap-2 px-6 py-2 text-[13px] text-[var(--text-secondary)] font-semibold border border-white/5 rounded-xl hover:border-white/20 backdrop-blur-sm hover:bg-white/5 hover:text-[var(--text-primary)] transition-all duration-300",

  ctaButton:
    "inline-flex items-center justify-center gap-2 px-8 py-4 text-[14px] backdrop-blur-[var(--glass-blur)] bg-[var(--primary)]/20 border border-[var(--primary)]/50 text-[var(--text-primary)] font-bold rounded-2xl hover:bg-[var(--primary)]/30 hover:border-[var(--primary)] hover:shadow-[0_0_32px_var(--glow-color)] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]",

  /* ── Glassmorphism Cards ───────────────────────────────────── */
  glassCard:
    "backdrop-blur-[var(--glass-blur)] bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[2rem] hover:border-[var(--primary)]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_var(--glow-color)] transition-all duration-700",

  glassCardStrong:
    "backdrop-blur-[var(--glass-blur)] bg-white/[0.08] border border-white/[0.15] rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6),0_0_40px_var(--glow-color)]",

  glassCardPurple:
    "backdrop-blur-[var(--glass-blur)] bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-[2rem] hover:border-[var(--primary)]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_var(--glow-color)] hover:bg-[var(--primary)]/10 transition-all duration-700",

  glassNeuomorphism:
    "backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl",

  card: "bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--primary)]/20 hover:border-[var(--primary)]/60 transition-all duration-300",
  sectionBadge: "text-[var(--primary)] text-[14px] font-bold uppercase tracking-wider",

  glassInput:
    "w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-[var(--text-primary)] outline-none transition-all duration-500 focus:border-[var(--primary)] focus:bg-white/[0.12] focus:shadow-[0_0_25px_var(--glow-color),inset_0_1px_2px_rgba(0,0,0,0.3)] hover:border-white/20 hover:bg-white/[0.08] text-[15px] font-medium placeholder:text-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]",
};

export { styles };