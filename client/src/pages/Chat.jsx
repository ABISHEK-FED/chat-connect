import { useState, useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { messageAPI } from "../services/api";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageBubble from "../components/MessageBubble";
import MessageInput from "../components/MessageInput";
import Spinner from "../components/Spinner";

const Chat = () => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;
    const fetchMessages = async () => {
      setLoadingMessages(true);
      try {
        const { data } = await messageAPI.getConversation(selectedUser._id);
        setMessages(data);
      } catch {
        toast.error("Failed to load messages");
      } finally {
        setLoadingMessages(false);
      }
    };
    fetchMessages();
    setIsTyping(false);
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      const senderId = message.senderId?._id || message.senderId;
      const receiverId = message.receiverId?._id || message.receiverId;
      if (selectedUser && (senderId === selectedUser._id || receiverId === selectedUser._id)) {
        setMessages((prev) => [...prev, message]);
      } else {
        toast(`New message from ${message.senderId?.name || "someone"}`, { icon: "💬" });
      }
    };

    const handleTyping = ({ senderId }) => {
      if (selectedUser && senderId === selectedUser._id) setIsTyping(true);
    };

    const handleStopTyping = ({ senderId }) => {
      if (selectedUser && senderId === selectedUser._id) setIsTyping(false);
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [socket, selectedUser]);

  const handleSend = async (text) => {
    if (!selectedUser) return;
    try {
      const { data } = await messageAPI.send({ receiverId: selectedUser._id, message: text });
      setMessages((prev) => [...prev, data]);
    } catch {
      toast.error("Failed to send message");
    }
  };

  const handleTyping = useCallback(() => {
    if (socket && selectedUser) {
      socket.emit("typing", { senderId: user._id, receiverId: selectedUser._id });
    }
  }, [socket, selectedUser, user]);

  const handleStopTyping = useCallback(() => {
    if (socket && selectedUser) {
      socket.emit("stopTyping", { senderId: user._id, receiverId: selectedUser._id });
    }
  }, [socket, selectedUser, user]);

  return (
    <div
      className="h-screen flex overflow-hidden"
      style={{ background: "#0b0f1a" }}
    >
      {/* ── Sidebar ── */}
      <div className={`${selectedUser ? "hidden sm:flex" : "flex"} h-full shrink-0`}>
        <Sidebar selectedUser={selectedUser} onSelectUser={setSelectedUser} />
      </div>

      {/* ── Main chat area ── */}
      <div className={`${selectedUser ? "flex" : "hidden sm:flex"} flex-1 flex-col h-full min-w-0`}>
        {!selectedUser ? (
          /* ── Empty state ── */
          <div
            className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at 30% 40%, rgba(0,192,109,0.06) 0%, transparent 55%), radial-gradient(ellipse at 75% 65%, rgba(0,180,255,0.04) 0%, transparent 55%), #0b0f1a",
            }}
          >
            {/* Faint grid */}
            <div
              className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />

            {/* Glow orb behind icon */}
            <div
              className="absolute rounded-full blur-3xl pointer-events-none"
              style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(0,192,109,0.1) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 flex flex-col items-center text-center animate-fadeUp">
              <div
                className="text-6xl mb-6 animate-float select-none"
                style={{ filter: "drop-shadow(0 0 20px rgba(0,192,109,0.4))" }}
              >
                💬
              </div>
              <h2 className="text-xl font-bold text-gradient mb-2">
                Start a conversation
              </h2>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                Select someone from the sidebar and your messages will appear here.
              </p>

              {/* Decorative dots */}
              <div className="flex items-center gap-2 mt-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: "rgba(0,192,109,0.4)",
                      animation: `typingBounce 1.5s ease-in-out ${i * 0.3}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* ── Chat header (with mobile back button) ── */}
            <div className="flex items-center shrink-0">
              <button
                className="sm:hidden flex items-center justify-center h-full px-3 py-4 text-slate-400 hover:text-primary-400 transition-colors"
                onClick={() => setSelectedUser(null)}
                aria-label="Back"
                style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex-1">
                <ChatHeader selectedUser={selectedUser} isTyping={isTyping} />
              </div>
            </div>

            {/* ── Messages ── */}
            <div
              className="flex-1 overflow-y-auto px-4 py-6 chat-bg"
            >
              {loadingMessages ? (
                <div className="flex justify-center py-12">
                  <Spinner />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center animate-fadeIn">
                  <div
                    className="text-4xl mb-3 animate-float select-none"
                    style={{ filter: "drop-shadow(0 0 12px rgba(0,192,109,0.3))" }}
                  >
                    👋
                  </div>
                  <p className="text-slate-500 text-sm">
                    No messages yet. Say hello to{" "}
                    <span className="text-primary-400 font-medium">{selectedUser.name}</span>!
                  </p>
                </div>
              ) : (
                messages.map((msg) => (
                  <MessageBubble
                    key={msg._id}
                    message={msg}
                    isOwn={(msg.senderId?._id || msg.senderId) === user._id}
                  />
                ))
              )}

              {/* Typing bubble */}
              {isTyping && (
                <div className="flex justify-start mb-3 animate-popIn">
                  <div
                    className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-sm"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
                    }}
                  >
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input ── */}
            <MessageInput
              onSend={handleSend}
              onTyping={handleTyping}
              onStopTyping={handleStopTyping}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
