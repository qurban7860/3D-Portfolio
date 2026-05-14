import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styles } from "../../styles";
import { getIcon } from "../../utils/iconMapping";
import { resolveAssetUrl } from "../../utils/assetResolver";

const formatFormValue = (field, value) => {
  if (field.name === "tags") {
    return Array.isArray(value) ? value.map((tag) => tag.name).join(", ") : String(value || "");
  }
  if (field.name === "points" || field.name === "features") {
    return Array.isArray(value) ? value.join("\n") : String(value || "");
  }
  if (field.type === "checkbox") {
    return !!value;
  }
  return value ?? "";
};

const ItemForm = ({ schema, initialData, isSaving, onSubmit, onCancel, onUpload, uploading }) => {
  const [formState, setFormState] = useState({});

  useEffect(() => {
    const defaults = schema.fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue ?? (field.type === "checkbox" ? false : "");
      return acc;
    }, {});

    if (initialData) {
      const mapped = schema.fields.reduce((acc, field) => {
        acc[field.name] = formatFormValue(field, initialData[field.name]);
        return acc;
      }, {});
      setFormState(mapped);
    } else {
      setFormState(defaults);
    }
  }, [schema, initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formState);
  };

  return (
    <div className="p-6 sm:p-12 md:p-16 relative overflow-hidden bg-[#050816] rounded-[2rem] sm:rounded-[2.5rem] border border-white/5">
      {/* ── Immersive Effects ── */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#915EFF]/10 rounded-full blur-[140px] pointer-events-none -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#56ccf2]/5 rounded-full blur-[120px] pointer-events-none -ml-48 -mb-48" />

      <div className="mb-12 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-lg bg-[#915EFF]/10 border border-[#915EFF]/20 text-[#915EFF] text-[10px] font-black uppercase tracking-[0.2em]">
            Content Manager
          </span>
        </div>
        <h3 className="text-white font-black text-3xl sm:text-4xl tracking-tight leading-none uppercase">
          {initialData ? "Update Entry" : "Create New"}
        </h3>
        <p className="text-secondary text-[15px] mt-4 font-medium opacity-60 leading-relaxed max-w-xl">Configure your content with precision to maintain a professional portfolio presence.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
        <div className="grid gap-x-10 gap-y-10 grid-cols-1 md:grid-cols-2">
          {schema.fields.map((field) => (
            <div 
              key={field.name} 
              className={`${
                field.type === "textarea" || 
                field.name === "description" || 
                field.name === "summary" || 
                field.name === "points" || 
                field.name === "features" || 
                field.name === "tags" ||
                schema.fields.length === 1
                  ? "md:col-span-2" 
                  : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3 ml-1">
                <label className="text-[12px] font-black text-white/50 uppercase tracking-[0.15em]">
                  {field.label} {field.required && <span className="text-[#915EFF] ml-1">*</span>}
                </label>
              </div>
              
              {field.type === "textarea" ? (
                <div className="relative group/field">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#915EFF] to-[#56ccf2] rounded-2xl blur opacity-0 group-focus-within/field:opacity-20 transition duration-500" />
                  <textarea
                    name={field.name}
                    value={formState[field.name] ?? ""}
                    onChange={handleChange}
                    rows={field.name === "points" || field.name === "features" ? 8 : 5}
                    required={field.required}
                    placeholder={`Enter ${field.label.toLowerCase()} content...`}
                    className={`${styles.glassInput} resize-none custom-scrollbar relative z-10`}
                  />
                </div>
              ) : field.type === "checkbox" ? (
                <div 
                  className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.03] border border-white/10 px-6 h-[68px] transition-all duration-500 hover:bg-white/[0.08] group hover:border-[#915EFF]/40 cursor-pointer relative overflow-hidden" 
                  onClick={() => handleChange({ target: { name: field.name, type: 'checkbox', checked: !formState[field.name] }})}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#915EFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[14px] font-bold text-white/70 group-hover:text-white transition-colors relative z-10">{field.label}</span>
                  
                  <div className="relative inline-flex items-center cursor-pointer z-10">
                    <div className={`w-12 h-6 rounded-full transition-all duration-500 ${formState[field.name] ? 'bg-[#915EFF]' : 'bg-white/10'}`}>
                      <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all duration-500 shadow-lg ${formState[field.name] ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative group/field">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#915EFF] to-[#56ccf2] rounded-2xl blur opacity-0 group-focus-within/field:opacity-20 transition duration-500" />
                  <input
                    type={field.type === "number" ? "number" : "text"}
                    name={field.name}
                    value={formState[field.name] ?? ""}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                    className={`${styles.glassInput} relative z-10 ${
                      (field.name === "icon" || field.name.toLowerCase().includes("iconurl") || field.name.toLowerCase().includes("imageurl")) ? "pr-16" : ""
                    }`}
                  />
                  
                  {(field.name === "icon" || field.name.toLowerCase().includes("iconurl") || field.name.toLowerCase().includes("imageurl")) && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-lg overflow-hidden z-20">
                      {field.name === "icon" ? (
                        (() => {
                          const Icon = getIcon(formState[field.name]);
                          return Icon ? (
                            <div className="text-2xl text-[#915EFF] animate-in fade-in zoom-in duration-300">
                              <Icon />
                            </div>
                          ) : (
                            <span className="text-[10px] text-white/20 font-bold">NONE</span>
                          );
                        })()
                      ) : (
                        <img 
                          src={resolveAssetUrl(formState[field.name])} 
                          alt="preview"
                          className="w-full h-full object-contain p-1"
                          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                        />
                      )}
                      {!(field.name === "icon") && (
                        <div className="hidden absolute inset-0 items-center justify-center bg-white/5 text-[10px] text-white/20 font-bold uppercase">
                          NA
                        </div>
                      )}
                    </div>
                  )}
                  
                  {field.name === "icon" && (
                    <div className="mt-2 text-[11px] text-white/30 italic px-2">
                      Tip: Use React Icons names (e.g., SiReact, FaGithub, MdEmail)
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {schema.fields.some((f) => f.name.toLowerCase().includes("url") || f.name === "icon") && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 transition-all hover:bg-white/[0.04] group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#915EFF]/5 blur-3xl pointer-events-none" />
             
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col gap-1">
                <h4 className="text-white font-black text-[13px] uppercase tracking-[0.2em] flex items-center gap-3">
                  Asset Management
                </h4>
                <p className="text-secondary text-[11px] font-medium opacity-40 uppercase tracking-widest">Global Asset Optimization</p>
              </div>
              {uploading && (
                <div className="flex items-center gap-3 text-[#56ccf2] text-[11px] font-bold tracking-widest uppercase">
                  <div className="h-2 w-2 rounded-full bg-[#56ccf2] animate-ping shadow-[0_0_10px_#56ccf2]" />
                  Syncing
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  const targetField = schema.fields.find(f => 
                    f.name === "imageUrl" || f.name === "iconUrl" || f.name === "icon"
                  )?.name || "imageUrl";
                  
                  const url = await onUpload(targetField, file);
                  if (url) {
                    setFormState(prev => ({ ...prev, [targetField]: url }));
                  }
                }}
                className="hidden"
                id="admin-file-upload"
              />
              <label 
                htmlFor="admin-file-upload"
                className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-4 rounded-2xl bg-white/5 px-10 py-5 text-[14px] font-black text-white transition-all hover:bg-white/10 border border-white/10 active:scale-95 shadow-2xl hover:border-[#915EFF]/40"
              >
                <span className="text-xl">📁</span>
                <span>{uploading ? "Syncing..." : "Choose File"}</span>
              </label>
              <p className="text-[12px] text-secondary/40 font-medium italic text-center sm:text-left leading-relaxed">System handles automatic compression and edge distribution.</p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-5 pt-10 border-t border-white/5 mt-10">
          <button
            type="submit"
            disabled={isSaving}
            className={`${styles.glassButtonPremium} flex-1 px-10 py-6 text-[15px] font-black active:scale-[0.98] shadow-2xl`}
          >
            {isSaving ? (
              <div className="flex items-center justify-center gap-3">
                <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Saving Changes...</span>
              </div>
            ) : initialData ? "Save Changes" : "Create Entry"}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-10 py-6 text-white/40 font-black text-[14px] uppercase tracking-widest hover:text-white transition-all active:scale-[0.98] border border-white/10 rounded-2xl hover:bg-white/5"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

ItemForm.propTypes = {
  schema: PropTypes.object.isRequired,
  initialData: PropTypes.object,
  isSaving: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  uploading: PropTypes.bool,
};

export default ItemForm;
