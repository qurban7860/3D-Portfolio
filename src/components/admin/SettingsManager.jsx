import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchAdminSettings, updateAdminSetting } from "../../api/content";
import { adminSettingsSchema } from "../../constants/adminSchema";
import LoadingState from "../common/LoadingState";
import { toast } from "react-hot-toast";

const SettingsManager = () => {
  const { token } = useAuth();
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchAdminSettings(token);
      setSettings(response || {});
    } catch (err) {
      console.error(err);
      toast.error("Unable to load settings.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleUpdate = async (groupKey, fieldName, value) => {
    setIsSaving(true);
    try {
      const currentGroup = settings[groupKey] || {};
      const updatedGroup = { ...currentGroup, [fieldName]: value };
      
      await updateAdminSetting(groupKey, updatedGroup, token);
      
      setSettings(prev => ({
        ...prev,
        [groupKey]: updatedGroup
      }));
      toast.success(`${fieldName} updated successfully!`);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to update ${fieldName}.`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <LoadingState message="Syncing Global Configurations..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      {Object.entries(adminSettingsSchema).map(([groupKey, group]) => (
        <div key={groupKey} className="space-y-8">
          <div className="flex items-center gap-4">
            <h4 className="text-white font-black text-xl uppercase tracking-widest">{group.title}</h4>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
            {group.fields.map((field) => (
              <div 
                key={field.name}
                className={field.type === "textarea" ? "md:col-span-2" : ""}
              >
                <label className="text-[10px] sm:text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-2 sm:mb-3 block ml-1">
                  {field.label}
                </label>
                
                {field.type === "textarea" ? (
                  <textarea
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 py-4 text-white text-[13px] sm:text-[14px] focus:border-[#915EFF]/50 focus:bg-white/[0.05] outline-none transition-all resize-none min-h-[120px] sm:min-h-[140px]"
                    value={settings[groupKey]?.[field.name] ?? ""}
                    onChange={(e) => {
                       const val = e.target.value;
                       setSettings(prev => ({
                         ...prev,
                         [groupKey]: { ...prev[groupKey], [field.name]: val }
                       }));
                    }}
                    onBlur={(e) => handleUpdate(groupKey, field.name, e.target.value)}
                    placeholder={`Configure ${field.label.toLowerCase()}...`}
                  />
                ) : (
                  <input
                    type="text"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 py-4 text-white text-[13px] sm:text-[14px] focus:border-[#915EFF]/50 focus:bg-white/[0.05] outline-none transition-all"
                    value={settings[groupKey]?.[field.name] ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSettings(prev => ({
                        ...prev,
                        [groupKey]: { ...prev[groupKey], [field.name]: val }
                      }));
                    }}
                    onBlur={(e) => handleUpdate(groupKey, field.name, e.target.value)}
                    placeholder={`Set ${field.label.toLowerCase()}...`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {isSaving && (
        <div className="fixed bottom-10 right-10 z-[100] bg-[#915EFF] text-white px-6 py-3 rounded-full font-black text-[12px] uppercase tracking-widest shadow-2xl animate-pulse">
          Syncing Changes...
        </div>
      )}
    </div>
  );
};

export default SettingsManager;
