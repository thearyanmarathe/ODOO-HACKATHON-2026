import { useState } from "react";

const trip = {
  name: "Goa Getaway",
  emoji: "🏖️",
  dates: "Jun 12–18, 2026",
  travelers: 2,
  totalBudget: "₹38,000",
};

const days = [
  {
    id: 1,
    label: "Day 1",
    date: "Thu, Jun 12",
    city: "North Goa",
    activities: [
      { id: 1, time: "09:00 AM", name: "Check-in at Resort", icon: "✈️", location: "Taj Fort Aguada, Sinquerim", desc: "Arrive, check in, and have a welcome drink by the pool.", duration: "1 hr", cost: "₹12,000/night", color: "#378ADD" },
      { id: 2, time: "11:30 AM", name: "Calangute Beach", icon: "🌊", location: "Calangute, North Goa", desc: "Swim, sunbathe, and try water sports at Goa's most popular beach.", duration: "3 hrs", cost: "Free", color: "#10b981" },
      { id: 3, time: "07:00 PM", name: "Dinner – Fisherman's Wharf", icon: "🍽️", location: "Cavelossim, South Goa", desc: "Waterfront Goan seafood dinner with live Fado music.", duration: "2 hrs", cost: "~₹1,800/person", color: "#f59e0b" },
    ],
  },
  {
    id: 2,
    label: "Day 2",
    date: "Fri, Jun 13",
    city: "North Goa",
    activities: [
      { id: 4, time: "10:00 AM", name: "Fort Aguada", icon: "🏯", location: "Sinquerim, Goa", desc: "Explore the 17th-century Portuguese fort overlooking the Arabian Sea.", duration: "2 hrs", cost: "₹25 entry", color: "#8b5cf6" },
      { id: 5, time: "03:00 PM", name: "Sunset Cruise", icon: "⛵", location: "Mandovi River", desc: "Two-hour cruise with folk music and dance.", duration: "2 hrs", cost: "₹500/person", color: "#ec4899" },
    ],
  },
  {
    id: 3,
    label: "Day 3",
    date: "Sat, Jun 14",
    city: "South Goa",
    activities: [
      { id: 6, time: "09:00 AM", name: "Palolem Beach", icon: "🌴", location: "Canacona, South Goa", desc: "Serene crescent beach — kayak, snorkel, or just relax.", duration: "4 hrs", cost: "Free", color: "#10b981" },
      { id: 7, time: "02:00 PM", name: "Cotigao Wildlife Sanctuary", icon: "🦎", location: "Canacona, Goa", desc: "Spot birds and wildlife in Goa's richest forest reserve.", duration: "3 hrs", cost: "₹30 entry", color: "#f59e0b" },
    ],
  },
  {
    id: 4,
    label: "Day 4",
    date: "Sun, Jun 15",
    city: "South Goa",
    activities: [
      { id: 8, time: "10:00 AM", name: "Dudhsagar Falls", icon: "💧", location: "Mollem, Goa", desc: "Four-tiered waterfall on the Goa-Karnataka border — one of India's tallest.", duration: "5 hrs", cost: "₹400/person", color: "#378ADD" },
    ],
  },
  {
    id: 5,
    label: "Day 5",
    date: "Mon, Jun 16",
    city: "North Goa",
    activities: [
      { id: 9, time: "11:00 AM", name: "Anjuna Flea Market", icon: "🛍️", location: "Anjuna, North Goa", desc: "Pick up souvenirs, clothing, and local crafts at this iconic weekly market.", duration: "2 hrs", cost: "Free entry", color: "#ec4899" },
      { id: 10, time: "07:30 PM", name: "Farewell Dinner", icon: "🥂", location: "Thalassa, Vagator", desc: "Greek rooftop restaurant with stunning views of the Arabian Sea.", duration: "2.5 hrs", cost: "~₹2,500/person", color: "#8b5cf6" },
    ],
  },
];

const navLinks = ["Dashboard", "Trips", "Budget", "Community"];

