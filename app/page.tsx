"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ══════════════════════════════════════════════
   DESIGN TOKENS  — Cosmic Aurora palette
══════════════════════════════════════════════ */
const T = {
  bg:        "#03030d",
  glass:     "rgba(255,255,255,0.035)",
  glassDark: "rgba(255,255,255,0.018)",
  border:    "rgba(255,255,255,0.08)",
  borderHi:  "rgba(168,85,247,0.45)",
  violet:    "#a855f7",
  cyan:      "#22d3ee",
  pink:      "#ec4899",
  gold:      "#f59e0b",
  green:     "#10b981",
  indigo:    "#6366f1",
  // gradients
  gMain:  "linear-gradient(135deg,#a855f7 0%,#22d3ee 100%)",
  gWarm:  "linear-gradient(135deg,#ec4899 0%,#f59e0b 100%)",
  gCool:  "linear-gradient(135deg,#6366f1 0%,#a855f7 100%)",
  gFull:  "linear-gradient(135deg,#a855f7 0%,#ec4899 50%,#22d3ee 100%)",
  gText:  "linear-gradient(135deg,#e9d5ff 0%,#a5f3fc 100%)",
  gName:  "linear-gradient(135deg,#f0abfc 0%,#818cf8 40%,#67e8f9 100%)",
  // text
  t1: "#f8fafc",
  t2: "#94a3b8",
  t3: "#475569",
};

/* card style shorthand */
const card = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: T.glass,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: `1px solid ${T.border}`,
  borderRadius: 20,
  ...extra,
});

