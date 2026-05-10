import { useState } from "react";

const suggestedPlaces = [
  { name: "Calangute Beach", tag: "Goa · Beach · Popular", emoji: "🏖️", bg: "bg-[#1a3a5c]" },
  { name: "Fort Aguada", tag: "Goa · Heritage · Historic", emoji: "🏯", bg: "bg-[#0d2e1a]" },
  { name: "Dudhsagar Falls", tag: "Goa · Nature · Scenic", emoji: "🌊", bg: "bg-[#2d1a0e]" },
];

export default function CreateTrip() {
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: 1,
    notes: "",
  });
  const [added, setAdded] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAddPlace = (placeName) => {
    setAdded((a) => (a.includes(placeName) ? a.filter((n) => n !== placeName) : [...a, placeName]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Create trip:", { ...form, addedPlaces: added });
    // TODO: tripService.createTrip({ ...form, addedPlaces: added })
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100 px-6 h-14 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <a href="/trips" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors">
            ← Back
          </a>
          <span className="text-slate-200">|</span>
          <span className="text-sm font-medium text-slate-800">Create a new trip</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
          <span className="text-blue-600 font-medium">① Details</span>
          <span>→ ② Itinerary</span>
          <span>→ ③ Review</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5">
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-sm font-medium text-slate-800 flex items-center gap-2 mb-5">
              🗺️ Trip details
            </h2>

            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Trip name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Summer Goa 2026"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 mb-4"
              required
            />

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Start date</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">End date</label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Total budget</label>
                <input
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="₹ 0.00"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Travelers</label>
                <input
                  type="number"
                  name="travelers"
                  min={1}
                  value={form.travelers}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                />
              </div>
            </div>

            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Notes / description</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Add any details, ideas, or notes for this trip…"
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none mb-5"
            />

            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 border border-slate-200 rounded-xl py-2.5 text-sm text-slate-500 hover:bg-slate-50 transition-colors"
              >
                Save draft
              </button>
              <button
                type="submit"
                className="flex-[2] bg-[#0c1a2e] hover:bg-[#183a5e] text-white rounded-xl py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                → Continue to itinerary
              </button>
            </div>
          </div>
        </form>

        {/* Suggested Places */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 self-start">
          <h2 className="text-sm font-medium text-slate-800 flex items-center gap-2 mb-4">
            ✨ Suggested places
          </h2>
          {suggestedPlaces.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl mb-2.5 bg-slate-50"
            >
              <div className={`${p.bg} w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>
                {p.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-800">{p.name}</div>
                <div className="text-xs text-slate-400">{p.tag}</div>
              </div>
              <button
                onClick={() => handleAddPlace(p.name)}
                className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                  added.includes(p.name)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-blue-400 text-blue-600 hover:bg-blue-50"
                }`}
              >
                {added.includes(p.name) ? "✓ Added" : "+ Add"}
              </button>
            </div>
          ))}
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2">
            <span className="text-blue-500 text-sm mt-0.5">🤖</span>
            <p className="text-xs text-blue-800 leading-relaxed">
              AI recommendations available — get a personalized itinerary based on your interests and budget.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
