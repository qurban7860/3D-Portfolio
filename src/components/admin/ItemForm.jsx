import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styles } from "../../styles";

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
    <div className="p-8 sm:p-12 relative overflow-hidden">
      {/* Background glow for form */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#915EFF]/5 to-transparent pointer-events-none" />

      <div className="mb-10 relative z-10">
        <h3 className="text-white font-black text-3xl sm:text-4xl tracking-tight leading-none">
          {initialData ? "Refine Entry" : "New Node"}
        </h3>
        <p className="text-secondary text-sm mt-3 font-medium opacity-60">Architect your collection with precise metadata.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        <div className="grid gap-x-8 gap-y-8 grid-cols-1 md:grid-cols-2">
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
              <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-[#c4a7ff] mb-3 ml-1 opacity-80">
                {field.label} {field.required && <span className="text-[#56ccf2]">*</span>}
              </label>
              
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formState[field.name] ?? ""}
                  onChange={handleChange}
                  rows={field.name === "points" || field.name === "features" ? 8 : 5}
                  required={field.required}
                  placeholder={`Enter ${field.label.toLowerCase()} content...`}
                  className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-6 py-5 text-sm text-white outline-none transition-all focus:border-[#915EFF]/50 focus:bg-[#915EFF]/5 focus:ring-1 focus:ring-[#915EFF]/30 placeholder:text-white/10 resize-none custom-scrollbar font-medium"
                />
              ) : field.type === "checkbox" ? (
                <div className="flex items-center gap-4 rounded-2xl bg-white/[0.03] border border-white/10 px-6 h-[64px] transition-all hover:bg-white/5 group">
                  <div className="relative flex items-center">
                    <input
                      id={`checkbox-${field.name}`}
                      name={field.name}
                      type="checkbox"
                      checked={Boolean(formState[field.name])}
                      onChange={handleChange}
                      className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border border-white/20 bg-white/5 transition-all checked:bg-[#915EFF] checked:border-transparent focus:outline-none"
                    />
                    <svg className="absolute h-4 w-4 pointer-events-none hidden peer-checked:block left-[4px] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[14px] font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">{field.label}</span>
                </div>
              ) : (
                <input
                  type={field.type === "number" ? "number" : "text"}
                  name={field.name}
                  value={formState[field.name] ?? ""}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-6 py-5 text-sm text-white outline-none transition-all focus:border-[#915EFF]/50 focus:bg-[#915EFF]/5 focus:ring-1 focus:ring-[#915EFF]/30 placeholder:text-white/10 font-medium"
                />
              )}
            </div>
          ))}
        </div>

        {schema.fields.some((f) => f.name.toLowerCase().includes("url") || f.name === "icon") && (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-6 sm:p-8 transition-all hover:bg-white/[0.05] group">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-white font-black text-[12px] uppercase tracking-[0.3em] flex items-center gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform">🖼️</span> Media Stream
              </h4>
              {uploading && (
                <div className="flex items-center gap-3 text-[#56ccf2] text-[10px] font-black uppercase tracking-[0.2em]">
                  <div className="h-2 w-2 rounded-full bg-[#56ccf2] animate-ping" />
                  Syncing Asset...
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5 items-center">
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
                className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-white/5 px-8 py-4 text-[13px] font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 border border-white/10 active:scale-95 shadow-xl"
              >
                <span className="text-xl">📁</span>
                <span>{uploading ? "Syncing..." : "Select Resource"}</span>
              </label>
              <p className="text-[11px] text-secondary/40 font-medium italic text-center sm:text-left">Max 2MB. Optimization recommended for high-performance delivery.</p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/5 mt-10">
          <button
            type="submit"
            disabled={isSaving}
            className={`${styles.glassButtonPremium} flex-1 px-8 py-5 text-[13px] uppercase tracking-widest font-black shadow-2xl active:scale-[0.98] transition-transform`}
          >
            {isSaving ? (
              <div className="flex items-center justify-center gap-3">
                <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Committing...</span>
              </div>
            ) : initialData ? "Commit Updates" : "Initialize Entry"}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-white font-black uppercase tracking-widest text-[13px] transition-all hover:bg-white/10 active:scale-[0.98] shadow-xl"
          >
            Abort
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
