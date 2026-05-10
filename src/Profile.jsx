import { useState } from "react";

const stats = [
  { label: "Trips Taken", value: "12" },
  { label: "Countries", value: "7" },
  { label: "Cities", value: "23" },
  { label: "Days Traveled", value: "84" },
];

const pastTrips = [
  { name: "Manali Road Trip", emoji: "🏔️", dates: "May 5–14, 2026", travelers: 4, status: "ongoing" },
  { name: "Goa Getaway", emoji: "🏖️", dates: "Jun 12–18, 2026", travelers: 2, status: "upcoming" },
  { name: "Rajasthan Heritage", emoji: "🏛️", dates: "Mar 1–9, 2026", travelers: 3, status: "completed" },
  { name: "Kerala Backwaters", emoji: "🛶", dates: "Dec 20–27, 2025", travelers: 2, status: "completed" },
  { name: "Meghalaya Trek", emoji: "🌿", dates: "Oct 2–10, 2025", travelers: 5, status: "completed" },
];

const badges = [
  { icon: "🌍", label: "Globe Trotter", desc: "Visited 7+ countries" },
  { icon: "🏔️", label: "Peak Seeker", desc: "3 mountain trips" },
  { icon: "✈️", label: "Frequent Flyer", desc: "10+ trips planned" },
  { icon: "🤝", label: "Group Leader", desc: "Led 5+ group trips" },
];

const navLinks = ["Dashboard", "Trips", "Budget", "Community"];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("trips");
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Rohan Kapoor",
    username: "@rohanktravels",
    bio: "Adventure seeker · Budget traveler · Always planning the next escape 🧳",
    location: "Mumbai, India",
    website: "rohanktravels.com",
  });
  const [draft, setDraft] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...draft });
    setEditing(false);
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
        <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs text-blue-100 font-medium">
          RK
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
          {/* Cover */}
          <div className="h-28 bg-gradient-to-r from-[#0c1a2e] via-[#1a3a5c] to-[#378ADD]" />

          <div className="px-6 pb-6">
            {/* Avatar row */}
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-blue-700 border-4 border-white flex items-center justify-center text-2xl text-white font-semibold shadow-md">
                RK
              </div>
              <button
                onClick={() => (editing ? handleSave() : setEditing(true))}
                className={`text-sm px-4 py-2 rounded-xl font-medium transition-colors ${
                  editing
                    ? "bg-[#378ADD] text-white hover:bg-blue-600"
                    : "border border-slate-200 text-slate-600 hover:border-blue-300"
                }`}
              >
                {editing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>

            {editing ? (
              <div className="space-y-3">
                {[
                  { label: "Name", key: "name" },
                  { label: "Username", key: "username" },
                  { label: "Bio", key: "bio" },
                  { label: "Location", key: "location" },
                  { label: "Website", key: "website" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-xs text-slate-400 mb-1">{label}</label>
                    <input
                      value={draft[key]}
                      onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400"
                    />
                  </div>
                ))}
                <button
                  onClick={() => { setDraft({ ...profile }); setEditing(false); }}
                  className="text-sm text-slate-400 hover:text-slate-600 mt-1"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-serif font-semibold text-[#0c1a2e]">{profile.name}</h2>
                <p className="text-sm text-blue-500 mb-2">{profile.username}</p>
                <p className="text-sm text-slate-600 mb-3">{profile.bio}</p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                  <span>📍 {profile.location}</span>
                  <span>🔗 {profile.website}</span>
                  <span>📅 Joined April 2024</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 text-center shadow-sm">
              <p className="text-2xl font-serif font-semibold text-[#0c1a2e]">{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6">
          {["trips", "badges"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-sm py-2 rounded-lg font-medium transition-all capitalize ${
                activeTab === tab ? "bg-white text-[#0c1a2e] shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab === "trips" ? "My Trips" : "Badges"}
            </button>
          ))}
        </div>

        {activeTab === "trips" && (
          <div className="space-y-3">
            {pastTrips.map((trip) => (
              <div key={trip.name} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl">{trip.emoji}</div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{trip.name}</p>
                    <p className="text-xs text-slate-400">{trip.dates} · {trip.travelers} travelers</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    trip.status === "ongoing"
                      ? "bg-green-100 text-green-700"
                      : trip.status === "upcoming"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {trip.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "badges" && (
          <div className="grid grid-cols-2 gap-4">
            {badges.map((b) => (
              <div key={b.label} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">{b.icon}</div>
                <div>
                  <p className="font-medium text-slate-800 text-sm">{b.label}</p>
                  <p className="text-xs text-slate-400">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
