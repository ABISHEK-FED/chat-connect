import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { userAPI } from "../services/api";
import Spinner from "./Spinner";

const Sidebar = ({ selectedUser, onSelectUser }) => {
  const { user, logout } = useAuth();
  const { onlineUsers } = useSocket();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await userAPI.getUsers(search);
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full sm:w-80 h-full flex flex-col relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(0,192,109,0.12) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(0,180,255,0.07) 0%, transparent 50%), linear-gradient(180deg, #0f1a2e 0%, #0b1120 100%)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,192,109,0.5), transparent)" }}
      />

      {/* ── Header ── */}
      <div className="relative flex items-center justify-between px-4 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.25)", backdropFilter: "blur(12px)" }}
      >
        {/* Brand mark */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            {/* Avatar glow ring */}
            <div className="absolute inset-0 rounded-full animate-glowPulse opacity-70"
              style={{ boxShadow: "0 0 0 2px #0b1120, 0 0 0 3.5px rgba(0,192,109,0.6)", borderRadius: "50%" }}
            />
            <img
              src={user.avatar}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover relative z-10"
              style={{ border: "2px solid rgba(0,192,109,0.4)" }}
            />
            {/* Self online dot */}
            <span className="absolute bottom-0 right-0 z-20 h-3 w-3 rounded-full border-2"
              style={{ background: "#00ff99", borderColor: "#0b1120", boxShadow: "0 0 6px #00ff99, 0 0 12px rgba(0,255,153,0.5)" }}
            />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-slate-100 text-sm truncate">{user.name}</p>
            <p className="text-xs text-primary-400" style={{ textShadow: "0 0 8px rgba(0,192,109,0.5)" }}>● Online</p>
          </div>
        </div>

        <button
          onClick={logout}
          title="Logout"
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-red-400 px-3 py-1.5 rounded-lg transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
          </svg>
          Logout
        </button>
      </div>

      {/* ── Search ── */}
      <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users…"
            className="input-glow w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
          />
        </div>
      </div>

      {/* ── Section label ── */}
      <div className="px-4 pt-3 pb-1.5 flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
          Conversations
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        <span className="text-[10px] font-semibold text-primary-500 bg-primary-500/10 px-2 py-0.5 rounded-full">
          {filtered.length}
        </span>
      </div>

      {/* ── User list ── */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-12 px-4 text-center">
            <div className="text-3xl mb-2 opacity-30">🔍</div>
            <p className="text-slate-600 text-sm">No users found</p>
          </div>
        ) : (
          filtered.map((u, idx) => {
            const isOnline = onlineUsers.includes(u._id);
            const isSelected = selectedUser?._id === u._id;
            return (
              <button
                key={u._id}
                onClick={() => onSelectUser(u)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 relative group animate-fadeIn"
                style={{
                  animationDelay: `${idx * 40}ms`,
                  background: isSelected
                    ? "linear-gradient(90deg, rgba(0,192,109,0.12) 0%, rgba(0,192,109,0.04) 100%)"
                    : "transparent",
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  borderLeft: isSelected ? "2px solid rgba(0,192,109,0.6)" : "2px solid transparent",
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="h-11 w-11 rounded-full object-cover transition-all duration-200"
                    style={isSelected || isOnline ? { border: "2px solid rgba(0,192,109,0.4)", boxShadow: isSelected ? "0 0 12px rgba(0,192,109,0.3)" : "none" } : { border: "2px solid rgba(255,255,255,0.06)" }}
                  />
                  {/* Online indicator */}
                  {isOnline ? (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2"
                      style={{ background: "#00ff99", borderColor: "#0b1120", boxShadow: "0 0 6px #00ff99, 0 0 10px rgba(0,255,153,0.4)" }}
                    />
                  ) : (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2"
                      style={{ background: "#374151", borderColor: "#0b1120" }}
                    />
                  )}
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p className={`font-medium text-sm truncate ${isSelected ? "text-white" : "text-slate-300"}`}>
                    {u.name}
                  </p>
                  <p className={`text-xs truncate mt-0.5 ${isOnline ? "text-primary-400" : "text-slate-600"}`}
                    style={isOnline ? { textShadow: "0 0 8px rgba(0,192,109,0.4)" } : {}}
                  >
                    {isOnline ? "● Online" : "○ Offline"}
                  </p>
                </div>

                {/* Selected chevron */}
                {isSelected && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0b1120, transparent)" }}
      />
    </div>
  );
};

export default Sidebar;
