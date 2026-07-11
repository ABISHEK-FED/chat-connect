import { useState, useRef } from "react";

const MessageInput = ({ onSend, onTyping, onStopTyping }) => {
  const [text, setText] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    onTyping?.();

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      onStopTyping?.();
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
    onStopTyping?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-200">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2.5 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="h-10 w-10 flex items-center justify-center rounded-full bg-primary-500 hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed text-white transition shrink-0"
        aria-label="Send message"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M3.4 20.4l17.45-8.4a1 1 0 000-1.8L3.4 1.8a1 1 0 00-1.4 1.1l1.7 7.6 12.3 1.5-12.3 1.5-1.7 7.6a1 1 0 001.4 1.1z" />
        </svg>
      </button>
    </form>
  );
};

export default MessageInput;
