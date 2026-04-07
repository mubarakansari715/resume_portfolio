"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── DATA ─────────────────────────────────────────── */

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const ROLES = ["Android Engineer", "Kotlin Developer", "MVVM Architect", "Mobile Developer"];

const STATS = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 2, suffix: "", label: "Companies" },
  { value: 4, suffix: "+", label: "Projects Shipped" },
  { value: 1, suffix: "", label: "Award Won" },
];

const SKILLS = [
  { label: "Kotlin", pct: 92, color: "#a78bfa" },
  { label: "Java", pct: 85, color: "#fb923c" },
  { label: "MVVM / Clean Architecture", pct: 90, color: "#38bdf8" },
  { label: "Jetpack Compose", pct: 65, color: "#34d399" },
  { label: "Firebase & Crashlytics", pct: 82, color: "#f472b6" },
  { label: "RESTful APIs & JSON", pct: 88, color: "#facc15" },
  { label: "Dagger Hilt (DI)", pct: 80, color: "#a78bfa" },
  { label: "Unit & UI Testing", pct: 75, color: "#38bdf8" },
  { label: "Room Database", pct: 83, color: "#34d399" },
  { label: "Coroutines / Async", pct: 85, color: "#fb923c" },
];

const EXPERIENCE = [
  {
    company: "Bacancy Technology",
    role: "Software Engineer",
    period: "Sep 2023 – Present",
    color: "#a78bfa",
    icon: "🚀",
    points: [
      "Developed and enhanced Android apps using Kotlin/Java with Clean Architecture.",
      "Designed and implemented new modules; migrated legacy code to modern patterns.",
      "Handled Jira tasks/bugs and improved sprint delivery timelines.",
    ],
  },
  {
    company: "Brainvire Info Tech",
    role: "Software Engineer",
    period: "Jul 2021 – Aug 2023",
    color: "#38bdf8",
    icon: "💼",
    points: [
      "Built and maintained multiple production Android applications.",
      "Integrated Firebase Crashlytics, significantly reducing app crashes.",
      "Enhanced multi-screen responsive support for mobile and tablet.",
      "Implemented push notifications, maps, and analytics (Huawei SDK, WebEngage).",
    ],
  },
];

const PROJECTS = [
  {
    name: "Bonder",
    tag: "Professional & Social Connection",
    color: "#a78bfa",
    icon: "🔗",
    tech: ["Kotlin", "OTP Auth", "Play Store", "Jira"],
    desc: "Redesigned UI/UX, implemented OTP verification with auto-detection for seamless authentication. Published on Google Play Store.",
  },
  {
    name: "Seeking App",
    tag: "Luxury Dating Platform",
    color: "#f472b6",
    icon: "💎",
    tech: ["Clean Architecture", "Fragments", "Kotlin"],
    desc: "Migrated legacy Activities to Fragments with Clean Architecture. Developed new modules improving user engagement and retention.",
  },
  {
    name: "AlokozayShop",
    tag: "Grocery E-commerce",
    color: "#34d399",
    icon: "🛒",
    tech: ["WebEngage", "Huawei SDK", "Multi-screen"],
    desc: "Built full grocery shopping features, integrated WebEngage analytics and Huawei SDK for push notifications and maps.",
  },
  {
    name: "The Weed Tube",
    tag: "Video Sharing App",
    color: "#fb923c",
    icon: "🎬",
    tech: ["Dark/Light Theme", "Azure DevOps", "Java"],
    desc: "Enhanced UI with Dark/Light themes, integrated new features and maintained app stability by resolving Azure DevOps tracked bugs.",
  },
];

/* ─── HOOKS ─────────────────────────────────────────── */

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wi % words.length];
    const delay = deleting ? speed / 2 : speed;
    const id = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, display.length + 1));
        if (display.length + 1 === word.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setDisplay(word.slice(0, display.length - 1));
        if (display.length - 1 === 0) { setDeleting(false); setWi((n) => n + 1); }
      }
    }, delay);
    return () => clearTimeout(id);
  }, [display, deleting, wi, words, speed, pause]);

  return display;
}

function useInView(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, active: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const steps = 40;
    const step = target / steps;
    const interval = duration / steps;
    let current = 0;
    const id = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(current));
    }, interval);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return count;
}

