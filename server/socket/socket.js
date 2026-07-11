const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Map of userId -> socketId, kept in-memory for this simple beginner app
const onlineUsers = new Map();

const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Client should emit "addUser" with their userId right after connecting
    socket.on("addUser", async (userId) => {
      if (!userId) return;
      onlineUsers.set(userId, socket.id);
      socket.userId = userId;

      try {
        await User.findByIdAndUpdate(userId, { status: "online" });
      } catch (err) {
        console.error("Failed to update user status:", err.message);
      }

      // broadcast updated online user list to everyone
      io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
    });

    // Real-time typing indicator
    socket.on("typing", ({ receiverId, senderId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("typing", { senderId });
      }
    });

    socket.on("stopTyping", ({ receiverId, senderId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("stopTyping", { senderId });
      }
    });

    socket.on("disconnect", async () => {
      console.log("Socket disconnected:", socket.id);
      if (socket.userId) {
        onlineUsers.delete(socket.userId);
        try {
          await User.findByIdAndUpdate(socket.userId, {
            status: "offline",
            lastSeen: new Date(),
          });
        } catch (err) {
          console.error("Failed to update user status:", err.message);
        }
        io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
      }
    });
  });
};

module.exports = { initSocket, onlineUsers };
