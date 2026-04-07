"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────── DESIGN TOKENS ─────────────────────── */
const C = {
  bg:        "#06060f",
  surface:   "#0e0e1c",
  border:    "rgba(255,255,255,0.07)",
  borderHov: "rgba(139,92,246,0.5)",
  violet:    "#8b5cf6",
  cyan:      "#22d3ee",
  grad:      "linear-gradient(135deg,#8b5cf6,#22d3ee)",
  gradText:  "linear-gradient(135deg,#c4b5fd,#67e8f9)",
  textPri:   "#f1f5f9",
  textSec:   "#94a3b8",
  textMut:   "#475569",
};

/* ─────────────── DATA ───────────────────────────────── */

const NAV = ["About","Skills","Experience","Projects","Education","Contact"];

const ROLES = ["Android Engineer","Kotlin Developer","Jetpack Compose Dev","React Native Dev","MVVM Architect"];

const STATS = [
  { n: 5,  s: "+", label: "Years Experience" },
  { n: 2,  s: "",  label: "Companies" },
  { n: 6,  s: "+", label: "Apps Shipped" },
  { n: 1,  s: "",  label: "Award" },
];

const SKILL_GROUPS = [
  {
    title: "Languages",
    icon: "⌨️",
    items: [
      { label: "Kotlin",          pct: 93 },
      { label: "Java",            pct: 85 },
      { label: "Jetpack Compose", pct: 80 },
      { label: "XML / Layouts",   pct: 88 },
      { label: "React Native",    pct: 72 },
    ],
  },
  {
    title: "Architecture & Patterns",
    icon: "🏗️",
    items: [
      { label: "MVVM",                pct: 93 },
      { label: "Clean Architecture",  pct: 90 },
      { label: "MVP",                 pct: 78 },
      { label: "Dagger Hilt (DI)",    pct: 85 },
      { label: "Coroutines / Flow",   pct: 87 },
    ],
  },
  {
    title: "Tools & Integrations",
    icon: "🔧",
    items: [
      { label: "Firebase & Crashlytics",    pct: 88 },
      { label: "RESTful APIs / WebSockets", pct: 90 },
      { label: "Room Database",             pct: 87 },
      { label: "CI/CD (Fastlane/Bitrise)",  pct: 75 },
      { label: "JUnit & Espresso",          pct: 78 },
    ],
  },
];

const TOOLS = [
  "Android Studio","Version Catalog","Stripe / PayPal","KtLint",
  "GitHub Actions","Fastlane","Bitrise","Azure DevOps","Jira",
  "WebEngage","Huawei SDK","Sentry","WebSockets","Git / GitLab",
];

const AI_TOOLS = ["Cursor","Claude AI","Antigravity"];

const EXPERIENCE = [
  {
    company: "Bacancy Technology",
    role:    "Software Engineer",
    period:  "Sep 2023 – Present",
    points: [
      "Developed core Android features using Kotlin & Jetpack Compose with MVVM / Clean Architecture.",
      "Implemented OTP auto-SMS detection and integrated Firebase & Google Analytics.",
      "Wrote JUnit unit tests to validate business logic and ensure code reliability.",
      "Managed app publishing, release cycles, and Play Store compliance.",
      "Set up CI/CD pipelines using GitHub Actions and Fastlane; tracked tasks via Azure DevOps.",
    ],
  },
  {
    company: "Brainvire Info Tech",
    role:    "Software Engineer",
    period:  "Jul 2021 – Aug 2023",
    points: [
      "Built and maintained multiple production Android applications in Kotlin / Java.",
      "Integrated Firebase Crashlytics and Sentry for crash monitoring and error detection.",
      "Added Huawei SDK for push notifications, maps, and analytics.",
      "Enhanced multi-screen responsive support across mobile and tablet form factors.",
      "Performed Root Cause Analysis (RCA) to ensure long-term production stability.",
    ],
  },
];

