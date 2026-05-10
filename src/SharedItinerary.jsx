import { useState } from "react";

const trip = {
  name: "Goa Getaway",
  emoji: "🏖️",
  author: { name: "Rohan Kapoor", handle: "@rohanktravels", initials: "RK", color: "bg-blue-700" },
  dates: "Jun 12–18, 2026",
  travelers: 2,
  totalBudget: "₹38,000",
  description: "A 5-day coastal escape through North and South Goa — beaches, forts, sunsets, and seafood.",
  tags: ["Beach", "Heritage", "Couple", "Budget-friendly"],
  views: 284,
  copies: 47,
  publicUrl: "traveloop.app/trip/goa-getaway-rk",
};

const days = [
  {
    id: 1, label: "Day 1", date: "Thu, Jun 12", city: "North Goa",
    activities: [
      { id: 1, time: "09:00 AM", name: "Check-in at Resort", icon: "✈️", location: "Taj Fort Aguada, Sinquerim", duration: "1 hr", cost: "₹12,000/night", color: "#378ADD" },
      { id: 2, time: "11:30 AM", name: "Calangute Beach", icon: "🌊", location: "Calangute, North Goa", duration: "3 hrs", cost: "Free", color: "#10b981" },
      { id: 3, time: "07:00 PM", name: "Dinner – Fisherman's Wharf", icon: "🍽️", location: "Cavelossim, South Goa", duration: "2 hrs", cost: "~₹1,800/person", color: "#f59e0b" },
    ],
  },
  {
    id: 2, label: "Day 2", date: "Fri, Jun 13", city: "North Goa",
    activities: [
      { id: 4, time: "10:00 AM", name: "Fort Aguada", icon: "🏯", location: "Sinquerim, Goa", duration: "2 hrs", cost: "₹25 entry", color: "#8b5cf6" },
      { id: 5, time: "03:00 PM", name: "Sunset Cruise", icon: "⛵", location: "Mandovi River", duration: "2 hrs", cost: "₹500/person", color: "#ec4899" },
    ],
  },
  {
    id: 3, label: "Day 3", date: "Sat, Jun 14", city: "South Goa",
    activities: [
      { id: 6, time: "09:00 AM", name: "Palolem Beach", icon: "🌴", location: "Canacona, South Goa", duration: "4 hrs", cost: "Free", color: "#10b981" },
      { id: 7, time: "02:00 PM", name: "Cotigao Wildlife Sanctuary", icon: "🦎", location: "Canacona, Goa", duration: "3 hrs", cost: "₹30 entry", color: "#f59e0b" },
    ],
  },
  {
    id: 4, label: "Day 4", date: "Sun, Jun 15", city: "South Goa",
    activities: [
      { id: 8, time: "10:00 AM", name: "Dudhsagar Falls", icon: "💧", location: "Mollem, Goa", duration: "5 hrs", cost: "₹400/person", color: "#378ADD" },
    ],
  },
  {
    id: 5, label: "Day 5", date: "Mon, Jun 16", city: "North Goa",
    activities: [
      { id: 9, time: "11:00 AM", name: "Anjuna Flea Market", icon: "🛍️", location: "Anjuna, North Goa", duration: "2 hrs", cost: "Free entry", color: "#ec4899" },
      { id: 10, time: "07:30 PM", name: "Farewell Dinner at Thalassa", icon: "🥂", location: "Vagator, Goa", duration: "2.5 hrs", cost: "~₹2,500/person", color: "#8b5cf6" },
    ],
  },
];

