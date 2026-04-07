"use client";

const SKILLS = [
  { label: "Kotlin", color: "#a78bfa" },
  { label: "Java", color: "#fb923c" },
  { label: "XML", color: "#38bdf8" },
  { label: "Jetpack Compose", color: "#34d399" },
  { label: "MVVM", color: "#f472b6" },
  { label: "Clean Architecture", color: "#facc15" },
  { label: "Dagger Hilt", color: "#a78bfa" },
  { label: "Android SDK", color: "#fb923c" },
  { label: "Firebase", color: "#38bdf8" },
  { label: "Room Database", color: "#34d399" },
  { label: "RESTful APIs", color: "#f472b6" },
  { label: "Coroutines", color: "#facc15" },
  { label: "JUnit", color: "#a78bfa" },
  { label: "Espresso", color: "#fb923c" },
  { label: "Jira", color: "#38bdf8" },
  { label: "Azure DevOps", color: "#34d399" },
];

const EXPERIENCE = [
  {
    company: "Bacancy Technology",
    role: "Software Engineer",
    period: "Sep 2023 – Present",
    color: "#a78bfa",
    points: [
      "Developed and enhanced Android apps using Kotlin/Java with Clean Architecture.",
      "Designed new modules and migrated legacy code into modern architectures.",
      "Handled Jira tasks/bugs and improved sprint delivery timelines.",
    ],
  },
  {
    company: "Brainvire Info Tech",
    role: "Software Engineer",
    period: "Jul 2021 – Aug 2023",
    color: "#38bdf8",
    points: [
      "Built and maintained multiple Android applications.",
      "Integrated Firebase Crashlytics, reducing app crashes significantly.",
      "Enhanced multi-screen support for mobile and tablet.",
      "Implemented push notifications, maps, and analytics (Huawei SDK, WebEngage).",
    ],
  },
];

const PROJECTS = [
  {
    name: "Bonder",
    tag: "Professional & Social Connection",
    color: "#a78bfa",
    desc: "Redesigned UI/UX, implemented OTP verification with auto-detection, managed Jira tasks and bug tracking. Published on Google Play Store.",
  },
  {
    name: "Seeking App",
    tag: "Luxury Dating Platform",
    color: "#f472b6",
    desc: "Converted legacy Activities into Fragments with Clean Architecture. Developed new modules and enhancements improving user engagement.",
  },
  {
    name: "AlokozayShop",
    tag: "Grocery E-commerce App",
    color: "#34d399",
    desc: "Built grocery shopping features, integrated WebEngage for analytics and Huawei SDK for push notifications and maps. Responsive multi-screen support.",
  },
  {
    name: "The Weed Tube",
    tag: "Video Sharing App",
    color: "#fb923c",
    desc: "Enhanced UI with Dark/Light themes, integrated new features, and maintained app stability by fixing Azure DevOps tracked bugs.",
  },
];

