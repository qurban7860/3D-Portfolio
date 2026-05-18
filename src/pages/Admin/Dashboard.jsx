import { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { HiOutlineCog, HiOutlineUserGroup, HiOutlineLogout, HiOutlineMenuAlt2, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineExternalLink, HiOutlineDuplicate, HiOutlineColorSwatch} from "react-icons/hi";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import ContentManager from "../../components/admin/ContentManager";
import SettingsManager from "../../components/admin/SettingsManager";
import UsersManager from "../../components/admin/UsersManager";
import ThemeManager from "../../components/admin/ThemeManager";
import { adminSchema } from "../../constants/adminSchema";
import { motion, AnimatePresence } from "framer-motion";

const NavItem = ({ icon, label, isActive, onClick, isCollapsed }) => (
  <button
    onClick={onClick}
    className={`w-full group relative flex items-center transition-all duration-500 rounded-xl ${
      isCollapsed ? "px-2.5 justify-center h-12" : "px-4 py-3 gap-3"
    } ${
      isActive 
        ? "text-white bg-[var(--accent)]/10 shadow-[inset_0_0_20px_var(--glow-color)] border border-[var(--accent)]/20" 
        : "text-secondary hover:text-white hover:bg-white/[0.04]"
    }`}
    title={isCollapsed ? label : ""}
  >
    {isActive && (
      <motion.div 
        layoutId="sidebarActiveIndicator"
        className={`absolute bg-[var(--accent)] rounded-full shadow-[0_0_15px_var(--glow-color)] ${
            isCollapsed ? "left-0 w-1 h-4 -translate-y-1/2" : "left-0 w-1.5 h-5"
        }`}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
    
    {/* Collapsed Active Glow */}
    {isCollapsed && isActive && (
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/20 to-transparent pointer-events-none blur-sm" />
    )}
    
    <div className={`text-lg transition-all duration-500 relative z-10 ${isActive ? "scale-110 text-[var(--secondary)]" : "group-hover:scale-110 opacity-60 group-hover:opacity-100"}`}>
      {icon}
    </div>
    
    {!isCollapsed && (
      <span className={`font-black text-[13px] tracking-tight transition-all duration-500 ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}`}>
        {label}
      </span>
    )}
    
    {!isCollapsed && isActive && (
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="ml-auto"
      >
        <HiOutlineChevronRight className="text-[12px] text-[var(--accent)] animate-pulse" />
      </motion.div>
    )}
    
    {/* Collapsed Active Glow */}
    {isCollapsed && isActive && (
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 to-transparent pointer-events-none" />
    )}
  </button>
);

NavItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool,
};

const DashboardPage = () => {
  const { logout, user } = useAuth();
  const sectionKeys = useMemo(() => Object.keys(adminSchema), []);
  const [activeSection, setActiveSection] = useState(sectionKeys[0]);
  const [isSettingsMode, setIsSettingsMode] = useState(false);
  const [isUsersMode, setIsUsersMode] = useState(false);
  const [isThemeMode, setIsThemeMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isAdmin = user?.role === "admin";
  
  useEffect(() => {
    if (isUsersMode && !isAdmin) {
      setIsUsersMode(false);
      setActiveSection(sectionKeys[0]);
    }
  }, [isUsersMode, isAdmin, sectionKeys]);

  const userPortfolioUrl = user?.username === "admin" ? "/" : `/${user?.username}`;

  const activeTitle = isSettingsMode 
    ? "General Settings" 
    : isUsersMode 
    ? "User Directory" 
    : isThemeMode
    ? "Theme Studio"
    : adminSchema[activeSection].title;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderSidebarContent = (isMobile = false) => (
    <div className="flex flex-col h-full overflow-hidden relative z-10">
        <div className={`p-5 pb-3 shrink-0 ${isCollapsed && !isMobile ? "items-center flex flex-col" : ""}`}>
            <div className={`flex items-center gap-3 mb-8 px-1 ${isCollapsed && !isMobile ? "justify-center" : ""}`}>
                <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_var(--glow-color)] transition-transform hover:scale-110 duration-500">
                    A
                </div>
                {(!isCollapsed || isMobile) && (
                  <div className="min-w-0">
                      <h2 className="text-white font-black text-[15px] tracking-tight leading-none uppercase truncate">
                         {isAdmin ? "Antigravity" : user?.username || "Portfolio"}
                      </h2>
                      <p className="text-[9px] text-[var(--secondary)] font-black tracking-[0.2em] mt-1 uppercase opacity-70">
                         {isAdmin ? "Admin Terminal" : "Dashboard"}
                      </p>
                  </div>
                )}
            </div>
            
            <div className="space-y-1">
                {(!isCollapsed || isMobile) && (
                  <p className="text-[9px] font-black text-secondary/30 uppercase tracking-[0.2em] px-3 mb-2">Core System</p>
                )}
                <NavItem 
                    icon={<HiOutlineCog />} 
                    label="Settings" 
                    isActive={isSettingsMode} 
                    onClick={() => { setIsSettingsMode(true); setIsUsersMode(false); setIsThemeMode(false); setIsMobileMenuOpen(false); }} 
                    isCollapsed={isCollapsed && !isMobile}
                />
                <NavItem 
                    icon={<HiOutlineColorSwatch />} 
                    label="Theme Studio" 
                    isActive={isThemeMode} 
                    onClick={() => { setIsThemeMode(true); setIsSettingsMode(false); setIsUsersMode(false); setIsMobileMenuOpen(false); }} 
                    isCollapsed={isCollapsed && !isMobile}
                />
                {isAdmin && (
                    <NavItem 
                        icon={<HiOutlineUserGroup />} 
                        label="Users" 
                        isActive={isUsersMode} 
                        onClick={() => { setIsUsersMode(true); setIsSettingsMode(false); setIsThemeMode(false); setIsMobileMenuOpen(false); }} 
                        isCollapsed={isCollapsed && !isMobile}
                    />
                )}
            </div>
        </div>

        <div className={`flex-1 overflow-y-auto custom-scrollbar py-3 ${isCollapsed && !isMobile ? "px-3" : "px-5"}`}>
 <div className="space-y-1">
                {sectionKeys.map((key) => (
                    <NavItem 
                        key={key}
                        icon={<span>{adminSchema[key].icon || "📝"}</span>}
                        label={adminSchema[key].title}
                        isActive={!isSettingsMode && !isUsersMode && activeSection === key}
                        onClick={() => {
                            setActiveSection(key);
                            setIsSettingsMode(false);
                            setIsUsersMode(false);
                            setIsThemeMode(false);
                            setIsMobileMenuOpen(false);
                        }}
                        isCollapsed={isCollapsed && !isMobile}
                    />
                ))}
            </div>
        </div>

        <div className="p-5 border-t border-white/5 space-y-4 shrink-0">
            {(!isCollapsed || isMobile) && (
              <div className="premium-glass-card glass-reflection inner-glow p-3 pb-0 rounded-2xl border border-white/5 group/share cursor-pointer hover:border-accent/30 transition-all duration-500 relative overflow-hidden"
                      onClick={() => {
                          const fullUrl = window.location.origin + userPortfolioUrl;
                          navigator.clipboard.writeText(fullUrl);
                          toast.success("Portfolio link copied to clipboard!", {
                            style: {
                              background: '#1a1c2c',
                              color: '#fff',
                              border: '1px solid rgba(var(--accent-rgb), 0.2)',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              borderRadius: '12px',
                            },
                            iconTheme: {
                              primary: 'var(--accent)',
                              secondary: '#fff',
                            },
                          });
                      }}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="flex items-center justify-between mb-3 relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-[var(--secondary)] shadow-[0_0_8px_var(--secondary)]" />
                        <p className="text-[10px] text-[var(--secondary)] font-black uppercase tracking-[0.2em] leading-none">Public Link</p>
                      </div>
                      <HiOutlineDuplicate className="text-secondary/40 group-hover:text-[var(--secondary)] text-sm transition-all group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col gap-1.5 relative z-10">
                    <p className="text-[11px] text-white/50 font-bold break-all leading-tight group-hover:text-white transition-colors">{window.location.origin + userPortfolioUrl}</p>
                    <span className="text-[8px] w-fit bg-[var(--accent)]/20 text-[var(--accent)] px-2 py-0.5 rounded-md font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Click to Copy</span>
                  </div>
              </div>
            )}

            <button
                onClick={() => logout()}
                className={`w-full flex items-center justify-center gap-2 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-400/80 font-black transition-all duration-500 uppercase tracking-widest ${
                  isCollapsed && !isMobile ? "h-12 px-0" : "px-4 py-3.5 text-[12px] hover:bg-red-500 hover:text-white"
                }`}
                title={isCollapsed && !isMobile ? "Sign Out" : ""}
            >
                <HiOutlineLogout className="text-lg" />
                {(!isCollapsed || isMobile) && <span>Sign Out</span>}
            </button>
        </div>
    </div>
  );

  return (
    <div className="h-screen bg-transparent selection:bg-[var(--accent)]/30 overflow-hidden relative flex">
      <aside 
        className={`hidden lg:flex h-full flex-col relative z-20 border-r border-white/10 bg-[var(--glass-bg)] backdrop-blur-3xl shrink-0 shadow-2xl transition-all duration-500 ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 z-30 h-6 w-6 rounded-full bg-[var(--card-bg)] border border-white/10 text-white flex items-center justify-center hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-xl"
        >
          {isCollapsed ? <HiOutlineChevronRight size={14} /> : <HiOutlineChevronLeft size={14} />}
        </button>
        
        {renderSidebarContent()}
      </aside>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute inset-0 bg-[var(--bg-primary)]/90 backdrop-blur-md"
            />
            <motion.aside 
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                className="absolute left-0 top-0 bottom-0 w-72 bg-[var(--glass-bg)] backdrop-blur-3xl border-r border-white/10 flex flex-col shadow-2xl"
            >
                {renderSidebarContent(true)}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <main className="flex-1 h-full min-w-0 relative z-10 flex flex-col">
        <header className="h-16 lg:h-20 border-b border-white/10 bg-[var(--glass-bg)] backdrop-blur-2xl px-6 lg:px-10 flex items-center justify-between shrink-0 shadow-lg relative z-20">
            <div className="flex items-center gap-4 lg:gap-6">
                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                >
                    <HiOutlineMenuAlt2 size={24} />
                </button>
                <div>
                    <h3 className="text-white font-black text-lg lg:text-xl tracking-tight leading-none uppercase">{activeTitle}</h3>
                    <div className="hidden sm:flex items-center gap-2 mt-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
                        <span className="text-[10px] text-secondary font-black uppercase tracking-[0.1em] opacity-40">System Active</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 lg:gap-6">
                <div className="flex items-center gap-3 lg:gap-4 bg-white/5 border border-white/10 px-3 lg:px-4 py-2 rounded-2xl hover:border-[var(--accent)]/40 transition-all group/user cursor-pointer hover:bg-white/[0.08]">
                    <div className="h-8 w-8 lg:h-9 lg:w-9 rounded-xl bg-gradient-to-tr from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center text-white font-black text-xs lg:text-sm shadow-lg group-hover/user:scale-105 transition-transform duration-500">
                        {user?.email?.[0].toUpperCase() || "A"}
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <span className="text-white font-bold text-[12px] leading-none truncate max-w-[120px] lg:max-w-[150px]">{user?.email}</span>
                        <span className="text-[9px] text-[var(--secondary)] font-black uppercase tracking-widest mt-1 opacity-60">{isAdmin ? "Super Admin" : "User Node"}</span>
                    </div>
                </div>
                
                <button
                    onClick={() => window.open(userPortfolioUrl, "_blank")}
                    className="h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center rounded-xl lg:rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-500 shadow-xl group"
                >
                    <HiOutlineExternalLink className="text-lg lg:text-xl group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
            <motion.div
                key={isSettingsMode ? "settings" : isUsersMode ? "users" : activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[1400px] mx-auto w-full"
            >
                <div className={`premium-glass-card glass-reflection inner-glow p-6 lg:p-10 min-h-[calc(100vh-220px)] relative overflow-hidden group`}>
                    <div className="relative z-10">
                        {isSettingsMode ? (
                            <SettingsManager />
                        ) : isThemeMode ? (
                            <ThemeManager />
                        ) : (isUsersMode && isAdmin) ? (
                            <UsersManager />
                        ) : (
                            <ContentManager section={activeSection} />
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
