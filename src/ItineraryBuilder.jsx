import { useState } from "react";

const initialDays = [
  {
    id: 1,
    label: "Day 1",
    date: "Jun 12",
    activities: [
      { id: 1, time: "9:00 AM", name: "Check-in at resort", icon: "✈", location: "Taj Fort Aguada, Sinquerim", desc: "Arrive and check in, freshen up and have a welcome drink by the pool.", duration: "1 hr", cost: "₹12,000/night", color: "bg-blue-500" },
      { id: 2, time: "11:30 AM", name: "Calangute Beach", icon: "🌊", location: "Calangute, North Goa", desc: "Spend the afternoon at Goa's most popular beach. Swim, sunbathe, and try water sports.", duration: "3 hrs", cost: "Free", color: "bg-green-500" },
      { id: 3, time: "7:00 PM", name: "Dinner at Fisherman's Wharf", icon: "🍽️", location: "Cavelossim, South Goa", desc: "Waterfront Goan seafood dinner with live Fado music.", duration: "2 hrs", cost: "~₹1,800/person", color: "bg-amber-400" },
    ],
  },
  { id: 2, label: "Day 2", date: "Jun 13", activities: [{ id: 4, time: "10:00 AM", name: "Fort Aguada", icon: "🏯", location: "Sinquerim, Goa", desc: "Explore the 17th century Portuguese fort.", duration: "2 hrs", cost: "₹25 entry", color: "bg-purple-500" }, { id: 5, time: "3:00 PM", name: "Sunset cruise", icon: "⛵", location: "Mandovi River", desc: "Relaxing 2-hour cruise on the Mandovi with folk music.", duration: "2 hrs", cost: "₹500/person", color: "bg-orange-400" }] },
  { id: 3, label: "Day 3", date: "Jun 14", activities: [] },
  { id: 4, label: "Day 4", date: "Jun 15", activities: [] },
  { id: 5, label: "Day 5", date: "Jun 16", activities: [] },
];

export default function ItineraryBuilder() {
  const [days, setDays] = useState(initialDays);
  const [activeDay, setActiveDay] = useState(1);

  const currentDay = days.find((d) => d.id === activeDay);

  const removeActivity = (activityId) => {
    setDays((prev) =>
      prev.map((d) =>
        d.id === activeDay
          ? { ...d, activities: d.activities.filter((a) => a.id !== activityId) }
          : d
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100 px-6 h-14 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <a href="/trips" className="text-sm text-slate-400 hover:text-slate-700 flex items-center gap-1.5 transition-colors">
            ← Trips
          </a>
          <span className="text-slate-200">|</span>
          <span className="text-sm font-medium text-slate-800">Itinerary Builder</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Goa Getaway</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-50 transition-colors">
            ⬇ Export PDF
          </button>
          <button className="flex items-center gap-1.5 bg-[#0c1a2e] hover:bg-[#183a5e] text-white rounded-xl px-4 py-1.5 text-xs font-medium transition-colors">
            💾 Save
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Day sidebar */}
        <aside className="w-44 bg-white border-r border-slate-100 p-4 flex flex-col flex-shrink-0">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Days</p>
          <div className="flex flex-col gap-1.5 flex-1">
            {days.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDay(d.id)}
                className={`text-left px-3 py-2 rounded-xl transition-colors ${
                  activeDay === d.id
                    ? "bg-blue-50 border border-blue-100"
                    : "hover:bg-slate-50 border border-transparent"
                }`}
              >
                <div className={`text-xs font-medium ${activeDay === d.id ? "text-blue-700" : "text-slate-800"}`}>
                  {d.label}
                </div>
                <div className={`text-xs ${activeDay === d.id ? "text-blue-400" : "text-slate-400"}`}>{d.date}</div>
                <div className="text-xs text-slate-400">{d.activities.length} activit{d.activities.length !== 1 ? "ies" : "y"}</div>
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              const newId = Math.max(...days.map((d) => d.id)) + 1;
              setDays((prev) => [...prev, { id: newId, label: `Day ${newId}`, date: `Jun ${11 + newId}`, activities: [] }]);
            }}
            className="w-full mt-3 border border-dashed border-slate-200 rounded-xl py-2 text-xs text-slate-400 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1"
          >
            + Add day
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="font-serif text-xl text-slate-800">{currentDay.label} — Activities</h2>
              <p className="text-xs text-slate-400 mt-0.5">{currentDay.date}, 2026</p>
            </div>
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 text-xs font-medium transition-colors">
              + Add activity
            </button>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-[78px] top-0 bottom-0 w-px bg-slate-100 pointer-events-none" />
            {currentDay.activities.map((a) => (
              <div key={a.id} className="flex gap-4 mb-4">
                {/* Time */}
                <div className="w-14 text-right flex-shrink-0 pt-3">
                  <span className="text-xs text-slate-400 leading-tight">{a.time}</span>
                </div>
                {/* Dot */}
                <div
                  className={`w-3.5 h-3.5 rounded-full flex-shrink-0 mt-3.5 relative z-10 ring-2 ring-white ${a.color}`}
                />
                {/* Card */}
                <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-4 hover:border-slate-200 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                      <span>{a.icon}</span>
                      {a.name}
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <button className="hover:text-slate-500 transition-colors text-xs">✏️</button>
                      <button
                        onClick={() => removeActivity(a.id)}
                        className="hover:text-red-400 transition-colors text-xs"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mb-1.5">📍 {a.location}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{a.desc}</p>
                  <div className="flex gap-2 mt-3">
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

            {currentDay.activities.length === 0 && (
              <div className="text-center py-12 text-slate-400 ml-20">
                <div className="text-3xl mb-2">📋</div>
                <p className="text-sm">No activities yet. Click "Add activity" to get started.</p>
              </div>
            )}
          </div>

          <button className="w-full mt-3 border border-dashed border-slate-200 rounded-xl py-3 text-xs text-slate-400 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5">
            + Add activity to {currentDay.label}
          </button>
        </main>
      </div>
    </div>
  );
}
