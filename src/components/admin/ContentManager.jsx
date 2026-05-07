import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import {
  createAdminItem,
  deleteAdminItem,
  fetchAdminItems,
  reorderAdminItems,
  updateAdminItem,
  uploadAdminAsset,
} from "../../api/content";
import { adminSchema } from "../../constants/adminSchema";
import LoadingState from "../common/LoadingState";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";
import { motion } from "framer-motion";

import { toast } from "react-hot-toast";
import ConfirmDialog from "../common/ConfirmDialog";

const transformFormValue = (field, value) => {
  if (field.type === "checkbox") {
    return !!value;
  }

  if (field.name === "tags") {
    return String(value)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((name) => ({ name, color: "blue-text-gradient" }));
  }

  if (field.name === "points" || field.name === "features") {
    return String(value)
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return value;
};

const ContentManager = ({ section }) => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Confirmation Dialog State
  const [confirmState, setConfirmState] = useState({ 
    isOpen: false, 
    id: null,
    title: "",
    message: "" 
  });

  const schema = adminSchema[section];

  const loadItems = useCallback(async (isInitial = false) => {
    if (isInitial) setIsLoading(true);
    try {
      const response = await fetchAdminItems(section, token);
      setItems(response || []);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Unable to load content.");
    } finally {
      if (isInitial) setIsLoading(false);
    }
  }, [section, token]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      loadItems(true);
    }
    return () => { isMounted = false; };
  }, [loadItems]);

  const handleUpload = async (fieldName, file) => {
    if (!file) return;
    setUploading(true);
    try {
      const response = await uploadAdminAsset(file, token);
      toast.success("Asset uploaded successfully!");
      return response.url;
    } catch (err) {
      toast.error(err.message || "Upload failed.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (formState) => {
    setIsSaving(true);

    try {
      const payload = Object.entries(formState).reduce((acc, [key, value]) => {
        const field = schema.fields.find((item) => item.name === key);
        if (field) {
          acc[key] = transformFormValue(field, value);
        }
        return acc;
      }, {});

      if (selectedItem) {
        await updateAdminItem(section, selectedItem.id, payload, token);
        toast.success(`${schema.label} updated successfully!`);
      } else {
        await createAdminItem(section, payload, token);
        toast.success(`${schema.label} created successfully!`);
      }
      
      await loadItems(false);
      setSelectedItem(null);
      return true; // Indicate success for form reset
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Unable to save item.");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleReorder = async (newOrder) => {
    const originalItems = [...items];
    setItems(newOrder);

    try {
      await reorderAdminItems(
        section,
        newOrder.map((item) => item.id),
        token
      );
      toast.success("Display order updated.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save new order.");
      setItems(originalItems);
    }
  };

  const openDeleteConfirm = (id) => {
    const item = items.find(i => i.id === id);
    const itemName = item.name || item.title || item.degree || "this item";
    
    setConfirmState({
      isOpen: true,
      id,
      title: `Delete ${schema.label}?`,
      message: `Are you sure you want to permanently remove "${itemName}"? This action cannot be undone.`
    });
  };

  const handleDelete = async () => {
    const { id } = confirmState;
    setConfirmState(prev => ({ ...prev, isOpen: false }));
    
    const loadingToast = toast.loading(`Deleting ${schema.label.toLowerCase()}...`);
    try {
      await deleteAdminItem(section, id, token);
      setItems((prev) => prev.filter((item) => item.id !== id));
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
      toast.success("Item deleted successfully.", { id: loadingToast });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Unable to delete item.", { id: loadingToast });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <LoadingState message={`Syncing ${schema.title}...`} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        onConfirm={handleDelete}
        onCancel={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
      />

      <div className="flex flex-col gap-12">
        {/* Editor Form (Top) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <ItemForm
            schema={schema}
            initialData={selectedItem}
            isSaving={isSaving}
            onSubmit={handleSubmit}
            onCancel={() => setSelectedItem(null)}
            onUpload={handleUpload}
            uploading={uploading}
          />
        </motion.div>

        {/* List Registry (Bottom) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-4 px-2">
            <h4 className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">Manage Records</h4>
            {!selectedItem && (
               <button 
                 onClick={() => {
                   setSelectedItem(null);
                   window.scrollTo({ top: 0, behavior: "smooth" });
                 }}
                 className="text-[10px] font-bold uppercase tracking-widest text-[#915EFF] hover:text-white transition-colors"
               >
                 + Create New
               </button>
            )}
          </div>
          <ItemList
            items={items}
            sectionTitle={schema.title}
            label={schema.label}
            onEdit={(item) => {
              setSelectedItem(item);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onDelete={openDeleteConfirm}
            onReorder={handleReorder}
          />
        </motion.div>
      </div>
    </div>
  );
};

ContentManager.propTypes = {
  section: PropTypes.oneOf(Object.keys(adminSchema)).isRequired,
};

export default ContentManager;
