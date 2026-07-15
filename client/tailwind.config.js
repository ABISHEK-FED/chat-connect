/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#e8fff4",
          100: "#c3fce2",
          200: "#87f8c7",
          300: "#3ef0a4",
          400: "#00de84",
          500: "#00c06d",
          600: "#009a58",
          700: "#007a47",
          800: "#006039",
          900: "#004d2e",
          950: "#002a19",
        },
        neon: {
          green:  "#00ff99",
          teal:   "#00e5cc",
          blue:   "#00b4ff",
          purple: "#a855f7",
          pink:   "#f472b6",
        },
        glass: {
          white:  "rgba(255,255,255,0.07)",
          light:  "rgba(255,255,255,0.12)",
          border: "rgba(255,255,255,0.14)",
          dark:   "rgba(0,0,0,0.35)",
        },
        surface: {
          900: "#0b0f1a",
          800: "#111827",
          750: "#141d2e",
          700: "#1a2438",
          600: "#1e2d42",
          500: "#243350",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "mesh-dark":
          "radial-gradient(ellipse at 20% 50%, rgba(0,192,109,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,180,255,0.08) 0%, transparent 55%), radial-gradient(ellipse at 50% 90%, rgba(168,85,247,0.07) 0%, transparent 50%), linear-gradient(135deg, #0b0f1a 0%, #111827 50%, #0d1525 100%)",
        "mesh-sidebar":
          "radial-gradient(ellipse at 0% 0%, rgba(0,192,109,0.15) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(0,180,255,0.08) 0%, transparent 50%), linear-gradient(180deg, #0f1a2e 0%, #0b1120 100%)",
        "gradient-brand":
          "linear-gradient(135deg, #00c06d 0%, #00e5cc 50%, #00b4ff 100%)",
        "gradient-brand-hover":
          "linear-gradient(135deg, #009a58 0%, #00c8b4 50%, #0099e0 100%)",
        "gradient-own-bubble":
          "linear-gradient(135deg, #00c06d 0%, #00b4b4 100%)",
        "gradient-auth-bg":
          "radial-gradient(ellipse at 30% 40%, rgba(0,192,109,0.18) 0%, transparent 55%), radial-gradient(ellipse at 75% 65%, rgba(0,180,255,0.12) 0%, transparent 55%), radial-gradient(ellipse at 55% 10%, rgba(168,85,247,0.1) 0%, transparent 50%), linear-gradient(135deg, #080d16 0%, #0e1829 50%, #091420 100%)",
      },
      boxShadow: {
        "glow-green":  "0 0 20px rgba(0,192,109,0.5), 0 0 40px rgba(0,192,109,0.2)",
        "glow-green-sm":"0 0 10px rgba(0,192,109,0.4)",
        "glow-blue":   "0 0 20px rgba(0,180,255,0.4), 0 0 40px rgba(0,180,255,0.15)",
        "glow-purple": "0 0 20px rgba(168,85,247,0.4)",
        "glass-sm":    "0 2px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        "glass-md":    "0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset",
        "glass-lg":    "0 20px 60px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.08) inset",
        "bubble-own":  "0 2px 12px rgba(0,192,109,0.35)",
        "bubble-other":"0 2px 12px rgba(0,0,0,0.4)",
        "input-glow":  "0 0 0 3px rgba(0,192,109,0.25), 0 0 20px rgba(0,192,109,0.1)",
      },
      backdropBlur: {
        xs:   "2px",
        sm:   "8px",
        md:   "16px",
        lg:   "24px",
        xl:   "40px",
      },
      keyframes: {
        /* entrances */
        fadeIn: {
          "0%":   { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        popIn: {
          "0%":   { opacity: "0", transform: "scale(0.88)" },
          "70%":  { transform: "scale(1.03)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInLeft: {
          "0%":   { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%":   { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        /* glow pulse */
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(0,192,109,0.4), 0 0 20px rgba(0,192,109,0.15)" },
          "50%":      { boxShadow: "0 0 20px rgba(0,192,109,0.7), 0 0 40px rgba(0,192,109,0.3)" },
        },
        /* rotating conic gradient for spinner */
        spinConic: {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        /* background mesh drift */
        meshDrift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        /* typing indicator dots */
        typingBounce: {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "40%":           { transform: "translateY(-5px)", opacity: "1" },
        },
        /* online dot pulse */
        onlinePing: {
          "0%":   { transform: "scale(1)", opacity: "1" },
          "75%, 100%": { transform: "scale(2.2)", opacity: "0" },
        },
        /* shimmer for skeletons / buttons */
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        /* float for empty-state icon */
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        /* scale breathe for logo */
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%":      { transform: "scale(1.05)" },
        },
      },
      animation: {
        fadeIn:       "fadeIn 0.35s ease-out",
        fadeUp:       "fadeUp 0.4s ease-out",
        popIn:        "popIn 0.25s ease-out",
        slideInLeft:  "slideInLeft 0.3s ease-out",
        slideInRight: "slideInRight 0.3s ease-out",
        glowPulse:    "glowPulse 2.5s ease-in-out infinite",
        spinConic:    "spinConic 0.9s linear infinite",
        meshDrift:    "meshDrift 8s ease infinite",
        float:        "float 3s ease-in-out infinite",
        breathe:      "breathe 3s ease-in-out infinite",
        shimmer:      "shimmer 2.5s linear infinite",
        "typing-1":   "typingBounce 1.2s ease-in-out infinite",
        "typing-2":   "typingBounce 1.2s ease-in-out 0.2s infinite",
        "typing-3":   "typingBounce 1.2s ease-in-out 0.4s infinite",
        "online-ping":"onlinePing 1.8s ease-out infinite",
      },
    },
  },
  plugins: [],
};
