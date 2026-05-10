import { useState } from "react";

const trips = [
  { id: 1, name: "Goa Getaway", emoji: "🏖️" },
  { id: 2, name: "Manali Road Trip", emoji: "🏔️" },
  { id: 3, name: "Kerala Backwaters", emoji: "🛶" },
];

const stopsByTrip = {
  1: ["General", "Day 1 – North Goa", "Day 2 – Fort Aguada", "Day 3 – South Goa", "Day 4 – Dudhsagar"],
  2: ["General", "Day 1 – Delhi to Manali", "Day 2 – Solang Valley", "Day 3 – Rohtang Pass"],
  3: ["General", "Day 1 – Kochi", "Day 2 – Alleppey Houseboat", "Day 3 – Kumarakom"],
};

const seedNotes = [
  { id: 1, tripId: 1, stop: "General", title: "Hotel check-in time", content: "Taj Fort Aguada check-in is 2 PM. Early check-in possible on request — call ahead. Reservation number: TFA-20260612-RK.", pinned: true, createdAt: "May 10, 2026 · 9:14 AM" },
  { id: 2, tripId: 1, stop: "Day 1 – North Goa", title: "Calangute beach tips", content: "Rent a scooter from the resort — ₹400/day. Park near the Calangute bus stand for free. Try the prawn curry at Martin's Corner for lunch. Avoid the tourist traps near the main beach entrance.", pinned: false, createdAt: "May 9, 2026 · 3:42 PM" },
  { id: 3, tripId: 1, stop: "Day 2 – Fort Aguada", title: "Sunset cruise booking", content: "Booked through Goa Watersports — confirm 1 day before. Contact: +91 98765 43210. Meeting point: Panaji Jetty, 3 PM sharp. Wear comfortable clothes, no heels.", pinned: false, createdAt: "May 8, 2026 · 7:01 PM" },
  { id: 4, tripId: 2, stop: "General", title: "Road condition update", content: "Rohtang Pass road opens daily at 9 AM. Check HRTC website for updates. Carry warm layers even in May — temp drops to 0°C near the pass.", pinned: true, createdAt: "May 7, 2026 · 11:20 AM" },
];

const navLinks = ["Dashboard", "Trips", "Budget", "Community"];

let nextId = 100;

