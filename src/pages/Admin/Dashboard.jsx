import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineExternalLink, HiOutlineLogout, HiOutlineChevronRight } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import ContentManager from "../../components/admin/ContentManager";
import { adminSchema } from "../../constants/adminSchema";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../../styles";
import { StarsCanvas } from "../../components";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const sectionKeys = useMemo(() => Object.keys(adminSchema), []);
  const [activeSection, setActiveSection] = useState(sectionKeys[0]);

  const activeTitle = adminSchema[activeSection].title;

  return (
    <div className="min-h-screen bg-[#050816] pb-16 selection:bg-[#915EFF]/30 overflow-x-hidden relative">
      {/* ── Immersive Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarsCanvas />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#915EFF]/5 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#56ccf2]/5 blur-[150px]" />
        
        {/* Light Beams from index.css */}
        <div className="light-beam light-beam-1" />
        <div className="light-beam light-beam-2" />
        <div className="light-beam light-beam-3" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-6 sm:gap-10 px-4 sm:px-8 pt-6 sm:pt-12">
        {/* ── Premium Header ── */}
        <header className={`${styles.glassCardStrong} flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between transition-all duration-500 group relative overflow-hidden bg-[#050816]/60`}>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#915EFF]/5 to-transparent pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.6)]" />
              <p className="text-[11px] font-bold text-green-400/80 tracking-widest uppercase">System Operational</p>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Control Center
            </h1>
            <p className="max-w-md text-secondary text-[15px] font-medium leading-relaxed mt-3 opacity-60">
              Manage your professional portfolio with precision and architectural excellence.
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:items-end relative z-10">
            {/* User Profile Badge */}
            <div className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 px-5 py-3 w-fit hover:border-[#915EFF]/30 transition-all duration-500 group/profile">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#915EFF] to-[#56ccf2] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(145,94,255,0.3)] group-hover/profile:scale-105 transition-transform">
                {user?.email?.[0].toUpperCase() || "A"}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-bold text-[14px] leading-none truncate max-w-[180px]">{user?.email}</span>
                <span className="text-[11px] text-[#56ccf2] mt-1.5 font-semibold opacity-80">Administrator</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="group flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-[14px] font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 active:scale-95"
              >
                <span>Live Site</span>
                <HiOutlineExternalLink className="text-secondary group-hover:text-[#56ccf2] transition-colors" />
              </button>
              <button
                type="button"
                onClick={() => logout()}
                className={`${styles.glassButtonPremium} px-8 py-3 text-[14px] font-bold flex items-center gap-3 active:scale-95`}
              >
                <HiOutlineLogout className="text-lg" />
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* ── Main Panel Layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mb-20">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-12">
            <div className={`${styles.glassCard} p-6 relative overflow-hidden group`}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="mb-8 px-2 relative z-10">
                <h2 className="text-[12px] font-bold text-[#c4a7ff] tracking-widest uppercase">Collections</h2>
                <p className="text-[13px] text-secondary mt-1.5 font-medium opacity-60">Architect your content grid</p>
              </div>
              
              <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 gap-2 custom-scrollbar scroll-smooth relative z-10">
                {sectionKeys.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveSection(key)}
                    className={`group relative flex shrink-0 items-center overflow-hidden rounded-2xl px-6 py-4 text-[14px] font-semibold transition-all duration-500 border text-left active:scale-95 ${
                      activeSection === key
                        ? "text-white border-[#915EFF]/40 bg-[#915EFF]/10 shadow-[0_0_25px_rgba(145,94,255,0.1)]"
                        : "text-secondary border-transparent hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {activeSection === key && (
                      <motion.div 
                        layoutId="activeSidebarNav"
                        className="absolute inset-0 bg-gradient-to-r from-[#915EFF]/15 to-transparent"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 w-full flex justify-between items-center">
                      {adminSchema[key].title}
                      {activeSection === key && (
                        <HiOutlineChevronRight className="text-[#56ccf2] text-xl" />
                      )}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Manager Container */}
          <main className="flex-1 min-w-0 w-full">
            <div className={`${styles.glassCard} p-6 sm:p-12 transition-all duration-700 min-h-[700px] relative overflow-hidden`}>
              {/* Header inside Panel */}
              <div className="mb-12 flex items-center justify-between gap-8 pb-10 border-b border-white/5 relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 rounded-full bg-[#915EFF]/10 border border-[#915EFF]/20 text-[#c4a7ff] text-[11px] font-bold tracking-widest uppercase">
                      Current Node
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none">{activeTitle}</h3>
                </div>
                <div className="hidden md:flex h-16 w-16 shrink-0 rounded-2xl bg-white/5 items-center justify-center border border-white/10 shadow-inner text-3xl group hover:border-[#915EFF]/30 transition-all duration-500 relative overflow-hidden">
                   <div className="absolute inset-0 bg-[#915EFF]/5 group-hover:bg-[#915EFF]/10 transition-colors" />
                   <div className="relative z-10 group-hover:scale-110 transition-transform duration-500">
                    {adminSchema[activeSection].icon || "📝"}
                   </div>
                </div>
              </div>

              {/* Dynamic Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full relative z-10"
                >
                  <ContentManager section={activeSection} />
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
