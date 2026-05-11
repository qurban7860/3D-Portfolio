import PropTypes from "prop-types";
import { Reorder } from "framer-motion";
import { styles } from "../../styles";
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineDocumentText, HiOutlineFolderOpen } from "react-icons/hi";
import { MdDragIndicator } from "react-icons/md";

const getItemSummary = (item) => {
  return item.name || item.title || item.degree || `Item ${item.id}`;
};

const getSubtitle = (item) => {
  return item.description || item.companyName || item.instituteName || item.url || "No description provided.";
};

const ItemList = ({ items, onEdit, onDelete, onReorder, label }) => {
  return (
    <div className="flex flex-col gap-5">
      {items.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-10 sm:p-16 text-center group">
          <div className="flex justify-center mb-6 opacity-30 group-hover:opacity-60 transition-opacity animate-float text-5xl">
             <HiOutlineFolderOpen className="text-[#915EFF]" />
          </div>
          <p className="text-secondary font-bold text-[15px] tracking-wide">Collection Empty</p>
          <p className="text-[12px] text-secondary/40 mt-2 font-medium">Initialize your {label.toLowerCase()} stream to start managing.</p>
        </div>
      ) : (
        <Reorder.Group 
          axis="y" 
          values={items} 
          onReorder={onReorder}
          className="space-y-4"
        >
          {items.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${styles.glassCard} p-5 group cursor-grab active:cursor-grabbing relative overflow-hidden flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#915EFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center gap-5 overflow-hidden relative z-10">
                <div className="opacity-10 group-hover:opacity-40 transition-opacity shrink-0">
                  <MdDragIndicator className="text-2xl text-white" />
                </div>
                
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 p-1.5 overflow-hidden shadow-inner group-hover:border-[#915EFF]/30 transition-all duration-500 relative">
                  <div className="absolute inset-0 bg-[#915EFF]/5 group-hover:bg-[#915EFF]/10 transition-colors" />
                  {item.imageUrl || item.iconUrl || item.icon ? (
                    <img 
                      src={item.imageUrl || item.iconUrl || item.icon} 
                      alt="" 
                      className="h-full w-full object-contain rounded-xl group-hover:scale-110 transition-transform duration-500 relative z-10"
                      onError={(e) => { e.target.src = "https://placehold.co/150?text=Logo" }}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-3xl group-hover:text-[#915EFF] transition-colors relative z-10">
                      <HiOutlineDocumentText className="text-secondary" />
                    </div>
                  )}
                </div>
                
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-white font-bold text-base sm:text-lg truncate group-hover:text-gradient transition-all">{getItemSummary(item)}</p>
                    {item.featured && (
                      <span className="text-[10px] font-bold text-[#56ccf2] bg-[#56ccf2]/10 px-3 py-1 rounded-full border border-[#56ccf2]/20 shrink-0 shadow-[0_0_10px_rgba(86,204,242,0.1)]">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-secondary text-[13px] font-medium truncate opacity-60 group-hover:opacity-100 transition-opacity leading-relaxed">{getSubtitle(item)}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 shrink-0 pt-4 sm:pt-0 border-t border-white/5 sm:border-none relative z-10">
                {!item.visible && (
                  <span className="text-[10px] font-bold text-secondary/40 bg-white/5 px-3 py-1.5 rounded-lg mr-2 border border-white/5">
                    Hidden
                  </span>
                )}
                
                {/* Action Buttons */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onEdit(item); }}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-white transition-all duration-300 hover:bg-[#915EFF]/20 hover:text-[#915EFF] hover:border-[#915EFF]/40 border border-white/10 shadow-xl active:scale-95"
                  title="Edit Item"
                >
                  <HiOutlinePencilAlt size={20} />
                </button>
                
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-white transition-all duration-300 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40 border border-white/10 shadow-xl active:scale-95"
                  title="Delete Item"
                >
                  <HiOutlineTrash size={20} />
                </button>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
};

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReorder: PropTypes.func.isRequired,
  sectionTitle: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ItemList;
