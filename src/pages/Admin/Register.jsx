import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLockClosed, HiOutlineUser, HiOutlineMail, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import Logo from "../../components/common/Logo";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, error, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError(null);
    setIsSubmitting(true);

    try {
      await register(formData);
      navigate("/admin", { replace: true });
    } catch (err) {
      setLocalError(err.message || "Registration failed. Please check your details.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-6 selection:bg-[var(--accent)]/30 relative overflow-hidden">

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--secondary)]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <div className={`premium-glass-card glass-reflection inner-glow p-8 sm:p-10 relative overflow-hidden group border-white/10 hover:border-[var(--accent)]/30 transition-all duration-700 shadow-2xl`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[var(--accent)]/10 blur-3xl rounded-full pointer-events-none" />

          <div className="mb-8 text-center relative z-10">
            <div className="mx-auto mb-5 h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl group-hover:border-[var(--accent)]/40 transition-all duration-700 relative overflow-hidden active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--secondary)]/10" />
              <Logo className="w-8 h-8 relative z-10 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">Create Account</h1>
            <p className="mt-2 text-secondary text-[11px] font-bold tracking-widest uppercase opacity-40">Join the premium 3D network</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {(localError || error) && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[12px] font-bold text-center uppercase tracking-wider">
                  {localError || error}
                </div>
              </motion.div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2 group/input">
                <label className="text-[11px] font-black text-secondary/60 uppercase tracking-[0.2em] ml-2 group-focus-within/input:text-[var(--accent)] transition-colors">Username</label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[var(--accent)] transition-colors z-20" size={20} />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] rounded-2xl blur opacity-0 group-focus-within/input:opacity-20 transition duration-500" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="johndoe"
                    className={`${styles.glassInput} relative z-10 pl-16`}
                  />
                </div>
              </div>

              <div className="space-y-2 group/input">
                <label className="text-[11px] font-black text-secondary/60 uppercase tracking-[0.2em] ml-2 group-focus-within/input:text-[var(--accent)] transition-colors">Email Address</label>
                <div className="relative">
                  <HiOutlineMail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[var(--accent)] transition-colors z-20" size={20} />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] rounded-2xl blur opacity-0 group-focus-within/input:opacity-20 transition duration-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className={`${styles.glassInput} relative z-10 pl-16`}
                  />
                </div>
              </div>

              <div className="space-y-2 group/input">
                <label className="text-[11px] font-black text-secondary/60 uppercase tracking-[0.2em] ml-2 group-focus-within/input:text-[var(--accent)] transition-colors">Password</label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[var(--accent)] transition-colors z-20" size={20} />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] rounded-2xl blur opacity-0 group-focus-within/input:opacity-20 transition duration-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className={`${styles.glassInput} relative z-10 pl-16`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors z-30"
                  >
                    {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.glassButtonPremium} w-full py-4 text-[14px] font-black active:scale-[0.98] mt-2 uppercase tracking-[0.2em]`}
            >
              {isSubmitting ? "Processing..." : "Create Account"}
            </button>
            
            <div className="flex flex-col gap-3 mt-4 text-center">
              <button type="button" onClick={() => navigate("/admin/login")} className="text-[11px] font-black text-[var(--accent)] hover:text-[var(--secondary)] transition-all uppercase tracking-widest opacity-80">
                Already have an account? Sign In
              </button>
              <div className="h-[1px] w-12 bg-white/5 mx-auto" />
              <button type="button" onClick={() => navigate("/")} className="text-[11px] font-bold text-secondary/40 hover:text-white transition-all uppercase tracking-widest">
                ← Return to Portfolio
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
