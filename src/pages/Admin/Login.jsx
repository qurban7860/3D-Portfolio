import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLockClosed, HiOutlineUser, HiOutlineEye, HiOutlineEyeOff, HiOutlineShieldCheck } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { StarsCanvas } from "../../components";
import { Tilt } from "react-tilt";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error, loading, isAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError(null);

    try {
      await login(credentials);
      navigate("/admin", { replace: true });
    } catch (err) {
      setLocalError(err.message || "Invalid credentials. Authorization denied.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6 selection:bg-[#915EFF]/30 relative overflow-hidden">
      {/* ── Immersive Background ── */}
      <div className="fixed inset-0 z-0">
        <StarsCanvas />
        <div className="light-beam light-beam-1" />
        <div className="light-beam light-beam-2" />
        <div className="light-beam light-beam-3" />
      </div>

      {/* Premium Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#915EFF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#56ccf2]/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <Tilt options={{ max: 10, scale: 1.01, speed: 400 }}>
          <div 
            className="rounded-[2.5rem] p-10 sm:p-12 relative overflow-hidden premium-glass-card shadow-2xl group"
          >
            {/* Inner ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#915EFF]/20 blur-3xl rounded-full pointer-events-none" />

            <div className="mb-10 text-center relative z-10">
              <div className="mx-auto mb-6 h-20 w-20 rounded-[2rem] bg-gradient-to-br from-[#915EFF] to-[#56ccf2] flex items-center justify-center text-white text-4xl shadow-[0_0_30px_rgba(145,94,255,0.4)] border border-white/20 group-hover:rotate-[10deg] transition-transform duration-700">
                <HiOutlineShieldCheck />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tight leading-none">Admin <span className="text-gradient">Gate</span></h1>
              <p className="mt-4 text-secondary text-[13px] font-black uppercase tracking-[0.2em] opacity-60">Authorization Required</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              {(localError || error) && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
                    {localError || error}
                  </div>
                </motion.div>
              )}
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#c4a7ff] ml-1 opacity-80">Access ID</label>
                  <div className="relative group/input">
                    <HiOutlineUser className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[#915EFF] transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter ID..."
                      className="w-full rounded-2xl bg-white/[0.03] border border-white/10 pl-14 pr-6 py-5 text-white outline-none transition-all focus:border-[#915EFF]/50 focus:bg-[#915EFF]/5 focus:ring-1 focus:ring-[#915EFF]/30 placeholder:text-white/10 text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#c4a7ff] ml-1 opacity-80">Security Token</label>
                  <div className="relative group/input">
                    <HiOutlineLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[#915EFF] transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full rounded-2xl bg-white/[0.03] border border-white/10 pl-14 pr-14 py-5 text-white outline-none transition-all focus:border-[#915EFF]/50 focus:bg-[#915EFF]/5 focus:ring-1 focus:ring-[#915EFF]/30 placeholder:text-white/10 text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`${styles.glassButtonPremium} w-full py-5 text-[14px] font-black uppercase tracking-[0.2em] shadow-2xl active:scale-[0.98] transition-transform`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    <span>Syncing...</span>
                  </div>
                ) : (
                  "Initiate Access"
                )}
              </button>
              
              <button 
                type="button" 
                onClick={() => navigate("/")}
                className="w-full text-center text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40 hover:text-[#915EFF] transition-all py-2"
              >
                ← Return to Terminal
              </button>
            </form>
          </div>
        </Tilt>
      </motion.div>
    </div>
  );
};

export default LoginPage;
