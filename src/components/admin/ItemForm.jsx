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
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h3 className="text-white font-extrabold text-2xl sm:text-3xl tracking-tight">
          {initialData ? `Edit ${schema.label}` : `Add New ${schema.label}`}
        </h3>
        <p className="text-secondary text-sm mt-2">Fill out the details below to update your collection.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-x-6 gap-y-6 grid-cols-1 md:grid-cols-2">
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
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#c4a7ff] mb-2 ml-1">
                {field.label} {field.required && <span className="text-[#56ccf2]">*</span>}
              </label>
              
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formState[field.name] ?? ""}
                  onChange={handleChange}
                  rows={field.name === "points" || field.name === "features" ? 6 : 4}
                  required={field.required}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  className="w-full rounded-2xl bg-black-200/40 border border-white/10 px-5 py-4 text-sm text-white outline-none transition-all focus:border-[#915EFF]/50 focus:bg-[#915EFF]/5 focus:ring-4 focus:ring-[#915EFF]/10 placeholder:text-white/20 resize-none custom-scrollbar"
                />
              ) : field.type === "checkbox" ? (
                <div className="flex items-center gap-3 rounded-2xl bg-black-200/40 border border-white/10 px-5 h-[54px] transition-all hover:bg-white/5">
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
                  className="w-full rounded-2xl bg-black-200/40 border border-white/10 px-5 py-4 text-sm text-white outline-none transition-all focus:border-[#915EFF]/50 focus:bg-[#915EFF]/5 focus:ring-4 focus:ring-[#915EFF]/10 placeholder:text-white/20"
                />
              )}
            </div>
          ))}
        </div>

        {schema.fields.some((f) => f.name.toLowerCase().includes("url") || f.name === "icon") && (
          <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-5 sm:p-6 transition-all hover:bg-white/10 group">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold flex items-center gap-2 text-sm">
                <span className="text-xl">🖼️</span> Media Upload
              </h4>
              {uploading && (
                <div className="flex items-center gap-2 text-[#56ccf2] text-[10px] font-bold uppercase tracking-widest">
                  <div className="h-2 w-2 rounded-full bg-[#56ccf2] animate-ping" />
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
                className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/20 active:scale-95 border border-white/5 group-hover:border-white/20"
              >
                <span className="text-lg">📁</span>
                <span>{uploading ? "Uploading..." : "Select Asset"}</span>
              </label>
              <p className="text-xs text-secondary/70 italic text-center sm:text-left">Max 2MB. Square ratio recommended for icons.</p>
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-6 border-t border-white/10 mt-8">
          <button
            type="submit"
            disabled={isSaving}
            className={`${styles.glassButtonPremium} flex-1 px-6 py-4 text-sm`}
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </div>
            ) : initialData ? "Save Changes" : "Create Entry"}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-transparent px-8 py-4 text-white font-bold transition-all hover:bg-white/5 active:scale-95 text-sm"
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
