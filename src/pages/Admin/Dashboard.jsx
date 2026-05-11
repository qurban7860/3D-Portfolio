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
        <header className="flex flex-col gap-8 rounded-[2.5rem] premium-glass-card p-6 sm:p-10 shadow-2xl lg:flex-row lg:items-center lg:justify-between transition-all duration-500 group">
          <div className="space-y-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.6)]" />
              <p className="text-[11px] uppercase tracking-[0.4em] font-black text-green-400">System Core Online</p>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
              Control <span className="text-gradient">Center</span>
            </h1>
            <p className="max-w-md text-secondary text-sm font-medium leading-relaxed mt-3 opacity-60">
              Manage your professional portfolio with precision and architectural excellence.
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            {/* User Profile Badge */}
            <div className="flex items-center gap-4 rounded-2xl premium-glass px-5 py-3 w-fit border-white/5 group-hover:border-[#915EFF]/20 transition-all duration-500">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#915EFF] to-[#56ccf2] flex items-center justify-center text-white font-black text-sm shadow-[0_0_20px_rgba(145,94,255,0.3)] group-hover:scale-105 transition-transform">
                {user?.email?.[0].toUpperCase() || "A"}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-black text-[14px] leading-none truncate max-w-[180px]">{user?.email}</span>
                <span className="text-[10px] text-[#56ccf2] mt-1.5 uppercase tracking-[0.2em] font-black opacity-80">Administrator</span>
              </div>
            </div>
            
            {/* Action Buttons - Removed Ripple Effects */}
            <div className="flex gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="group flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-[13px] font-black uppercase tracking-widest text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                <span>Live Site</span>
                <HiOutlineExternalLink className="text-secondary group-hover:text-[#56ccf2] transition-colors" />
              </button>
              <button
                type="button"
                onClick={() => logout()}
                className={`${styles.glassButtonPremium} px-8 py-3 text-[13px] flex items-center gap-3 shadow-xl`}
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
            <div className="rounded-[2.5rem] premium-glass-card p-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="mb-8 px-2 relative z-10">
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#c4a7ff]">Collections</h2>
                <p className="text-[12px] text-secondary mt-1.5 font-medium opacity-60">Architect your content grid</p>
              </div>
              
              <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 gap-3 custom-scrollbar scroll-smooth relative z-10">
                {sectionKeys.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveSection(key)}
                    className={`group relative flex shrink-0 items-center overflow-hidden rounded-[1.25rem] px-6 py-5 text-[13px] font-black uppercase tracking-widest transition-all duration-500 border text-left ${
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
            <div className="rounded-[2.5rem] premium-glass-card p-6 sm:p-12 shadow-2xl transition-all duration-700 hover:border-white/20 min-h-[700px] relative overflow-hidden">
              {/* Header inside Panel */}
              <div className="mb-12 flex items-center justify-between gap-8 pb-10 border-b border-white/5 relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 rounded-full bg-[#915EFF]/10 border border-[#915EFF]/20 text-[#c4a7ff] text-[10px] font-black uppercase tracking-[0.3em]">
                      Collection Node
                    </span>
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">{activeTitle}</h3>
                </div>
                <div className="hidden md:flex h-20 w-20 shrink-0 rounded-[2rem] bg-gradient-to-br from-[#915EFF]/10 to-[#56ccf2]/5 items-center justify-center border border-white/10 shadow-inner text-4xl group hover:rotate-[10deg] transition-transform duration-500">
                  {adminSchema[activeSection].icon || "📝"}
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
