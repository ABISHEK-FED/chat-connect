const Message = require("../models/Message");

// @route POST /api/messages/send
const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    if (!receiverId || !message || !message.trim()) {
      return res.status(400).json({ message: "Receiver and message text are required" });
    }

    const newMessage = await Message.create({
      senderId: req.user._id,
      receiverId,
      message: message.trim(),
    });

    const populatedMessage = await newMessage.populate([
      { path: "senderId", select: "name avatar" },
      { path: "receiverId", select: "name avatar" },
    ]);

    // emit through socket.io if available (attached to app in server.js)
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");
    if (io && onlineUsers) {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", populatedMessage);
      }
    }

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error: error.message });
  }
};

// @route GET /api/messages/:userId  (conversation between logged-in user and :userId)
const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userId },
        { senderId: userId, receiverId: myId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("senderId", "name avatar")
      .populate("receiverId", "name avatar");

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error: error.message });
  }
};

module.exports = { sendMessage, getMessages };
