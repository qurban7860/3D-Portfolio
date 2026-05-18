import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineColorSwatch, 
  HiOutlineSave, 
  HiOutlineRefresh, 
  HiOutlineTrash, 
  HiOutlineEye,
  HiOutlineCheck,
  HiOutlineInformationCircle,
  HiOutlineSparkles,
  HiOutlineAdjustments,
  HiOutlineGlobeAlt,
  HiOutlineUser,
  HiOutlineDesktopComputer,
} from "react-icons/hi";
import { HexColorPicker } from "react-colorful";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { usePortfolio } from "../../context/PortfolioContext";
import { useTheme } from "../../context/ThemeContext";
import ConfirmDialog from "../common/ConfirmDialog";

const ThemeManager = () => {
  const { refreshPortfolio } = usePortfolio();
  const { activeTheme, setActiveTheme, defaultThemeConfig } = useTheme();
  
  const [themes, setThemes] = useState([]);
  const [editingTheme, setEditingTheme] = useState(null);
  const [tempConfig, setTempConfig] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("presets"); 
  const [activeColorKey, setActiveColorKey] = useState("accent");
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null });

  const fetchThemes = useCallback(async () => {
    try {
      const response = await fetch("/api/themes/admin", {
        headers: { Authorization: `Bearer ${localStorage.getItem("portfolio_token")}` }
      });
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || "Failed to load themes");
        return;
      }
      
      setThemes(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  // Initialize editing state
  useEffect(() => {
    if (activeTheme && !editingTheme) {
      setEditingTheme(activeTheme);
      setTempConfig(activeTheme.config);
    }
  }, [activeTheme, editingTheme]);

  const handleApplyTheme = async (theme) => {
    try {
      const response = await fetch(`/api/themes/admin/activate/${theme.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("portfolio_token")}` }
      });
      if (response.ok) {
        toast.success(`Theme "${theme.name}" applied successfully!`);
        setActiveTheme(theme);
        await refreshPortfolio();
        fetchThemes();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to apply theme");
      }
    } catch (err) {
      toast.error("Failed to apply theme");
    }
  };

  const handleSaveTheme = async () => {
    if (!tempConfig) return;
    setIsSaving(true);
    try {
      const isNew = !editingTheme?.id || editingTheme.id === 'default' || editingTheme.isPublic;
      const url = isNew ? "/api/themes/admin" : `/api/themes/admin/${editingTheme.id}`;
      const method = isNew ? "POST" : "PUT";
      
      const payload = {
        name: isNew ? `${editingTheme?.name || "Custom"} (Modified)` : editingTheme.name,
        config: tempConfig,
        isPublic: 0
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("portfolio_token")}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(isNew ? "New custom theme saved!" : "Theme changes saved!");
        
        const savedTheme = { ...payload, id: isNew ? data.id : editingTheme.id };
        
        // APPLY IMMEDIATELY
        await handleApplyTheme(savedTheme);
        setEditingTheme(savedTheme);
        fetchThemes();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to save theme");
      }
    } catch (err) {
      toast.error("Failed to save theme");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTheme = (id) => {
    setDeleteDialog({ isOpen: true, id });
  };

  const confirmDeleteTheme = async () => {
    const id = deleteDialog.id;
    setDeleteDialog({ isOpen: false, id: null });
    if (!id) return;
    try {
      const response = await fetch(`/api/themes/admin/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("portfolio_token")}` }
      });
      if (response.ok) {
        toast.success("Theme removed from gallery");
        fetchThemes();
        if (editingTheme?.id === id) {
          setEditingTheme(null);
          setTempConfig(defaultThemeConfig);
        }
      }
    } catch (err) {
      toast.error("Failed to delete theme");
    }
  };

  const updateConfig = (path, value) => {
    setTempConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      // Real-time Preview in context
      setActiveTheme({ ...editingTheme, config: newConfig });
      
      return newConfig;
    });
  };

  const livePreviewTheme = (theme) => {
     setEditingTheme(theme);
     setTempConfig(theme.config);
     setActiveTheme(theme);
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-accent/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-accent font-black tracking-[0.3em] uppercase text-[10px] animate-pulse">Initializing Studio...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-10 pb-32 max-w-7xl mx-auto">
      {/* ── Studio Header ── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[3rem] border border-[var(--glass-border)] p-10 sm:p-14 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] group"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] -ml-40 -mb-40" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 rounded-3xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shadow-2xl shadow-accent/20">
                 <HiOutlineSparkles className="text-3xl" />
               </div>
               <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-none">
                 Theme <span className="text-gradient">Studio</span>
               </h2>
            </div>
            <p className="text-secondary text-base sm:text-lg opacity-70 max-w-2xl mt-4 font-medium leading-relaxed">
              Design your portfolio&apos;s cinematic identity. Architect every glow, glass refraction, and color variable with production-grade precision.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button 
              onClick={() => { 
                const def = { name: "Default", config: defaultThemeConfig };
                livePreviewTheme(def);
                toast.success("UI Reset to Defaults");
              }}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[13px] font-black uppercase tracking-widest hover:bg-white/10 hover:border-white/30 transition-all active:scale-95 shadow-xl"
            >
              <HiOutlineRefresh className="text-lg group-hover:rotate-180 transition-transform duration-700" /> Reset
            </button>
            <button 
              disabled={isSaving}
              onClick={handleSaveTheme}
              className="flex items-center gap-4 px-10 py-4 rounded-2xl bg-accent text-white text-[13px] font-black uppercase tracking-widest hover:shadow-[0_0_40px_rgba(var(--accent-rgb),0.5)] transition-all active:scale-95 disabled:opacity-50 shadow-2xl"
            >
              <HiOutlineSave className="text-lg" /> {isSaving ? "Syncing..." : "Save Configuration"}
            </button>
          </div>
        </div>
      </motion.div>

      <ConfirmDialog 
        isOpen={deleteDialog.isOpen}
        title="Delete Design"
        message="Are you sure you want to permanently delete this design from your gallery? This action cannot be undone."
        onConfirm={confirmDeleteTheme}
        onCancel={() => setDeleteDialog({ isOpen: false, id: null })}
        type="danger"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* ── Control Sidebar ── */}
        <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-28">
          
          {/* Tab Navigation */}
          <div className="flex p-2 rounded-[2rem] bg-[var(--card-bg)] border border-[var(--glass-border)] backdrop-blur-[var(--glass-blur)] shadow-2xl">
            <button 
              onClick={() => setActiveTab("presets")}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === 'presets' ? 'bg-accent text-white shadow-2xl shadow-accent/20' : 'text-secondary/50 hover:text-white'}`}
            >
              <HiOutlineColorSwatch className="text-lg" /> Gallery
            </button>
            <button 
              onClick={() => setActiveTab("customize")}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === 'customize' ? 'bg-accent text-white shadow-2xl shadow-accent/20' : 'text-secondary/50 hover:text-white'}`}
            >
              <HiOutlineAdjustments className="text-lg" /> Lab
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "presets" ? (
              <motion.div 
                key="presets"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col gap-8"
              >
                {/* Global Presets */}
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3 px-4">
                     <HiOutlineGlobeAlt className="text-accent text-xl" />
                     <span className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary opacity-40">Architectural Presets</span>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {themes.filter(t => t.isPublic).map((theme) => (
                      <ThemeCard 
                        key={theme.id} 
                        theme={theme} 
                        isSelected={editingTheme?.id === theme.id}
                        isActive={activeTheme?.id === theme.id}
                        onSelect={() => livePreviewTheme(theme)}
                        onApply={() => handleApplyTheme(theme)}
                      />
                    ))}
                  </div>
                </div>

                {/* User Gallery */}
                {themes.some(t => !t.isPublic) && (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3 px-4">
                       <HiOutlineUser className="text-accent text-xl" />
                       <span className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary opacity-40">Your Archive</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {themes.filter(t => !t.isPublic).map((theme) => (
                        <ThemeCard 
                          key={theme.id} 
                          theme={theme} 
                          isSelected={editingTheme?.id === theme.id}
                          isActive={activeTheme?.id === theme.id}
                          onSelect={() => livePreviewTheme(theme)}
                          onApply={() => handleApplyTheme(theme)}
                          onDelete={() => handleDeleteTheme(theme.id)}
                          isCustom
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="customize"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-10 rounded-[3rem] border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] flex flex-col gap-12 shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
              >
                {/* Color Workspace */}
                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary opacity-50">Atmosphere Colors</span>
                    <div className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-[10px] font-black text-accent uppercase tracking-widest shadow-lg">{activeColorKey}</div>
                  </div>
                  
                  <div className="grid grid-cols-5 sm:grid-cols-5 gap-3 sm:gap-4">
                    {tempConfig && Object.keys(tempConfig.colors).filter(k => !['textPrimary', 'textSecondary'].includes(k)).map(key => (
                      <button
                        key={key}
                        onClick={() => setActiveColorKey(key)}
                        className={`aspect-square rounded-2xl border-2 transition-all duration-500 relative group overflow-hidden ${activeColorKey === key ? 'border-accent scale-115 shadow-2xl shadow-accent/40' : 'border-white/5 hover:border-white/30 hover:scale-105'}`}
                        style={{ backgroundColor: tempConfig.colors[key] }}
                        title={key}
                      >
                        {activeColorKey === key && (
                          <motion.div layoutId="colorCheck" className="absolute inset-0 flex items-center justify-center text-white text-xl mix-blend-difference">
                            <HiOutlineCheck />
                          </motion.div>
                        )}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                  
                  {tempConfig && (
                    <div className="mt-4 p-8 rounded-[2.5rem] bg-black/40 border border-white/5 shadow-inner group/picker">
                      <HexColorPicker 
                        color={tempConfig.colors[activeColorKey]} 
                        onChange={(color) => updateConfig(`colors.${activeColorKey}`, color)}
                        className="!w-full !h-60"
                      />
                      <div className="mt-8 flex items-center justify-between gap-6">
                         <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] opacity-40">Variable</span>
                            <span className="text-white text-sm font-bold font-mono tracking-tighter">{activeColorKey}</span>
                         </div>
                         <div className="relative group">
                           <input 
                             type="text" 
                             value={tempConfig.colors[activeColorKey]}
                             onChange={(e) => updateConfig(`colors.${activeColorKey}`, e.target.value)}
                             className="w-32 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono uppercase outline-none focus:border-accent focus:bg-white/10 transition-all text-center"
                           />
                         </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Glass & Surface Controls */}
                {tempConfig && (
                  <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-5">
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary opacity-50">Glass Refraction</span>
                          <span className="text-[10px] text-white/30 font-medium italic">Backdrop blur intensity</span>
                        </div>
                        <span className="text-xs text-accent font-black font-mono bg-accent/10 px-3 py-1.5 rounded-xl border border-accent/20">{tempConfig.glass.blur}</span>
                      </div>
                      <input 
                        type="range" min="0" max="64" step="2"
                        value={parseInt(tempConfig.glass.blur)}
                        onChange={(e) => updateConfig('glass.blur', `${e.target.value}px`)}
                        className="w-full accent-accent h-2 bg-white/5 rounded-full appearance-none cursor-pointer hover:bg-white/10 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-5">
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary opacity-50">Aura Intensity</span>
                          <span className="text-[10px] text-white/30 font-medium italic">Global glow radiance</span>
                        </div>
                        <span className="text-xs text-accent font-black font-mono bg-accent/10 px-3 py-1.5 rounded-xl border border-accent/20">{tempConfig.effects.glowIntensity}</span>
                      </div>
                      <input 
                        type="range" min="0" max="2" step="0.1"
                        value={tempConfig.effects.glowIntensity}
                        onChange={(e) => updateConfig('effects.glowIntensity', e.target.value)}
                        className="w-full accent-accent h-2 bg-white/5 rounded-full appearance-none cursor-pointer hover:bg-white/10 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4 p-6 rounded-[2rem] bg-accent/[0.03] border border-accent/10">
                   <HiOutlineInformationCircle className="text-accent text-2xl shrink-0 mt-0.5" />
                   <p className="text-[12px] text-secondary/60 leading-relaxed font-medium">
                     Broadcast adjustments are live in your session. <span className="text-white">Save Configuration</span> to persist these variables permanently.
                   </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Live Preview Space ── */}
        <div className="lg:col-span-7 flex flex-col gap-12">
           <div className="flex items-center gap-5">
              <HiOutlineDesktopComputer className="text-secondary opacity-30 text-2xl" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary opacity-40">Cinematic Interface Preview</span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
           </div>

           <div className="flex flex-col gap-12">
              {/* Complex Component Preview */}
              <div className="flex flex-col gap-5">
                 <span className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-30 ml-4">Advanced Layering Test</span>
                 <div className="p-6 sm:p-12 md:p-16 rounded-[2.5rem] sm:rounded-[4rem] border border-[var(--glass-border)] overflow-hidden relative shadow-[0_48px_96px_-24px_rgba(0,0,0,0.7)] bg-[var(--card-bg)] min-h-[500px] flex items-center justify-center">
                    {/* Dynamic Ambient Background */}
                    <div 
                      className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none transition-all duration-1000"
                      style={{ 
                        background: `radial-gradient(circle at 20% 20%, ${tempConfig?.colors.accent || '#915EFF'}44, transparent 40%), 
                                     radial-gradient(circle at 80% 80%, ${tempConfig?.colors.secondary || '#56ccf2'}33, transparent 50%)` 
                      }}
                    />
                    
                    <div className="relative z-10 w-full max-w-lg flex flex-col gap-10">
                       {/* Floating Premium Card */}
                       <motion.div 
                         animate={{ y: [0, -10, 0] }}
                         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                         className="premium-glass-card p-10 sm:p-12 border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] rounded-[3rem] flex flex-col gap-8 shadow-2xl relative group"
                       >
                          <div className="absolute -top-1 -left-1 -right-1 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                             <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform duration-500 shrink-0">🌌</div>
                             <div>
                                <h4 className="text-white text-2xl font-black tracking-tight group-hover:text-accent transition-colors">Spatial Layer</h4>
                                <p className="text-secondary text-sm font-medium opacity-60">Architectural Refraction Test.</p>
                             </div>
                          </div>
                          <div className="space-y-4">
                             <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                                <motion.div 
                                  initial={{ width: 0 }} 
                                  animate={{ width: '75%' }} 
                                  className="h-full bg-accent shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)]" 
                                />
                             </div>
                             <div className="h-2 w-5/6 bg-white/5 rounded-full opacity-40" />
                             <div className="h-2 w-3/5 bg-white/5 rounded-full opacity-20" />
                          </div>
                          <div className="flex justify-between items-center mt-4">
                             <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => (
                                  <div key={i} className="w-10 h-10 rounded-full border-2 border-black/40 bg-white/5 backdrop-blur-md shadow-xl" />
                                ))}
                             </div>
                             <button className="px-8 py-3 rounded-2xl bg-accent text-white text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-accent/30 hover:scale-105 active:scale-95 transition-all">Explore</button>
                          </div>
                       </motion.div>

                       {/* Stats Grid */}
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col items-center gap-2 group hover:bg-white/[0.04] transition-all">
                             <span className="text-3xl font-black text-white group-hover:scale-110 transition-transform">99.8%</span>
                             <span className="text-[10px] text-secondary uppercase font-black tracking-[0.3em] opacity-40">Precision</span>
                          </div>
                          <div className="p-8 rounded-[2.5rem] bg-accent/5 border border-accent/10 flex flex-col items-center gap-2 group hover:bg-accent/10 transition-all">
                             <span className="text-3xl font-black text-accent group-hover:scale-110 transition-transform">14ms</span>
                             <span className="text-[10px] text-accent uppercase font-black tracking-[0.3em] opacity-60">Response</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

const ThemeCard = ({ theme, isSelected, isActive, onSelect, onApply, onDelete, isCustom = false }) => {
  return (
    <div
      onClick={onSelect}
      className={`group relative flex flex-col p-6 rounded-[2.5rem] border transition-all duration-700 cursor-pointer overflow-hidden ${
        isSelected 
          ? "bg-[var(--glass-bg)] border-[var(--primary)] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-[var(--glass-blur)]" 
          : "bg-white/[0.03] border-white/5 hover:border-[var(--glass-border)] hover:bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)]"
      }`}
    >
      {/* Dynamic Aura */}
      <div 
        className="absolute -right-12 -top-12 w-32 h-32 rounded-full blur-[50px] opacity-10 group-hover:opacity-20 transition-all duration-1000 group-hover:scale-125"
        style={{ backgroundColor: theme.config.colors.accent }}
      />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-5">
          <div 
            className="w-14 h-14 rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
            style={{ background: `linear-gradient(135deg, ${theme.config.colors.accent}, ${theme.config.colors.secondary})` }}
          />
          <div className="flex flex-col gap-0.5">
            <h4 className="text-white text-lg font-black tracking-tight">{theme.name}</h4>
            <div className="flex items-center gap-3">
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg ${theme.isPublic ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'bg-accent/10 text-accent border border-accent/20'}`}>
                {theme.isPublic ? "Signature" : "Personal"}
              </span>
              {isActive && (
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-400 flex items-center gap-1.5 bg-green-400/5 px-2.5 py-1 rounded-lg border border-green-400/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {isSelected ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex items-center gap-3"
               >
                  {!isActive && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onApply(); }}
                      className="p-3 rounded-2xl bg-accent text-white hover:scale-110 active:scale-90 transition-all shadow-2xl shadow-accent/40 border border-accent/50"
                      title="Apply Theme"
                    >
                      <HiOutlineCheck className="text-2xl" />
                    </button>
                  )}
                  {isCustom && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDelete(); }}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 text-red-400 hover:bg-red-400/10 hover:border-red-400/30 transition-all active:scale-90 shadow-xl"
                      title="Delete Theme"
                    >
                      <HiOutlineTrash className="text-2xl" />
                    </button>
                  )}
               </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                 <HiOutlineEye className="text-secondary/40 text-2xl" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex gap-2 relative z-10 px-1">
         {Object.values(theme.config.colors).slice(0, 6).map((color, i) => (
           <div key={i} className="flex-1 h-1.5 rounded-full border border-black/20" style={{ backgroundColor: color }} />
         ))}
      </div>
    </div>
  );
};

ThemeCard.propTypes = {
  theme: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  isCustom: PropTypes.bool,
};

export default ThemeManager;
