import { useState, useEffect } from "react";
import PropTypes from "prop-types";

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
    const success = await onSubmit(formState);
    
    // Clear form if it was a new entry and submission was successful
    if (success && !initialData) {
      const defaults = schema.fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue ?? (field.type === "checkbox" ? false : "");
        return acc;
      }, {});
      setFormState(defaults);
    }
  };

  return (
    <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-tertiary/40 border border-white/5 p-5 sm:p-8 backdrop-blur-md">
      <h3 className="text-white font-bold text-xl sm:text-2xl mb-6">
        {initialData ? `Edit ${schema.label}` : `Add New ${schema.label}`}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-x-6 gap-y-5 grid-cols-1 md:grid-cols-2">
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
              <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-secondary mb-2 ml-1">
                {field.label} {field.required && <span className="text-[#915EFF]">*</span>}
              </label>
              
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formState[field.name] ?? ""}
                  onChange={handleChange}
                  rows={field.name === "points" || field.name === "features" ? 6 : 4}
                  required={field.required}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-black-200/50 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-white outline-none transition-all focus:border-[#915EFF] focus:ring-4 focus:ring-[#915EFF]/10 placeholder:text-secondary/50 resize-none"
                />
              ) : field.type === "checkbox" ? (
                <div className="flex items-center gap-3 rounded-xl sm:rounded-2xl border border-white/10 bg-black-200/30 px-4 sm:px-5 py-3 sm:py-3.5 h-[52px] sm:h-[60px]">
                  <div className="relative flex items-center">
                    <input
                      id={`checkbox-${field.name}`}
                      name={field.name}
                      type="checkbox"
                      checked={Boolean(formState[field.name])}
                      onChange={handleChange}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/20 bg-white/5 transition-all checked:bg-[#915EFF] checked:border-transparent focus:outline-none"
                    />
                    <svg className="absolute h-3.5 w-3.5 pointer-events-none hidden peer-checked:block left-[3px] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-white">{field.label}</span>
                </div>
              ) : (
                <input
                  type={field.type === "number" ? "number" : "text"}
                  name={field.name}
                  value={formState[field.name] ?? ""}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-black-200/50 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-white outline-none transition-all focus:border-[#915EFF] focus:ring-4 focus:ring-[#915EFF]/10 placeholder:text-secondary/50"
                />
              )}
            </div>
          ))}
        </div>

        {schema.fields.some((f) => f.name.toLowerCase().includes("url") || f.name === "icon") && (
          <div className="rounded-[1.2rem] sm:rounded-[1.5rem] border border-dashed border-white/20 bg-white/5 p-4 sm:p-6 transition-all hover:bg-white/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold flex items-center gap-2 text-sm sm:text-base">
                <span className="text-xl">🖼️</span> Media Upload
              </h4>
              {uploading && (
                <div className="flex items-center gap-2 text-[#915EFF] text-[10px] font-bold uppercase tracking-widest">
                  <div className="h-2 w-2 rounded-full bg-[#915EFF] animate-ping" />
                  Uploading...
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  // Find the target field (usually imageUrl, iconUrl, or icon)
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
                className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-3 rounded-xl bg-white/10 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/20 active:scale-95 border border-white/5"
              >
                <span className="text-lg">📁</span>
                <span>{uploading ? "Uploading..." : "Upload Asset"}</span>
              </label>
              <p className="text-[10px] sm:text-xs text-secondary italic text-center sm:text-left">Recommended: Square Aspect Ratio, Max 2MB</p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#915EFF] to-[#56ccf2] px-6 sm:px-10 py-3 sm:py-4 text-white font-bold shadow-lg shadow-[#915EFF]/20 transition-all hover:scale-[1.02] hover:brightness-110 active:scale-95 disabled:opacity-50 text-sm sm:text-base"
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : initialData ? "Update Record" : "Create New Entry"}
          </button>
          
          {initialData && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold transition-all hover:bg-white/10 active:scale-95 text-sm sm:text-base"
            >
              Cancel Edit
            </button>
          )}
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
