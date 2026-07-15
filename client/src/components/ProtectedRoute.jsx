import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="h-screen w-screen flex flex-col items-center justify-center gap-4 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 40% 50%, rgba(0,192,109,0.1) 0%, transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(0,180,255,0.07) 0%, transparent 50%), #0b0f1a",
        }}
      >
        {/* Ambient orb */}
        <div
          className="absolute rounded-full blur-3xl pointer-events-none animate-breathe"
          style={{
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(0,192,109,0.08) 0%, transparent 70%)",
          }}
        />

        <Spinner size="lg" />

        <p
          className="text-sm font-medium text-gradient relative z-10"
          style={{ letterSpacing: "0.1em" }}
        >
          LOADING
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
