import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ErrorMessage from "../../components/common/ErrorMessage";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error, loading, isAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState(null);

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
      setLocalError(err.message || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 selection:bg-[#915EFF]/30 relative overflow-hidden">
      {/* Premium Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#915EFF]/15 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#56ccf2]/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '2s' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[420px]"
      >
        <div 
          className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            background: "linear-gradient(145deg, rgba(145,94,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(145,94,255,0.25)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Inner ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#915EFF]/20 blur-3xl rounded-full pointer-events-none" />

          <div className="mb-8 text-center relative z-10">
            <div className="mx-auto mb-5 h-16 w-16 rounded-2xl bg-gradient-to-br from-[#915EFF] to-[#56ccf2] flex items-center justify-center text-white text-3xl shadow-[0_0_24px_rgba(145,94,255,0.4)] border border-white/20">
              🔒
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin <span className="text-gradient">Portal</span></h1>
            <p className="mt-2 text-secondary text-sm">Sign in to manage your portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {(localError || error) && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ErrorMessage message={localError || error} />
              </motion.div>
            )}
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#c4a7ff] ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@portfolio.local"
                  className="w-full rounded-xl bg-black-200/50 border border-white/10 px-5 py-4 text-white outline-none transition-all focus:border-[#915EFF]/50 focus:bg-[#915EFF]/5 focus:ring-4 focus:ring-[#915EFF]/10 placeholder:text-white/20 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#c4a7ff] ml-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-black-200/50 border border-white/10 px-5 py-4 text-white outline-none transition-all focus:border-[#915EFF]/50 focus:bg-[#915EFF]/5 focus:ring-4 focus:ring-[#915EFF]/10 placeholder:text-white/20 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#915EFF] to-[#56ccf2] px-6 py-4 font-bold text-white shadow-[0_8px_24px_rgba(145,94,255,0.3)] transition-all hover:shadow-[0_12px_32px_rgba(145,94,255,0.4)] hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                "Secure Login"
              )}
            </button>
            
            <button 
              type="button" 
              onClick={() => navigate("/")}
              className="w-full text-center text-xs text-secondary hover:text-[#915EFF] transition-colors py-2 font-medium"
            >
              ← Back to Portfolio
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
