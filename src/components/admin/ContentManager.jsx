import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { HiOutlinePlus, HiOutlineX } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { usePortfolio } from "../../context/PortfolioContext";
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
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../../styles";
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
  const { refreshPortfolio } = usePortfolio();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
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
      await refreshPortfolio();
      setIsFormOpen(false);
      setSelectedItem(null);
      return true;
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
      await refreshPortfolio();
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
      await refreshPortfolio();
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
    <div className="flex flex-col">
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        onConfirm={handleDelete}
        onCancel={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
      />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h4 className="text-white font-bold text-xl sm:text-2xl flex items-center gap-2">
            {schema.title} Content
          </h4>
          <p className="text-secondary text-[13px] mt-2 font-medium opacity-60">
            Total Records: <span className="text-white font-semibold">{items.length}</span>
          </p>
        </div>
        <button 
          onClick={() => {
            setSelectedItem(null);
            setIsFormOpen(true);
          }}
          className={`${styles.glassButtonPremium} px-4 sm:px-5 py-2.5 text-sm flex items-center gap-2 whitespace-nowrap shrink-0`}
        >
          <HiOutlinePlus className="text-lg" />
          New Entry
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <ItemList
          items={items}
          sectionTitle={schema.title}
          label={schema.label}
          onEdit={(item) => {
            setSelectedItem(item);
            setIsFormOpen(true);
          }}
          onDelete={openDeleteConfirm}
          onReorder={handleReorder}
        />
      </motion.div>

      {/* Modal Form Overlay */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050816]/80 backdrop-blur-md"
          >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#050816] shadow-2xl overflow-hidden`}
          >
            {/* Top Accent Gradient */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#915EFF] to-transparent opacity-50 z-20" />
            
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setSelectedItem(null);
                }}
                className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <HiOutlineX />
              </button>
              <div className="p-1">
                <ItemForm
                  schema={schema}
                  initialData={selectedItem}
                  isSaving={isSaving}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setIsFormOpen(false);
                    setSelectedItem(null);
                  }}
                  onUpload={handleUpload}
                  uploading={uploading}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

ContentManager.propTypes = {
  section: PropTypes.oneOf(Object.keys(adminSchema)).isRequired,
};

export default ContentManager;