export default function Home() {
  return (
    <main style={{ background: "#0a0a0f", color: "#e2e8f0", fontFamily: "Inter, Arial, sans-serif", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "2rem" }}>
        {/* background glow blobs */}
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)", top: "-100px", left: "-100px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.13) 0%, transparent 70%)", bottom: "-80px", right: "-80px", pointerEvents: "none" }} />

        {/* floating dots */}
        {[...Array(18)].map((_, i) => (
          <span key={i} style={{ position: "absolute", width: 4, height: 4, borderRadius: "50%", background: `hsl(${i * 25 % 360},70%,65%)`, left: `${(i * 5.5 + 4) % 100}%`, top: `${(i * 7.1 + 8) % 100}%`, animation: `float ${3 + i % 4}s ease-in-out infinite`, animationDelay: `${(i * 0.35) % 3}s`, opacity: 0.5 }} />
        ))}

        <div style={{ textAlign: "center", position: "relative", zIndex: 10, maxWidth: 800 }}>
          <p style={{ fontSize: "0.95rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#a78bfa", animation: "fadeUp 0.6s ease both", marginBottom: "1rem" }}>
            Hello, I&apos;m
          </p>

          <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, lineHeight: 1.05, margin: 0, animation: "fadeUp 0.7s ease 0.1s both" }}>
            <span style={{ background: "linear-gradient(135deg,#a78bfa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Mubarak</span>{" "}
            <span style={{ background: "linear-gradient(135deg,#f472b6,#fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Ansari</span>
          </h1>

          <p style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "#94a3b8", margin: "1.25rem 0 0.5rem", animation: "fadeUp 0.7s ease 0.25s both", fontWeight: 500 }}>
            Android Software Engineer
          </p>
          <p style={{ fontSize: "1rem", color: "#64748b", animation: "fadeUp 0.7s ease 0.35s both", marginBottom: "2rem" }}>
            4+ years · Kotlin / Java · Clean Architecture · MVVM
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.45s both", marginBottom: "2.5rem" }}>
            <a href="mailto:mubarakansari715@gmail.com" style={{ padding: "0.75rem 1.75rem", borderRadius: 9999, background: "linear-gradient(135deg,#a78bfa,#818cf8)", color: "#fff", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", transition: "opacity 0.2s" }}>
              Hire Me
            </a>
            <a href="https://github.com/mubarakansari715" target="_blank" rel="noreferrer" style={{ padding: "0.75rem 1.75rem", borderRadius: 9999, border: "1.5px solid #334155", color: "#94a3b8", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem" }}>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/mubarak-ansari-2a139a148/" target="_blank" rel="noreferrer" style={{ padding: "0.75rem 1.75rem", borderRadius: 9999, border: "1.5px solid #334155", color: "#94a3b8", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem" }}>
              LinkedIn
            </a>
          </div>

          {/* achievement badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(250,204,21,0.08)", border: "1px solid rgba(250,204,21,0.25)", borderRadius: 9999, padding: "0.4rem 1.1rem", animation: "fadeUp 0.7s ease 0.55s both" }}>
            <span style={{ fontSize: "1rem" }}>🏆</span>
            <span style={{ fontSize: "0.85rem", color: "#facc15", fontWeight: 600 }}>Employee of the Quarter 2024 – Bacancy Technology</span>
          </div>
        </div>

        {/* scroll hint */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite", opacity: 0.4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "5rem 2rem" }}>
        <SectionHeading title="About Me" accent="#a78bfa" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: "1.5rem", marginTop: "2rem" }}>
          <Card>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "0.97rem" }}>
              Software Engineer with <strong style={{ color: "#e2e8f0" }}>4+ years of experience</strong> designing, building, and testing Android applications. Passionate about clean code and interactive product solutions that solve real customer problems.
            </p>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              ["📍", "Hathiyadhar, Palitana, Bhavnagar"],
              ["✉️", "mubarakansari715@gmail.com"],
              ["📞", "9998508484"],
              ["🗣️", "English · Hindi · Gujarati · Bhojpuri"],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1e293b", borderRadius: 12, padding: "0.65rem 1rem" }}>
                <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section style={{ background: "rgba(255,255,255,0.02)", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <SectionHeading title="Technical Skills" accent="#38bdf8" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", marginTop: "2rem" }}>
            {SKILLS.map((s) => (
              <span key={s.label} style={{ padding: "0.4rem 1rem", borderRadius: 9999, border: `1.5px solid ${s.color}44`, background: `${s.color}11`, color: s.color, fontSize: "0.87rem", fontWeight: 600 }}>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "5rem 2rem" }}>
        <SectionHeading title="Experience" accent="#f472b6" />
        <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {EXPERIENCE.map((e) => (
            <Card key={e.company}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.15rem", color: e.color, fontWeight: 700 }}>{e.company}</h3>
                  <p style={{ margin: "0.2rem 0 0", color: "#94a3b8", fontSize: "0.9rem" }}>{e.role}</p>
                </div>
                <span style={{ padding: "0.25rem 0.9rem", borderRadius: 9999, background: `${e.color}18`, border: `1px solid ${e.color}44`, color: e.color, fontSize: "0.8rem", fontWeight: 600, alignSelf: "flex-start" }}>
                  {e.period}
                </span>
              </div>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                {e.points.map((p) => (
                  <li key={p} style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>{p}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section style={{ background: "rgba(255,255,255,0.02)", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <SectionHeading title="Projects" accent="#34d399" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: "1.25rem", marginTop: "2rem" }}>
            {PROJECTS.map((p) => (
              <div key={p.name} style={{ background: "#0f172a", border: `1px solid ${p.color}33`, borderRadius: 16, padding: "1.5rem", transition: "transform 0.2s, box-shadow 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                  <h3 style={{ margin: 0, fontSize: "1.05rem", color: p.color, fontWeight: 700 }}>{p.name}</h3>
                </div>
                <p style={{ margin: "0 0 0.6rem", color: "#475569", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{p.tag}</p>
                <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "5rem 2rem" }}>
        <SectionHeading title="Education" accent="#facc15" />
        <Card style={{ marginTop: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <h3 style={{ margin: 0, color: "#facc15", fontWeight: 700 }}>Gyanmanjari Institute of Technology</h3>
              <p style={{ margin: "0.25rem 0 0", color: "#94a3b8", fontSize: "0.9rem" }}>B.E. in Information Technology &nbsp;·&nbsp; CGPI: 8.23</p>
            </div>
            <span style={{ padding: "0.25rem 0.9rem", borderRadius: 9999, background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.3)", color: "#facc15", fontSize: "0.8rem", fontWeight: 600, alignSelf: "flex-start" }}>2021</span>
          </div>
        </Card>
      </section>

      {/* ── FOOTER / CONTACT ── */}
      <footer style={{ background: "#080810", borderTop: "1px solid #1e293b", padding: "3rem 2rem", textAlign: "center" }}>
        <p style={{ margin: "0 0 1rem", fontSize: "1.05rem", color: "#e2e8f0", fontWeight: 600 }}>Let&apos;s work together</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <a href="mailto:mubarakansari715@gmail.com" style={{ color: "#a78bfa", textDecoration: "none", fontSize: "0.9rem" }}>mubarakansari715@gmail.com</a>
          <a href="https://github.com/mubarakansari715" target="_blank" rel="noreferrer" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>GitHub</a>
          <a href="https://www.linkedin.com/in/mubarak-ansari-2a139a148/" target="_blank" rel="noreferrer" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>LinkedIn</a>
        </div>
        <p style={{ margin: 0, color: "#334155", fontSize: "0.8rem" }}>© 2024 Mubarak Ansari · Android Software Engineer</p>
      </footer>

      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float   { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-18px) rotate(180deg);} }
        @keyframes bounce  { 0%,100%{transform:translateX(-50%) translateY(0);} 50%{transform:translateX(-50%) translateY(8px);} }
      `}</style>
    </main>
  );
}

function SectionHeading({ title, accent }: { title: string; accent: string }) {
  return (
    <div>
      <h2 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 800, color: "#e2e8f0" }}>{title}</h2>
      <div style={{ width: 48, height: 4, borderRadius: 9999, background: accent, marginTop: "0.5rem" }} />
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: "1.5rem", ...style }}>
      {children}
    </div>
  );
}
