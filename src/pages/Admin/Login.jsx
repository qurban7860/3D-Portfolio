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
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6 selection:bg-[#915EFF]/30">
      {/* Background blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden opacity-30">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#915EFF] blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#56ccf2] blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-[2.5rem] border border-white/10 bg-black-100/60 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl shadow-black/50">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-tr from-[#915EFF] to-[#56ccf2] flex items-center justify-center text-white text-3xl shadow-lg shadow-[#915EFF]/20">
              ⚙️
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin <span className="text-gradient">Access</span></h1>
            <p className="mt-2 text-secondary text-sm">Secure management portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {(localError || error) && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ErrorMessage message={localError || error} />
              </motion.div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#915EFF] ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@portfolio.local"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all focus:border-[#915EFF]/50 focus:bg-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#915EFF] ml-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all focus:border-[#915EFF]/50 focus:bg-white/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative group w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#915EFF] to-[#56ccf2] p-px font-bold text-white transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
            >
              <div className="relative rounded-2xl bg-black-100/10 px-6 py-4 transition-all group-hover:bg-transparent">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Authenticate"
                )}
              </div>
            </button>
            
            <button 
              type="button" 
              onClick={() => navigate("/")}
              className="w-full text-center text-xs text-secondary hover:text-white transition-colors py-2"
            >
              Back to Portfolio
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
