import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(0,180,255,0.15) 0%, transparent 55%), radial-gradient(ellipse at 25% 70%, rgba(0,192,109,0.14) 0%, transparent 55%), radial-gradient(ellipse at 55% 90%, rgba(168,85,247,0.1) 0%, transparent 50%), linear-gradient(135deg, #080d16 0%, #0e1829 50%, #091420 100%)" }}
    >
      {/* Ambient orbs */}
      <div className="auth-orb auth-orb-1" style={{ animationDelay: "1s" }} />
      <div className="auth-orb auth-orb-2" style={{ animationDelay: "2.5s" }} />
      <div className="auth-orb auth-orb-3" style={{ animationDelay: "0.5s" }} />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />

      {/* Card */}
      <div className="glass-card relative w-full max-w-md rounded-3xl p-8 animate-fadeIn z-10">

        {/* Top accent line */}
        <div className="absolute top-0 left-8 right-8 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,180,255,0.6), transparent)" }}
        />

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-2xl blur-xl opacity-60"
              style={{ background: "linear-gradient(135deg, #00b4b4, #00b4ff)" }}
            />
            <div className="relative h-16 w-16 rounded-2xl flex items-center justify-center text-3xl animate-breathe"
              style={{ background: "linear-gradient(135deg, #00b4b4 0%, #00b4ff 100%)", boxShadow: "0 0 30px rgba(0,180,255,0.5), 0 8px 20px rgba(0,0,0,0.4)" }}
            >
              ✨
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1"
            style={{ background: "linear-gradient(135deg, #00e5cc, #00b4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            Create Account
          </h1>
          <p className="text-slate-400 text-sm">Join ChatConnect in seconds</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="input-glow w-full px-4 py-3 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input-glow w-full px-4 py-3 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="input-glow w-full px-4 py-3 rounded-xl text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-brand w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2 mt-2"
            style={{ background: "linear-gradient(135deg, #00b4b4 0%, #00b4ff 100%)", boxShadow: "0 4px 20px rgba(0,180,255,0.4)" }}
          >
            {loading ? <Spinner size="sm" /> : (
              <>
                Create Account
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <span className="text-xs text-slate-600">HAVE AN ACCOUNT?</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        </div>

        <p className="text-center text-sm text-slate-500">
          Already registered?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary-400 hover:text-primary-300 transition-colors"
            style={{ textShadow: "0 0 12px rgba(0,192,109,0.4)" }}
          >
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