export default function ItineraryView() {
  const [view, setView] = useState("timeline"); // "timeline" | "list"
  const [activeDay, setActiveDay] = useState(null); // null = all days

  const visibleDays = activeDay ? days.filter((d) => d.id === activeDay) : days;
  const totalActivities = days.reduce((sum, d) => sum + d.activities.length, 0);
  const totalCost = days
    .flatMap((d) => d.activities)
    .reduce((sum, a) => {
      const match = a.cost.match(/[\d,]+/);
      return sum + (match ? parseInt(match[0].replace(",", "")) : 0);
    }, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100 px-6 h-14 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <a href="/trips" className="text-sm text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors">
            ← Trips
          </a>
          <span className="text-slate-200">|</span>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#0c1a2e] rounded-lg flex items-center justify-center text-blue-400 text-xs">✈</div>
            <span className="font-serif font-medium text-slate-800">Traveloop</span>
          </div>
        </div>
        <div className="hidden md:flex gap-6 text-sm text-slate-500">
          {navLinks.map((link) => (
            <a key={link} href={`/${link.toLowerCase()}`} className="hover:text-blue-600 transition-colors">
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-50 transition-colors">
            ↗ Share
          </button>
          <button className="flex items-center gap-1.5 bg-[#378ADD] text-white rounded-xl px-3 py-1.5 text-xs font-medium hover:bg-blue-600 transition-colors">
            ✏️ Edit
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs text-blue-100 font-medium">RK</div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Trip header */}
        <div className="bg-[#0c1a2e] rounded-2xl p-6 mb-6 flex items-end justify-between relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full border border-blue-500/20 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl">
                {trip.emoji}
              </div>
              <div>
                <h1 className="font-serif text-2xl text-white">{trip.name}</h1>
                <p className="text-sm text-blue-300/70">📅 {trip.dates} · 👥 {trip.travelers} travelers</p>
              </div>
            </div>
            <div className="flex gap-6">
              {[
                { label: "Days", value: days.length },
                { label: "Activities", value: totalActivities },
                { label: "Budget", value: trip.totalBudget },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-lg font-medium text-white">{s.value}</div>
                  <div className="text-xs text-blue-400/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 font-serif text-5xl text-white/10 tracking-widest select-none hidden md:block">GOA</div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          {/* Day filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveDay(null)}
              className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all whitespace-nowrap ${
                activeDay === null
                  ? "bg-[#0c1a2e] text-white border-[#0c1a2e]"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              }`}
            >
              All Days
            </button>
            {days.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDay(d.id)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all whitespace-nowrap ${
                  activeDay === d.id
                    ? "bg-[#0c1a2e] text-white border-[#0c1a2e]"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
            {[
              { key: "timeline", label: "⏱ Timeline" },
              { key: "list", label: "☰ List" },
            ].map((v) => (
              <button
                key={v.key}
                onClick={() => setView(v.key)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  view === v.key ? "bg-white text-[#0c1a2e] shadow-sm" : "text-slate-500"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        {view === "timeline" && (
          <div className="space-y-8">
            {visibleDays.map((day) => (
              <div key={day.id}>
                {/* Day header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#0c1a2e] text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                    {day.label}
                  </div>
                  <span className="text-sm text-slate-500">{day.date}</span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
                    📍 {day.city}
                  </span>
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs text-slate-400">{day.activities.length} activities</span>
                </div>

                {/* Timeline */}
                <div className="relative ml-4">
                  <div className="absolute left-[72px] top-0 bottom-0 w-px bg-slate-200 pointer-events-none" />
                  <div className="space-y-3">
                    {day.activities.map((a) => (
                      <div key={a.id} className="flex gap-4 items-start">
                        {/* Time */}
                        <div className="w-16 text-right flex-shrink-0 pt-3">
                          <span className="text-xs text-slate-400">{a.time}</span>
                        </div>
                        {/* Dot */}
                        <div
                          className="w-3.5 h-3.5 rounded-full flex-shrink-0 mt-3.5 z-10 ring-2 ring-white"
                          style={{ backgroundColor: a.color }}
                        />
                        {/* Card */}
                        <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-4 hover:border-slate-200 transition-colors">
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                              <span>{a.icon}</span>
                              {a.name}
                            </div>
                          </div>
                          <p className="text-xs text-slate-400 flex items-center gap-1 mb-1.5">
                            📍 {a.location}
                          </p>
                          <p className="text-xs text-slate-500 leading-relaxed mb-3">{a.desc}</p>
                          <div className="flex gap-2">
                            <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-50 rounded-full px-2.5 py-1">
                              ⏱ {a.duration}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-50 rounded-full px-2.5 py-1">
                              💰 {a.cost}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {view === "list" && (
          <div className="space-y-3">
            {visibleDays.map((day) =>
              day.activities.map((a) => (
                <div key={a.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ backgroundColor: a.color + "20" }}
                  >
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                        {day.label}
                      </span>
                      <span className="text-xs text-slate-400">{a.time}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">{a.name}</p>
                    <p className="text-xs text-slate-400">📍 {a.location}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs text-slate-500">{a.duration}</div>
                    <div className="text-xs font-medium text-[#0c1a2e] mt-0.5">{a.cost}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
