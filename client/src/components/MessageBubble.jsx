const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const MessageBubble = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2 animate-popIn`}>
      <div
        className={`max-w-[75%] sm:max-w-[60%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
          isOwn
            ? "bg-primary-500 text-white rounded-br-sm"
            : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.message}</p>
        <p className={`text-[10px] mt-1 text-right ${isOwn ? "text-white/70" : "text-gray-400"}`}>
          {formatTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
