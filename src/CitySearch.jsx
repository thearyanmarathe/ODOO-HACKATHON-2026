import { useState } from "react";

const allCities = [
  { id: 1, name: "Mumbai", country: "India", region: "Asia", emoji: "🌆", costIndex: "Moderate", costScore: 2, popularity: 98, tags: ["Coastal", "Metro", "Food"], desc: "Financial capital with iconic sea-front promenades, street food, and Bollywood culture." },
  { id: 2, name: "Jaipur", country: "India", region: "Asia", emoji: "🏰", costIndex: "Budget", costScore: 1, popularity: 91, tags: ["Heritage", "Desert", "Forts"], desc: "The Pink City — royal palaces, bazaars, and desert fortresses of Rajasthan." },
  { id: 3, name: "Manali", country: "India", region: "Asia", emoji: "🏔️", costIndex: "Budget", costScore: 1, popularity: 87, tags: ["Mountains", "Adventure", "Scenic"], desc: "High-altitude hill station in Himachal Pradesh with snow peaks and trekking trails." },
  { id: 4, name: "Goa", country: "India", region: "Asia", emoji: "🏖️", costIndex: "Moderate", costScore: 2, popularity: 95, tags: ["Beach", "Nightlife", "Heritage"], desc: "Tropical coastal state known for beaches, Portuguese architecture, and seafood." },
  { id: 5, name: "Varanasi", country: "India", region: "Asia", emoji: "🪔", costIndex: "Budget", costScore: 1, popularity: 83, tags: ["Spiritual", "Culture", "Ghats"], desc: "One of the world's oldest cities — Ganges ghats, evening aartis, and ancient temples." },
  { id: 6, name: "Udaipur", country: "India", region: "Asia", emoji: "🛶", costIndex: "Moderate", costScore: 2, popularity: 89, tags: ["Lakes", "Palaces", "Romantic"], desc: "City of Lakes with stunning palace hotels, marble temples, and royal heritage." },
  { id: 7, name: "Bangkok", country: "Thailand", region: "Asia", emoji: "🛕", costIndex: "Budget", costScore: 1, popularity: 96, tags: ["Street Food", "Temples", "Nightlife"], desc: "Vibrant Thai capital with ornate shrines, night markets, and world-class street food." },
  { id: 8, name: "Bali", country: "Indonesia", region: "Asia", emoji: "🌴", costIndex: "Budget", costScore: 1, popularity: 94, tags: ["Beach", "Spiritual", "Nature"], desc: "Island of Gods — terraced rice fields, Hindu temples, surf breaks, and spa culture." },
  { id: 9, name: "Paris", country: "France", region: "Europe", emoji: "🗼", costIndex: "Expensive", costScore: 4, popularity: 99, tags: ["Art", "Romance", "Food"], desc: "The City of Light — Eiffel Tower, world-class museums, haute cuisine, and fashion." },
  { id: 10, name: "Prague", country: "Czechia", region: "Europe", emoji: "🎭", costIndex: "Moderate", costScore: 2, popularity: 88, tags: ["Architecture", "Beer", "History"], desc: "Fairy-tale medieval old town with Gothic spires, baroque palaces, and vibrant nightlife." },
  { id: 11, name: "Kyoto", country: "Japan", region: "Asia", emoji: "🏯", costIndex: "Expensive", costScore: 4, popularity: 93, tags: ["Temples", "Gardens", "Culture"], desc: "Japan's cultural heart — thousands of temples, geisha districts, and bamboo groves." },
  { id: 12, name: "Dubai", country: "UAE", region: "Middle East", emoji: "🏙️", costIndex: "Expensive", costScore: 4, popularity: 92, tags: ["Luxury", "Shopping", "Desert"], desc: "Ultramodern skyline, record-breaking skyscrapers, desert safaris, and duty-free shopping." },
];

const regions = ["All", "Asia", "Europe", "Middle East"];
const costFilters = ["Any budget", "Budget", "Moderate", "Expensive"];

const costColors = {
  Budget: "bg-emerald-100 text-emerald-700",
  Moderate: "bg-blue-100 text-blue-700",
  Expensive: "bg-orange-100 text-orange-700",
};

const navLinks = ["Dashboard", "Trips", "Budget", "Community"];

