import { useState } from "react";

const posts = [
  {
    id: 1,
    user: { name: "Priya Sharma", handle: "@priya_wanders", initials: "PS", color: "bg-pink-500" },
    time: "2h ago",
    content: "Just got back from Spiti Valley — absolutely mind-blowing! The roads are tough but totally worth it. Pro tip: carry enough cash since there are no ATMs after Kaza 💸",
    tags: ["Spiti", "HimachalPradesh", "OffBeat"],
    likes: 48,
    comments: 12,
    liked: false,
  },
  {
    id: 2,
    user: { name: "Arjun Mehta", handle: "@arjuntravels", initials: "AM", color: "bg-emerald-600" },
    time: "5h ago",
    content: "Planning a Northeast India circuit — Meghalaya → Nagaland → Arunachal. Anyone done this route? Looking for permit advice for Arunachal especially 🙏",
    tags: ["Northeast", "Meghalaya", "TravelHelp"],
    likes: 31,
    comments: 27,
    liked: false,
  },
  {
    id: 3,
    user: { name: "Kavita Nair", handle: "@kavita_roams", initials: "KN", color: "bg-purple-600" },
    time: "1d ago",
    content: "Monsoon travel is so underrated! Visited Coorg last weekend — the waterfalls were insane 🌊 Yes it rained a lot but the whole thing felt magical. Would 100% recommend.",
    tags: ["Coorg", "Monsoon", "Karnataka"],
    likes: 94,
    comments: 18,
    liked: true,
  },
  {
    id: 4,
    user: { name: "Rohan Kapoor", handle: "@rohanktravels", initials: "RK", color: "bg-blue-700" },
    time: "2d ago",
    content: "Manali day 3 update: Hit Rohtang Pass today. Snow was insane and the views just don't get old. Road conditions slightly dicey post rain, so check weather before going up 🏔️",
    tags: ["Manali", "RohtangPass", "TripUpdate"],
    likes: 67,
    comments: 9,
    liked: false,
  },
];

const trending = ["#Spiti2026", "#NortheastCircuit", "#MonsoonTravel", "#BudgetBackpacker", "#SoloTravel"];

const navLinks = ["Dashboard", "Trips", "Budget", "Community"];

export default function Community() {
  const [postLikes, setPostLikes] = useState(
    posts.reduce((acc, p) => ({ ...acc, [p.id]: { count: p.likes, liked: p.liked } }), {})
  );
  const [filter, setFilter] = useState("latest");
  const [newPost, setNewPost] = useState("");
  const [feed, setFeed] = useState(posts);

  const toggleLike = (id) => {
    setPostLikes((prev) => ({
      ...prev,
      [id]: { count: prev[id].liked ? prev[id].count - 1 : prev[id].count + 1, liked: !prev[id].liked },
    }));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    const p = {
      id: Date.now(),
      user: { name: "Rohan Kapoor", handle: "@rohanktravels", initials: "RK", color: "bg-blue-700" },
      time: "just now",
      content: newPost,
      tags: [],
      likes: 0,
      comments: 0,
      liked: false,
    };
    setFeed([p, ...feed]);
    setPostLikes((prev) => ({ ...prev, [p.id]: { count: 0, liked: false } }));
    setNewPost("");
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
            <a
              key={link}
              href={`/${link.toLowerCase()}`}
              className={`hover:text-blue-600 transition-colors ${link === "Community" ? "text-blue-600 font-medium" : ""}`}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs text-blue-100 font-medium">RK</div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Main feed */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-2xl font-serif font-semibold text-[#0c1a2e]">Community</h1>
              <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
                {["latest", "popular"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-xs px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                      filter === f ? "bg-white text-[#0c1a2e] shadow-sm" : "text-slate-500"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Compose */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-5 shadow-sm">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-xs text-white font-medium flex-shrink-0">RK</div>
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share a travel tip, ask for help, or post an update..."
                    rows={3}
                    className="w-full text-sm text-slate-700 outline-none resize-none placeholder-slate-400"
                  />
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                    <div className="flex gap-3 text-slate-400 text-sm">
                      <button className="hover:text-slate-700">📷</button>
                      <button className="hover:text-slate-700">#️⃣</button>
                      <button className="hover:text-slate-700">📍</button>
                    </div>
                    <button
                      onClick={handlePost}
                      className="bg-[#378ADD] text-white text-xs px-4 py-1.5 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feed */}
            <div className="space-y-4">
              {feed.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-full ${post.user.color} flex items-center justify-center text-xs text-white font-medium flex-shrink-0`}>
                      {post.user.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-medium text-sm text-slate-800">{post.user.name}</span>
                        <span className="text-xs text-slate-400">{post.user.handle}</span>
                        <span className="text-xs text-slate-300 ml-auto flex-shrink-0">{post.time}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed mb-3">{post.content}</p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-5 pt-2 border-t border-slate-50">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs transition-colors ${
                        postLikes[post.id]?.liked ? "text-red-500" : "text-slate-400 hover:text-red-400"
                      }`}
                    >
                      <span>{postLikes[post.id]?.liked ? "❤️" : "🤍"}</span>
                      <span>{postLikes[post.id]?.count}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-500 transition-colors">
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-500 transition-colors ml-auto">
                      <span>↗</span> Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-64 flex-shrink-0 hidden lg:block space-y-4">
            {/* Trending */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <h3 className="font-serif font-semibold text-[#0c1a2e] text-sm mb-3">Trending Tags</h3>
              <div className="space-y-2">
                {trending.map((tag, i) => (
                  <div key={tag} className="flex items-center justify-between">
                    <span className="text-sm text-blue-500 hover:underline cursor-pointer">{tag}</span>
                    <span className="text-xs text-slate-300">#{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who to follow */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <h3 className="font-serif font-semibold text-[#0c1a2e] text-sm mb-3">Suggested Travelers</h3>
              <div className="space-y-3">
                {[
                  { name: "Sneha Patel", handle: "@sneha_explores", initials: "SP", color: "bg-orange-500" },
                  { name: "Vikram Das", handle: "@vikramgoeswest", initials: "VD", color: "bg-teal-600" },
                  { name: "Meera Iyer", handle: "@meera_wanderer", initials: "MI", color: "bg-rose-500" },
                ].map((u) => (
                  <div key={u.handle} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${u.color} flex items-center justify-center text-xs text-white font-medium flex-shrink-0`}>
                      {u.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-800 truncate">{u.name}</p>
                      <p className="text-xs text-slate-400 truncate">{u.handle}</p>
                    </div>
                    <button className="text-xs text-blue-500 hover:text-blue-700 font-medium flex-shrink-0">Follow</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
