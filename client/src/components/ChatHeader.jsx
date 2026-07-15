import { useSocket } from "../context/SocketContext";

const ChatHeader = ({ selectedUser, isTyping }) => {
  const { onlineUsers } = useSocket();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 relative"
      style={{
        background: "rgba(11,15,26,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: isOnline
            ? "linear-gradient(90deg, transparent, rgba(0,192,109,0.4), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />

      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={selectedUser.avatar}
          alt={selectedUser.name}
          className="h-10 w-10 rounded-full object-cover"
          style={{
            border: isOnline ? "2px solid rgba(0,192,109,0.5)" : "2px solid rgba(255,255,255,0.1)",
            boxShadow: isOnline ? "0 0 12px rgba(0,192,109,0.35)" : "none",
          }}
        />
        {isOnline && (
          <span
            className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2"
            style={{
              background: "#00ff99",
              borderColor: "#0b0f1a",
              boxShadow: "0 0 6px #00ff99",
            }}
          />
        )}
      </div>

      {/* Name + status */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-100 text-sm truncate">{selectedUser.name}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          {isTyping ? (
            <>
              <span className="text-xs text-primary-400 font-medium">typing</span>
              <span className="flex items-end gap-0.5 pb-0.5">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </span>
            </>
          ) : isOnline ? (
            <span
              className="text-xs text-primary-400 font-medium"
              style={{ textShadow: "0 0 8px rgba(0,192,109,0.5)" }}
            >
              ● Online
            </span>
          ) : (
            <span className="text-xs text-slate-600">○ Offline</span>
          )}
        </div>
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-1 shrink-0">
        {[
          // Video call icon
          <svg key="video" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          </svg>,
          // Phone icon
          <svg key="phone" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>,
        ].map((icon, i) => (
          <button
            key={i}
            className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-500 transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,192,109,0.12)"; e.currentTarget.style.color = "#00c06d"; e.currentTarget.style.borderColor = "rgba(0,192,109,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = ""; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatHeader;
