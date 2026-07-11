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

  // Fetch conversation whenever a new user is selected
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      setLoadingMessages(true);
      try {
        const { data } = await messageAPI.getConversation(selectedUser._id);
        setMessages(data);
      } catch (err) {
        toast.error("Failed to load messages");
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
    setIsTyping(false);
  }, [selectedUser]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Listen for incoming real-time messages and typing events
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      const senderId = message.senderId?._id || message.senderId;
      const receiverId = message.receiverId?._id || message.receiverId;

      // only add to the open conversation if it belongs to it
      if (
        selectedUser &&
        (senderId === selectedUser._id || receiverId === selectedUser._id)
      ) {
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
    } catch (err) {
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
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      <div className={`${selectedUser ? "hidden sm:flex" : "flex"} h-full`}>
        <Sidebar selectedUser={selectedUser} onSelectUser={setSelectedUser} />
      </div>

      <div className={`${selectedUser ? "flex" : "hidden sm:flex"} flex-1 flex-col h-full`}>
        {!selectedUser ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 px-6">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-lg font-medium text-gray-500">Select a user to start chatting</p>
            <p className="text-sm text-gray-400 mt-1">Your messages will appear here</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <button
                className="sm:hidden px-3 py-3 text-gray-500"
                onClick={() => setSelectedUser(null)}
                aria-label="Back"
              >
                ←
              </button>
              <div className="flex-1">
                <ChatHeader selectedUser={selectedUser} isTyping={isTyping} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#efeae2]">
              {loadingMessages ? (
                <div className="flex justify-center py-10">
                  <Spinner />
                </div>
              ) : messages.length === 0 ? (
                <p className="text-center text-gray-400 text-sm mt-10">
                  No messages yet. Say hello to {selectedUser.name}!
                </p>
              ) : (
                messages.map((msg) => (
                  <MessageBubble
                    key={msg._id}
                    message={msg}
                    isOwn={(msg.senderId?._id || msg.senderId) === user._id}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <MessageInput onSend={handleSend} onTyping={handleTyping} onStopTyping={handleStopTyping} />
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
