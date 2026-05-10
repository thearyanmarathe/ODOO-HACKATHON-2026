import { useState } from "react";

const allTrips = [
  { id: 1, name: "Manali Road Trip", emoji: "🏔️", status: "ongoing", desc: "Himalayan adventure through mountain passes and valley villages", dates: "May 5–14, 2026", budget: "₹52,000", travelers: 4, bg: "bg-[#1a2e0c]" },
  { id: 2, name: "Goa Getaway", emoji: "🏖️", status: "upcoming", desc: "Beach week with sunsets, seafood and fortress trails", dates: "Jun 12–18, 2026", budget: "₹38,000", travelers: 2, bg: "bg-[#0c2340]" },
  { id: 3, name: "Rajasthan Heritage", emoji: "🏛️", status: "completed", desc: "Forts, palaces, and desert dunes across royal Rajasthan", dates: "Mar 1–9, 2026", budget: "₹61,500", travelers: 3, bg: "bg-[#2e0c0c]" },
  { id: 4, name: "Kerala Backwaters", emoji: "🌿", status: "upcoming", desc: "Houseboat journey through serene lagoons and spice gardens", dates: "Aug 3–10, 2026", budget: "₹44,000", travelers: 2, bg: "bg-[#0c1a2e]" },
  { id: 5, name: "Coorg Coffee Trail", emoji: "🌄", status: "completed", desc: "Misty hills, waterfalls, and aromatic coffee estate walks", dates: "Jan 14–18, 2026", budget: "₹29,800", travelers: 5, bg: "bg-[#2e2a0c]" },
  { id: 6, name: "Varanasi Spiritual", emoji: "🕌", status: "completed", desc: "Ghats, aartis, and age-old temples along the holy Ganges", dates: "Nov 7–11, 2025", budget: "₹21,000", travelers: 2, bg: "bg-[#1a0c2e]" },
];

const filters = ["All trips", "Ongoing", "Upcoming", "Completed"];

const statusStyles = {
  ongoing: "bg-green-100 text-green-800",
  upcoming: "bg-blue-100 text-blue-800",
  completed: "bg-slate-100 text-slate-600",
};

export default function Trips() {
  const [activeFilter, setActiveFilter] = useState("All trips");
  const [search, setSearch] = useState("");

  const filtered = allTrips.filter((t) => {
    const matchFilter =
      activeFilter === "All trips" || t.status === activeFilter.toLowerCase();
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100 px-6 h-14 flex items-center justify-between sticky top-0 z-10">
        <span className="font-serif font-medium text-slate-800 text-lg">My Trips</span>
        <a
          href="/create-trip"
          className="flex items-center gap-2 bg-[#0c1a2e] hover:bg-[#183a5e] text-white rounded-xl px-4 py-2 text-xs font-medium transition-colors"
        >
          + New trip
        </a>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-5 items-center">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs border transition-colors ${
                activeFilter === f
                  ? "bg-[#0c1a2e] text-white border-[#0c1a2e]"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              }`}
            >
              {f}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1.5">
            <span className="text-slate-400 text-xs">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search trips…"
              className="text-xs bg-transparent outline-none w-28 text-slate-700"
            />
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-4">{filtered.length} trip{filtered.length !== 1 ? "s" : ""} found</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className={`${t.bg} h-24 flex items-center justify-center text-4xl relative`}>
                {t.emoji}
                <span
                  className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[t.status]}`}
                >
                  {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-slate-800 mb-1">{t.name}</h3>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">{t.desc}</p>
                <div className="flex justify-between text-xs text-slate-400 mb-3">
                  <span>📅 {t.dates}</span>
                  <span>👥 {t.travelers}</span>
                </div>
                <div className="text-xs text-slate-400 mb-0.5">Budget</div>
                <div className="text-sm font-medium text-slate-800 mb-3">{t.budget}</div>
                <div className="flex gap-2">
                  <button className="flex-[2] py-2 bg-[#0c1a2e] hover:bg-[#183a5e] text-white rounded-xl text-xs font-medium transition-colors">
                    View details
                  </button>
                  <button className="flex-1 py-2 border border-slate-200 rounded-xl text-xs text-slate-500 hover:bg-slate-50 transition-colors">
                    •••
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <div className="text-4xl mb-3">🗺️</div>
            <p className="text-sm">No trips found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