/* ══════════════════════════════════════════════  DATA  */
const NAV   = ["About","Skills","Experience","Projects","Education","Contact"];
const ROLES = ["Android Engineer","Kotlin Developer","Jetpack Compose Dev","React Native Dev","MVVM Architect"];
const STATS = [
  { n:5, s:"+", label:"Years Exp.",   icon:"📅" },
  { n:2, s:"",  label:"Companies",    icon:"🏢" },
  { n:6, s:"+", label:"Apps Shipped", icon:"📱" },
  { n:1, s:"",  label:"Award",        icon:"🏆" },
];
const SKILL_GROUPS = [
  { title:"Languages & UI", icon:"⌨️", color: T.violet, items:[
    {l:"Kotlin",          p:93}, {l:"Java",             p:85},
    {l:"Jetpack Compose", p:80}, {l:"XML / Layouts",    p:88},
    {l:"React Native",    p:72},
  ]},
  { title:"Architecture", icon:"🏗️", color: T.cyan, items:[
    {l:"MVVM",              p:93}, {l:"Clean Architecture",p:90},
    {l:"MVP",               p:78}, {l:"Dagger Hilt (DI)",  p:85},
    {l:"Coroutines / Flow", p:87},
  ]},
  { title:"Tools & Backend", icon:"🔧", color: T.pink, items:[
    {l:"Firebase & Crashlytics",    p:88}, {l:"REST APIs / WebSockets",p:90},
    {l:"Room Database",             p:87}, {l:"CI/CD (Fastlane/Bitrise)",p:75},
    {l:"JUnit & Espresso",          p:78},
  ]},
];
const TOOLS = ["Android Studio","Version Catalog","Stripe / PayPal","KtLint","GitHub Actions","Fastlane","Bitrise","Azure DevOps","Jira","WebEngage","Huawei SDK","Sentry","WebSockets","Git / GitLab"];
const AI_TOOLS = [
  { name:"Cursor",      color: T.violet },
  { name:"Claude AI",   color: T.pink   },
  { name:"Antigravity", color: T.cyan   },
];
const EXPERIENCE = [
  { company:"Bacancy Technology",  role:"Software Engineer", period:"Sep 2023 – Present",  color: T.violet,
    points:["Developed Android features with Kotlin & Jetpack Compose using MVVM / Clean Architecture.","Implemented OTP auto-SMS detection; integrated Firebase & Google Analytics.","Wrote JUnit unit tests ensuring business logic reliability.","Managed app publishing, Play Store release cycles and compliance.","Set up CI/CD pipelines with GitHub Actions & Fastlane; tracked via Azure DevOps."]},
  { company:"Brainvire Info Tech",  role:"Software Engineer", period:"Jul 2021 – Aug 2023", color: T.cyan,
    points:["Built and maintained multiple production Android apps in Kotlin / Java.","Integrated Firebase Crashlytics and Sentry for crash monitoring.","Added Huawei SDK for push notifications, maps, and analytics.","Enhanced multi-screen responsive support across mobile and tablet.","Performed Root Cause Analysis (RCA) ensuring long-term production stability."]},
];
const PROJECTS = [
  { name:"Bonder",        tag:"Professional & Social Connection", icon:"🔗", color:T.violet,
    tech:["Kotlin","Jetpack Compose","MVVM","Firebase","JUnit","Azure DevOps"],
    desc:"Platform creating meaningful connections between professionals across IT, digital marketing and related fields.",
    points:["Built core features with Kotlin + Compose following MVVM.","Implemented OTP verification with automatic SMS detection.","Integrated Firebase & Google Analytics for behaviour tracking.","Added Crashlytics for real-time crash monitoring.","Wrote JUnit unit tests and published on Google Play Store."]},
  { name:"Seeking App",   tag:"Luxury Dating Platform",           icon:"💎", color:T.pink,
    tech:["Kotlin","Clean Architecture","Fragments","Jira"],
    desc:"Luxury dating platform connecting ambitious, success-driven individuals globally.",
    points:["Developed new modules and feature enhancements.","Implemented Clean Architecture for maintainability.","Migrated legacy Activities to Fragment-based architecture.","Optimised performance and redesigned UI screens."]},
  { name:"IRA Financial", tag:"Self-Directed Retirement App",     icon:"💰", color:T.indigo,
    tech:["Kotlin","Firebase","Fingerprint Auth","WebView","Play Store"],
    desc:"Android app enabling clients to establish and maintain self-directed retirement accounts.",
    points:["Monitored Firebase crash reports daily.","Implemented biometric (fingerprint) authentication.","Optimised performance and resolved WebView issues.","Collaborated with client on publishing and compliance."]},
  { name:"AlokozayShop",  tag:"Grocery E-commerce",               icon:"🛒", color:T.green,
    tech:["Kotlin","WebEngage","Huawei SDK","Sentry","Firebase","Azure DevOps"],
    desc:"One-stop grocery delivery app covering food, beverages and daily essentials.",
    points:["Integrated WebEngage for user activity analytics.","Added Huawei SDK — push, search and maps.","Implemented Sentry for error detection and performance.","Added multi-screen (mobile/tablet) responsive support."]},
  { name:"The Weed Tube", tag:"Video Sharing App",                icon:"🎬", color:"#fb923c",
    tech:["Java","Kotlin","Dark/Light Theme","Firebase","Azure DevOps"],
    desc:"YouTube-style video sharing where users share, like, comment and report videos globally.",
    points:["Integrated Dark / Light theme support app-wide.","Added Firebase Crashlytics and push notifications.","Rebuilt key UI screens for improved UX.","Handled Azure DevOps bug tracking and maintenance."]},
  { name:"Book My Table", tag:"Restaurant Table Booking",         icon:"🍽️", color:T.gold,
    tech:["Java","Kotlin","Firebase","REST API"],
    desc:"Pre-book restaurant tables for parties and meetings with custom instructions.",
    points:["Led Android development from scratch.","Integrated Firebase Crashlytics and push notifications.","Implemented REST API and conducted developer testing."]},
];
const GMAILURL = "https://mail.google.com/mail/?view=cm&fs=1&to=mubarakansari715@gmail.com&su=Hiring%20Inquiry%20-%20Android%20Developer";

/* ══════════════════════════════════════════════  HOOKS  */
function useTW(words:string[], spd=75, pause=2200) {
  const [txt,setTxt]=useState(""); const [wi,setWi]=useState(0); const [del,setDel]=useState(false);
  useEffect(()=>{
    const w=words[wi%words.length];
    const id=setTimeout(()=>{
      if(!del){setTxt(w.slice(0,txt.length+1)); if(txt.length+1===w.length) setTimeout(()=>setDel(true),pause);}
      else{setTxt(w.slice(0,txt.length-1)); if(txt.length-1===0){setDel(false);setWi(n=>n+1);}}
    },del?spd/2:spd);
    return()=>clearTimeout(id);
  },[txt,del,wi,words,spd,pause]);
  return txt;
}
function useIV(thr=0.12){
  const ref=useRef<HTMLDivElement>(null); const [v,setV]=useState(false);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true);},{threshold:thr});
    o.observe(el); return()=>o.disconnect();
  },[thr]);
  return {ref,v};
}
function useCnt(target:number,active:boolean){
  const [n,setN]=useState(0);
  useEffect(()=>{ if(!active)return; let c=0; const id=setInterval(()=>{c+=target/40; if(c>=target){setN(target);clearInterval(id);}else setN(Math.floor(c));},36); return()=>clearInterval(id);},[active,target]);
  return n;
}

