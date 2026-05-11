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
    <div className="min-h-screen bg-primary pb-16 selection:bg-[#915EFF]/30 overflow-x-hidden">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarsCanvas />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#915EFF]/5 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#56ccf2]/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-6 sm:gap-8 px-4 sm:px-6 pt-6 sm:pt-10">
        {/* Header Section */}
        <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-black-100/40 backdrop-blur-xl p-5 sm:p-8 shadow-2xl lg:flex-row lg:items-center lg:justify-between transition-all duration-500">
          <div className="space-y-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-2"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
              <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-green-400">System Online</p>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="max-w-md text-secondary text-sm leading-relaxed mt-1">
              Premium content management system.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-2.5 w-fit backdrop-blur-md">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#915EFF] to-[#56ccf2] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(145,94,255,0.3)]">
                {user?.email?.[0].toUpperCase() || "A"}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-semibold text-sm leading-none truncate max-w-[150px]">{user?.email}</span>
                <span className="text-[10px] text-[#56ccf2] mt-1 uppercase tracking-wider font-bold">Administrator</span>
              </div>
            </div>
            
            <div className="flex gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                <span>Live Site</span>
                <HiOutlineExternalLink className="text-secondary group-hover:text-white transition-colors" />
              </button>
              <button
                type="button"
                onClick={() => logout()}
                className={`${styles.glassButtonPremium} px-6 py-2.5 text-sm flex items-center gap-2`}
              >
                <HiOutlineLogout />
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area - Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-8">
            <div className="rounded-3xl border border-[#915EFF]/20 bg-[#100d25]/60 backdrop-blur-2xl p-5 shadow-[0_8px_32px_rgba(145,94,255,0.05)]">
              <div className="mb-6 px-2">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#c4a7ff]">Collections</h2>
                <p className="text-[11px] text-secondary mt-1">Select a category to manage</p>
              </div>
              <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 gap-2 custom-scrollbar scroll-smooth">
                {sectionKeys.map((key, index) => (
                  <motion.button
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    type="button"
                    onClick={() => setActiveSection(key)}
                    className={`group relative flex shrink-0 items-center overflow-hidden rounded-xl px-5 py-4 text-sm font-bold transition-all duration-300 border text-left ${
                      activeSection === key
                        ? "text-white border-[#915EFF]/50 bg-[#915EFF]/15 shadow-[0_0_20px_rgba(145,94,255,0.15)]"
                        : "text-secondary border-transparent hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {activeSection === key && (
                      <motion.div 
                        layoutId="activeSidebarNav"
                        className="absolute inset-0 bg-gradient-to-r from-[#915EFF]/20 to-transparent"
                      />
                    )}
                    <span className="relative z-10 w-full flex justify-between items-center">
                      {adminSchema[key].title}
                      {activeSection === key && (
                        <HiOutlineChevronRight className="text-[#56ccf2] text-lg transition-transform group-hover:translate-x-1" />
                      )}
                    </span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Panel */}
          <main className="flex-1 min-w-0 w-full">
            <div className="rounded-3xl border border-white/10 bg-black-100/40 backdrop-blur-xl p-5 sm:p-8 shadow-2xl transition-all duration-500 hover:border-white/20 min-h-[600px]">
              <div className="mb-8 flex items-center justify-between gap-6 pb-6 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-[#915EFF]/10 border border-[#915EFF]/30 text-[#c4a7ff] text-[10px] font-bold uppercase tracking-widest">
                      Managing Collection
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{activeTitle}</h3>
                </div>
                <div className="hidden sm:flex h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br from-[#915EFF]/20 to-[#56ccf2]/10 items-center justify-center border border-white/10 shadow-inner text-3xl">
                  {adminSchema[activeSection].icon || "📝"}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full"
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
