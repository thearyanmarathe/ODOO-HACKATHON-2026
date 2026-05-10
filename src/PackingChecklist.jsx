import { useState } from "react";

const defaultItems = [
  // Clothing
  { id: 1, category: "Clothing", name: "T-shirts (×5)", packed: false },
  { id: 2, category: "Clothing", name: "Shorts / Light trousers", packed: false },
  { id: 3, category: "Clothing", name: "Swimwear", packed: false },
  { id: 4, category: "Clothing", name: "Light jacket / hoodie", packed: false },
  { id: 5, category: "Clothing", name: "Comfortable walking shoes", packed: false },
  { id: 6, category: "Clothing", name: "Flip-flops / sandals", packed: false },
  // Documents
  { id: 7, category: "Documents", name: "Passport / National ID", packed: false },
  { id: 8, category: "Documents", name: "Flight & hotel bookings", packed: false },
  { id: 9, category: "Documents", name: "Travel insurance", packed: false },
  { id: 10, category: "Documents", name: "Emergency contacts card", packed: false },
  { id: 11, category: "Documents", name: "Driving license (if renting)", packed: false },
  // Electronics
  { id: 12, category: "Electronics", name: "Phone charger", packed: false },
  { id: 13, category: "Electronics", name: "Power bank", packed: false },
  { id: 14, category: "Electronics", name: "Universal travel adapter", packed: false },
  { id: 15, category: "Electronics", name: "Camera + memory card", packed: false },
  { id: 16, category: "Electronics", name: "Earphones / headphones", packed: false },
  // Toiletries
  { id: 17, category: "Toiletries", name: "Toothbrush & toothpaste", packed: false },
  { id: 18, category: "Toiletries", name: "Sunscreen SPF 50+", packed: false },
  { id: 19, category: "Toiletries", name: "Insect repellent", packed: false },
  { id: 20, category: "Toiletries", name: "Basic first-aid kit", packed: false },
  { id: 21, category: "Toiletries", name: "Hand sanitizer", packed: false },
  // Essentials
  { id: 22, category: "Essentials", name: "Cash (local currency)", packed: false },
  { id: 23, category: "Essentials", name: "Reusable water bottle", packed: false },
  { id: 24, category: "Essentials", name: "Snacks for journey", packed: false },
];

const categoryIcons = {
  Clothing: "👕",
  Documents: "📄",
  Electronics: "🔌",
  Toiletries: "🧴",
  Essentials: "🎒",
};

const categoryColors = {
  Clothing: "bg-pink-50 border-pink-100 text-pink-700",
  Documents: "bg-blue-50 border-blue-100 text-blue-700",
  Electronics: "bg-purple-50 border-purple-100 text-purple-700",
  Toiletries: "bg-emerald-50 border-emerald-100 text-emerald-700",
  Essentials: "bg-amber-50 border-amber-100 text-amber-700",
};

const trips = [
  { id: 1, name: "Goa Getaway", emoji: "🏖️" },
  { id: 2, name: "Manali Road Trip", emoji: "🏔️" },
  { id: 3, name: "Kerala Backwaters", emoji: "🛶" },
];

const categories = ["All", ...Object.keys(categoryIcons)];
const navLinks = ["Dashboard", "Trips", "Budget", "Community"];