/* ─── COMPONENTS ─────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 2rem",
      background: scrolled ? "rgba(10,10,20,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.3s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between", height: 64,
    }}>
      <span style={{ fontWeight: 800, fontSize: "1.15rem", background: "linear-gradient(135deg,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", cursor: "pointer" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        MA
      </span>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: "0.25rem" }} className="nav-desktop">
        {NAV_LINKS.map((l) => (
          <button key={l} onClick={() => scrollTo(l)}
            style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: "0.4rem 0.85rem", borderRadius: 8, fontSize: "0.88rem", fontWeight: 500, transition: "color 0.2s, background 0.2s" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#e2e8f0"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#94a3b8"; (e.target as HTMLElement).style.background = "none"; }}>
            {l}
          </button>
        ))}
        <a href="mailto:mubarakansari715@gmail.com"
          style={{ marginLeft: "0.5rem", padding: "0.4rem 1.1rem", borderRadius: 8, background: "linear-gradient(135deg,#a78bfa,#818cf8)", color: "#fff", fontWeight: 600, fontSize: "0.88rem", textDecoration: "none" }}>
          Hire Me
        </a>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setOpen(!open)} className="nav-mobile"
        style={{ background: "none", border: "1px solid #1e293b", borderRadius: 8, padding: "0.4rem 0.6rem", cursor: "pointer", color: "#94a3b8", fontSize: "1.2rem" }}>
        {open ? "✕" : "☰"}
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="nav-mobile" style={{ position: "fixed", top: 64, left: 0, right: 0, background: "rgba(10,10,20,0.97)", backdropFilter: "blur(16px)", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem", borderBottom: "1px solid #1e293b" }}>
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l)}
              style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: "0.75rem 1rem", borderRadius: 8, fontSize: "1rem", fontWeight: 500, textAlign: "left" }}>
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useInView();
  const count = useCounter(value, inView);
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "1.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1e293b", borderRadius: 16 }}>
      <p style={{ margin: 0, fontSize: "2.5rem", fontWeight: 900, background: "linear-gradient(135deg,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {count}{suffix}
      </p>
      <p style={{ margin: "0.35rem 0 0", color: "#64748b", fontSize: "0.85rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</p>
    </div>
  );
}

function SkillBar({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{ color: "#cbd5e1", fontSize: "0.88rem", fontWeight: 600 }}>{label}</span>
        <span style={{ color: color, fontSize: "0.8rem", fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: 7, background: "rgba(255,255,255,0.06)", borderRadius: 9999, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 9999,
          background: `linear-gradient(90deg, ${color}cc, ${color})`,
          width: inView ? `${pct}%` : "0%",
          transition: `width 1.2s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          boxShadow: `0 0 10px ${color}55`,
        }} />
      </div>
    </div>
  );
}

function FadeSection({ children, id }: { children: React.ReactNode; id?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div id={id} ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.75s ease, transform 0.75s ease" }}>
      {children}
    </div>
  );
}

function SectionHeading({ title, sub, accent }: { title: string; sub?: string; accent: string }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <p style={{ margin: "0 0 0.35rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.2em", color: accent, fontWeight: 700 }}>— {sub ?? title}</p>
      <h2 style={{ margin: 0, fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 900, color: "#f1f5f9" }}>{title}</h2>
      <div style={{ width: 48, height: 4, borderRadius: 9999, background: `linear-gradient(90deg, ${accent}, transparent)`, marginTop: "0.6rem" }} />
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────── */

