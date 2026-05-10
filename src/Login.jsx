import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", form);
    // TODO: call authService.login(form)
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex rounded-3xl shadow-xl overflow-hidden">

        {/* Left panel */}
        <div className="hidden md:flex flex-col justify-end flex-[1.1] bg-[#0c1a2e] relative p-10 overflow-hidden">
          {/* decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-blue-500/20 pointer-events-none" />
          <div className="absolute top-8 right-8 w-36 h-36 rounded-full border border-blue-500/10 pointer-events-none" />
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(55,138,221,0.4) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 rounded-full px-3 py-1 text-xs text-blue-300 mb-4">
              ✈ 120+ countries covered
            </span>
            <h2 className="font-serif text-3xl text-white leading-snug mb-2">
              Plan your next<br />adventure, effortlessly.
            </h2>
            <p className="text-sm text-blue-300/70 leading-relaxed mb-6">
              Itineraries, budgets, and communities — all in one loop.
            </p>
            <div className="flex gap-8">
              {[["50K+", "Trips planned"], ["12K", "Travelers"], ["4.9★", "Avg rating"]].map(
                ([num, lbl]) => (
                  <div key={lbl}>
                    <div className="text-lg font-medium text-white">{num}</div>
                    <div className="text-xs text-blue-400/60 mt-0.5">{lbl}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-white flex flex-col justify-center px-10 py-12">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#0c1a2e] rounded-lg flex items-center justify-center text-blue-400 text-sm">
              ✈
            </div>
            <span className="font-serif text-lg font-medium text-slate-800">Traveloop</span>
          </div>

          <h1 className="text-2xl font-medium text-slate-900 mb-1">Welcome back</h1>
          <p className="text-sm text-slate-500 mb-7">Sign in to continue your journey</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="rounded"
                />
                Remember me
              </label>
              <a href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0c1a2e] hover:bg-[#183a5e] text-white rounded-xl py-2.5 text-sm font-medium transition-colors mt-1 flex items-center justify-center gap-2"
            >
              ↪ Sign in
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <button className="w-full flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <span>G</span> Continue with Google
          </button>

          <p className="text-center text-xs text-slate-500 mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