/* ══════════════════════════════════════════════  ATOMS  */
function Reveal({children,id,delay=0}:{children:React.ReactNode;id?:string;delay?:number}){
  const {ref,v}=useIV(0.07);
  return <div id={id} ref={ref} style={{opacity:v?1:0,transform:v?"none":"translateY(32px)",transition:`opacity .7s ease ${delay}ms,transform .7s ease ${delay}ms`}}>{children}</div>;
}
function GradText({text,grad=T.gName,size="clamp(1.9rem,4vw,2.5rem)",weight=900}:{text:string;grad?:string;size?:string;weight?:number}){
  return <span style={{background:grad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",fontSize:size,fontWeight:weight,letterSpacing:"-0.02em"}}>{text}</span>;
}
function Chip({label,color=T.violet}:{label:string;color?:string}){
  return <span style={{padding:"0.22rem 0.7rem",borderRadius:6,background:`${color}15`,border:`1px solid ${color}35`,color,fontSize:"0.74rem",fontWeight:600,whiteSpace:"nowrap"}}>{label}</span>;
}
function SecHead({sup,title,grad=T.gMain}:{sup:string;title:string;grad?:string}){
  return(
    <div style={{marginBottom:"2.75rem"}}>
      <p style={{margin:"0 0 0.4rem",fontSize:"0.73rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.2em",background:grad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>✦ {sup}</p>
      <GradText text={title} grad={grad} />
      <div style={{width:36,height:3,borderRadius:9999,background:grad,marginTop:"0.55rem"}}/>
    </div>
  );
}

/* ══════════════════════════════════════════════  NAVBAR  */
function Navbar(){
  const [sc,setSc]=useState(false); const [op,setOp]=useState(false);
  useEffect(()=>{const f=()=>setSc(window.scrollY>50); window.addEventListener("scroll",f); return()=>window.removeEventListener("scroll",f);},[]);
  const go=useCallback((id:string)=>{document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:"smooth"});setOp(false);},[]);
  return(
    <nav style={{position:"fixed",inset:"0 0 auto 0",zIndex:200,height:62,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 2.5rem",background:sc?"rgba(3,3,13,0.85)":"transparent",backdropFilter:sc?"blur(24px)":"none",borderBottom:sc?`1px solid ${T.border}`:"none",transition:"all .35s ease"}}>
      <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{background:"none",border:"none",cursor:"pointer",padding:0}}>
        <span style={{fontSize:"1.15rem",fontWeight:900,background:T.gFull,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>MA.</span>
      </button>
      <div className="desk" style={{display:"flex",alignItems:"center",gap:"0.15rem"}}>
        {NAV.map(l=>(
          <button key={l} onClick={()=>go(l)} style={{background:"none",border:"none",color:T.t3,cursor:"pointer",padding:"0.45rem 0.85rem",borderRadius:8,fontSize:"0.84rem",fontWeight:500,transition:"color .2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color=T.t1)} onMouseLeave={e=>(e.currentTarget.style.color=T.t3)}>{l}</button>
        ))}
        <a href={GMAILURL} target="_blank" rel="noreferrer" style={{marginLeft:"0.75rem",padding:"0.48rem 1.25rem",borderRadius:9,background:T.gMain,color:"#fff",fontWeight:700,fontSize:"0.84rem",textDecoration:"none",boxShadow:"0 2px 18px rgba(168,85,247,0.4)"}}>Hire Me</a>
      </div>
      <button className="mob" onClick={()=>setOp(!op)} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:8,padding:"0.4rem 0.65rem",color:T.t2,cursor:"pointer",fontSize:"1.1rem"}}>{op?"✕":"☰"}</button>
      {op&&<div className="mob" style={{position:"fixed",top:62,left:0,right:0,background:"rgba(3,3,13,0.97)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${T.border}`,display:"flex",flexDirection:"column",padding:"0.75rem"}}>
        {NAV.map(l=><button key={l} onClick={()=>go(l)} style={{background:"none",border:"none",color:T.t2,cursor:"pointer",padding:"0.8rem 1rem",textAlign:"left",fontSize:"1rem",borderRadius:8}}>{l}</button>)}
      </div>}
    </nav>
  );
}

/* ══════════════════════════════════════════════  HERO  */
function Hero(){
  const role=useTW(ROLES);
  return(
    <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",padding:"7rem 2rem 5rem"}}>
      {/* Mesh orbs */}
      {[
        {w:900,h:900,bg:"rgba(168,85,247,0.12)",t:-200,l:-250,a:"orbA 10s ease-in-out infinite"},
        {w:700,h:700,bg:"rgba(34,211,238,0.09)",b:-150,r:-180,a:"orbB 13s ease-in-out infinite"},
        {w:500,h:500,bg:"rgba(236,72,153,0.08)",t:"35%",r:"10%",a:"orbA 16s ease-in-out infinite reverse"},
        {w:350,h:350,bg:"rgba(99,102,241,0.07)",b:"20%",l:"10%",a:"orbB 19s ease-in-out infinite"},
      ].map((o,i)=>(
        <div key={i} style={{position:"absolute",width:o.w,height:o.h,borderRadius:"50%",background:o.bg,top:o.t,left:o.l,bottom:o.b,right:o.r,pointerEvents:"none",animation:o.a,filter:"blur(1px)"} as React.CSSProperties}/>
      ))}

      {/* Particles */}
      {[...Array(20)].map((_,i)=>(
        <span key={i} style={{position:"absolute",borderRadius:"50%",
          background:[T.violet,T.cyan,T.pink,T.gold,T.green][i%5],
          width:i%5===0?6:i%3===0?4:3,height:i%5===0?6:i%3===0?4:3,
          left:`${(i*5.1+3)%100}%`,top:`${(i*7.3+8)%100}%`,
          opacity:0.4+i%3*0.15,pointerEvents:"none",
          animation:`fp ${3+i%4}s ease-in-out infinite`,animationDelay:`${(i*0.42)%4}s`}}/>
      ))}

      <div style={{position:"relative",zIndex:10,textAlign:"center",maxWidth:860}}>

        {/* Status badge */}
        <div style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",...card({borderRadius:9999,padding:"0.38rem 1.15rem",marginBottom:"1.9rem",border:"1px solid rgba(168,85,247,0.35)",animation:"fadeUp .6s ease both"})}} >
          <span style={{width:7,height:7,borderRadius:"50%",background:T.green,boxShadow:`0 0 8px ${T.green}`,animation:"pingDot 2s ease infinite"}}/>
          <span style={{fontSize:"0.8rem",fontWeight:600,background:T.gMain,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Immediate Joiner · Open to Opportunities</span>
        </div>

        {/* Name */}
        <h1 style={{margin:"0 0 0.85rem",fontSize:"clamp(3.2rem,9.5vw,7rem)",fontWeight:900,letterSpacing:"-0.045em",lineHeight:1.0,animation:"fadeUp .7s ease .1s both"}}>
          <span style={{background:T.gName,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Mubarak Ansari</span>
        </h1>

        {/* Typewriter */}
        <div style={{height:"2.4rem",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"1.1rem",animation:"fadeUp .7s ease .2s both"}}>
          <span style={{fontSize:"clamp(1rem,2.5vw,1.45rem)",color:T.t2,fontWeight:400}}>
            {role}<span style={{color:T.violet,animation:"blink 1s step-end infinite"}}>|</span>
          </span>
        </div>

        {/* Tagline */}
        <p style={{color:T.t3,fontSize:"0.95rem",maxWidth:580,margin:"0 auto 2rem",lineHeight:1.8,animation:"fadeUp .7s ease .3s both"}}>
          Android Developer · 5+ Years · Compose, Kotlin &amp; Java · React Native
        </p>

        {/* CTA buttons */}
        <div style={{display:"flex",gap:"0.9rem",justifyContent:"center",flexWrap:"wrap",animation:"fadeUp .7s ease .4s both",marginBottom:"2.25rem"}}>
          <a href={GMAILURL} target="_blank" rel="noreferrer"
            style={{padding:"0.8rem 2.1rem",borderRadius:12,background:T.gMain,color:"#fff",fontWeight:700,textDecoration:"none",fontSize:"0.92rem",boxShadow:"0 4px 28px rgba(168,85,247,0.45)",transition:"opacity .2s,transform .2s"}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.opacity=".82";(e.currentTarget as HTMLElement).style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.opacity="1";(e.currentTarget as HTMLElement).style.transform="";}}>
            ✉ Hire Me
          </a>
          {[
            {label:"GitHub ↗",  href:"https://github.com/mubarakansari715",                   hc:T.violet},
            {label:"LinkedIn ↗",href:"https://www.linkedin.com/in/mubarak-ansari-2a139a148/", hc:T.cyan},
          ].map(({label,href,hc})=>(
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{padding:"0.8rem 2.1rem",borderRadius:12,border:`1px solid ${T.border}`,color:T.t2,fontWeight:600,textDecoration:"none",fontSize:"0.92rem",background:"rgba(255,255,255,0.02)",transition:"border-color .2s,color .2s"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=hc;(e.currentTarget as HTMLElement).style.color=T.t1;}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=T.border;(e.currentTarget as HTMLElement).style.color=T.t2;}}>
              {label}
            </a>
          ))}
        </div>

        {/* Award */}
        <div style={{display:"inline-flex",alignItems:"center",gap:"0.55rem",...card({borderRadius:10,padding:"0.5rem 1.25rem",border:"1px solid rgba(245,158,11,0.25)",animation:"fadeUp .7s ease .5s both"})}}>
          <span>🏆</span>
          <span style={{fontSize:"0.8rem",background:T.gWarm,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",fontWeight:700}}>Employee of the Quarter 2024 · Bacancy Technology</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{position:"absolute",bottom:"1.75rem",left:"50%",transform:"translateX(-50%)",animation:"scrollDown 2s ease-in-out infinite",opacity:.28}}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.t2} strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════  STATS  */
function Stats(){
  return(
    <Reveal>
      <div style={{maxWidth:900,margin:"0 auto",padding:"3rem 2rem"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:"1rem"}}>
          {STATS.map(s=>{
            const {ref,v}=useIV(); const n=useCnt(s.n,v);
            return(
              <div key={s.label} ref={ref} style={{...card({padding:"1.75rem 1rem",textAlign:"center",borderRadius:18,transition:"border-color .3s,transform .3s"}),cursor:"default"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=T.borderHi;(e.currentTarget as HTMLElement).style.transform="translateY(-4px)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=T.border;(e.currentTarget as HTMLElement).style.transform="";}}>
                <div style={{fontSize:"1.5rem",marginBottom:"0.35rem"}}>{s.icon}</div>
                <p style={{margin:0,fontSize:"2.5rem",fontWeight:900,lineHeight:1,background:T.gFull,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{n}{s.s}</p>
                <p style={{margin:"0.35rem 0 0",color:T.t3,fontSize:"0.76rem",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em"}}>{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════  ABOUT  */
function About(){
  const info=[
    {icon:"📍",label:"Location",  value:"Ahmedabad, Gujarat, India"},
    {icon:"✉️",label:"Email",     value:"mubarakansari715@gmail.com"},
    {icon:"📞",label:"Phone",     value:"+91 9998508484"},
    {icon:"🎓",label:"Degree",    value:"B.E. IT — CGPI 8.23"},
    {icon:"🗣️",label:"Languages", value:"English · Hindi · Gujarati · Bhojpuri"},
  ];
  return(
    <Reveal id="about">
      <div style={{maxWidth:900,margin:"0 auto",padding:"5.5rem 2rem"}}>
        <SecHead sup="Who I Am" title="About Me" grad={T.gCool}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem"}}>
          <div style={card({padding:"2rem",borderRadius:20})}>
            <p style={{color:T.t2,lineHeight:1.9,margin:"0 0 1rem",fontSize:"0.95rem"}}>
              Highly motivated Software Engineer with <strong style={{color:T.t1}}>5+ years of experience</strong> building impactful Android applications. Proficient in <strong style={{background:T.gCool,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>MVVM, Clean Architecture</strong> and Jetpack components.
            </p>
            <p style={{color:T.t3,lineHeight:1.8,margin:0,fontSize:"0.9rem"}}>
              Experienced in managing Play Store releases, CI/CD pipelines (Fastlane · Bitrise · GitHub Actions), performance profiling, JUnit testing, and Root Cause Analysis to ensure production stability.
            </p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
            {info.map(({icon,label,value})=>(
              <div key={label} style={{display:"flex",alignItems:"center",gap:"0.9rem",...card({borderRadius:12,padding:"0.65rem 1rem"})}}>
                <span style={{fontSize:"1rem",width:22,textAlign:"center",flexShrink:0}}>{icon}</span>
                <div>
                  <p style={{margin:0,fontSize:"0.67rem",color:T.t3,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700}}>{label}</p>
                  <p style={{margin:0,fontSize:"0.87rem",color:T.t2}}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════  SKILLS  */
function Skills(){
  return(
    <Reveal id="skills">
      <div style={{maxWidth:900,margin:"0 auto",padding:"5.5rem 2rem"}}>
        <SecHead sup="What I Know" title="Technical Skills" grad={T.gMain}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1.25rem",marginBottom:"1.5rem"}}>
          {SKILL_GROUPS.map(g=><SkillCard key={g.title} {...g}/>)}
        </div>
        {/* Tools + AI */}
        <div style={card({padding:"2rem",borderRadius:20})}>
          <div style={{marginBottom:"1.5rem"}}>
            <p style={{margin:"0 0 0.85rem",fontSize:"0.75rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.15em",color:T.t3}}>Tools &amp; Practices</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:"0.45rem"}}>
              {TOOLS.map(t=><Chip key={t} label={t} color={T.t3}/>)}
            </div>
          </div>
          <div style={{paddingTop:"1.25rem",borderTop:`1px solid ${T.border}`}}>
            <p style={{margin:"0 0 0.85rem",fontSize:"0.75rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.15em",background:T.gFull,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>🤖 AI-Assisted Development</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:"0.55rem"}}>
              {AI_TOOLS.map(({name,color})=>(
                <span key={name} style={{padding:"0.32rem 1rem",borderRadius:8,background:`${color}14`,border:`1px solid ${color}40`,color,fontSize:"0.83rem",fontWeight:700,letterSpacing:"0.03em"}}>✦ {name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function SkillCard({title,icon,color,items}:{title:string;icon:string;color:string;items:{l:string;p:number}[]}){
  const {ref,v}=useIV();
  return(
    <div ref={ref} style={card({padding:"1.75rem",borderRadius:18,transition:"border-color .3s,transform .3s",cursor:"default"})}
      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${color}50`;(e.currentTarget as HTMLElement).style.transform="translateY(-3px)";}}
      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=T.border;(e.currentTarget as HTMLElement).style.transform="";}}>
      <p style={{margin:"0 0 1.35rem",fontWeight:700,fontSize:"0.87rem",color:T.t1}}><span style={{marginRight:"0.45rem"}}>{icon}</span>{title}</p>
      {items.map((item,i)=>(
        <div key={item.l} style={{marginBottom:i<items.length-1?"0.9rem":0}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.3rem"}}>
            <span style={{color:T.t2,fontSize:"0.82rem",fontWeight:500}}>{item.l}</span>
            <span style={{color,fontSize:"0.75rem",fontWeight:700}}>{item.p}%</span>
          </div>
          <div style={{height:5,background:"rgba(255,255,255,0.05)",borderRadius:9999,overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:9999,background:`linear-gradient(90deg,${color}88,${color})`,width:v?`${item.p}%`:"0%",transition:`width 1.1s cubic-bezier(.22,1,.36,1) ${i*100}ms`,boxShadow:`0 0 8px ${color}55`}}/>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════  EXPERIENCE  */
function Experience(){
  return(
    <Reveal id="experience">
      <div style={{maxWidth:900,margin:"0 auto",padding:"5.5rem 2rem"}}>
        <SecHead sup="Where I've Worked" title="Experience" grad={T.gWarm}/>
        <div style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
          {EXPERIENCE.map((e,i)=>(
            <div key={e.company} style={{display:"flex",gap:"1.25rem"}}>
              {/* Spine */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                <div style={{width:13,height:13,borderRadius:"50%",background:e.color,boxShadow:`0 0 14px ${e.color}`,marginTop:"1.6rem",flexShrink:0}}/>
                {i<EXPERIENCE.length-1&&<div style={{width:2,flex:1,background:`linear-gradient(to bottom,${e.color}50,transparent)`,minHeight:48,marginTop:4}}/>}
              </div>
              {/* Card */}
              <div style={card({flex:1,padding:"1.75rem",borderRadius:18,transition:"border-color .3s,transform .3s",cursor:"default"})}
                onMouseEnter={el=>{(el.currentTarget as HTMLElement).style.borderColor=`${e.color}45`;(el.currentTarget as HTMLElement).style.transform="translateX(4px)";}}
                onMouseLeave={el=>{(el.currentTarget as HTMLElement).style.borderColor=T.border;(el.currentTarget as HTMLElement).style.transform="";}}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem",marginBottom:"1.1rem"}}>
                  <div>
                    <h3 style={{margin:0,fontWeight:800,fontSize:"1.1rem",color:T.t1}}>{e.company}</h3>
                    <p style={{margin:"0.15rem 0 0",color:T.t3,fontSize:"0.86rem",fontWeight:500}}>{e.role}</p>
                  </div>
                  <span style={{padding:"0.22rem 0.85rem",borderRadius:7,background:`${e.color}14`,border:`1px solid ${e.color}35`,color:e.color,fontSize:"0.77rem",fontWeight:700,alignSelf:"flex-start",whiteSpace:"nowrap"}}>{e.period}</span>
                </div>
                <ul style={{margin:0,paddingLeft:"1.1rem",display:"flex",flexDirection:"column",gap:"0.38rem"}}>
                  {e.points.map(p=><li key={p} style={{color:T.t2,fontSize:"0.88rem",lineHeight:1.7}}>{p}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════  PROJECTS  */
function Projects(){
  return(
    <Reveal id="projects">
      <div style={{maxWidth:900,margin:"0 auto",padding:"5.5rem 2rem"}}>
        <SecHead sup="What I've Built" title="Projects" grad={T.gMain}/>
        <div style={{display:"flex",flexDirection:"column",gap:"1.1rem"}}>
          {PROJECTS.map((p,i)=><ProjCard key={p.name} p={p} index={i}/>)}
        </div>
      </div>
    </Reveal>
  );
}
function ProjCard({p,index}:{p:typeof PROJECTS[0];index:number}){
  const [open,setOpen]=useState(false);
  return(
    <div style={card({borderRadius:20,overflow:"hidden",transition:"border-color .3s"})}
      onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor=`${p.color}45`}
      onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor=T.border}>

      {/* Gradient top bar */}
      <div style={{height:3,background:`linear-gradient(90deg,${p.color},${p.color}44)`}}/>

      <div style={{padding:"1.75rem 2rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"0.9rem",marginBottom:"0.9rem"}}>
          <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
            <div style={{width:44,height:44,borderRadius:12,background:`${p.color}18`,border:`1px solid ${p.color}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0}}>{p.icon}</div>
            <div>
              <h3 style={{margin:0,color:T.t1,fontWeight:800,fontSize:"1.08rem"}}>{p.name}</h3>
              <p style={{margin:0,color:T.t3,fontSize:"0.74rem",textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600}}>{p.tag}</p>
            </div>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"0.35rem"}}>{p.tech.map(t=><Chip key={t} label={t} color={p.color}/>)}</div>
        </div>

        <p style={{margin:"0 0 1.1rem",color:T.t2,fontSize:"0.9rem",lineHeight:1.75,paddingLeft:"0.9rem",borderLeft:`3px solid ${p.color}55`}}>{p.desc}</p>

        <button onClick={()=>setOpen(!open)} style={{background:"none",border:`1px solid ${p.color}35`,borderRadius:8,padding:"0.38rem 1rem",color:p.color,fontSize:"0.77rem",fontWeight:700,cursor:"pointer",transition:"background .2s"}}
          onMouseEnter={e=>(e.currentTarget.style.background=`${p.color}12`)}
          onMouseLeave={e=>(e.currentTarget.style.background="none")}>
          {open?"▲ Hide details":"▼ Roles & Responsibilities"}
        </button>
      </div>

      {open&&(
        <div style={{borderTop:`1px solid ${T.border}`,padding:"1.25rem 2rem 1.75rem",background:`${p.color}06`}}>
          <p style={{margin:"0 0 0.7rem",fontSize:"0.73rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.14em",color:p.color}}>Roles &amp; Responsibilities</p>
          <ul style={{margin:0,paddingLeft:"1.1rem",display:"flex",flexDirection:"column",gap:"0.38rem"}}>
            {p.points.map(pt=><li key={pt} style={{color:T.t2,fontSize:"0.88rem",lineHeight:1.7}}>{pt}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════  EDUCATION  */
function Education(){
  return(
    <Reveal id="education">
      <div style={{maxWidth:900,margin:"0 auto",padding:"5.5rem 2rem"}}>
        <SecHead sup="Academic Background" title="Education" grad={T.gWarm}/>
        <div style={card({padding:"2rem",borderRadius:20,display:"flex",alignItems:"center",gap:"1.5rem",flexWrap:"wrap"})}>
          <div style={{width:58,height:58,borderRadius:16,background:"rgba(245,158,11,0.12)",border:"1px solid rgba(245,158,11,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.7rem",flexShrink:0}}>🎓</div>
          <div style={{flex:1}}>
            <h3 style={{margin:0,color:T.t1,fontWeight:800,fontSize:"1.1rem"}}>Gyanmanjari Institute of Technology</h3>
            <p style={{margin:"0.2rem 0 0",color:T.t2,fontSize:"0.9rem"}}>Bachelor of Engineering — Information Technology</p>
            <p style={{margin:"0.15rem 0 0",color:T.t3,fontSize:"0.85rem"}}>CGPI: <strong style={{color:T.gold}}>8.23 / 10</strong></p>
          </div>
          <span style={{padding:"0.42rem 1.1rem",borderRadius:9,background:"rgba(245,158,11,0.1)",border:"1px solid rgba(245,158,11,0.25)",color:T.gold,fontWeight:700,fontSize:"0.88rem"}}>2021</span>
        </div>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════  CONTACT  */
function Contact(){
  return(
    <Reveal id="contact">
      <div style={{maxWidth:640,margin:"0 auto",padding:"5.5rem 2rem 7rem",textAlign:"center"}}>
        <SecHead sup="Get In Touch" title="Let's Work Together" grad={T.gFull}/>
        <p style={{color:T.t3,lineHeight:1.8,marginBottom:"2.25rem",fontSize:"0.95rem"}}>
          Open to full-time roles, freelance projects &amp; interesting collaborations. Let&apos;s build something great!
        </p>
        <a href={GMAILURL} target="_blank" rel="noreferrer"
          style={{display:"inline-block",padding:"0.9rem 2.75rem",borderRadius:14,background:T.gFull,color:"#fff",fontWeight:700,textDecoration:"none",fontSize:"0.95rem",boxShadow:"0 4px 28px rgba(168,85,247,0.4)",marginBottom:"2rem",transition:"opacity .2s,transform .2s"}}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.opacity=".82";(e.currentTarget as HTMLElement).style.transform="translateY(-2px)";}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.opacity="1";(e.currentTarget as HTMLElement).style.transform="";}}>
          mubarakansari715@gmail.com ↗
        </a>
        <div style={{display:"flex",justifyContent:"center",gap:"0.8rem",flexWrap:"wrap"}}>
          {[
            {label:"GitHub",     href:"https://github.com/mubarakansari715",                   c:T.violet},
            {label:"LinkedIn",   href:"https://www.linkedin.com/in/mubarak-ansari-2a139a148/", c:T.cyan},
            {label:"+91 9998508484",href:"tel:+919998508484",                                  c:T.green},
          ].map(({label,href,c})=>(
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{padding:"0.5rem 1.2rem",borderRadius:9,border:`1px solid ${c}30`,color:c,fontSize:"0.87rem",fontWeight:600,textDecoration:"none",transition:"background .2s"}}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background=`${c}10`}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background="transparent"}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════  PAGE  */
export default function Home(){
  return(
    <div style={{background:T.bg,color:T.t1,fontFamily:"'Inter','Segoe UI',Arial,sans-serif",lineHeight:1.6}}>
      <Navbar/>
      <Hero/>
      {/* divider */}
      <div style={{height:1,background:`linear-gradient(90deg,transparent,${T.violet}33,${T.cyan}33,transparent)`,margin:"0 2rem"}}/>
      <Stats/>
      <div style={{height:1,background:`linear-gradient(90deg,transparent,${T.border},transparent)`,margin:"0 2rem"}}/>
      <About/>
      <div style={{height:1,background:`linear-gradient(90deg,transparent,${T.cyan}33,${T.violet}33,transparent)`,margin:"0 2rem"}}/>
      <Skills/>
      <div style={{height:1,background:`linear-gradient(90deg,transparent,${T.border},transparent)`,margin:"0 2rem"}}/>
      <Experience/>
      <div style={{height:1,background:`linear-gradient(90deg,transparent,${T.pink}33,${T.gold}33,transparent)`,margin:"0 2rem"}}/>
      <Projects/>
      <div style={{height:1,background:`linear-gradient(90deg,transparent,${T.border},transparent)`,margin:"0 2rem"}}/>
      <Education/>
      <div style={{height:1,background:`linear-gradient(90deg,transparent,${T.violet}33,${T.cyan}33,transparent)`,margin:"0 2rem"}}/>
      <Contact/>
      <div style={{borderTop:`1px solid ${T.border}`,padding:"1.5rem 2rem",textAlign:"center"}}>
        <p style={{margin:0,color:T.t3,fontSize:"0.79rem"}}>© 2024 Mubarak Ansari · Android Software Engineer · Next.js + Vercel</p>
      </div>
      <style>{`
        @keyframes fadeUp    {from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink     {0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pingDot   {0%,100%{opacity:1;box-shadow:0 0 6px ${T.green}}50%{opacity:.5;box-shadow:0 0 14px ${T.green}}}
        @keyframes fp        {0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(180deg)}}
        @keyframes orbA      {0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,30px) scale(1.05)}}
        @keyframes orbB      {0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-30px,20px) scale(1.04)}}
        @keyframes scrollDown{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}
        .desk{display:flex!important}.mob{display:none!important}
        @media(max-width:640px){.desk{display:none!important}.mob{display:flex!important}}
      `}</style>
    </div>
  );
}
