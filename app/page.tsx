"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─── TOKENS — 2 accent colors only ─────────────────── */
const V = "#8b5cf6";   // violet
const C = "#22d3ee";   // cyan
const GRAD = `linear-gradient(135deg,${V},${C})`;

const T = {
  bg:      "#02020a",   // deeper black for space
  surf:    "rgba(255,255,255,0.04)",
  border:  "rgba(255,255,255,0.07)",
  t1:      "#f1f5f9",
  t2:      "#94a3b8",
  t3:      "#475569",
};

/* ─── DATA ───────────────────────────────────────────── */
const NAV   = ["About","Skills","Experience","Projects","Education","Contact"];
const ROLES = ["Android Engineer","Kotlin Developer","Jetpack Compose Dev","React Native Dev","MVVM Architect"];
const STATS = [
  { n:5, s:"+", label:"Years Experience" },
  { n:2, s:"",  label:"Companies" },
  { n:6, s:"+", label:"Apps Shipped" },
  { n:1, s:"",  label:"Award Won" },
];
const SKILL_GROUPS = [
  { title:"Languages & UI", items:[
    {l:"Kotlin",p:93},{l:"Java",p:85},{l:"Jetpack Compose",p:80},{l:"XML / Layouts",p:88},{l:"React Native",p:72},
  ]},
  { title:"Architecture", items:[
    {l:"MVVM",p:93},{l:"Clean Architecture",p:90},{l:"MVP",p:78},{l:"Dagger Hilt (DI)",p:85},{l:"Coroutines / Flow",p:87},
  ]},
  { title:"Tools & Backend", items:[
    {l:"Firebase & Crashlytics",p:88},{l:"REST APIs / WebSockets",p:90},{l:"Room Database",p:87},{l:"CI/CD (Fastlane/Bitrise)",p:75},{l:"JUnit & Espresso",p:78},
  ]},
];
const TOOLS = ["Android Studio","Version Catalog","Stripe / PayPal","KtLint","GitHub Actions","Fastlane","Bitrise","Azure DevOps","Jira","WebEngage","Huawei SDK","Sentry","WebSockets","Git / GitLab"];
const AI_TOOLS = ["Cursor","Claude AI","Antigravity"];
const EXP = [
  { company:"Bacancy Technology", role:"Software Engineer", period:"Sep 2023 – Present",
    points:["Developed Android features with Kotlin & Jetpack Compose using MVVM / Clean Architecture.","Implemented OTP auto-SMS detection; integrated Firebase & Google Analytics.","Wrote JUnit unit tests ensuring business logic reliability.","Managed app publishing, Play Store release cycles and compliance.","Set up CI/CD pipelines with GitHub Actions & Fastlane; tracked via Azure DevOps."]},
  { company:"Brainvire Info Tech", role:"Software Engineer", period:"Jul 2021 – Aug 2023",
    points:["Built and maintained multiple production Android apps in Kotlin / Java.","Integrated Firebase Crashlytics and Sentry for crash monitoring.","Added Huawei SDK for push notifications, maps, and analytics.","Enhanced multi-screen responsive support across mobile and tablet.","Performed Root Cause Analysis (RCA) ensuring long-term production stability."]},
];
const PROJECTS = [
  { name:"Bonder",        tag:"Professional & Social Connection", icon:"🔗",
    tech:["Kotlin","Jetpack Compose","MVVM","Firebase","JUnit","Azure DevOps"],
    desc:"Platform creating meaningful connections between professionals across IT, digital marketing and related fields.",
    points:["Built core features with Kotlin + Compose following MVVM.","Implemented OTP verification with automatic SMS detection.","Integrated Firebase & Google Analytics for behaviour tracking.","Added Crashlytics for real-time crash monitoring.","Wrote JUnit unit tests and published on Google Play Store."]},
  { name:"Seeking App",   tag:"Luxury Dating Platform", icon:"💎",
    tech:["Kotlin","Clean Architecture","Fragments","Jira"],
    desc:"Luxury dating platform connecting ambitious, success-driven individuals globally.",
    points:["Developed new modules and feature enhancements.","Implemented Clean Architecture for maintainability.","Migrated legacy Activities to Fragment-based architecture.","Optimised performance and redesigned UI screens."]},
  { name:"IRA Financial", tag:"Self-Directed Retirement App", icon:"💰",
    tech:["Kotlin","Firebase","Fingerprint Auth","WebView","Play Store"],
    desc:"Android app enabling clients to establish and maintain self-directed retirement accounts.",
    points:["Monitored Firebase crash reports daily.","Implemented biometric (fingerprint) authentication.","Optimised performance and resolved WebView issues.","Collaborated with client on publishing and compliance."]},
  { name:"AlokozayShop",  tag:"Grocery E-commerce", icon:"🛒",
    tech:["Kotlin","WebEngage","Huawei SDK","Sentry","Firebase","Azure DevOps"],
    desc:"One-stop grocery delivery app covering food, beverages and daily essentials.",
    points:["Integrated WebEngage for user activity analytics.","Added Huawei SDK — push, search and maps.","Implemented Sentry for error detection and performance.","Added multi-screen (mobile/tablet) responsive support."]},
  { name:"The Weed Tube", tag:"Video Sharing App", icon:"🎬",
    tech:["Java","Kotlin","Dark/Light Theme","Firebase","Azure DevOps"],
    desc:"YouTube-style video sharing where users share, like, comment and report videos globally.",
    points:["Integrated Dark / Light theme support app-wide.","Added Firebase Crashlytics and push notifications.","Rebuilt key UI screens for improved UX.","Handled Azure DevOps bug tracking and maintenance."]},
  { name:"Book My Table", tag:"Restaurant Table Booking", icon:"🍽️",
    tech:["Java","Kotlin","Firebase","REST API"],
    desc:"Pre-book restaurant tables for parties and meetings with custom instructions.",
    points:["Led Android development from scratch.","Integrated Firebase Crashlytics and push notifications.","Implemented REST API and conducted developer testing."]},
];
const GMAIL = "https://mail.google.com/mail/?view=cm&fs=1&to=mubarakansari715@gmail.com&su=Hiring%20Inquiry%20-%20Android%20Developer";

