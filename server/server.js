const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { initSocket, onlineUsers } = require("./socket/socket");

connectDB();

const app = express();
const server = http.createServer(app);

// Accept a comma-separated list of allowed origins so you can set multiple
// Vercel preview URLs without redeploying the backend.
// On Render, set CLIENT_URL=https://chat-connected.vercel.app
const rawOrigins = process.env.CLIENT_URL || "https://chat-connected.vercel.app";
const ALLOWED_ORIGINS = rawOrigins.split(",").map((o) => o.trim()).filter(Boolean);

// Dynamic origin checker — works for any allowed origin and Vercel previews
const isAllowedOrigin = (origin) => {
  if (!origin) return true; // allow server-to-server / curl
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Also allow any *.vercel.app subdomain of the same project
  if (/^https:\/\/chat-connected.*\.vercel\.app$/.test(origin)) return true;
  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) callback(null, true);
      else callback(new Error(`Origin ${origin} not allowed`));
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["polling"],
});

// Make io and onlineUsers accessible inside controllers (req.app.get("io"))
app.set("io", io);
app.set("onlineUsers", onlineUsers);

// Handle OPTIONS preflight for all routes before any other middleware
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "ChatConnect API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

initSocket(io);

// On Render/Railway (persistent servers) always listen.
// On Vercel (serverless) the module.exports is used instead.
if (process.env.NODE_ENV !== "production" || process.env.RENDER) {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Allowed origins: ${ALLOWED_ORIGINS.join(", ")}`);
  });
}

module.exports = server;