export default function Home() {
  const role = useTypewriter(ROLES);

  return (
    <div style={{ background: "#060611", color: "#e2e8f0", fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}>
      <Navbar />

      {/* ════ HERO ════ */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "6rem 2rem 4rem" }}>

        {/* Animated grid background */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        {/* Glow orbs */}
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 65%)", top: "-150px", left: "-200px", pointerEvents: "none", animation: "orb1 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 65%)", bottom: "-100px", right: "-150px", pointerEvents: "none", animation: "orb2 10s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 65%)", top: "40%", right: "15%", pointerEvents: "none", animation: "orb1 12s ease-in-out infinite reverse" }} />

        {/* Floating particles */}
        {[...Array(22)].map((_, i) => (
          <span key={i} style={{ position: "absolute", borderRadius: "50%", background: `hsl(${i * 22 % 360},65%,65%)`, width: i % 3 === 0 ? 5 : 3, height: i % 3 === 0 ? 5 : 3, left: `${(i * 4.6 + 3) % 100}%`, top: `${(i * 6.8 + 5) % 100}%`, animation: `floatP ${3.5 + i % 5}s ease-in-out infinite`, animationDelay: `${(i * 0.4) % 4}s`, opacity: 0.45 }} />
        ))}

        <div style={{ textAlign: "center", position: "relative", zIndex: 10, maxWidth: 850 }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 9999, padding: "0.35rem 1rem", marginBottom: "1.75rem", animation: "fadeUp 0.6s ease both" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "0.82rem", color: "#a78bfa", fontWeight: 600 }}>Available for opportunities</span>
          </div>

          {/* Name */}
          <h1 style={{ margin: "0 0 0.5rem", fontSize: "clamp(3.2rem, 9vw, 6.5rem)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.03em", animation: "fadeUp 0.7s ease 0.1s both" }}>
            <span style={{ background: "linear-gradient(135deg,#c4b5fd,#818cf8,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Mubarak</span>
            <br />
            <span style={{ background: "linear-gradient(135deg,#f9a8d4,#fb923c,#facc15)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Ansari</span>
          </h1>

          {/* Typewriter role */}
          <div style={{ height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", animation: "fadeUp 0.7s ease 0.2s both" }}>
            <span style={{ fontSize: "clamp(1.1rem,2.8vw,1.6rem)", color: "#94a3b8", fontWeight: 500 }}>
              {role}
              <span style={{ color: "#a78bfa", animation: "blink 0.9s infinite" }}>|</span>
            </span>
          </div>

          <p style={{ color: "#475569", fontSize: "1rem", maxWidth: 560, margin: "0 auto 2.25rem", lineHeight: 1.7, animation: "fadeUp 0.7s ease 0.3s both" }}>
            4+ years crafting high-quality Android experiences · Clean Architecture · Kotlin / Java · MVVM
          </p>

          {/* CTA */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.4s both", marginBottom: "2.5rem" }}>
            <a href="mailto:mubarakansari715@gmail.com" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 2rem", borderRadius: 12, background: "linear-gradient(135deg,#a78bfa,#818cf8)", color: "#fff", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", boxShadow: "0 4px 24px rgba(167,139,250,0.35)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(167,139,250,0.5)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(167,139,250,0.35)"; }}>
              ✉ Hire Me
            </a>
            <a href="https://github.com/mubarakansari715" target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 2rem", borderRadius: 12, border: "1.5px solid #1e293b", color: "#94a3b8", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem", background: "rgba(255,255,255,0.02)", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#a78bfa"; (e.currentTarget as HTMLElement).style.color = "#e2e8f0"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1e293b"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}>
              ⌥ GitHub
            </a>
            <a href="https://www.linkedin.com/in/mubarak-ansari-2a139a148/" target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 2rem", borderRadius: 12, border: "1.5px solid #1e293b", color: "#94a3b8", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem", background: "rgba(255,255,255,0.02)", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#38bdf8"; (e.currentTarget as HTMLElement).style.color = "#e2e8f0"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1e293b"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}>
              ⧉ LinkedIn
            </a>
          </div>

          {/* Award badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(250,204,21,0.07)", border: "1px solid rgba(250,204,21,0.2)", borderRadius: 10, padding: "0.5rem 1.25rem", animation: "fadeUp 0.7s ease 0.5s both" }}>
            <span>🏆</span>
            <span style={{ fontSize: "0.83rem", color: "#facc15", fontWeight: 600 }}>Employee of the Quarter 2024 — Bacancy Technology</span>
          </div>
        </div>

        {/* Scroll arrow */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", animation: "scrollBounce 2s ease-in-out infinite", opacity: 0.35 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
        </div>
      </section>

      {/* ════ STATS ════ */}
      <FadeSection>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "4rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
            {STATS.map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </div>
      </FadeSection>

      {/* ════ ABOUT ════ */}
      <FadeSection id="about">
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "5rem 2rem" }}>
          <SectionHeading title="About Me" sub="Who I Am" accent="#a78bfa" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px,1fr))", gap: "1.5rem" }}>
            <div style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.06), rgba(56,189,248,0.04))", border: "1px solid rgba(167,139,250,0.15)", borderRadius: 20, padding: "2rem" }}>
              <p style={{ color: "#94a3b8", lineHeight: 1.85, margin: 0, fontSize: "0.96rem" }}>
                Software Engineer with <strong style={{ color: "#c4b5fd" }}>4+ years of experience</strong> building impactful Android applications. I specialize in <strong style={{ color: "#38bdf8" }}>Clean Architecture</strong> and scalable MVVM patterns that make codebases maintainable and teams faster.
              </p>
              <p style={{ color: "#64748b", lineHeight: 1.8, margin: "1rem 0 0", fontSize: "0.9rem" }}>
                Passionate about crafting intuitive UX, writing clean testable code, and always eager to tackle challenging engineering problems.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                { icon: "📍", label: "Location", value: "Ahmedabad, Gujarat, India" },
                { icon: "✉️", label: "Email", value: "mubarakansari715@gmail.com" },
                { icon: "📞", label: "Phone", value: "+91 9998508484" },
                { icon: "🎓", label: "Degree", value: "B.E. IT — CGPI 8.23" },
                { icon: "🗣️", label: "Languages", value: "English · Hindi · Gujarati · Bhojpuri" },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.85rem", background: "rgba(255,255,255,0.025)", border: "1px solid #1e293b", borderRadius: 12, padding: "0.7rem 1rem" }}>
                  <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{icon}</span>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.7rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{label}</p>
                    <p style={{ margin: 0, fontSize: "0.87rem", color: "#94a3b8" }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ════ SKILLS ════ */}
      <FadeSection id="skills">
        <div style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid #0f172a", borderBottom: "1px solid #0f172a", padding: "5rem 2rem" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <SectionHeading title="Technical Skills" sub="What I Know" accent="#38bdf8" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: "0 3rem" }}>
              {SKILLS.map((s, i) => (
                <SkillBar key={s.label} label={s.label} pct={s.pct} color={s.color} delay={i * 80} />
              ))}
            </div>

            {/* Tool pills */}
            <div style={{ marginTop: "2.5rem" }}>
              <p style={{ color: "#475569", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.85rem", fontWeight: 600 }}>Tools & Practices</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
                {["Android SDK", "Agile / Scrum", "Azure DevOps", "Jira", "WebEngage", "Huawei SDK", "Sentry", "JSON Parsing", "Git"].map((t) => (
                  <span key={t} style={{ padding: "0.3rem 0.85rem", borderRadius: 9999, border: "1px solid #1e293b", color: "#64748b", fontSize: "0.82rem", background: "rgba(255,255,255,0.02)", fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ════ EXPERIENCE ════ */}
      <FadeSection id="experience">
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "5rem 2rem" }}>
          <SectionHeading title="Experience" sub="Where I've Worked" accent="#f472b6" />
          <div style={{ position: "relative" }}>
            {/* vertical line */}
            <div style={{ position: "absolute", left: 22, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #a78bfa44, #38bdf844, transparent)", borderRadius: 9999 }} />

            {EXPERIENCE.map((e, i) => (
              <div key={e.company} style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem", position: "relative" }}>
                {/* dot */}
                <div style={{ flexShrink: 0, width: 46, height: 46, borderRadius: "50%", background: `${e.color}18`, border: `2px solid ${e.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", zIndex: 1 }}>
                  {e.icon}
                </div>

                <div style={{ flex: 1, background: "rgba(255,255,255,0.025)", border: `1px solid ${e.color}22`, borderRadius: 18, padding: "1.5rem", transition: "border-color 0.3s" }}
                  onMouseEnter={el => (el.currentTarget.style.borderColor = `${e.color}55`)}
                  onMouseLeave={el => (el.currentTarget.style.borderColor = `${e.color}22`)}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ margin: 0, color: e.color, fontWeight: 800, fontSize: "1.1rem" }}>{e.company}</h3>
                      <p style={{ margin: "0.2rem 0 0", color: "#64748b", fontSize: "0.88rem", fontWeight: 500 }}>{e.role}</p>
                    </div>
                    <span style={{ padding: "0.25rem 0.9rem", borderRadius: 9999, background: `${e.color}12`, border: `1px solid ${e.color}35`, color: e.color, fontSize: "0.78rem", fontWeight: 700, alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                      {e.period}
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {e.points.map((p) => (
                      <li key={p} style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.65 }}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ════ PROJECTS ════ */}
      <FadeSection id="projects">
        <div style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid #0f172a", borderBottom: "1px solid #0f172a", padding: "5rem 2rem" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <SectionHeading title="Projects" sub="What I've Built" accent="#34d399" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "1.25rem" }}>
              {PROJECTS.map((p) => (
                <div key={p.name}
                  style={{ background: "#0a0a18", border: `1px solid ${p.color}22`, borderRadius: 20, padding: "1.75rem", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s", cursor: "default" }}
                  onMouseEnter={el => { el.currentTarget.style.transform = "translateY(-6px)"; el.currentTarget.style.boxShadow = `0 16px 40px ${p.color}18`; el.currentTarget.style.borderColor = `${p.color}55`; }}
                  onMouseLeave={el => { el.currentTarget.style.transform = "translateY(0)"; el.currentTarget.style.boxShadow = "none"; el.currentTarget.style.borderColor = `${p.color}22`; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.6rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>{p.icon}</span>
                    <h3 style={{ margin: 0, color: p.color, fontWeight: 800, fontSize: "1.1rem" }}>{p.name}</h3>
                  </div>
                  <p style={{ margin: "0 0 0.75rem", color: "#334155", fontSize: "0.76rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{p.tag}</p>
                  <p style={{ margin: "0 0 1.1rem", color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.7 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {p.tech.map((t) => (
                      <span key={t} style={{ padding: "0.2rem 0.65rem", borderRadius: 9999, background: `${p.color}0f`, border: `1px solid ${p.color}30`, color: p.color, fontSize: "0.75rem", fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ════ EDUCATION ════ */}
      <FadeSection id="education">
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "5rem 2rem" }}>
          <SectionHeading title="Education" sub="Academic Background" accent="#facc15" />
          <div style={{ background: "linear-gradient(135deg, rgba(250,204,21,0.05), rgba(251,146,60,0.04))", border: "1px solid rgba(250,204,21,0.2)", borderRadius: 20, padding: "2rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(250,204,21,0.12)", border: "1.5px solid rgba(250,204,21,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>🎓</div>
              <div>
                <h3 style={{ margin: 0, color: "#facc15", fontWeight: 800, fontSize: "1.1rem" }}>Gyanmanjari Institute of Technology</h3>
                <p style={{ margin: "0.25rem 0 0", color: "#94a3b8", fontSize: "0.9rem" }}>Bachelor of Engineering — Information Technology</p>
                <p style={{ margin: "0.2rem 0 0", color: "#64748b", fontSize: "0.85rem" }}>CGPI: <strong style={{ color: "#facc15" }}>8.23 / 10</strong></p>
              </div>
            </div>
            <div style={{ padding: "0.5rem 1.25rem", borderRadius: 12, background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.25)", color: "#facc15", fontSize: "0.9rem", fontWeight: 700, alignSelf: "flex-start" }}>2021</div>
          </div>
        </div>
      </FadeSection>

      {/* ════ CONTACT ════ */}
      <FadeSection id="contact">
        <div style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid #0f172a", padding: "5rem 2rem 4rem" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <SectionHeading title="Get In Touch" sub="Contact" accent="#a78bfa" />
            <p style={{ color: "#64748b", lineHeight: 1.75, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
              I&apos;m open to full-time roles, freelance projects, or interesting collaborations. Drop me a message and I&apos;ll get back to you!
            </p>

            <a href="mailto:mubarakansari715@gmail.com"
              style={{ display: "inline-block", padding: "0.9rem 2.5rem", borderRadius: 14, background: "linear-gradient(135deg,#a78bfa,#818cf8)", color: "#fff", fontWeight: 700, textDecoration: "none", fontSize: "1rem", boxShadow: "0 4px 24px rgba(167,139,250,0.35)", marginBottom: "2.5rem", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(167,139,250,0.5)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(167,139,250,0.35)"; }}>
              ✉ mubarakansari715@gmail.com
            </a>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              {[
                { label: "GitHub", href: "https://github.com/mubarakansari715", color: "#94a3b8" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/mubarak-ansari-2a139a148/", color: "#38bdf8" },
                { label: "Phone: +91 9998508484", href: "tel:+919998508484", color: "#34d399" },
              ].map(({ label, href, color }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  style={{ padding: "0.55rem 1.25rem", borderRadius: 10, border: `1.5px solid ${color}33`, color, fontWeight: 600, fontSize: "0.88rem", textDecoration: "none", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${color}12`}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ════ FOOTER ════ */}
      <footer style={{ borderTop: "1px solid #0f172a", padding: "1.75rem 2rem", textAlign: "center" }}>
        <p style={{ margin: 0, color: "#1e293b", fontSize: "0.82rem" }}>
          © 2024 Mubarak Ansari · Built with Next.js · Deployed on Vercel
        </p>
      </footer>

      <style>{`
        @keyframes fadeUp      { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse       { 0%,100%{opacity:1;box-shadow:0 0 8px #4ade80} 50%{opacity:0.6;box-shadow:0 0 16px #4ade80} }
        @keyframes floatP      { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(200deg)} }
        @keyframes orb1        { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
        @keyframes orb2        { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,20px)} }
        @keyframes scrollBounce{ 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(9px)} }
        .nav-mobile { display: none !important; }
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