export default function PackingChecklist() {
  const [items, setItems] = useState(defaultItems);
  const [activeTrip, setActiveTrip] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");
  const [newItemName, setNewItemName] = useState("");
  const [newItemCat, setNewItemCat] = useState("Essentials");
  const [showAdd, setShowAdd] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const togglePacked = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item))
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addItem = () => {
    if (!newItemName.trim()) return;
    const newItem = {
      id: Date.now(),
      category: newItemCat,
      name: newItemName.trim(),
      packed: false,
    };
    setItems((prev) => [...prev, newItem]);
    setNewItemName("");
    setShowAdd(false);
  };

  const resetAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, packed: false })));
    setShowResetConfirm(false);
  };

  const visibleItems =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  const packedCount = items.filter((i) => i.packed).length;
  const totalCount = items.length;
  const pct = totalCount === 0 ? 0 : Math.round((packedCount / totalCount) * 100);

  // Group by category for display
  const grouped = categories
    .filter((c) => c !== "All")
    .map((cat) => ({
      cat,
      items: visibleItems.filter((i) => i.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100 px-6 h-14 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#0c1a2e] rounded-lg flex items-center justify-center text-blue-400 text-xs">✈</div>
          <span className="font-serif font-medium text-slate-800">Traveloop</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm text-slate-500">
          {navLinks.map((link) => (
            <a key={link} href={`/${link.toLowerCase()}`} className="hover:text-blue-600 transition-colors">
              {link}
            </a>
          ))}
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs text-blue-100 font-medium">RK</div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-serif font-semibold text-[#0c1a2e]">Packing Checklist</h1>
            <p className="text-sm text-slate-500 mt-0.5">Stay organised — never forget a thing</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-xs border border-slate-200 text-slate-500 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              ↺ Reset
            </button>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-1.5 bg-[#378ADD] text-white text-xs px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors font-medium"
            >
              + Add item
            </button>
          </div>
        </div>

        {/* Trip selector */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-1">
          {trips.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTrip(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
                activeTrip === t.id
                  ? "bg-[#0c1a2e] text-white border-[#0c1a2e]"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
              }`}
            >
              <span>{t.emoji}</span> {t.name}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Packing progress</span>
            <span className="text-sm font-semibold text-[#0c1a2e]">
              {packedCount} / {totalCount} packed
            </span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                pct === 100 ? "bg-emerald-500" : "bg-[#378ADD]"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
          {pct === 100 && (
            <p className="text-xs text-emerald-600 font-medium mt-2 text-center">
              🎉 All packed! You&apos;re ready to go!
            </p>
          )}
        </div>

        {/* Category filter pills */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border font-medium transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#0c1a2e] text-white border-[#0c1a2e]"
                  : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"
              }`}
            >
              {cat !== "All" && <span>{categoryIcons[cat]}</span>}
              {cat}
              {cat !== "All" && (
                <span className={`ml-0.5 text-xs ${activeCategory === cat ? "text-blue-300" : "text-slate-400"}`}>
                  {items.filter((i) => i.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Items grouped by category */}
        <div className="space-y-5">
          {grouped.map(({ cat, items: catItems }) => {
            const catPacked = catItems.filter((i) => i.packed).length;
            return (
              <div key={cat} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                {/* Category header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <span>{categoryIcons[cat]}</span>
                    <span className="text-sm font-medium text-slate-800">{cat}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[cat]}`}>
                      {catPacked}/{catItems.length}
                    </span>
                  </div>
                </div>
                {/* Items */}
                <div className="divide-y divide-slate-50">
                  {catItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                        item.packed ? "bg-slate-50/50" : ""
                      }`}
                    >
                      <button
                        onClick={() => togglePacked(item.id)}
                        className={`w-5 h-5 rounded-md flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                          item.packed
                            ? "bg-[#378ADD] border-[#378ADD] text-white"
                            : "border-slate-300 hover:border-blue-400"
                        }`}
                      >
                        {item.packed && (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <span
                        className={`flex-1 text-sm transition-all ${
                          item.packed ? "line-through text-slate-400" : "text-slate-700"
                        }`}
                      >
                        {item.name}
                      </span>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-slate-200 hover:text-red-400 text-xs transition-colors opacity-0 group-hover:opacity-100 ml-2"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {visibleItems.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <div className="text-4xl mb-3">🎒</div>
            <p className="text-sm">No items in this category yet.</p>
          </div>
        )}
      </div>

      {/* Add item modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-serif font-semibold text-[#0c1a2e]">Add Packing Item</h3>
              <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-slate-700 text-xl">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Item name</label>
                <input
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addItem()}
                  placeholder="e.g. Rain jacket"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Category</label>
                <select
                  value={newItemCat}
                  onChange={(e) => setNewItemCat(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400"
                >
                  {Object.keys(categoryIcons).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={addItem}
                className="w-full bg-[#378ADD] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Add to Checklist
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset confirm modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 text-center">
            <div className="text-3xl mb-3">↺</div>
            <h3 className="font-serif font-semibold text-[#0c1a2e] mb-2">Reset checklist?</h3>
            <p className="text-sm text-slate-500 mb-5">All items will be marked as unpacked. Your items won't be deleted.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 border border-slate-200 text-slate-500 py-2 rounded-xl text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={resetAll}
                className="flex-1 bg-[#0c1a2e] text-white py-2 rounded-xl text-sm font-medium hover:bg-[#183a5e] transition-colors"
              >
                Reset all
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
