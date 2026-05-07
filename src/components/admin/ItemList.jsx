import PropTypes from "prop-types";
import { Reorder } from "framer-motion";

const getItemSummary = (item) => {
  return item.name || item.title || item.degree || `Item ${item.id}`;
};

const getSubtitle = (item) => {
  return item.description || item.companyName || item.instituteName || item.url || "No description provided.";
};

const ItemList = ({ items, onEdit, onDelete, onReorder, sectionTitle, label }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-white font-bold text-lg sm:text-xl flex items-center gap-2">
          {sectionTitle} Registry 
          <span className="text-[10px] sm:text-xs font-normal text-secondary bg-white/5 px-2 sm:px-3 py-1 rounded-full border border-white/10">
            {items.length} {items.length === 1 ? label : `${label}s`}
          </span>
        </h3>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[1.5rem] sm:rounded-[2rem] border border-dashed border-white/10 bg-black-200/20 p-8 sm:p-12 text-center">
          <div className="text-3xl sm:text-4xl mb-4 opacity-50">📂</div>
          <p className="text-secondary font-medium text-sm sm:text-base">Your {label.toLowerCase()} collection is empty.</p>
          <p className="text-[10px] sm:text-xs text-secondary/60 mt-1">Start by creating your first entry using the form.</p>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative rounded-2xl sm:rounded-3xl border border-white/5 bg-black-100/40 p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:bg-black-100/60 hover:border-white/20 hover:shadow-xl hover:shadow-black/20 cursor-grab active:cursor-grabbing"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                  <div className="flex flex-col items-center justify-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity shrink-0">
                    <div className="h-0.5 w-0.5 rounded-full bg-white" />
                    <div className="h-0.5 w-0.5 rounded-full bg-white" />
                    <div className="h-0.5 w-0.5 rounded-full bg-white" />
                  </div>
                  
                  {item.imageUrl || item.iconUrl || item.icon ? (
                    <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-1 overflow-hidden shadow-inner">
                      <img 
                        src={item.imageUrl || item.iconUrl || item.icon} 
                        alt="" 
                        className="h-full w-full object-contain rounded-lg sm:rounded-xl"
                        onError={(e) => { e.target.src = "https://placehold.co/150?text=Logo" }}
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-lg sm:text-xl">
                      📄
                    </div>
                  )}
                  
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-bold text-sm sm:text-base truncate">{getItemSummary(item)}</p>
                      {item.featured && (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#56ccf2] bg-[#56ccf2]/10 px-1.5 py-0.5 rounded-full border border-[#56ccf2]/20 shrink-0">
                          ★
                        </span>
                      )}
                    </div>
                    <p className="text-secondary text-[10px] sm:text-xs truncate">{getSubtitle(item)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t border-white/5 sm:border-none">
                  {!item.visible && (
                    <span className="text-[9px] font-bold uppercase text-secondary bg-white/5 px-1.5 py-0.5 rounded-md mr-1 sm:mr-2">
                      Hidden
                    </span>
                  )}
                  
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onEdit(item); }}
                    className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-white/5 text-white transition-all hover:bg-[#915EFF]/20 hover:text-[#915EFF] border border-white/10"
                    title="Edit Item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                    className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-white/5 text-white transition-all hover:bg-red-500/20 hover:text-red-400 border border-white/10"
                    title="Delete Item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
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