const PROJECTS = [
  {
    name:  "Bonder",
    tag:   "Professional & Social Connection",
    icon:  "🔗",
    tech:  ["Kotlin","Jetpack Compose","MVVM","Firebase","JUnit","Azure DevOps"],
    desc:  "Platform that creates meaningful connections between professionals across IT, digital marketing and related fields.",
    points:[
      "Built core features with Kotlin + Jetpack Compose following MVVM architecture.",
      "Implemented OTP verification with automatic SMS detection.",
      "Integrated Firebase & Google Analytics for user behaviour tracking.",
      "Added Firebase Crashlytics for real-time crash monitoring.",
      "Wrote JUnit unit tests and published the app on Google Play Store.",
    ],
  },
  {
    name:  "Seeking App",
    tag:   "Luxury Dating Platform",
    icon:  "💎",
    tech:  ["Kotlin","Clean Architecture","Fragments","Jira"],
    desc:  "Luxury dating platform connecting ambitious, success-driven individuals globally.",
    points:[
      "Developed new modules and feature enhancements.",
      "Implemented Clean Architecture to improve maintainability and scalability.",
      "Migrated legacy Activities to Fragment-based architecture.",
      "Optimized performance, reduced code complexity, and redesigned UI screens.",
    ],
  },
  {
    name:  "IRA Financial",
    tag:   "Self-Directed Retirement App",
    icon:  "💰",
    tech:  ["Kotlin","Firebase","Fingerprint Auth","WebView","Play Store"],
    desc:  "Android app for a leading provider of self-directed retirement products — helping clients manage retirement accounts on mobile.",
    points:[
      "Monitored Firebase crash reports daily for app stability.",
      "Implemented biometric (fingerprint) authentication.",
      "Optimized performance and resolved WebView-related issues.",
      "Collaborated with the client on app publishing and compliance changes.",
    ],
  },
  {
    name:  "AlokozayShop",
    tag:   "Grocery E-commerce App",
    icon:  "🛒",
    tech:  ["Kotlin","WebEngage","Huawei SDK","Sentry","Firebase","Azure DevOps"],
    desc:  "One-stop grocery delivery app covering food, beverages, and daily essentials with supermarket-level inventory.",
    points:[
      "Integrated WebEngage for user activity analytics.",
      "Added Huawei SDK for push notifications, search, and maps.",
      "Implemented Sentry for error detection and performance monitoring.",
      "Added multi-screen (mobile/tablet) responsive support.",
    ],
  },
  {
    name:  "The Weed Tube",
    tag:   "Video Sharing App",
    icon:  "🎬",
    tech:  ["Java","Kotlin","Dark/Light Theme","Firebase","Azure DevOps"],
    desc:  "YouTube-style video sharing platform where users share, like, comment and report videos globally.",
    points:[
      "Integrated Dark / Light theme support across the app.",
      "Added Firebase Crashlytics and push notifications.",
      "Rebuilt key UI screens for improved user experience.",
      "Handled Azure DevOps bug tracking and maintenance tasks.",
    ],
  },
  {
    name:  "Book My Table",
    tag:   "Restaurant Table Booking",
    icon:  "🍽️",
    tech:  ["Java","Kotlin","Firebase","REST API"],
    desc:  "Pre-book restaurant tables for parties and meetings at a specific time, day, and date with custom instructions.",
    points:[
      "Led Android-side app development from scratch.",
      "Integrated Firebase Crashlytics and push notifications.",
      "Implemented REST API integration and conducted developer testing.",
    ],
  },
];

/* ─────────────── HOOKS ──────────────────────────────── */

function useTypewriter(words: string[], speed = 75, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wi % words.length];
    const id = setTimeout(() => {
      if (!del) {
        setDisplay(word.slice(0, display.length + 1));
        if (display.length + 1 === word.length) setTimeout(() => setDel(true), pause);
      } else {
        setDisplay(word.slice(0, display.length - 1));
        if (display.length - 1 === 0) { setDel(false); setWi(n => n + 1); }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(id);
  }, [display, del, wi, words, speed, pause]);
  return display;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCount(target: number, active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0; const step = target / 40;
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setN(target); clearInterval(id); } else setN(Math.floor(cur));
    }, 35);
    return () => clearInterval(id);
  }, [active, target]);
  return n;
}

/* ─────────────── SMALL COMPONENTS ──────────────────── */

