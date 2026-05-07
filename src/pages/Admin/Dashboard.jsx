import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ContentManager from "../../components/admin/ContentManager";
import { adminSchema } from "../../constants/adminSchema";
import { motion, AnimatePresence } from "framer-motion";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const sectionKeys = useMemo(() => Object.keys(adminSchema), []);
  const [activeSection, setActiveSection] = useState(sectionKeys[0]);

  const activeTitle = adminSchema[activeSection].title;

  return (
    <div className="min-h-screen bg-[#050816] pb-16 selection:bg-[#915EFF]/30">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#915EFF] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#56ccf2] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-8 px-4 sm:px-6 pt-6 sm:pt-10">
        {/* Header Section */}
        <header className="flex flex-col gap-6 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/10 bg-black-100/60 backdrop-blur-xl p-4 sm:p-8 shadow-2xl shadow-black/50 lg:flex-row lg:items-center lg:justify-between transition-all duration-500 hover:border-white/20">
          <div className="space-y-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="h-2 w-2 rounded-full bg-[#915EFF] animate-pulse" />
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#915EFF]">Control Center</p>
            </motion.div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Admin <span className="text-gradient">Dashboard</span></h1>
            <p className="max-w-md text-secondary text-[11px] sm:text-sm leading-relaxed">
              Empower your portfolio. Manage your content and projects with ease.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex items-center gap-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 px-3 sm:px-4 py-2 w-fit">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-tr from-[#915EFF] to-[#56ccf2] flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#915EFF]/20">
                {user?.email?.[0].toUpperCase() || "A"}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-semibold text-[11px] sm:text-xs leading-none truncate max-w-[100px] sm:max-w-none">{user?.email}</span>
                <span className="text-[9px] sm:text-[10px] text-secondary mt-1 uppercase tracking-wider">Administrator</span>
              </div>
            </div>
            
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="group flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-sm font-medium text-white transition-all duration-300 hover:bg-white/10"
              >
                <span>Live View</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => logout()}
                className="flex-1 sm:flex-none rounded-xl bg-gradient-to-r from-[#915EFF] to-[#56ccf2] px-4 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-sm font-bold text-white shadow-lg shadow-[#915EFF]/20 transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-col gap-8">
          {/* Collection Navigation (Top-aligned for all devices) */}
          <aside className="w-full">
            <div className="rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-black-100/40 backdrop-blur-xl p-3 sm:p-5 shadow-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 px-2 gap-2">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Collections</h2>
                <div className="hidden sm:block h-px flex-1 bg-white/5 mx-4" />
                <p className="text-[10px] text-secondary/60 italic">Select a category to manage</p>
              </div>
              <nav className="flex flex-row overflow-x-auto pb-2 gap-2 custom-scrollbar scroll-smooth">
                {sectionKeys.map((key, index) => (
                  <motion.button
                    key={key}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    type="button"
                    onClick={() => setActiveSection(key)}
                    className={`group relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold transition-all duration-300 border ${
                      activeSection === key
                        ? "text-white border-[#915EFF]/50 bg-[#915EFF]/10 shadow-lg shadow-[#915EFF]/10"
                        : "text-secondary border-white/5 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {activeSection === key && (
                      <motion.div 
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-b from-[#915EFF]/10 to-transparent"
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">{adminSchema[key].title}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Editor Section */}
          <main className="min-w-0 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/10 bg-black-100/60 backdrop-blur-xl p-4 sm:p-10 shadow-2xl transition-all duration-500 hover:border-white/20">
            <div className="mb-8 sm:mb-12 flex items-center justify-between gap-6">
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#915EFF]" />
                  <span className="text-[10px] font-bold text-[#915EFF] uppercase tracking-[0.3em]">Editor Active</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight truncate">{activeTitle}</h3>
                <p className="mt-2 text-xs sm:text-base text-secondary truncate">Manage your professional {activeTitle.toLowerCase()} presence.</p>
              </div>
              <div className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 rounded-2xl sm:rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                <span className="text-2xl sm:text-4xl">📦</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full"
              >
                <ContentManager section={activeSection} />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
