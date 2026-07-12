import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

// In production Vercel deployments VITE_SOCKET_URL must be set to the
// server's Vercel URL (https://...). Falls back to localhost for dev.
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!user) {
      setSocket((prev) => {
        if (prev) prev.disconnect();
        return null;
      });
      return;
    }

    // Use polling-only transport to stay compatible with serverless hosts
    // (Vercel, Render free tier) that don't support persistent WebSocket
    // connections. Remove the transports override if your server supports ws.
    const newSocket = io(SOCKET_URL, {
      transports: ["polling"],
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      newSocket.emit("addUser", user._id);
    });

    newSocket.on("connect_error", (err) => {
      console.warn("Socket connection error:", err.message);
    });

    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
