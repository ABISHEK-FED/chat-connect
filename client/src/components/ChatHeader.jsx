import { useSocket } from "../context/SocketContext";

const ChatHeader = ({ selectedUser, isTyping }) => {
  const { onlineUsers } = useSocket();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
      <img src={selectedUser.avatar} alt={selectedUser.name} className="h-10 w-10 rounded-full object-cover" />
      <div>
        <p className="font-semibold text-gray-800">{selectedUser.name}</p>
        <p className="text-xs text-gray-400">
          {isTyping ? (
            <span className="text-primary-500 font-medium">typing...</span>
          ) : isOnline ? (
            "Online"
          ) : (
            "Offline"
          )}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
