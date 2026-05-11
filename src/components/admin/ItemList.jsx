import PropTypes from "prop-types";
import { Reorder } from "framer-motion";
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
    <div className="flex flex-col gap-4">
      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-black-200/20 p-8 sm:p-12 text-center">
          <div className="flex justify-center mb-4 opacity-50 animate-float text-4xl">
             <HiOutlineFolderOpen />
          </div>
          <p className="text-secondary font-medium text-sm sm:text-base">Your {label.toLowerCase()} collection is empty.</p>
          <p className="text-[11px] text-secondary/60 mt-1">Start by creating your first entry using the new entry button.</p>
        </div>
      ) : (
        <Reorder.Group 
          axis="y" 
          values={items} 
          onReorder={onReorder}
          className="space-y-3"
        >
          {items.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative rounded-2xl border border-white/5 bg-black-100/30 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-black-100/50 hover:border-[#915EFF]/30 hover:shadow-[0_8px_24px_rgba(145,94,255,0.08)] cursor-grab active:cursor-grabbing"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="opacity-20 group-hover:opacity-100 transition-opacity shrink-0">
                    <MdDragIndicator className="text-xl text-[#c4a7ff]" />
                  </div>
                  
                  {item.imageUrl || item.iconUrl || item.icon ? (
                    <div className="h-12 w-12 shrink-0 rounded-xl bg-white/5 border border-white/10 p-1 overflow-hidden shadow-inner group-hover:border-[#915EFF]/30 transition-colors">
                      <img 
                        src={item.imageUrl || item.iconUrl || item.icon} 
                        alt="" 
                        className="h-full w-full object-contain rounded-lg"
                        onError={(e) => { e.target.src = "https://placehold.co/150?text=Logo" }}
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-2xl group-hover:border-[#915EFF]/30 transition-colors">
                      <HiOutlineDocumentText />
                    </div>
                  )}
                  
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-white font-bold text-sm sm:text-base truncate group-hover:text-[#915EFF] transition-colors">{getItemSummary(item)}</p>
                      {item.featured && (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#56ccf2] bg-[#56ccf2]/10 px-2 py-0.5 rounded-full border border-[#56ccf2]/20 shrink-0">
                          ★ Featured
                        </span>
                      )}
                    </div>
                    <p className="text-secondary text-[11px] truncate">{getSubtitle(item)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 shrink-0 pt-3 sm:pt-0 border-t border-white/5 sm:border-none">
                  {!item.visible && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/70 bg-white/5 px-2 py-1 rounded-md mr-1 border border-white/5">
                      Hidden
                    </span>
                  )}
                  
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onEdit(item); }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white transition-all hover:bg-[#915EFF]/20 hover:text-[#915EFF] hover:border-[#915EFF]/40 border border-transparent"
                    title="Edit Item"
                  >
                    <HiOutlinePencilAlt size={18} />
                  </button>
                  
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white transition-all hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40 border border-transparent"
                    title="Delete Item"
                  >
                    <HiOutlineTrash size={18} />
                  </button>
                </div>
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
