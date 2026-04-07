"use client";

export default function Home() {
  const name = "Hello Mubarak Ansari";
  const words = name.split(" ");

  return (
    <div className="flex min-h-screen items-center justify-center bg-black overflow-hidden relative">
      {/* Animated background glow */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.15) 50%, transparent 70%)",
          animation: "pulse 3s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: `hsl(${(i * 30) % 360}, 80%, 65%)`,
            left: `${(i * 5.1 + 3) % 100}%`,
            top: `${(i * 7.3 + 10) % 100}%`,
            animation: `float ${3 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.3) % 3}s`,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Main text */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
          {words.map((word, wi) => (
            <span
              key={wi}
              style={{
                display: "inline-block",
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                fontWeight: 900,
                fontFamily: "Georgia, serif",
                background:
                  wi === 0
                    ? "linear-gradient(135deg, #a78bfa, #818cf8)"
                    : wi === 1
                    ? "linear-gradient(135deg, #f472b6, #fb923c)"
                    : "linear-gradient(135deg, #34d399, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: `slideUp 0.8s cubic-bezier(0.22,1,0.36,1) both`,
                animationDelay: `${wi * 0.2}s`,
                textShadow: "none",
                letterSpacing: "-0.02em",
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Underline bar */}
        <div
          style={{
            marginTop: "1.5rem",
            height: "4px",
            borderRadius: "9999px",
            background: "linear-gradient(90deg, #a78bfa, #f472b6, #34d399)",
            animation: "expandWidth 1.2s cubic-bezier(0.22,1,0.36,1) 0.8s both",
            transformOrigin: "left",
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontFamily: "Arial, sans-serif",
            animation: "fadeIn 1s ease 1.2s both",
          }}
        >
          Welcome to my portfolio
        </p>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px) scale(0.85); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes expandWidth {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1);   opacity: 0.8; }
          50%       { transform: scale(1.2); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0)    rotate(0deg); }
          50%       { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}