export default function CitySearch() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [costFilter, setCostFilter] = useState("Any budget");
  const [added, setAdded] = useState([]);
  const [selected, setSelected] = useState(null);

  const toggleAdd = (id) => {
    setAdded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filtered = allCities.filter((c) => {
    const matchRegion = region === "All" || c.region === region;
    const matchCost = costFilter === "Any budget" || c.costIndex === costFilter;
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchRegion && matchCost && matchSearch;
  });

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
        <div className="flex items-center gap-2">
          {added.length > 0 && (
            <span className="text-xs bg-[#378ADD] text-white px-3 py-1.5 rounded-xl font-medium">
              {added.length} city{added.length !== 1 ? " cities" : ""} added
            </span>
          )}
          <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs text-blue-100 font-medium">RK</div>
        </div>
      </nav>

      {/* Hero search */}
      <div className="bg-[#0c1a2e] px-6 py-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-serif font-semibold text-white mb-2">Find Your Next Stop</h1>
          <p className="text-slate-400 text-sm mb-6">Search cities by name, country, or vibe</p>
          <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-lg gap-3">
            <span className="text-slate-400">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cities, countries, tags..."
              className="flex-1 text-sm text-slate-700 outline-none placeholder-slate-400"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-slate-300 hover:text-slate-500 text-lg leading-none">×</button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          {/* Region */}
          <div className="flex gap-2">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all ${
                  region === r
                    ? "bg-[#0c1a2e] text-white border-[#0c1a2e]"
                    : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-slate-200 hidden md:block" />
          {/* Cost filter */}
          <div className="flex gap-2">
            {costFilters.map((c) => (
              <button
                key={c}
                onClick={() => setCostFilter(c)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all ${
                  costFilter === c
                    ? "bg-[#0c1a2e] text-white border-[#0c1a2e]"
                    : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          {filtered.length} {filtered.length === 1 ? "city" : "cities"} found
          {search ? ` for "${search}"` : ""}
          {region !== "All" ? ` in ${region}` : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🌍</div>
            <p className="text-slate-500 font-medium">No cities found</p>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((city) => (
              <div
                key={city.id}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="h-28 bg-[#0c1a2e] flex items-center justify-center text-5xl relative">
                  {city.emoji}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${costColors[city.costIndex]}`}>
                      {city.costIndex}
                    </span>
                    <span className="text-xs text-white/70 bg-black/30 px-2 py-0.5 rounded-full">
                      🔥 {city.popularity}% popular
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-medium text-slate-800 text-sm">{city.name}</h3>
                      <p className="text-xs text-slate-400">📍 {city.country} · {city.region}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mt-2 mb-3">{city.desc}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {city.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelected(city)}
                      className="flex-1 border border-slate-200 text-slate-500 text-xs py-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      View details
                    </button>
                    <button
                      onClick={() => toggleAdd(city.id)}
                      className={`flex-[2] text-xs py-2 rounded-xl font-medium transition-colors ${
                        added.includes(city.id)
                          ? "bg-emerald-500 text-white hover:bg-emerald-600"
                          : "bg-[#378ADD] text-white hover:bg-blue-600"
                      }`}
                    >
                      {added.includes(city.id) ? "✓ Added to Trip" : "+ Add to Trip"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* City detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="h-32 bg-[#0c1a2e] flex items-center justify-center text-6xl relative">
              {selected.emoji}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-sm transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-[#0c1a2e]">{selected.name}</h2>
                  <p className="text-sm text-slate-400">📍 {selected.country} · {selected.region}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${costColors[selected.costIndex]}`}>
                  {selected.costIndex}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{selected.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {selected.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-slate-50 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-slate-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-semibold text-[#0c1a2e]">{selected.popularity}%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Popularity</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-semibold text-[#0c1a2e]">{"💰".repeat(selected.costScore)}</div>
                  <div className="text-xs text-slate-400 mt-0.5">Cost level</div>
                </div>
              </div>
              <button
                onClick={() => { toggleAdd(selected.id); setSelected(null); }}
                className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  added.includes(selected.id)
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-[#378ADD] text-white hover:bg-blue-600"
                }`}
              >
                {added.includes(selected.id) ? "✓ Added to Trip" : "+ Add to Trip"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