function Reveal({ children, id, delay = 0 }: { children: React.ReactNode; id?: string; delay?: number }) {
  const { ref, inView } = useInView(0.08);
  return (
    <div id={id} ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(36px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function Tag({ label, color = C.violet }: { label: string; color?: string }) {
  return (
    <span style={{ padding: "0.2rem 0.7rem", borderRadius: 6, background: `${color}14`, border: `1px solid ${color}40`, color, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.02em" }}>
      {label}
    </span>
  );
}

function Divider() {
  return <div style={{ height: 1, background: C.border, margin: "0 2rem" }} />;
}

function SecLabel({ text }: { text: string }) {
  return (
    <p style={{ margin: "0 0 0.4rem", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
      {text}
    </p>
  );
}

function SecTitle({ text }: { text: string }) {
  return <h2 style={{ margin: "0 0 0.6rem", fontSize: "clamp(1.9rem,4vw,2.6rem)", fontWeight: 900, color: C.textPri, letterSpacing: "-0.02em" }}>{text}</h2>;
}

function SecBar({ color = C.violet }: { color?: string }) {
  return <div style={{ width: 40, height: 3, borderRadius: 9999, background: color, marginBottom: "2.5rem" }} />;
}

/* ─────────────── NAVBAR ─────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = useCallback((id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }, []);
  return (
    <nav style={{ position: "fixed", inset: "0 0 auto 0", zIndex: 200, height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2.5rem", background: scrolled ? "rgba(6,6,15,0.88)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition: "all 0.35s ease" }}>

      {/* Logo */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <span style={{ fontSize: "1.1rem", fontWeight: 900, background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.03em" }}>MA.</span>
      </button>

      {/* Desktop */}
      <div className="desk" style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
        {NAV.map(l => (
          <button key={l} onClick={() => go(l)} style={{ background: "none", border: "none", color: C.textMut, cursor: "pointer", padding: "0.45rem 0.9rem", borderRadius: 8, fontSize: "0.85rem", fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = C.textPri)}
            onMouseLeave={e => (e.currentTarget.style.color = C.textMut)}>
            {l}
          </button>
        ))}
        <a href="mailto:mubarakansari715@gmail.com" style={{ marginLeft: "0.75rem", padding: "0.45rem 1.2rem", borderRadius: 8, background: C.grad, color: "#fff", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", boxShadow: "0 2px 16px rgba(139,92,246,0.3)" }}>
          Hire Me
        </a>
      </div>

      {/* Mobile */}
      <button className="mob" onClick={() => setOpen(!open)} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "0.4rem 0.65rem", color: C.textSec, cursor: "pointer", fontSize: "1.1rem" }}>
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <div className="mob" style={{ position: "fixed", top: 62, left: 0, right: 0, background: "rgba(6,6,15,0.97)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}`, display: "flex", flexDirection: "column", padding: "0.75rem" }}>
          {NAV.map(l => (
            <button key={l} onClick={() => go(l)} style={{ background: "none", border: "none", color: C.textSec, cursor: "pointer", padding: "0.8rem 1rem", textAlign: "left", fontSize: "1rem", fontWeight: 500, borderRadius: 8 }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─────────────── MAIN PAGE ──────────────────────────── */

export default function Home() {
  const role = useTypewriter(ROLES);

  return (
    <div style={{ background: C.bg, color: C.textPri, fontFamily: "'Inter','Segoe UI',Arial,sans-serif", lineHeight: 1.6 }}>
      <Navbar />

      {/* ══════════════════ HERO ══════════════════ */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "7rem 2rem 5rem" }}>

        {/* Orbs */}
        <div style={{ position: "absolute", width: 720, height: 720, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 65%)", top: -160, left: -200, pointerEvents: "none", animation: "orbA 9s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle,rgba(34,211,238,0.08) 0%,transparent 65%)", bottom: -80, right: -120, pointerEvents: "none", animation: "orbB 11s ease-in-out infinite" }} />

        {/* Dots */}
        {[...Array(16)].map((_, i) => (
          <span key={i} style={{ position: "absolute", width: i % 4 === 0 ? 5 : 3, height: i % 4 === 0 ? 5 : 3, borderRadius: "50%", background: i % 2 === 0 ? `${C.violet}99` : `${C.cyan}99`, left: `${(i * 6.3 + 4) % 100}%`, top: `${(i * 7.7 + 6) % 100}%`, animation: `floatDot ${4 + i % 4}s ease-in-out infinite`, animationDelay: `${(i * 0.45) % 4}s`, pointerEvents: "none" }} />
        ))}

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 820 }}>

          {/* Status pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 9999, padding: "0.35rem 1.1rem", marginBottom: "1.8rem", animation: "fadeUp 0.6s ease both" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", animation: "ping 2s ease infinite", boxShadow: "0 0 6px #4ade80" }} />
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#a78bfa" }}>Immediate Joiner · Open to Opportunities</span>
          </div>

          {/* Name */}
          <h1 style={{ margin: "0 0 0.75rem", fontSize: "clamp(3rem,9vw,6rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, animation: "fadeUp 0.7s ease 0.1s both" }}>
            <span style={{ background: "linear-gradient(135deg,#c4b5fd 0%,#818cf8 40%,#67e8f9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Mubarak Ansari
            </span>
          </h1>

          {/* Typewriter */}
          <div style={{ height: "2.2rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", animation: "fadeUp 0.7s ease 0.2s both" }}>
            <span style={{ fontSize: "clamp(1rem,2.5vw,1.4rem)", color: C.textSec, fontWeight: 400 }}>
              {role}<span style={{ color: C.violet, animation: "blink 1s step-end infinite" }}>|</span>
            </span>
          </div>

          {/* Tagline */}
          <p style={{ color: C.textMut, fontSize: "0.95rem", maxWidth: 580, margin: "0 auto 0.75rem", lineHeight: 1.8, animation: "fadeUp 0.7s ease 0.3s both" }}>
            Android Developer with 5+ Years of Expertise in Compose, Kotlin &amp; Java · React Native
          </p>

          {/* CTA row */}
          <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap", margin: "2rem 0 2.25rem", animation: "fadeUp 0.7s ease 0.4s both" }}>
            <a href="mailto:mubarakansari715@gmail.com" style={{ padding: "0.75rem 2rem", borderRadius: 10, background: C.grad, color: "#fff", fontWeight: 700, textDecoration: "none", fontSize: "0.92rem", boxShadow: "0 4px 22px rgba(139,92,246,0.4)", transition: "opacity 0.2s,transform 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = ""; }}>
              ✉ Get In Touch
            </a>
            <a href="https://github.com/mubarakansari715" target="_blank" rel="noreferrer" style={{ padding: "0.75rem 2rem", borderRadius: 10, border: `1px solid ${C.border}`, color: C.textSec, fontWeight: 600, textDecoration: "none", fontSize: "0.92rem", background: "rgba(255,255,255,0.02)", transition: "border-color 0.2s,color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.violet; (e.currentTarget as HTMLElement).style.color = C.textPri; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.color = C.textSec; }}>
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com/in/mubarak-ansari-2a139a148/" target="_blank" rel="noreferrer" style={{ padding: "0.75rem 2rem", borderRadius: 10, border: `1px solid ${C.border}`, color: C.textSec, fontWeight: 600, textDecoration: "none", fontSize: "0.92rem", background: "rgba(255,255,255,0.02)", transition: "border-color 0.2s,color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.cyan; (e.currentTarget as HTMLElement).style.color = C.textPri; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.color = C.textSec; }}>
              LinkedIn ↗
            </a>
          </div>

          {/* Award badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(250,204,21,0.06)", border: "1px solid rgba(250,204,21,0.18)", borderRadius: 8, padding: "0.45rem 1.1rem", animation: "fadeUp 0.7s ease 0.5s both" }}>
            <span style={{ fontSize: "0.95rem" }}>🏆</span>
            <span style={{ fontSize: "0.8rem", color: "#fbbf24", fontWeight: 600 }}>Employee of the Quarter 2024 · Bacancy Technology</span>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: "absolute", bottom: "1.75rem", left: "50%", transform: "translateX(-50%)", animation: "scrollDown 2s ease-in-out infinite", opacity: 0.3 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textSec} strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <Divider />
      <Reveal>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "3.5rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "1px", background: C.border, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}` }}>
            {STATS.map(s => {
              const { ref, inView } = useInViewLocal();
              const n = useCount(s.n, inView);
              return (
                <div key={s.label} ref={ref} style={{ background: C.surface, padding: "2rem 1.5rem", textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: "2.6rem", fontWeight: 900, background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>{n}{s.s}</p>
                  <p style={{ margin: "0.4rem 0 0", color: C.textMut, fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
      <Divider />

      {/* ══════════════════ ABOUT ══════════════════ */}
      <Reveal id="about">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2rem" }}>
          <SecLabel text="Who I Am" />
          <SecTitle text="About Me" />
          <SecBar />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
            {/* Bio card */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "2rem" }}>
              <p style={{ color: C.textSec, lineHeight: 1.85, margin: "0 0 1rem", fontSize: "0.95rem" }}>
                Highly motivated Software Engineer with <strong style={{ color: C.textPri }}>5+ years of experience</strong> delivering high-quality Android applications. Proficient in <strong style={{ color: "#c4b5fd" }}>MVVM, Clean Architecture</strong> and Jetpack components to build efficient, user-friendly products.
              </p>
              <p style={{ color: C.textMut, lineHeight: 1.8, margin: 0, fontSize: "0.9rem" }}>
                Experienced in managing Play Store release cycles, CI/CD pipelines (Fastlane, Bitrise, GitHub Actions), performance profiling, JUnit testing, and Root Cause Analysis to ensure production stability.
              </p>
            </div>

            {/* Info grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { icon: "📍", label: "Location", value: "Ahmedabad, Gujarat, India" },
                { icon: "✉️", label: "Email",    value: "mubarakansari715@gmail.com" },
                { icon: "📞", label: "Phone",    value: "+91 9998508484" },
                { icon: "🎓", label: "Degree",   value: "B.E. IT — CGPI 8.23" },
                { icon: "🗣️", label: "Languages",value: "English · Hindi · Gujarati · Bhojpuri" },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.85rem", background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "0.65rem 1rem" }}>
                  <span style={{ fontSize: "1rem", width: 22, textAlign: "center", flexShrink: 0 }}>{icon}</span>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.68rem", color: C.textMut, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>{label}</p>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: C.textSec }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
      <Divider />

      {/* ══════════════════ SKILLS ══════════════════ */}
      <Reveal id="skills">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2rem" }}>
          <SecLabel text="What I Know" />
          <SecTitle text="Technical Skills" />
          <SecBar color={C.cyan} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            {SKILL_GROUPS.map(group => (
              <SkillGroup key={group.title} {...group} />
            ))}
          </div>

          {/* Tools */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "1.75rem" }}>
            <p style={{ margin: "0 0 1rem", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: C.textMut }}>Tools & Practices</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
              {TOOLS.map(t => (
                <span key={t} style={{ padding: "0.25rem 0.8rem", borderRadius: 6, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, color: C.textMut, fontSize: "0.8rem", fontWeight: 500 }}>{t}</span>
              ))}
            </div>

            <p style={{ margin: "0 0 0.75rem", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>🤖 AI-Assisted Development</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {AI_TOOLS.map(t => (
                <span key={t} style={{ padding: "0.3rem 0.95rem", borderRadius: 6, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", color: "#c4b5fd", fontSize: "0.82rem", fontWeight: 700 }}>✦ {t}</span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
      <Divider />

      {/* ══════════════════ EXPERIENCE ══════════════════ */}
      <Reveal id="experience">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2rem" }}>
          <SecLabel text="Where I've Worked" />
          <SecTitle text="Experience" />
          <SecBar color="#f472b6" />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {EXPERIENCE.map((e, i) => (
              <div key={e.company} style={{ display: "flex", gap: "0", position: "relative" }}>
                {/* Timeline spine */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "1.5rem", flexShrink: 0 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: i === 0 ? C.violet : C.cyan, boxShadow: `0 0 12px ${i === 0 ? C.violet : C.cyan}`, flexShrink: 0, marginTop: "1.5rem" }} />
                  {i < EXPERIENCE.length - 1 && <div style={{ width: 2, flex: 1, background: `linear-gradient(to bottom, ${C.violet}40, ${C.cyan}20)`, minHeight: 40 }} />}
                </div>

                {/* Card */}
                <div style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "1.75rem", transition: "border-color 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.35)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.1rem" }}>
                    <div>
                      <h3 style={{ margin: 0, fontWeight: 800, fontSize: "1.1rem", color: C.textPri }}>{e.company}</h3>
                      <p style={{ margin: "0.15rem 0 0", color: C.textMut, fontSize: "0.87rem", fontWeight: 500 }}>{e.role}</p>
                    </div>
                    <span style={{ padding: "0.25rem 0.85rem", borderRadius: 6, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", color: "#c4b5fd", fontSize: "0.78rem", fontWeight: 600, alignSelf: "flex-start", whiteSpace: "nowrap" }}>{e.period}</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.15rem", display: "flex", flexDirection: "column", gap: "0.38rem" }}>
                    {e.points.map(p => <li key={p} style={{ color: C.textSec, fontSize: "0.9rem", lineHeight: 1.65 }}>{p}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
      <Divider />

      {/* ══════════════════ PROJECTS ══════════════════ */}
      <Reveal id="projects">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2rem" }}>
          <SecLabel text="What I've Built" />
          <SecTitle text="Projects" />
          <SecBar color={C.cyan} />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </div>
        </div>
      </Reveal>
      <Divider />

      {/* ══════════════════ EDUCATION ══════════════════ */}
      <Reveal id="education">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2rem" }}>
          <SecLabel text="Academic Background" />
          <SecTitle text="Education" />
          <SecBar color="#fbbf24" />

          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "2rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>🎓</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, color: C.textPri, fontWeight: 800, fontSize: "1.1rem" }}>Gyanmanjari Institute of Technology</h3>
              <p style={{ margin: "0.2rem 0 0", color: C.textSec, fontSize: "0.9rem" }}>Bachelor of Engineering — Information Technology</p>
              <p style={{ margin: "0.15rem 0 0", color: C.textMut, fontSize: "0.85rem" }}>CGPI: <strong style={{ color: "#fbbf24" }}>8.23 / 10</strong></p>
            </div>
            <span style={{ padding: "0.4rem 1rem", borderRadius: 8, background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", color: "#fbbf24", fontWeight: 700, fontSize: "0.88rem" }}>2021</span>
          </div>
        </div>
      </Reveal>
      <Divider />

      {/* ══════════════════ CONTACT ══════════════════ */}
      <Reveal id="contact">
        <div style={{ maxWidth: 620, margin: "0 auto", padding: "5rem 2rem 6rem", textAlign: "center" }}>
          <SecLabel text="Get In Touch" />
          <SecTitle text="Let's Work Together" />
          <div style={{ width: 40, height: 3, borderRadius: 9999, background: C.grad, margin: "0 auto 1.75rem" }} />

          <p style={{ color: C.textMut, lineHeight: 1.8, marginBottom: "2.25rem", fontSize: "0.95rem" }}>
            I&apos;m open to full-time roles, freelance projects, and interesting collaborations. Drop me a line!
          </p>

          <a href="mailto:mubarakansari715@gmail.com" style={{ display: "inline-block", padding: "0.85rem 2.5rem", borderRadius: 10, background: C.grad, color: "#fff", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", boxShadow: "0 4px 24px rgba(139,92,246,0.35)", marginBottom: "2rem", transition: "opacity 0.2s,transform 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = ""; }}>
            mubarakansari715@gmail.com
          </a>

          <div style={{ display: "flex", justifyContent: "center", gap: "0.85rem", flexWrap: "wrap" }}>
            {[
              { label: "GitHub",   href: "https://github.com/mubarakansari715",                    color: C.textSec },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/mubarak-ansari-2a139a148/",  color: C.cyan },
              { label: "+91 9998508484", href: "tel:+919998508484",                                color: "#4ade80" },
            ].map(({ label, href, color }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{ padding: "0.5rem 1.2rem", borderRadius: 8, border: `1px solid ${color}33`, color, fontSize: "0.88rem", fontWeight: 600, textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${color}10`}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "1.5rem 2rem", textAlign: "center" }}>
        <p style={{ margin: 0, color: C.textMut, fontSize: "0.8rem" }}>
          © 2024 Mubarak Ansari · Android Software Engineer · Built with Next.js &amp; deployed on Vercel
        </p>
      </div>

      {/* ══════════════════ STYLES ══════════════════ */}
      <style>{`
        @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes ping      { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes floatDot  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes orbA      { 0%,100%{transform:translate(0,0)} 50%{transform:translate(35px,25px)} }
        @keyframes orbB      { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,18px)} }
        @keyframes scrollDown{ 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        @keyframes barFill   { from{width:0} }
        .desk { display:flex !important }
        .mob  { display:none !important }
        @media(max-width:640px){
          .desk { display:none !important }
          .mob  { display:flex !important }
        }
      `}</style>
    </div>
  );
}

/* ─────────────── SKILL GROUP ────────────────────────── */
function SkillGroup({ title, icon, items }: { title: string; icon: string; items: { label: string; pct: number }[] }) {
  const { ref, inView } = useInViewLocal();
  return (
    <div ref={ref} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "1.5rem" }}>
      <p style={{ margin: "0 0 1.25rem", fontWeight: 700, fontSize: "0.85rem", color: C.textPri }}>
        <span style={{ marginRight: "0.5rem" }}>{icon}</span>{title}
      </p>
      {items.map((item, i) => (
        <div key={item.label} style={{ marginBottom: i < items.length - 1 ? "0.85rem" : 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
            <span style={{ color: C.textSec, fontSize: "0.82rem", fontWeight: 500 }}>{item.label}</span>
            <span style={{ color: C.violet, fontSize: "0.75rem", fontWeight: 700 }}>{item.pct}%</span>
          </div>
          <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 9999, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 9999, background: C.grad, width: inView ? `${item.pct}%` : "0%", transition: `width 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms`, boxShadow: `0 0 8px ${C.violet}44` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────── PROJECT CARD ───────────────────────── */
function ProjectCard({ project: p, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const accentColors = [C.violet, "#f472b6", "#818cf8", "#34d399", "#fb923c", C.cyan];
  const accent = accentColors[index % accentColors.length];

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", transition: "border-color 0.3s" }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = `${accent}40`)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>

      {/* Card header */}
      <div style={{ padding: "1.75rem 2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "0.85rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.5rem" }}>{p.icon}</span>
            <div>
              <h3 style={{ margin: 0, color: C.textPri, fontWeight: 800, fontSize: "1.1rem" }}>{p.name}</h3>
              <p style={{ margin: 0, color: C.textMut, fontSize: "0.76rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{p.tag}</p>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {p.tech.map(t => <Tag key={t} label={t} color={accent} />)}
          </div>
        </div>

        {/* Left-border description */}
        <p style={{ margin: "0 0 1.1rem", color: C.textSec, fontSize: "0.9rem", lineHeight: 1.75, paddingLeft: "0.85rem", borderLeft: `3px solid ${accent}55` }}>{p.desc}</p>

        {/* Toggle R&R */}
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: `1px solid ${accent}30`, borderRadius: 8, padding: "0.4rem 1rem", color: accent, fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.35rem", transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = `${accent}10`)}
          onMouseLeave={e => (e.currentTarget.style.background = "none")}>
          {open ? "▲ Hide" : "▼ Roles & Responsibilities"}
        </button>
      </div>

      {/* Expandable R&R */}
      {open && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: "1.25rem 2rem 1.75rem", background: "rgba(255,255,255,0.015)" }}>
          <p style={{ margin: "0 0 0.75rem", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: accent }}>Roles &amp; Responsibilities</p>
          <ul style={{ margin: 0, paddingLeft: "1.15rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {p.points.map(pt => <li key={pt} style={{ color: C.textSec, fontSize: "0.88rem", lineHeight: 1.7 }}>{pt}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

/* helper — inline version of useInView to avoid rule-of-hooks issues in map */
function useInViewLocal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}
