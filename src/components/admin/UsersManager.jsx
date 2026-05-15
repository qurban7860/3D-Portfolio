import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineTrash, HiOutlineUserGroup, HiOutlineMail, HiOutlineCalendar, HiOutlineExternalLink } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import * as adminApi from "../../api/admin";
import { styles } from "../../styles";
import ConfirmDialog from "../common/ConfirmDialog";

const UsersManager = () => {
  const { token, user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDialog, setConfirmDialog] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminApi.fetchUsers(token);
      if (!data) throw new Error("Server returned an empty response.");
      setUsers(data);
    } catch (err) {
      console.error("Fetch Users Error:", err);
      setError(err.message || "Failed to synchronize user database.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setConfirmDialog(null);
    try {
      await adminApi.deleteUser(token, id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      setConfirmDialog({
        title: "Error!",
        message: err.message,
        confirmText: "OK",
        type: "error"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="h-12 w-12 border-4 border-[#915EFF]/20 border-t-[#915EFF] rounded-full animate-spin" />
        <p className="text-secondary font-black text-[13px] uppercase tracking-widest animate-pulse">Syncing User Database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {confirmDialog && (
        <ConfirmDialog
          isOpen={!!confirmDialog}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          cancelText={confirmDialog.cancelText}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog(null)}
        />
      )}

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-lg bg-[#915EFF]/10 border border-[#915EFF]/20 text-[#915EFF] text-[10px] font-black uppercase tracking-[0.2em]">
              Account Manager
            </span>
          </div>
          <h3 className="text-white font-black text-3xl sm:text-4xl tracking-tight leading-none uppercase">
            User Directory
          </h3>
          <p className="text-secondary text-[15px] mt-4 font-medium opacity-60 leading-relaxed max-w-xl">
            Oversee all registered accounts and maintain platform integrity.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1 max-w-2xl lg:justify-end">
          <div className="relative flex-1 group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#915EFF] transition-colors z-10">
              <HiOutlineUserGroup />
            </div>
            <input 
              type="text"
              placeholder="Search by username or email..."
              className={`${styles.glassInput} pl-12 py-3 text-sm`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="text-right">
              <p className="text-[9px] text-secondary font-black tracking-[0.2em] uppercase opacity-40">Total Users</p>
              <p className="text-2xl font-black text-white leading-tight">{users.length}</p>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <HiOutlineUserGroup className="text-3xl text-[#915EFF]" />
          </div>
        </div>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm font-medium"
        >
          {error}
        </motion.div>
      )}

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {users
            .filter(u => 
              u.username?.toLowerCase().includes(searchTerm.toLowerCase()) || 
              u.email?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className={`${styles.glassCard} p-6 group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-secondary uppercase tracking-tighter">
                    ID: {user.id}
                 </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-5">
                <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#915EFF] to-[#56ccf2] flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg shadow-[#915EFF]/20">
                  {user.username?.[0].toUpperCase() || user.email[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h5 className="text-base sm:text-lg font-bold text-white truncate max-w-[120px] sm:max-w-none">{user.username || "Anonymous"}</h5>
                    {user.role === 'admin' && (
                        <span className="px-2 py-0.5 rounded-md bg-[#56ccf2]/10 border border-[#56ccf2]/20 text-[#56ccf2] text-[9px] sm:text-[10px] font-black uppercase tracking-tighter shadow-[0_0_10px_rgba(86,204,242,0.1)]">Admin</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-secondary text-[12px] sm:text-sm mt-1">
                    <HiOutlineMail className="shrink-0" />
                    <span className="truncate opacity-70 group-hover:opacity-100 transition-opacity">{user.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                 <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-[9px] sm:text-[10px] text-secondary font-bold uppercase tracking-widest mb-1 opacity-50">Portfolio</p>
                    <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${user.projectsCount > 0 ? 'bg-green-400' : 'bg-yellow-400'}`} />
                        <span className="text-white text-[12px] sm:text-sm font-bold">{user.projectsCount > 0 ? 'Active' : 'Empty'}</span>
                    </div>
                 </div>
                 <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-[9px] sm:text-[10px] text-secondary font-bold uppercase tracking-widest mb-1 opacity-50">Joined</p>
                    <div className="flex items-center gap-2 text-white text-[12px] sm:text-sm font-bold truncate">
                        <HiOutlineCalendar className="text-[#915EFF] shrink-0" />
                        <span className="truncate">{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                 </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-3">
                    <a 
                        href={`/${user.username}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[12px] font-bold text-[#56ccf2] hover:text-[#915EFF] transition-colors"
                    >
                        View Live Portfolio <HiOutlineExternalLink />
                    </a>
                </div>
                <div className="flex gap-2">
                    {user.id !== currentUser.id && (
                        <button
                            onClick={() => setConfirmDialog({
                                title: `Delete ${user.username}'s Portfolio`,
                                message: `Are you sure you want to delete this user? All their data will be permanently removed.`,
                                confirmText: "Yes, Delete It",
                                cancelText: "Cancel",
                                onConfirm: () => handleDelete(user.id),
                                type: "danger"
                            })} 
                            className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all active:scale-90"
                            title="Delete User"
                        >
                            <HiOutlineTrash />
                        </button>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UsersManager;
