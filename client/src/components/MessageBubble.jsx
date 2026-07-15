const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const MessageBubble = ({ message, isOwn }) => {
  return (
    <div
      className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3 animate-popIn`}
    >
      <div
        className={`relative max-w-[75%] sm:max-w-[60%] px-4 py-2.5 text-sm ${
          isOwn ? "rounded-2xl rounded-br-sm" : "rounded-2xl rounded-bl-sm"
        }`}
        style={
          isOwn
            ? {
                background: "linear-gradient(135deg, #00c06d 0%, #00a896 100%)",
                boxShadow: "0 2px 16px rgba(0,192,109,0.35), 0 1px 0 rgba(255,255,255,0.15) inset",
                color: "#fff",
              }
            : {
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.06) inset",
                color: "#e2e8f0",
              }
        }
      >
        {/* Shine overlay for own messages */}
        {isOwn && (
          <div
            className="absolute inset-0 rounded-2xl rounded-br-sm pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
            }}
          />
        )}

        <p className="whitespace-pre-wrap break-words leading-relaxed relative z-10">
          {message.message}
        </p>

        <div className={`flex items-center justify-end gap-1 mt-1 relative z-10`}>
          <p className={`text-[10px] ${isOwn ? "text-white/60" : "text-slate-500"}`}>
            {formatTime(message.createdAt)}
          </p>
          {/* Read receipt tick for own messages */}
          {isOwn && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
