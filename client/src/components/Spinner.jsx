const Spinner = ({ size = "md" }) => {
  const config = {
    sm: { outer: 20, inner: 12, stroke: 2.5 },
    md: { outer: 36, inner: 22, stroke: 3 },
    lg: { outer: 52, inner: 34, stroke: 3.5 },
  };

  const { outer, inner, stroke } = config[size] ?? config.md;
  const center = outer / 2;
  const gap = (outer - inner) / 2;

  return (
    <span
      role="status"
      aria-label="Loading"
      className="relative inline-flex items-center justify-center"
      style={{ width: outer, height: outer }}
    >
      {/* Outer ring */}
      <span
        className="absolute inset-0 rounded-full animate-spin"
        style={{
          background: `conic-gradient(from 0deg, rgba(0,192,109,0.9) 0%, rgba(0,228,204,0.5) 45%, transparent 70%)`,
          WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${stroke}px), #fff calc(100% - ${stroke}px))`,
          mask: `radial-gradient(farthest-side, transparent calc(100% - ${stroke}px), #fff calc(100% - ${stroke}px))`,
        }}
      />

      {/* Inner ring (counter-spin) */}
      <span
        className="absolute rounded-full"
        style={{
          inset: gap,
          animation: "spinConic 1.4s linear infinite reverse",
          background: `conic-gradient(from 180deg, rgba(0,180,255,0.7) 0%, rgba(168,85,247,0.4) 35%, transparent 65%)`,
          WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${stroke - 0.5}px), #fff calc(100% - ${stroke - 0.5}px))`,
          mask: `radial-gradient(farthest-side, transparent calc(100% - ${stroke - 0.5}px), #fff calc(100% - ${stroke - 0.5}px))`,
        }}
      />

      {/* Center glow dot */}
      <span
        className="absolute rounded-full animate-glowPulse"
        style={{
          width: Math.max(4, outer * 0.18),
          height: Math.max(4, outer * 0.18),
          background: "radial-gradient(circle, rgba(0,192,109,1) 0%, rgba(0,192,109,0) 100%)",
          boxShadow: "0 0 8px rgba(0,192,109,0.9)",
        }}
      />
    </span>
  );
};

export default Spinner;
