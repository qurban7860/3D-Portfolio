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
    <div className="flex flex-col gap-5">
      {items.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-10 sm:p-16 text-center group">
          <div className="flex justify-center mb-6 opacity-30 group-hover:opacity-60 transition-opacity animate-float text-5xl">
             <HiOutlineFolderOpen className="text-[#915EFF]" />
          </div>
          <p className="text-secondary font-black text-sm sm:text-base uppercase tracking-widest">Collection Empty</p>
          <p className="text-[11px] text-secondary/40 mt-2 font-medium">Initialize your {label.toLowerCase()} stream to start managing.</p>
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
              className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.05] hover:border-[#915EFF]/30 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] cursor-grab active:cursor-grabbing overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#915EFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between relative z-10">
                <div className="flex items-center gap-5 overflow-hidden">
                  <div className="opacity-10 group-hover:opacity-40 transition-opacity shrink-0">
                    <MdDragIndicator className="text-2xl text-white" />
                  </div>
                  
                  {item.imageUrl || item.iconUrl || item.icon ? (
                    <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 p-1.5 overflow-hidden shadow-inner group-hover:border-[#915EFF]/30 transition-all duration-500">
                      <img 
                        src={item.imageUrl || item.iconUrl || item.icon} 
                        alt="" 
                        className="h-full w-full object-contain rounded-xl group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.src = "https://placehold.co/150?text=Logo" }}
                      />
                    </div>
                  ) : (
                    <div className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-3xl group-hover:border-[#915EFF]/30 transition-all duration-500 shadow-xl">
                      <HiOutlineDocumentText className="text-secondary group-hover:text-[#915EFF]" />
                    </div>
                  )}
                  
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-white font-black text-base sm:text-lg truncate group-hover:text-gradient transition-all">{getItemSummary(item)}</p>
                      {item.featured && (
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#56ccf2] bg-[#56ccf2]/10 px-3 py-1 rounded-full border border-[#56ccf2]/20 shrink-0 shadow-[0_0_10px_rgba(86,204,242,0.1)]">
                          ★ Featured
                        </span>
                      )}
                    </div>
                    <p className="text-secondary text-[12px] font-medium truncate opacity-60 group-hover:opacity-100 transition-opacity leading-relaxed">{getSubtitle(item)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 shrink-0 pt-4 sm:pt-0 border-t border-white/5 sm:border-none">
                  {!item.visible && (
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 bg-white/5 px-3 py-1.5 rounded-lg mr-2 border border-white/5">
                      Hidden
                    </span>
                  )}
                  
                  {/* Action Buttons - Removed Ripple Effects */}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onEdit(item); }}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-white transition-all duration-300 hover:bg-[#915EFF]/20 hover:text-[#915EFF] hover:border-[#915EFF]/40 border border-white/5 shadow-xl active:scale-95"
                    title="Edit Item"
                  >
                    <HiOutlinePencilAlt size={20} />
                  </button>
                  
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-white transition-all duration-300 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40 border border-white/5 shadow-xl active:scale-95"
                    title="Delete Item"
                  >
                    <HiOutlineTrash size={20} />
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
