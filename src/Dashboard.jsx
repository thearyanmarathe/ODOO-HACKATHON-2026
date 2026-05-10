import { useState } from "react";

const destinations = [
  { name: "Paris", country: "France", emoji: "🗼", rating: "★★★★★", bg: "bg-[#1a3a5c]" },
  { name: "Kyoto", country: "Japan", emoji: "🏯", rating: "★★★★★", bg: "bg-[#2d1a0e]" },
  { name: "Bali", country: "Indonesia", emoji: "🌴", rating: "★★★★☆", bg: "bg-[#0d2e1a]" },
  { name: "Prague", country: "Czechia", emoji: "🎭", rating: "★★★★☆", bg: "bg-[#2e1a2e]" },
];

const trips = [
  { name: "Manali Road Trip", emoji: "🏔️", status: "ongoing", dates: "May 5–14", budget: "₹52,000", travelers: 4 },
  { name: "Goa Getaway", emoji: "🏖️", status: "upcoming", dates: "Jun 12–18", budget: "₹38,000", travelers: 2 },
  { name: "Rajasthan Heritage", emoji: "🏛️", status: "completed", dates: "Mar 1–9", budget: "₹61,500", travelers: 3 },
];

const statusStyles = {
  ongoing: "bg-green-100 text-green-800",
  upcoming: "bg-blue-100 text-blue-800",
  completed: "bg-slate-100 text-slate-600",
};

export default function Dashboard() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100 px-6 h-14 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#0c1a2e] rounded-lg flex items-center justify-center text-blue-400 text-xs">✈</div>
          <span className="font-serif font-medium text-slate-800">Traveloop</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm text-slate-500">
          {["Dashboard", "Trips", "Budget", "Community"].map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase()}`}
              className={`hover:text-blue-600 transition-colors ${link === "Dashboard" ? "text-blue-600 font-medium" : ""}`}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5">
            <span className="text-slate-400 text-xs">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations…"
              className="bg-transparent text-xs outline-none w-28 text-slate-700"
            />
          </div>
          <div className="text-slate-400 cursor-pointer">🔔</div>
          <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs text-blue-100 font-medium">
            RK
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Hero Banner */}
        <div className="rounded-2xl bg-[#0c1a2e] p-8 mb-6 relative overflow-hidden flex justify-between items-end">
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full border border-blue-500/20 pointer-events-none" />
          <div className="absolute top-6 right-6 w-24 h-24 rounded-full border border-blue-500/10 pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/15 border border-blue-500/25 rounded-full px-3 py-1 text-xs text-blue-300 mb-3">
              ✨ Featured destination
            </span>
            <h2 className="font-serif text-2xl text-white leading-snug mb-1.5">
              Santorini, Greece<br />awaits you
            </h2>
            <p className="text-xs text-blue-300/60 mb-4">Clifftop villages · Aegean sunsets · Island cuisine</p>
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 text-xs font-medium transition-colors">
              + Plan this trip
            </button>
          </div>
          <div className="relative z-10 font-serif text-4xl text-white/10 tracking-widest select-none">GRC</div>
        </div>

        {/* Destinations */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-slate-800">Top regional destinations</h3>
          <a href="/activities" className="text-xs text-blue-600 hover:underline">See all →</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {destinations.map((d) => (
            <div
              key={d.name}
              className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className={`${d.bg} h-16 flex items-center justify-center text-3xl`}>{d.emoji}</div>
              <div className="p-2.5">
                <div className="text-xs font-medium text-slate-800">{d.name}</div>
                <div className="text-xs text-slate-400 flex items-center gap-1">📍 {d.country}</div>
                <div className="text-xs text-amber-400 mt-0.5">{d.rating}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Previous Trips */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-slate-800">Previous trips</h3>
          <a href="/trips" className="text-xs text-blue-600 hover:underline">View all →</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {trips.map((t) => (
            <div key={t.name} className="bg-white rounded-xl border border-slate-100 p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-xl">{t.emoji}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[t.status]}`}>
                  {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                </span>
              </div>
              <div className="text-sm font-medium text-slate-800 mb-1">{t.name}</div>
              <div className="text-xs text-slate-400 flex items-center gap-1 mb-2">📅 {t.dates}</div>
              <div className="text-xs text-slate-400 mb-0.5">Budget</div>
              <div className="text-sm font-medium text-slate-800 mb-3">{t.budget}</div>
              <button className="w-full border border-slate-200 rounded-lg py-1.5 text-xs text-slate-500 hover:bg-slate-50 transition-colors">
                View details →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
