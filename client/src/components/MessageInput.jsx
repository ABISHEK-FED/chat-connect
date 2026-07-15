import { useState, useRef } from "react";

const MessageInput = ({ onSend, onTyping, onStopTyping }) => {
  const [text, setText] = useState("");
  const typingTimeout = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    onTyping?.();
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      onStopTyping?.();
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
    clearTimeout(typingTimeout.current);
    onStopTyping?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className="relative px-4 py-3 flex items-end gap-3"
      style={{
        background: "rgba(11,15,26,0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,192,109,0.2), transparent)",
        }}
      />

      {/* Emoji button */}
      <button
        type="button"
        className="shrink-0 h-10 w-10 flex items-center justify-center rounded-xl text-slate-500 hover:text-yellow-400 transition-all duration-200 text-lg"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(234,179,8,0.1)"; e.currentTarget.style.borderColor = "rgba(234,179,8,0.3)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
        aria-label="Emoji"
      >
        😊
      </button>

      {/* Text input */}
      <div className="flex-1 relative">
        <textarea
          rows={1}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message…"
          className="input-glow w-full px-4 py-2.5 rounded-2xl text-sm resize-none leading-relaxed"
          style={{
            maxHeight: "120px",
            overflowY: "auto",
            lineHeight: "1.5",
          }}
          onInput={e => {
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
          }}
        />
      </div>

      {/* Send button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="shrink-0 h-10 w-10 flex items-center justify-center rounded-xl transition-all duration-200"
        style={
          text.trim()
            ? {
                background: "linear-gradient(135deg, #00c06d 0%, #00a896 100%)",
                boxShadow: "0 4px 16px rgba(0,192,109,0.5)",
                border: "1px solid rgba(0,192,109,0.3)",
                transform: "scale(1)",
              }
            : {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.07)",
                opacity: 0.4,
                cursor: "not-allowed",
              }
        }
        onMouseEnter={e => { if (text.trim()) { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,192,109,0.65)"; } }}
        onMouseLeave={e => { if (text.trim()) { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,192,109,0.5)"; } }}
        aria-label="Send message"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-white"
          style={{ transform: "translateX(1px)" }}
        >
          <path d="M3.4 20.4l17.45-8.4a1 1 0 000-1.8L3.4 1.8a1 1 0 00-1.4 1.1l1.7 7.6 12.3 1.5-12.3 1.5-1.7 7.6a1 1 0 001.4 1.1z" />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