/* ─── HOOKS ──────────────────────────────────────────── */
function useTW(words: string[], spd = 75, pause = 2400) {
  const [txt, setTxt] = useState(""); const [wi, setWi] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi % words.length];
    const id = setTimeout(() => {
      if (!del) { setTxt(w.slice(0, txt.length + 1)); if (txt.length + 1 === w.length) setTimeout(() => setDel(true), pause); }
      else { setTxt(w.slice(0, txt.length - 1)); if (txt.length - 1 === 0) { setDel(false); setWi(n => n + 1); } }
    }, del ? spd / 2 : spd);
    return () => clearTimeout(id);
  }, [txt, del, wi, words, spd, pause]);
  return txt;
}
function useIV(thr = 0.1) {
  const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: thr });
    o.observe(el); return () => o.disconnect();
  }, [thr]);
  return { ref, v };
}
function useCnt(target: number, active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return; let c = 0;
    const id = setInterval(() => { c += target / 45; if (c >= target) { setN(target); clearInterval(id); } else setN(Math.floor(c)); }, 33);
    return () => clearInterval(id);
  }, [active, target]);
  return n;
}

/* ─── PRIMITIVES ─────────────────────────────────────── */
function Reveal({ children, id, delay = 0 }: { children: React.ReactNode; id?: string; delay?: number }) {
  const { ref, v } = useIV(0.07);
  return (
    <div id={id} ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(28px)", transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function SH({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <p style={{ margin: "0 0 0.5rem", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {label}
      </p>
      <h2 style={{ margin: 0, fontSize: "clamp(1.8rem,3.8vw,2.4rem)", fontWeight: 800, color: T.t1, letterSpacing: "-0.025em" }}>{title}</h2>
      <div style={{ width: 32, height: 3, borderRadius: 9999, background: GRAD, marginTop: "0.6rem" }} />
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: T.surf, border: `1px solid ${T.border}`, borderRadius: 16, ...style }}>
      {children}
    </div>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span style={{ padding: "0.22rem 0.72rem", borderRadius: 6, background: `${V}12`, border: `1px solid ${V}30`, color: V, fontSize: "0.74rem", fontWeight: 600 }}>
      {label}
    </span>
  );
}

