import { useState } from "react";

const allActivities = [
  { id: 1, name: "Paragliding in Bir Billing", location: "Himachal Pradesh", emoji: "🪂", category: "Adventure", price: 2500, rating: 4.9, reviews: 312, duration: "2–3 hrs", tags: ["Outdoor", "Thrill", "Scenic"] },
  { id: 2, name: "Houseboat Stay, Dal Lake", location: "Srinagar", emoji: "🛶", category: "Nature", price: 4200, rating: 4.7, reviews: 218, duration: "1 night", tags: ["Relaxing", "Scenic", "Unique"] },
  { id: 3, name: "Old Delhi Food Walk", location: "Delhi", emoji: "🍢", category: "Food", price: 1200, rating: 4.8, reviews: 541, duration: "3 hrs", tags: ["Food", "Culture", "Walking"] },
  { id: 4, name: "Hampi Ruins Guided Tour", location: "Karnataka", emoji: "🏛️", category: "Culture", price: 800, rating: 4.6, reviews: 189, duration: "4 hrs", tags: ["History", "Heritage", "Walking"] },
  { id: 5, name: "Scuba Diving, Havelock Island", location: "Andaman", emoji: "🤿", category: "Adventure", price: 3800, rating: 4.9, reviews: 427, duration: "3 hrs", tags: ["Underwater", "Marine", "Thrill"] },
  { id: 6, name: "Pushkar Camel Safari", location: "Rajasthan", emoji: "🐪", category: "Adventure", price: 1500, rating: 4.5, reviews: 163, duration: "2 hrs", tags: ["Desert", "Unique", "Outdoor"] },
  { id: 7, name: "Munnar Tea Estate Tour", location: "Kerala", emoji: "🍃", category: "Nature", price: 600, rating: 4.4, reviews: 287, duration: "2.5 hrs", tags: ["Scenic", "Relaxing", "Culture"] },
  { id: 8, name: "Varanasi Evening Aarti Boat", location: "Uttar Pradesh", emoji: "🪔", category: "Culture", price: 500, rating: 4.9, reviews: 712, duration: "1.5 hrs", tags: ["Spiritual", "Scenic", "Culture"] },
  { id: 9, name: "Mumbai Street Art Walk", location: "Maharashtra", emoji: "🎨", category: "Culture", price: 900, rating: 4.6, reviews: 134, duration: "2.5 hrs", tags: ["Art", "Walking", "Urban"] },
  { id: 10, name: "White Water Rafting, Rishikesh", location: "Uttarakhand", emoji: "🌊", category: "Adventure", price: 1800, rating: 4.8, reviews: 892, duration: "3 hrs", tags: ["Thrill", "Outdoor", "Water"] },
  { id: 11, name: "Jaipur Pink City Heritage Walk", location: "Rajasthan", emoji: "🏰", category: "Culture", price: 700, rating: 4.7, reviews: 356, duration: "3.5 hrs", tags: ["Heritage", "History", "Walking"] },
  { id: 12, name: "Coorg Coffee Plantation Visit", location: "Karnataka", emoji: "☕", category: "Food", price: 950, rating: 4.5, reviews: 201, duration: "2 hrs", tags: ["Food", "Nature", "Scenic"] },
];

const categories = ["All", "Adventure", "Culture", "Food", "Nature"];
const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Rating"];

const navLinks = ["Dashboard", "Trips", "Budget", "Community"];

export default function ActivitySearch() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Recommended");
  const [saved, setSaved] = useState([]);

  const toggleSave = (id) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const filtered = allActivities
    .filter((a) => {
      const matchCat = category === "All" || a.category === category;
      const matchSearch =
        !search ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.location.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sort === "Price: Low to High") return a.price - b.price;
      if (sort === "Price: High to Low") return b.price - a.price;
      if (sort === "Rating") return b.rating - a.rating;
      return 0;
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
        <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs text-blue-100 font-medium">RK</div>
      </nav>

      {/* Hero search bar */}
      <div className="bg-[#0c1a2e] px-6 py-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-serif font-semibold text-white mb-2">Discover Activities</h1>
          <p className="text-slate-400 text-sm mb-6">Find unique experiences across India</p>
          <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-lg gap-3">
            <span className="text-slate-400">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search activities, destinations..."
              className="flex-1 text-sm text-slate-700 outline-none placeholder-slate-400"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-slate-300 hover:text-slate-500 text-lg leading-none">×</button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Filters row */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-sm px-4 py-2 rounded-xl font-medium transition-all border ${
                  category === cat
                    ? "bg-[#0c1a2e] text-white border-[#0c1a2e]"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none bg-white"
            >
              {sortOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-slate-400 mb-4">
          {filtered.length} {filtered.length === 1 ? "activity" : "activities"} found
          {search ? ` for "${search}"` : ""}
          {category !== "All" ? ` in ${category}` : ""}
        </p>

        {/* Activity grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-slate-500 font-medium">No activities found</p>
            <p className="text-sm text-slate-400 mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((activity) => (
              <div key={activity.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                {/* Emoji header */}
                <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-5xl relative">
                  {activity.emoji}
                  <button
                    onClick={() => toggleSave(activity.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-sm transition-transform hover:scale-110"
                  >
                    {saved.includes(activity.id) ? "❤️" : "🤍"}
                  </button>
                  <span className="absolute bottom-2 left-3 text-xs bg-white/90 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                    {activity.category}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-slate-800 text-sm leading-snug mb-1">{activity.name}</h3>
                  <p className="text-xs text-slate-400 mb-2">📍 {activity.location} · ⏱ {activity.duration}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {activity.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base font-serif font-semibold text-[#0c1a2e]">₹{activity.price.toLocaleString()}</span>
                      <span className="text-xs text-slate-400"> /person</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span>⭐</span>
                      <span className="font-medium">{activity.rating}</span>
                      <span className="text-slate-300">({activity.reviews})</span>
                    </div>
                  </div>

                  <button className="mt-3 w-full bg-[#378ADD] text-white text-xs py-2 rounded-xl font-medium hover:bg-blue-600 transition-colors">
                    Add to Trip
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