export default function TripNotes() {
  const [notes, setNotes] = useState(seedNotes);
  const [activeTrip, setActiveTrip] = useState(1);
  const [activeStop, setActiveStop] = useState("General");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null); // null = not editing; "new" = new note form
  const [draft, setDraft] = useState({ title: "", content: "", stop: "General" });
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const stops = stopsByTrip[activeTrip] || ["General"];

  const visibleNotes = notes
    .filter((n) => n.tripId === activeTrip && (activeStop === "All" || n.stop === activeStop))
    .filter((n) =>
      !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  const now = () => {
    const d = new Date();
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) +
      " · " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  };

  const saveNote = () => {
    if (!draft.content.trim()) return;
    if (editingId === "new") {
      setNotes((prev) => [
        {
          id: nextId++,
          tripId: activeTrip,
          stop: draft.stop,
          title: draft.title.trim() || "Untitled note",
          content: draft.content.trim(),
          pinned: false,
          createdAt: now(),
        },
        ...prev,
      ]);
    } else {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingId
            ? { ...n, title: draft.title.trim() || "Untitled note", content: draft.content.trim(), stop: draft.stop }
            : n
        )
      );
    }
    setEditingId(null);
    setDraft({ title: "", content: "", stop: "General" });
  };

  const startEdit = (note) => {
    setDraft({ title: note.title, content: note.content, stop: note.stop });
    setEditingId(note.id);
  };

  const startNew = () => {
    setDraft({ title: "", content: "", stop: activeStop === "All" ? "General" : activeStop });
    setEditingId("new");
  };

  const togglePin = (id) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setDeleteConfirmId(null);
  };

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

      <div className="max-w-5xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0">
          {/* Trip selector */}
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2 px-1">Trip</p>
          <div className="space-y-1 mb-5">
            {trips.map((t) => (
              <button
                key={t.id}
                onClick={() => { setActiveTrip(t.id); setActiveStop("General"); }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all text-left ${
                  activeTrip === t.id
                    ? "bg-[#0c1a2e] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{t.emoji}</span>
                <span className="truncate font-medium">{t.name}</span>
              </button>
            ))}
          </div>

          {/* Stop selector */}
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2 px-1">Stop / Day</p>
          <div className="space-y-1">
            <button
              onClick={() => setActiveStop("All")}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                activeStop === "All"
                  ? "bg-blue-50 text-blue-700 border border-blue-100"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              All notes
            </button>
            {stops.map((stop) => {
              const count = notes.filter((n) => n.tripId === activeTrip && n.stop === stop).length;
              return (
                <button
                  key={stop}
                  onClick={() => setActiveStop(stop)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all text-left ${
                    activeStop === stop
                      ? "bg-blue-50 text-blue-700 border border-blue-100"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  <span className="truncate">{stop}</span>
                  {count > 0 && (
                    <span className="text-xs bg-slate-200 text-slate-500 rounded-full px-1.5 py-0.5 flex-shrink-0 ml-1">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-5 gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 flex-1 max-w-xs">
              <span className="text-slate-400 text-xs">🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
                className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-400 bg-transparent"
              />
            </div>
            <button
              onClick={startNew}
              className="flex items-center gap-1.5 bg-[#378ADD] text-white text-xs px-4 py-2 rounded-xl font-medium hover:bg-blue-600 transition-colors"
            >
              + New note
            </button>
          </div>

          {/* New / Edit form */}
          {editingId !== null && (
            <div className="bg-white border border-blue-200 rounded-2xl p-5 mb-5 shadow-sm">
              <div className="mb-3">
                <label className="block text-xs text-slate-400 mb-1">Title (optional)</label>
                <input
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  placeholder="Note title..."
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs text-slate-400 mb-1">Stop / Day</label>
                <select
                  value={draft.stop}
                  onChange={(e) => setDraft({ ...draft, stop: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400"
                >
                  {stops.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-slate-400 mb-1">Note</label>
                <textarea
                  value={draft.content}
                  onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                  placeholder="Write your note, reminder, or info here..."
                  rows={4}
                  autoFocus
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 resize-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditingId(null); setDraft({ title: "", content: "", stop: "General" }); }}
                  className="flex-1 border border-slate-200 text-slate-500 py-2 rounded-xl text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNote}
                  className="flex-[2] bg-[#0c1a2e] text-white py-2 rounded-xl text-sm font-medium hover:bg-[#183a5e] transition-colors"
                >
                  {editingId === "new" ? "Save note" : "Update note"}
                </button>
              </div>
            </div>
          )}

          {/* Notes list */}
          {visibleNotes.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <div className="text-4xl mb-3">📝</div>
              <p className="text-sm font-medium">No notes yet</p>
              <p className="text-xs mt-1">Add hotel info, local contacts, or day-specific reminders.</p>
              <button onClick={startNew} className="mt-4 text-xs text-blue-500 hover:underline">
                + Create your first note
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {visibleNotes.map((note) => (
                <div
                  key={note.id}
                  className={`bg-white border rounded-2xl p-4 shadow-sm transition-colors ${
                    note.pinned ? "border-amber-200" : "border-slate-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {note.pinned && <span className="text-amber-500 text-xs">📌</span>}
                        <h3 className="text-sm font-medium text-slate-800">{note.title}</h3>
                        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                          {note.stop}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => togglePin(note.id)}
                        title={note.pinned ? "Unpin" : "Pin"}
                        className={`text-xs p-1.5 rounded-lg transition-colors ${
                          note.pinned ? "text-amber-500 hover:bg-amber-50" : "text-slate-300 hover:text-amber-400 hover:bg-amber-50"
                        }`}
                      >
                        📌
                      </button>
                      <button
                        onClick={() => startEdit(note)}
                        className="text-xs p-1.5 rounded-lg text-slate-300 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(note.id)}
                        className="text-xs p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{note.content}</p>
                  <p className="text-xs text-slate-400 mt-2.5">🕐 {note.createdAt}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Delete confirm modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 text-center">
            <div className="text-3xl mb-3">🗑️</div>
            <h3 className="font-serif font-semibold text-[#0c1a2e] mb-2">Delete this note?</h3>
            <p className="text-sm text-slate-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 border border-slate-200 text-slate-500 py-2 rounded-xl text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteNote(deleteConfirmId)}
                className="flex-1 bg-red-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