function HR() {
  return <div style={{ height: 1, background: T.border, margin: "0 2.5rem" }} />;
}

/* ─── SPACE BACKGROUND ───────────────────────────────── */
// Star positions are deterministic (no Math.random) to avoid hydration errors
/* ─── DOT GRID BACKGROUND ────────────────────────────── */
function DotGridBg() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      {/* Dot grid layer */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(${V}28 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }} />
      {/* Vignette — fades the grid toward edges for depth */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 80% 80% at 50% 40%, transparent 35%, ${T.bg} 100%)`,
      }} />
      {/* Subtle violet glow top-center */}
      <div style={{
        position: "absolute", width: "60%", height: "50%",
        top: 0, left: "20%",
        background: `radial-gradient(ellipse, ${V}0d 0%, transparent 70%)`,
        filter: "blur(60px)",
      }} />
      {/* Subtle cyan glow bottom-right */}
      <div style={{
        position: "absolute", width: "40%", height: "40%",
        bottom: "5%", right: 0,
        background: `radial-gradient(ellipse, ${C}09 0%, transparent 70%)`,
        filter: "blur(50px)",
      }} />
    </div>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────── */
function Navbar() {
  const [sc, setSc] = useState(false); const [op, setOp] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 50); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  const go = useCallback((id: string) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setOp(false); }, []);
  return (
    <nav style={{ position: "fixed", inset: "0 0 auto 0", zIndex: 200, height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2.5rem", background: sc ? "rgba(11,11,20,0.9)" : "transparent", backdropFilter: sc ? "blur(20px)" : "none", borderBottom: sc ? `1px solid ${T.border}` : "none", transition: "all .3s ease" }}>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <span style={{ fontSize: "1.1rem", fontWeight: 900, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>MA.</span>
      </button>
      <div className="desk" style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
        {NAV.map(l => (
          <button key={l} onClick={() => go(l)} style={{ background: "none", border: "none", color: T.t3, cursor: "pointer", padding: "0.42rem 0.9rem", borderRadius: 8, fontSize: "0.84rem", fontWeight: 500, transition: "color .2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = T.t1)} onMouseLeave={e => (e.currentTarget.style.color = T.t3)}>
            {l}
          </button>
        ))}
        <a href={GMAIL} target="_blank" rel="noreferrer"
          style={{ marginLeft: "0.75rem", padding: "0.46rem 1.2rem", borderRadius: 8, background: GRAD, color: "#fff", fontWeight: 700, fontSize: "0.84rem", textDecoration: "none", boxShadow: `0 2px 16px ${V}40` }}>
          Hire Me
        </a>
      </div>
      <button className="mob" onClick={() => setOp(!op)} style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: 8, padding: "0.38rem 0.62rem", color: T.t2, cursor: "pointer", fontSize: "1.1rem" }}>{op ? "✕" : "☰"}</button>
      {op && (
        <div className="mob" style={{ position: "fixed", top: 60, left: 0, right: 0, background: "rgba(11,11,20,0.97)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${T.border}`, display: "flex", flexDirection: "column", padding: "0.5rem" }}>
          {NAV.map(l => <button key={l} onClick={() => go(l)} style={{ background: "none", border: "none", color: T.t2, cursor: "pointer", padding: "0.8rem 1rem", textAlign: "left", fontSize: "0.95rem", borderRadius: 8 }}>{l}</button>)}
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────────── */
function Hero() {
  const role = useTW(ROLES);
  return (
    <section className="hero-section" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "7rem 2rem 5rem" }}>

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 800 }}>

        {/* Status */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: T.surf, border: `1px solid ${V}30`, borderRadius: 9999, padding: "0.35rem 1.1rem", marginBottom: "2rem" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", animation: "statusPulse 2s ease infinite" }} />
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: V }}>Immediate Joiner · Open to Opportunities</span>
        </div>

        {/* Name */}
        <h1 style={{ margin: "0 0 1rem", fontSize: "clamp(3rem,9vw,6.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0 }}>
          <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Mubarak Ansari
          </span>
        </h1>

        {/* Typewriter */}
        <div style={{ height: "2.2rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
          <span style={{ fontSize: "clamp(1rem,2.4vw,1.35rem)", color: T.t2, fontWeight: 400 }}>
            {role}<span style={{ color: V, animation: "blink 1s step-end infinite" }}>|</span>
          </span>
        </div>

        {/* Tagline */}
        <p style={{ color: T.t3, fontSize: "0.94rem", maxWidth: 520, margin: "0 auto 2.25rem", lineHeight: 1.8 }}>
          Android Developer with 5+ years of expertise in Compose, Kotlin &amp; Java · React Native
        </p>

        {/* CTAs */}
        <div className="hero-cta" style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          <a href={GMAIL} target="_blank" rel="noreferrer"
            style={{ padding: "0.78rem 2rem", borderRadius: 10, background: GRAD, color: "#fff", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem", boxShadow: `0 4px 24px ${V}38`, transition: "opacity .2s,transform .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = ".83"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = ""; }}>
            ✉ Hire Me
          </a>
          <a href="https://github.com/mubarakansari715" target="_blank" rel="noreferrer"
            style={{ padding: "0.78rem 2rem", borderRadius: 10, border: `1px solid ${T.border}`, color: T.t2, fontWeight: 600, textDecoration: "none", fontSize: "0.9rem", background: "transparent", transition: "border-color .2s,color .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = V; (e.currentTarget as HTMLElement).style.color = T.t1; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.t2; }}>
            GitHub ↗
          </a>
          <a href="https://www.linkedin.com/in/mubarak-ansari-2a139a148/" target="_blank" rel="noreferrer"
            style={{ padding: "0.78rem 2rem", borderRadius: 10, border: `1px solid ${T.border}`, color: T.t2, fontWeight: 600, textDecoration: "none", fontSize: "0.9rem", background: "transparent", transition: "border-color .2s,color .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C; (e.currentTarget as HTMLElement).style.color = T.t1; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.t2; }}>
            LinkedIn ↗
          </a>
        </div>

        {/* Award */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: T.surf, border: `1px solid rgba(245,158,11,0.2)`, borderRadius: 9, padding: "0.45rem 1.1rem" }}>
          <span>🏆</span>
          <span style={{ fontSize: "0.8rem", color: "#fbbf24", fontWeight: 600 }}>Employee of the Quarter 2024 · Bacancy Technology</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: "1.75rem", left: "50%", transform: "translateX(-50%)", animation: "scrollDown 2s ease-in-out infinite", opacity: .25 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.t2} strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
    </section>
  );
}

/* ─── STATS ──────────────────────────────────────────── */
function Stats() {
  return (
    <Reveal>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2.5rem 2.5rem" }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: "1px", background: T.border, borderRadius: 16, overflow: "hidden", border: `1px solid ${T.border}` }}>
          {STATS.map(s => {
            const { ref, v } = useIV(); const n = useCnt(s.n, v);
            return (
              <div key={s.label} ref={ref} style={{ background: T.surf, padding: "1.85rem 1rem", textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: "2.4rem", fontWeight: 900, lineHeight: 1, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{n}{s.s}</p>
                <p style={{ margin: "0.4rem 0 0", color: T.t3, fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

/* ─── ABOUT ──────────────────────────────────────────── */
function About() {
  return (
    <Reveal id="about">
      <div className="sec-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2.5rem" }}>
        <SH label="Who I Am" title="About Me" />
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
          <Card style={{ padding: "1.85rem" }}>
            <p style={{ color: T.t2, lineHeight: 1.9, margin: "0 0 1rem", fontSize: "0.94rem" }}>
              Highly motivated Software Engineer with <strong style={{ color: T.t1 }}>5+ years of experience</strong> building impactful Android applications. Proficient in <strong style={{ color: V }}>MVVM, Clean Architecture</strong> and Jetpack components.
            </p>
            <p style={{ color: T.t3, lineHeight: 1.8, margin: 0, fontSize: "0.89rem" }}>
              Experienced in managing Play Store releases, CI/CD pipelines, performance profiling, JUnit testing, and Root Cause Analysis to ensure production stability.
            </p>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {[
              { icon: "📍", label: "Location",  value: "Ahmedabad, Gujarat, India" },
              { icon: "✉️", label: "Email",     value: "mubarakansari715@gmail.com" },
              { icon: "📞", label: "Phone",     value: "+91 9998508484" },
              { icon: "🎓", label: "Degree",    value: "B.E. IT — CGPI 8.23" },
              { icon: "🗣️", label: "Languages", value: "English · Hindi · Gujarati · Bhojpuri" },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.85rem", background: T.surf, border: `1px solid ${T.border}`, borderRadius: 12, padding: "0.6rem 1rem" }}>
                <span style={{ fontSize: "1rem", width: 20, textAlign: "center", flexShrink: 0 }}>{icon}</span>
                <div>
                  <p style={{ margin: 0, fontSize: "0.67rem", color: T.t3, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>{label}</p>
                  <p style={{ margin: 0, fontSize: "0.86rem", color: T.t2 }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── SKILLS ─────────────────────────────────────────── */
function Skills() {
  return (
    <Reveal id="skills">
      <div className="sec-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2.5rem" }}>
        <SH label="What I Know" title="Technical Skills" />
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(255px,1fr))", gap: "1.1rem", marginBottom: "1.1rem" }}>
          {SKILL_GROUPS.map(g => <SkillGroup key={g.title} {...g} />)}
        </div>
        <Card style={{ padding: "1.75rem" }}>
          <p style={{ margin: "0 0 0.8rem", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: T.t3 }}>Tools &amp; Practices</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.4rem" }}>
            {TOOLS.map(t => (
              <span key={t} style={{ padding: "0.22rem 0.72rem", borderRadius: 6, background: "rgba(255,255,255,0.03)", border: `1px solid ${T.border}`, color: T.t3, fontSize: "0.78rem", fontWeight: 500 }}>{t}</span>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: "1.25rem" }}>
            <p style={{ margin: "0 0 0.8rem", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              🤖 AI-Assisted Development
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {AI_TOOLS.map(name => (
                <span key={name} style={{ padding: "0.3rem 1rem", borderRadius: 7, background: `${V}12`, border: `1px solid ${V}35`, color: V, fontSize: "0.82rem", fontWeight: 700 }}>✦ {name}</span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Reveal>
  );
}

function SkillGroup({ title, items }: { title: string; items: { l: string; p: number }[] }) {
  const { ref, v } = useIV();
  return (
    <Card style={{ padding: "1.6rem" }}>
      <p style={{ margin: "0 0 1.3rem", fontWeight: 700, fontSize: "0.85rem", color: T.t1 }}>{title}</p>
      <div ref={ref}>
        {items.map((item, i) => (
          <div key={item.l} style={{ marginBottom: i < items.length - 1 ? "0.88rem" : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
              <span style={{ color: T.t2, fontSize: "0.82rem", fontWeight: 500 }}>{item.l}</span>
              <span style={{ color: V, fontSize: "0.74rem", fontWeight: 700 }}>{item.p}%</span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 9999, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 9999, background: GRAD, width: v ? `${item.p}%` : "0%", transition: `width 1.1s cubic-bezier(.22,1,.36,1) ${i * 110}ms` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── EXPERIENCE ─────────────────────────────────────── */
function Experience() {
  return (
    <Reveal id="experience">
      <div className="sec-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2.5rem" }}>
        <SH label="Where I've Worked" title="Experience" />
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {EXP.map((e, i) => (
            <div key={e.company} style={{ display: "flex", gap: "1.25rem" }}>
              <div className="exp-spine" style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 11, height: 11, borderRadius: "50%", background: i === 0 ? V : C, boxShadow: `0 0 10px ${i === 0 ? V : C}`, marginTop: "1.55rem", flexShrink: 0 }} />
                {i < EXP.length - 1 && <div style={{ width: 1, flex: 1, background: `linear-gradient(to bottom,${V}40,transparent)`, minHeight: 36, marginTop: 6 }} />}
              </div>
              <Card style={{ flex: 1, padding: "1.6rem", transition: "border-color .25s,transform .25s", cursor: "default" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${V}40`; (e.currentTarget as HTMLElement).style.transform = "translateX(3px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.transform = ""; }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                  <div>
                    <h3 style={{ margin: 0, fontWeight: 800, fontSize: "1.05rem", color: T.t1 }}>{e.company}</h3>
                    <p style={{ margin: "0.15rem 0 0", color: T.t3, fontSize: "0.84rem", fontWeight: 500 }}>{e.role}</p>
                  </div>
                  <span style={{ padding: "0.2rem 0.8rem", borderRadius: 6, background: `${V}12`, border: `1px solid ${V}28`, color: V, fontSize: "0.76rem", fontWeight: 700, alignSelf: "flex-start", whiteSpace: "nowrap" }}>{e.period}</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.36rem" }}>
                  {e.points.map(p => <li key={p} style={{ color: T.t2, fontSize: "0.87rem", lineHeight: 1.7 }}>{p}</li>)}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ─── PROJECTS ───────────────────────────────────────── */
function Projects() {
  return (
    <Reveal id="projects">
      <div className="sec-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2.5rem" }}>
        <SH label="What I've Built" title="Projects" />
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {PROJECTS.map((p, i) => <ProjCard key={p.name} p={p} index={i} />)}
        </div>
      </div>
    </Reveal>
  );
}

function ProjCard({ p, index }: { p: typeof PROJECTS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Card style={{ overflow: "hidden", transition: "border-color .25s", cursor: "default" }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${V}40`}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = T.border}>

      {/* Subtle left accent bar */}
      <div style={{ display: "flex" }}>
        <div style={{ width: 3, background: index % 2 === 0 ? GRAD : `linear-gradient(180deg,${C},${V})`, flexShrink: 0 }} />
        <div style={{ flex: 1, padding: "1.6rem 1.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.85rem", marginBottom: "0.8rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
              <span style={{ fontSize: "1.25rem" }}>{p.icon}</span>
              <div>
                <h3 style={{ margin: 0, color: T.t1, fontWeight: 800, fontSize: "1.05rem" }}>{p.name}</h3>
                <p style={{ margin: 0, color: T.t3, fontSize: "0.73rem", textTransform: "uppercase", letterSpacing: "0.09em", fontWeight: 600 }}>{p.tag}</p>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {p.tech.map(t => <Pill key={t} label={t} />)}
            </div>
          </div>

          <p style={{ margin: "0 0 1rem", color: T.t2, fontSize: "0.88rem", lineHeight: 1.75 }}>{p.desc}</p>

          <button onClick={() => setOpen(!open)}
            style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: 7, padding: "0.35rem 0.9rem", color: T.t3, fontSize: "0.76rem", fontWeight: 600, cursor: "pointer", transition: "border-color .2s,color .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = V; e.currentTarget.style.color = V; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.t3; }}>
            {open ? "▲ Hide" : "▼ Roles & Responsibilities"}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ borderTop: `1px solid ${T.border}`, padding: "1.25rem 1.75rem 1.6rem 2.25rem", background: "rgba(139,92,246,0.03)" }}>
          <p style={{ margin: "0 0 0.65rem", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: V }}>Roles &amp; Responsibilities</p>
          <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {p.points.map(pt => <li key={pt} style={{ color: T.t2, fontSize: "0.87rem", lineHeight: 1.7 }}>{pt}</li>)}
          </ul>
        </div>
      )}
    </Card>
  );
}

/* ─── EDUCATION ──────────────────────────────────────── */
function Education() {
  return (
    <Reveal id="education">
      <div className="sec-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2.5rem" }}>
        <SH label="Academic Background" title="Education" />
        <Card style={{ padding: "1.75rem", display: "flex", alignItems: "center", gap: "1.35rem", flexWrap: "wrap" }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>🎓</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, color: T.t1, fontWeight: 800, fontSize: "1.05rem" }}>Gyanmanjari Institute of Technology</h3>
            <p style={{ margin: "0.2rem 0 0", color: T.t2, fontSize: "0.88rem" }}>Bachelor of Engineering — Information Technology</p>
            <p style={{ margin: "0.15rem 0 0", color: T.t3, fontSize: "0.83rem" }}>CGPI: <strong style={{ color: "#fbbf24" }}>8.23 / 10</strong></p>
          </div>
          <span style={{ padding: "0.38rem 1rem", borderRadius: 8, background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", color: "#fbbf24", fontWeight: 700, fontSize: "0.85rem" }}>2021</span>
        </Card>
      </div>
    </Reveal>
  );
}

/* ─── CONTACT ────────────────────────────────────────── */
function ContactSection() {
  return (
    <Reveal id="contact">
      <div style={{ maxWidth: 580, margin: "0 auto", padding: "5rem 2.5rem 7rem", textAlign: "center" }}>
        <SH label="Get In Touch" title="Let's Work Together" />
        <p style={{ color: T.t3, lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.93rem" }}>
          Open to full-time roles, freelance projects &amp; interesting collaborations. Drop me a line!
        </p>
        <a href={GMAIL} target="_blank" rel="noreferrer"
          style={{ display: "inline-block", padding: "0.85rem 2.5rem", borderRadius: 10, background: GRAD, color: "#fff", fontWeight: 700, textDecoration: "none", fontSize: "0.92rem", boxShadow: `0 4px 24px ${V}35`, marginBottom: "1.75rem", transition: "opacity .2s,transform .2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = ".82"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = ""; }}>
          mubarakansari715@gmail.com ↗
        </a>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {[
            { label: "GitHub",          href: "https://github.com/mubarakansari715",                   c: V },
            { label: "LinkedIn",        href: "https://www.linkedin.com/in/mubarak-ansari-2a139a148/", c: C },
            { label: "+91 9998508484",  href: "tel:+919998508484",                                     c: "#22c55e" },
          ].map(({ label, href, c }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{ padding: "0.48rem 1.15rem", borderRadius: 8, border: `1px solid ${c}28`, color: c, fontSize: "0.86rem", fontWeight: 600, textDecoration: "none", transition: "background .2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${c}10`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ─── PAGE ───────────────────────────────────────────── */
export default function Home() {
  return (
    <div style={{ background: T.bg, color: T.t1, fontFamily: "'Inter','Segoe UI',Arial,sans-serif", lineHeight: 1.6, position: "relative" }}>
      <DotGridBg />
      <div style={{ position: "relative", zIndex: 1 }}>
      <Navbar />
      <Hero />
      <HR /><Stats /><HR />
      <About />
      <HR /><Skills /><HR />
      <Experience />
      <HR /><Projects /><HR />
      <Education />
      <HR /><ContactSection />
      <div style={{ borderTop: `1px solid ${T.border}`, padding: "1.4rem 2rem", textAlign: "center" }}>
        <p style={{ margin: 0, color: T.t3, fontSize: "0.78rem" }}>© 2024 Mubarak Ansari · Android Software Engineer · Built with Next.js · Deployed on Vercel</p>
      </div>
      </div>{/* end z-index wrapper */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes statusPulse { 0%,100%{box-shadow:0 0 5px #22c55e} 50%{box-shadow:0 0 12px #22c55e} }
        @keyframes scrollDown  { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }

        /* ── Nav ── */
        .desk{display:flex!important} .mob{display:none!important}

        /* ── Responsive ── */
        @media(max-width:640px){
          /* Nav */
          .desk{display:none!important} .mob{display:flex!important}

          /* Hero */
          .hero-section { padding: 5.5rem 1.25rem 3.5rem !important; }
          .hero-cta { flex-direction: column; align-items: stretch !important; }
          .hero-cta a { text-align: center; }

          /* Sections */
          .sec-pad { padding: 3.5rem 1.25rem !important; }

          /* Stats — 2 columns on mobile */
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }

          /* Skills — single column */
          .skills-grid { grid-template-columns: 1fr !important; }

          /* About grid — single column */
          .about-grid  { grid-template-columns: 1fr !important; }

          /* Experience timeline — hide spine on very small screens */
          .exp-spine   { display: none !important; }

          /* Projects — reduce padding */
          .proj-header { flex-direction: column !important; align-items: flex-start !important; }
          .proj-pills  { margin-top: 0.5rem; }

          /* General card padding */
          .card-pad    { padding: 1.25rem !important; }

          /* Education card */
          .edu-card    { flex-direction: column !important; align-items: flex-start !important; }

          /* Contact */
          .contact-links { flex-direction: column; align-items: center; }
          .contact-links a { width: 100%; text-align: center; }
        }

        @media(max-width:900px) and (min-width:641px){
          .stats-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .skills-grid { grid-template-columns: repeat(2,1fr) !important; }
        }

        /* Ensure no horizontal overflow */
        html, body { overflow-x: hidden; max-width: 100vw; }
      `}</style>
    </div>
  );
}