export default function SharedItinerary() {
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);

  const handleCopyTrip = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(trip.publicUrl);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const totalActivities = days.reduce((sum, d) => sum + d.activities.length, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Slim public banner */}
      <div className="bg-[#0c1a2e] text-center py-2 px-4">
        <p className="text-xs text-blue-300/80">
          ✈ You&apos;re viewing a public Traveloop itinerary ·{" "}
          <a href="/login" className="text-blue-300 underline hover:text-white transition-colors">
            Sign up free
          </a>{" "}
          to plan your own trip
        </p>
      </div>

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100 px-6 h-14 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#0c1a2e] rounded-lg flex items-center justify-center text-blue-400 text-xs">✈</div>
          <span className="font-serif font-medium text-slate-800">Traveloop</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowShareSheet(true)}
            className="flex items-center gap-1.5 border border-slate-200 text-slate-500 text-xs px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
          >
            ↗ Share
          </button>
          <button
            onClick={handleCopyTrip}
            className={`flex items-center gap-1.5 text-xs px-4 py-2 rounded-xl font-medium transition-colors ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-[#378ADD] text-white hover:bg-blue-600"
            }`}
          >
            {copied ? "✓ Copied to My Trips!" : "📋 Copy Trip"}
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Trip hero card */}
        <div className="bg-[#0c1a2e] rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full border border-blue-500/20 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                {trip.emoji}
              </div>
              <div className="flex-1">
                <h1 className="font-serif text-2xl text-white mb-1">{trip.name}</h1>
                <p className="text-sm text-blue-300/70">{trip.description}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {trip.tags.map((tag) => (
                <span key={tag} className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Days", value: days.length },
                { label: "Activities", value: totalActivities },
                { label: "Travelers", value: trip.travelers },
                { label: "Budget", value: trip.totalBudget },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-lg font-medium text-white">{s.value}</div>
                  <div className="text-xs text-blue-400/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Author + meta */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 mb-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full ${trip.author.color} flex items-center justify-center text-xs text-white font-medium flex-shrink-0`}>
              {trip.author.initials}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">{trip.author.name}</p>
              <p className="text-xs text-slate-400">{trip.author.handle}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>👁 {trip.views} views</span>
            <span>📋 {trip.copies} copies</span>
            <span>📅 {trip.dates}</span>
          </div>
        </div>

        {/* Public URL bar */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 mb-6 shadow-sm flex items-center gap-3">
          <span className="text-xs text-slate-400 flex-shrink-0">🔗 Public link:</span>
          <span className="text-xs text-slate-600 flex-1 truncate font-mono">{trip.publicUrl}</span>
          <button
            onClick={handleCopyUrl}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors flex-shrink-0 ${
              urlCopied
                ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                : "border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            {urlCopied ? "✓ Copied" : "Copy URL"}
          </button>
        </div>

        {/* Itinerary — read-only */}
        <h2 className="font-serif font-semibold text-[#0c1a2e] text-lg mb-4">Itinerary</h2>
        <div className="space-y-6">
          {days.map((day) => (
            <div key={day.id}>
              {/* Day header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#0c1a2e] text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                  {day.label}
                </div>
                <span className="text-sm text-slate-500">{day.date}</span>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
                  📍 {day.city}
                </span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Activities */}
              <div className="relative ml-4">
                <div className="absolute left-[68px] top-0 bottom-0 w-px bg-slate-200 pointer-events-none" />
                <div className="space-y-3">
                  {day.activities.map((a) => (
                    <div key={a.id} className="flex gap-4 items-start">
                      <div className="w-12 text-right flex-shrink-0 pt-3">
                        <span className="text-xs text-slate-400">{a.time}</span>
                      </div>
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0 mt-3.5 z-10 ring-2 ring-white"
                        style={{ backgroundColor: a.color }}
                      />
                      <div className="flex-1 bg-white border border-slate-100 rounded-xl p-3.5">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-800 mb-1">
                          <span>{a.icon}</span>
                          {a.name}
                        </div>
                        <p className="text-xs text-slate-400 mb-2">📍 {a.location}</p>
                        <div className="flex gap-2">
                          <span className="text-xs text-slate-400 bg-slate-50 rounded-full px-2.5 py-1">⏱ {a.duration}</span>
                          <span className="text-xs text-slate-400 bg-slate-50 rounded-full px-2.5 py-1">💰 {a.cost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 bg-[#0c1a2e] rounded-2xl p-6 text-center">
          <p className="font-serif text-lg text-white mb-1">Inspired by this trip?</p>
          <p className="text-sm text-blue-300/70 mb-4">Copy it to your account and personalise it for free.</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleCopyTrip}
              className={`text-sm px-5 py-2.5 rounded-xl font-medium transition-colors ${
                copied ? "bg-emerald-500 text-white" : "bg-[#378ADD] text-white hover:bg-blue-600"
              }`}
            >
              {copied ? "✓ Copied!" : "📋 Copy this trip"}
            </button>
            <a href="/login" className="text-sm px-5 py-2.5 rounded-xl font-medium border border-blue-500/30 text-blue-300 hover:bg-blue-500/10 transition-colors">
              Sign up free
            </a>
          </div>
        </div>
      </div>

      {/* Share sheet modal */}
      {showShareSheet && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-serif font-semibold text-[#0c1a2e]">Share this trip</h3>
              <button onClick={() => setShowShareSheet(false)} className="text-slate-400 hover:text-slate-700 text-xl">×</button>
            </div>
            <div className="space-y-3">
              {[
                { label: "Copy link", icon: "🔗", action: handleCopyUrl },
                { label: "Share on WhatsApp", icon: "💬", action: () => {} },
                { label: "Share on Instagram", icon: "📸", action: () => {} },
                { label: "Share on Twitter / X", icon: "𝕏", action: () => {} },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => { opt.action(); setShowShareSheet(false); }}
                  className="w-full flex items-center gap-3 p-3 border border-slate-100 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                >
                  <span className="text-lg">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
