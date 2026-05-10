import { useState } from "react";

const trips = [
  { id: 1, name: "Manali Road Trip", emoji: "🏔️", total: 52000, spent: 38400 },
  { id: 2, name: "Goa Getaway", emoji: "🏖️", total: 38000, spent: 8200 },
  { id: 3, name: "Rajasthan Heritage", emoji: "🏛️", total: 61500, spent: 61500 },
];

const categoryData = {
  1: [
    { name: "Accommodation", icon: "🏨", budget: 18000, spent: 14200, color: "#378ADD" },
    { name: "Transport", icon: "🚗", budget: 12000, spent: 11800, color: "#6366f1" },
    { name: "Food", icon: "🍽️", budget: 8000, spent: 7200, color: "#f59e0b" },
    { name: "Activities", icon: "🎯", budget: 6000, spent: 3800, color: "#10b981" },
    { name: "Shopping", icon: "🛍️", budget: 4000, spent: 1200, color: "#ec4899" },
    { name: "Misc", icon: "📦", budget: 4000, spent: 200, color: "#8b5cf6" },
  ],
  2: [
    { name: "Accommodation", icon: "🏨", budget: 16000, spent: 4000, color: "#378ADD" },
    { name: "Transport", icon: "🚗", budget: 8000, spent: 2200, color: "#6366f1" },
    { name: "Food", icon: "🍽️", budget: 6000, spent: 1200, color: "#f59e0b" },
    { name: "Activities", icon: "🎯", budget: 4000, spent: 500, color: "#10b981" },
    { name: "Shopping", icon: "🛍️", budget: 2000, spent: 200, color: "#ec4899" },
    { name: "Misc", icon: "📦", budget: 2000, spent: 100, color: "#8b5cf6" },
  ],
  3: [
    { name: "Accommodation", icon: "🏨", budget: 22000, spent: 22000, color: "#378ADD" },
    { name: "Transport", icon: "🚗", budget: 14000, spent: 14000, color: "#6366f1" },
    { name: "Food", icon: "🍽️", budget: 10000, spent: 10800, color: "#f59e0b" },
    { name: "Activities", icon: "🎯", budget: 8000, spent: 8200, color: "#10b981" },
    { name: "Shopping", icon: "🛍️", budget: 4000, spent: 4200, color: "#ec4899" },
    { name: "Misc", icon: "📦", budget: 3500, spent: 2300, color: "#8b5cf6" },
  ],
};

const expenses = [
  { id: 1, tripId: 1, desc: "Hotel Manali Heights – 3 nights", cat: "Accommodation", icon: "🏨", amount: 5400, date: "May 5" },
  { id: 2, tripId: 1, desc: "Fuel – Delhi to Manali", cat: "Transport", icon: "🚗", amount: 3200, date: "May 5" },
  { id: 3, tripId: 1, desc: "Café Solang breakfast", cat: "Food", icon: "🍽️", amount: 680, date: "May 6" },
  { id: 4, tripId: 1, desc: "Snow scooter rental", cat: "Activities", icon: "🎯", amount: 1200, date: "May 7" },
  { id: 5, tripId: 2, desc: "Air tickets (return)", cat: "Transport", icon: "🚗", amount: 2200, date: "Jun 12" },
  { id: 6, tripId: 2, desc: "Beach resort deposit", cat: "Accommodation", icon: "🏨", amount: 4000, date: "Jun 12" },
];

const navLinks = ["Dashboard", "Trips", "Budget", "Community"];

export default function Budget() {
  const [selectedTrip, setSelectedTrip] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExpense, setNewExpense] = useState({ desc: "", cat: "Accommodation", amount: "" });

  const trip = trips.find((t) => t.id === selectedTrip);
  const categories = categoryData[selectedTrip];
  const tripExpenses = expenses.filter((e) => e.tripId === selectedTrip);
  const remaining = trip.total - trip.spent;
  const pct = Math.round((trip.spent / trip.total) * 100);

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
            <a
              key={link}
              href={`/${link.toLowerCase()}`}
              className={`hover:text-blue-600 transition-colors ${link === "Budget" ? "text-blue-600 font-medium" : ""}`}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs text-blue-100 font-medium">
          RK
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-serif font-semibold text-[#0c1a2e]">Budget Tracker</h1>
            <p className="text-sm text-slate-500 mt-0.5">Monitor spending across all your trips</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#378ADD] text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
          >
            <span className="text-lg leading-none">+</span> Add Expense
          </button>
        </div>

        {/* Trip selector */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-1">
          {trips.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTrip(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
                selectedTrip === t.id
                  ? "bg-[#0c1a2e] text-white border-[#0c1a2e]"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
              }`}
            >
              <span>{t.emoji}</span> {t.name}
            </button>
          ))}
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Budget", value: `₹${trip.total.toLocaleString()}`, sub: "set budget", color: "text-slate-800" },
            { label: "Spent So Far", value: `₹${trip.spent.toLocaleString()}`, sub: `${pct}% used`, color: "text-[#378ADD]" },
            {
              label: "Remaining",
              value: `₹${Math.abs(remaining).toLocaleString()}`,
              sub: remaining < 0 ? "over budget!" : "left to spend",
              color: remaining < 0 ? "text-red-500" : "text-emerald-600",
            },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <p className="text-xs text-slate-400 mb-1">{card.label}</p>
              <p className={`text-2xl font-serif font-semibold ${card.color}`}>{card.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6 shadow-sm">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-slate-700">Overall Spending</span>
            <span className={`font-semibold ${pct > 90 ? "text-red-500" : "text-slate-700"}`}>{pct}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${pct > 90 ? "bg-red-400" : "bg-[#378ADD]"}`}
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Category breakdown */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h2 className="font-serif font-semibold text-[#0c1a2e] mb-4">By Category</h2>
            <div className="space-y-4">
              {categories.map((cat) => {
                const catPct = Math.min(Math.round((cat.spent / cat.budget) * 100), 100);
                const over = cat.spent > cat.budget;
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <div className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span className="text-slate-700 font-medium">{cat.name}</span>
                      </div>
                      <span className={`text-xs font-medium ${over ? "text-red-500" : "text-slate-500"}`}>
                        ₹{cat.spent.toLocaleString()} / ₹{cat.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${catPct}%`, backgroundColor: over ? "#ef4444" : cat.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent expenses */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h2 className="font-serif font-semibold text-[#0c1a2e] mb-4">Recent Expenses</h2>
            {tripExpenses.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">No expenses logged yet</p>
            ) : (
              <div className="space-y-3">
                {tripExpenses.map((exp) => (
                  <div key={exp.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-sm">{exp.icon}</div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">{exp.desc}</p>
                        <p className="text-xs text-slate-400">{exp.cat} · {exp.date}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">₹{exp.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add expense modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-serif font-semibold text-[#0c1a2e]">Add Expense</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700 text-xl">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Description</label>
                <input
                  value={newExpense.desc}
                  onChange={(e) => setNewExpense({ ...newExpense, desc: e.target.value })}
                  placeholder="e.g. Hotel check-in"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Category</label>
                <select
                  value={newExpense.cat}
                  onChange={(e) => setNewExpense({ ...newExpense, cat: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400"
                >
                  {["Accommodation", "Transport", "Food", "Activities", "Shopping", "Misc"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  placeholder="0"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full bg-[#378ADD] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Save Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
