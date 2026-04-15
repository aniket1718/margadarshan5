import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { 
  ArrowRight, BrainCircuit, Award, Clock, School, Target, 
  TrendingUp, Briefcase, Sparkles, ShieldCheck, Zap, User, 
  BarChart3, ChevronUp, CheckCircle2
} from "lucide-react";

// --- INITIALIZE SUPABASE ---
const supabase = createClient("https://dcyjbkczopjjahvipvsf.supabase.co", "sb_publishable___95tfBGyoSp43L6DS_JWA_PAzS27Rx");

const STUDY_GUIDE = {
  Science: {
    hours: "8-10 Hours",
    subjects: "Physics, Chem, Calculus, AI & Ethics",
    colleges: "IIT Bombay, AIIMS, IISc Bangalore, MIT (USA)",
    strategy: "Focus on first-principles thinking and complex problem-solving patterns.",
    suggestion: "Quantum Computing Scientist, Neurosurgeon, Renewable Energy Engineer.",
    scope: "High growth in Climate Tech, Bio-Engineering, and Space Exploration.",
    skills: ["Python", "MATLAB", "Data Analysis", "Lab Simulation"],
    exams: ["JEE Advanced", "NEET", "SAT/GRE", "KVPY"],
    avgSalary: "$85k - $160k (Global Avg)"
  },
  Commerce: {
    hours: "6-8 Hours",
    subjects: "Financial Accounting, Fintech, Micro-Economics, Business Law",
    colleges: "SRCC Delhi, IIM Ahmedabad (IPM), St. Stephens, London School of Economics",
    strategy: "Master financial modeling and understand the psychology of global markets.",
    suggestion: "Investment Banker, FinTech Founder, Quantitative Analyst.",
    scope: "Aggressive demand in Digital Banking, Decentralized Finance (DeFi), and ESG Investing.",
    skills: ["Advanced Excel", "Financial Modeling", "SQL", "Strategic Negotiations"],
    exams: ["CAT/GMAT", "CA/CFA Foundations", "IPMAT", "ACCA"],
    avgSalary: "$70k - $145k (Global Avg)"
  },
  Arts: {
    hours: "5-7 Hours",
    subjects: "Behavioral Psychology, Digital Media, Sociology, Political Philosophy",
    colleges: "LSR New Delhi, NID Ahmedabad, TISS, Yale University",
    strategy: "Build a multi-disciplinary digital portfolio and focus on narrative-driven communication.",
    suggestion: "UX Strategy Lead, Policy Consultant, International Relations Diplomat.",
    scope: "Critical growth in AI Ethics, Human-Computer Interaction, and Creative Economy.",
    skills: ["Creative Suite (Adobe)", "Public Speaking", "Qualitative Research", "Storytelling"],
    exams: ["UCEED/CEED", "CLAT (Law)", "TISS-BAT", "IELTS/TOEFL"],
    avgSalary: "$55k - $120k (Global Avg)"
  },
  Hybrid: {
    hours: "7-9 Hours",
    subjects: "Computer Science + Business Management + Design",
    colleges: "Plaksha University, Ashoka University, Stanford (Hasso Plattner Institute)",
    strategy: "Cross-pollinate ideas. Apply technical logic to creative and business problems.",
    suggestion: "Product Manager, Tech-Policy Lawyer, Creative Technologist.",
    scope: "The dominant field for 2026+—where tech meets human-centric design.",
    skills: ["Full-Stack Dev", "User Psychology", "Agile Management", "Prototyping"],
    exams: ["SAT", "LSAT", "MET", "Design Aptitude Tests"],
    avgSalary: "$90k - $180k (Global Avg)"
  }
};

const QUESTIONS = [
  { q: "A breakthrough in fusion occurs. Your move?", img: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1200", options: [{t:"Analyze energy efficiency", type:"Science"}, {t:"Monetize the grid", type:"Commerce"}, {t:"Write a cultural piece", type:"Arts"}] },
  { q: "You find a weird DNA strand. You:", img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200", options: [{t:"Sequence the genome", type:"Science"}, {t:"Patent the discovery", type:"Commerce"}, {t:"Draw its structure", type:"Arts"}] },
  { q: "A robot asks you a question. You:", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200", options: [{t:"Check its logic gates", type:"Science"}, {t:"Calculate its ROI", type:"Commerce"}, {t:"Observe its tone", type:"Arts"}] },
  { q: "New planet discovered. You want to:", img: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1200", options: [{t:"Study atmosphere physics", type:"Science"}, {t:"Plan resource mining", type:"Commerce"}, {t:"Imagine the myths", type:"Arts"}] },
  { q: "The internet goes down. You:", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200", options: [{t:"Fix the router logic", type:"Science"}, {t:"Check market losses", type:"Commerce"}, {t:"Read a physical book", type:"Arts"}] },
  { q: "Favorite tool?", img: "https://images.unsplash.com/photo-1532187863486-abf9d39d0212?w=1200", options: [{t:"Microscope", type:"Science"}, {t:"Spreadsheet", type:"Commerce"}, {t:"Camera", type:"Arts"}] },
  { q: "A bridge collapses. You check:", img: "https://images.unsplash.com/photo-1445620466293-d6316372ab59?w=1200", options: [{t:"Structural physics", type:"Science"}, {t:"Insurance policy", type:"Commerce"}, {t:"Human impact", type:"Arts"}] },
  { q: "You see a code error. You:", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200", options: [{t:"Debug the algorithm", type:"Science"}, {t:"Outsource the fix", type:"Commerce"}, {t:"Improve user feedback", type:"Arts"}] },
  { q: "Global warming fix?", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200", options: [{t:"Carbon capture tech", type:"Science"}, {t:"Carbon tax models", type:"Commerce"}, {t:"Social awareness", type:"Arts"}] },
  { q: "Stock market dips. You:", img: "https://images.unsplash.com/photo-1611974714851-48206139d733?w=1200", options: [{t:"Study the math data", type:"Science"}, {t:"Buy the dip", type:"Commerce"}, {t:"Analyze panic trends", type:"Arts"}] },
  { q: "Start a company. Priority?", img: "https://images.unsplash.com/photo-1454165833762-016335133642?w=1200", options: [{t:"Product R&D", type:"Science"}, {t:"Sales & Profits", type:"Commerce"}, {t:"Design & Brand", type:"Arts"}] },
  { q: "Found a wallet. You think:", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200", options: [{t:"Check ID biometric", type:"Science"}, {t:"Check the cash total", type:"Commerce"}, {t:"Return it with a note", type:"Arts"}] },
  { q: "Inflation rises. You:", img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200", options: [{t:"Adjust supply algorithms", type:"Science"}, {t:"Raise prices/Invest", type:"Commerce"}, {t:"Write an op-ed", type:"Arts"}] },
  { q: "Dream Saturday?", img: "https://images.unsplash.com/photo-1532094349884-543bb11783ca?w=1200", options: [{t:"Building a PC", type:"Science"}, {t:"Trading Crypto", type:"Commerce"}, {t:"Drawing/Writing", type:"Arts"}] },
  { q: "A movie makes billions. Why?", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200", options: [{t:"Great SFX Tech", type:"Science"}, {t:"Perfect Marketing", type:"Commerce"}, {t:"Great Storytelling", type:"Arts"}] },
  { q: "Choose a prize:", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200", options: [{t:"Nobel Prize", type:"Science"}, {t:"Forbes 30 Under 30", type:"Commerce"}, {t:"Pulitzer Prize", type:"Arts"}] },
  { q: "Taxes are due. You:", img: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200", options: [{t:"Write an auto-filer", type:"Science"}, {t:"Find every deduction", type:"Commerce"}, {t:"Critique tax laws", type:"Arts"}] },
  { q: "Ancient artifact found. You:", img: "https://images.unsplash.com/photo-1582730147924-d92b3f66708c?w=1200", options: [{t:"Scan for isotopes", type:"Science"}, {t:"Sell to a museum", type:"Commerce"}, {t:"Study the culture", type:"Arts"}] },
  { q: "A protest begins. You:", img: "https://images.unsplash.com/photo-1523995462485-3d171b5c8fb9?w=1200", options: [{t:"Track crowd data", type:"Science"}, {t:"Calculate GDP loss", type:"Commerce"}, {t:"Interview the people", type:"Arts"}] },
  { q: "Design a city. Priority?", img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200", options: [{t:"Fusion Power", type:"Science"}, {t:"Financial Hub", type:"Commerce"}, {t:"Art Districts", type:"Arts"}] },
  { q: "AI writes a book. You:", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200", options: [{t:"Check the code", type:"Science"}, {t:"Publish for profit", type:"Commerce"}, {t:"Discuss its ethics", type:"Arts"}] },
  { q: "You find a blank wall. You:", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200", options: [{t:"Measure its area", type:"Science"}, {t:"Sell the ad space", type:"Commerce"}, {t:"Paint a mural", type:"Arts"}] },
  { q: "New virus spreads. Reaction?", img: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=1200", options: [{t:"Study the mutation", type:"Science"}, {t:"Short-sell pharma", type:"Commerce"}, {t:"Communicate safety", type:"Arts"}] },
  { q: "Superpower?", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200", options: [{t:"Instant Logic", type:"Science"}, {t:"Wealth Strategy", type:"Commerce"}, {t:"Pure Empathy", type:"Arts"}] },
  { q: "Final goal in life?", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200", options: [{t:"Universal Cure", type:"Science"}, {t:"Global Trade", type:"Commerce"}, {t:"World Peace", type:"Arts"}] },
  { q: "Mars colony needs a leader. Why you?", img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1200", options: [{t:"I optimize life-support systems", type:"Science"}, {t:"I manage resource logistics", type:"Commerce"}, {t:"I build the colony's culture", type:"Arts"}] },
  { q: "A universal translator is invented. Impact?", img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200", options: [{t:"Decoding alien physics", type:"Science"}, {t:"Frictionless global trade", type:"Commerce"}, {t:"End of cultural isolation", type:"Arts"}] },
  { q: "Your dream workspace contains:", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200", options: [{t:"High-end servers & hardware", type:"Science"}, {t:"A view of the stock ticker", type:"Commerce"}, {t:"An open floor for collaboration", type:"Arts"}] }
];

export default function Margadarshan() {
  const [stage, setStage] = useState("landing");
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [currentUser, setCurrentUser] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState({ Science: 0, Commerce: 0, Arts: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#020617";
    document.body.style.margin = "0";
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      .spinner { width: 40px; height: 40px; border: 4px solid rgba(59, 130, 246, 0.1); border-top-color: #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; }
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #020617; }
      ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { data, error } = await supabase.from("student_reports").select("*").eq("email", formData.email).eq("password", formData.password).single();
        if (data) { 
            setCurrentUser(data); 
            setStage(data.top_stream ? "results" : "quiz"); 
        } else throw error;
      } else {
        const { data, error } = await supabase.from("student_reports").insert([{ full_name: formData.name, email: formData.email, password: formData.password }]).select().single();
        if (data) { setCurrentUser(data); setStage("quiz"); } else throw error;
      }
    } catch (err) { alert("Access Denied: Please check credentials."); }
    setLoading(false);
  };

  const handleAnswer = (type) => {
    const nextScores = { ...scores, [type]: scores[type] + 1 };
    setScores(nextScores);
    if (qIndex + 1 < QUESTIONS.length) {
      setQIndex(qIndex + 1);
    } else {
      saveResult(nextScores);
    }
  };

  const saveResult = async (finalScores) => {
    setLoading(true);
    const sorted = Object.entries(finalScores).sort((a, b) => b[1] - a[1]);
    const top = (sorted[0][1] - sorted[1][1] < 2) ? `${sorted[0][0]}-${sorted[1][0]} Hybrid` : sorted[0][0];

    try {
      await supabase.from("student_reports").update({
        top_stream: top,
        science_score: finalScores.Science,
        commerce_score: finalScores.Commerce,
        arts_score: finalScores.Arts
      }).eq("email", currentUser.email);

      // Re-fetch to ensure state is perfectly synced with DB
      const { data } = await supabase.from("student_reports").select("*").eq("email", currentUser.email).single();
      setCurrentUser(data);
      setStage("results");
    } catch (e) { alert("Sync Error"); }
    setLoading(false);
  };

  const resetAll = () => {
    setStage("landing");
    setQIndex(0);
    setScores({ Science: 0, Commerce: 0, Arts: 0 });
    setCurrentUser(null);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div style={styles.app}>
      {stage === "landing" && (
        <div style={styles.landingContainer}>
          <div style={styles.heroLeft}>
            <div style={styles.badge}><Sparkles size={12}/> AI Career Mapping 2026</div>
            <h1 style={styles.mainTitle}> <span style={{color:'#196cf1'}}>मार्गदर्शन</span></h1>
            <p style={styles.subText}>The ultimate cognitive assessment to find your perfect academic stream based on logic and instinct.</p>
            <button style={styles.ctaBtn} onClick={() => setStage("auth")}>Start Now <ArrowRight size={18}/></button>
          </div>
          <div style={styles.heroRight}>
            <BrainCircuit size={280} color="#1e293b" style={{animation:'float 6s infinite'}}/>
          </div>
        </div>
      )}

      {stage === "auth" && (
        <div style={styles.fullCenter}>
          <div style={styles.authCard}>
            <h2 style={{textAlign:'center', marginBottom:20}}>{isLogin ? "Sign In" : "Register"}</h2>
            <form onSubmit={handleAuth}>
              {!isLogin && <input style={styles.input} placeholder="Name" onChange={e=>setFormData({...formData, name:e.target.value})}/>}
              <input style={styles.input} type="email" placeholder="Email" onChange={e=>setFormData({...formData, email:e.target.value})}/>
              <input style={styles.input} type="password" placeholder="Password" onChange={e=>setFormData({...formData, password:e.target.value})}/>
              <button style={styles.primaryBtn} type="submit">{isLogin ? "Continue" : "Create Account"}</button>
            </form>
            <p onClick={()=>setIsLogin(!isLogin)} style={styles.toggleText}>{isLogin ? "Need an account? Join" : "Already registered? Login"}</p>
          </div>
        </div>
      )}

      {stage === "quiz" && (
        <div style={styles.quizLayout} key={qIndex}>
          <div style={styles.imgSide}>
            <img src={QUESTIONS[qIndex].img} style={styles.fullImg} alt="context" />
            <div style={styles.imgMask}></div>
            <div style={styles.progressLine}><div style={{...styles.progressInner, width: `${(qIndex/QUESTIONS.length)*100}%`}}></div></div>
          </div>
          <div style={styles.questionSide}>
            <span style={styles.stepCount}>Step {qIndex+1} / {QUESTIONS.length}</span>
            <h2 style={styles.questionTitle}>{QUESTIONS[qIndex].q}</h2>
            <div style={styles.optionsList}>
              {QUESTIONS[qIndex].options.map((opt, i) => (
                <button key={i} style={styles.optionItem} onClick={() => handleAnswer(opt.type)}>
                  <div style={styles.optAlpha}>{String.fromCharCode(65+i)}</div> {opt.t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {stage === "results" && (
        <div style={styles.resultView}>
          <div style={styles.resContainer}>
             <div style={styles.resHero}>
               <div style={styles.iconCircle}><Award size={48} color="#fbbf24"/></div>
               <h1 style={styles.resStreamTitle}>{currentUser?.top_stream}</h1>
               <p style={styles.resSubtitle}>Personalized Roadmap for <b>{currentUser?.full_name}</b></p>
             </div>

             <div style={styles.sectionHeader}><BarChart3 size={16}/> Cognitive Breakdown</div>
             <div style={styles.scoreSummary}>
               <div style={styles.scorePill}>
                 <span style={styles.pillLabel}>Science</span>
                 <span style={styles.pillVal}>{currentUser?.science_score}</span>
               </div>
               <div style={styles.scorePill}>
                 <span style={styles.pillLabel}>Commerce</span>
                 <span style={styles.pillVal}>{currentUser?.commerce_score}</span>
               </div>
               <div style={styles.scorePill}>
                 <span style={styles.pillLabel}>Arts</span>
                 <span style={styles.pillVal}>{currentUser?.arts_score}</span>
               </div>
             </div>

             <div style={styles.sectionHeader}><Target size={16}/> Success Blueprint</div>
             <div style={styles.blueprintGrid}>
                <div style={{...styles.blueprintCard, gridColumn:'span 2', borderColor:'#3b82f6'}}>
                  <div style={styles.cardHeader}><CheckCircle2 size={18} color="#3b82f6"/> <h3>Winning Strategy</h3></div>
                  <p style={styles.cardBody}>{STUDY_GUIDE[currentUser?.top_stream.split('-')[0]]?.strategy}</p>
                </div>
                <div style={styles.blueprintCard}>
                  <div style={styles.cardHeader}><Clock size={18} color="#8b5cf6"/> <h3>Study Rigor</h3></div>
                  <p style={styles.cardBody}>{STUDY_GUIDE[currentUser?.top_stream.split('-')[0]]?.hours}</p>
                </div>
                <div style={styles.blueprintCard}>
                  <div style={styles.cardHeader}><School size={18} color="#10b981"/> <h3>Colleges</h3></div>
                  <p style={styles.cardBody}>{STUDY_GUIDE[currentUser?.top_stream.split('-')[0]]?.colleges}</p>
                </div>
                <div style={styles.blueprintCard}>
                  <div style={styles.cardHeader}><Briefcase size={18} color="#f59e0b"/> <h3>Roles</h3></div>
                  <p style={styles.cardBody}>{STUDY_GUIDE[currentUser?.top_stream.split('-')[0]]?.suggestion}</p>
                </div>
                <div style={styles.blueprintCard}>
                  <div style={styles.cardHeader}><TrendingUp size={18} color="#ec4899"/> <h3>Market</h3></div>
                  <p style={styles.cardBody}>{STUDY_GUIDE[currentUser?.top_stream.split('-')[0]]?.scope}</p>
                </div>
             </div>

             <div style={styles.actions}>
                <button style={styles.resetBtn} onClick={resetAll}>
                  <ChevronUp size={18}/> Reset & Start Over
                </button>
             </div>
          </div>
        </div>
      )}

      {loading && (
        <div style={styles.loadOverlay}>
          <div className="spinner"></div>
          <p style={{marginTop:15, color:'#3b82f6', fontWeight:'bold'}}>Syncing Decision Matrix...</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: { position: 'fixed', inset: 0, background: '#020617', color: 'white', fontFamily: '"Inter", sans-serif' },
  fullCenter: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  
  // Landing
  landingContainer: { display: 'flex', height: '100%', alignItems: 'center', padding: '0 10%' },
  heroLeft: { flex: 1.2 },
  badge: { display: 'inline-flex', alignItems: 'center', gap: 6, background: '#1e293b', padding: '6px 12px', borderRadius: 20, fontSize: 11, color: '#3b82f6', marginBottom: 20 },
  mainTitle: { fontSize: '4.5rem', fontWeight: '900', margin: 0, lineHeight: 1 },
  subText: { fontSize: '1.2rem', color: '#94a3b8', margin: '20px 0 40px', maxWidth: '500px' },
  ctaBtn: { padding: '16px 32px', background: '#3b82f6', border: 'none', color: 'white', borderRadius: '50px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' },
  heroRight: { flex: 0.8, display: 'flex', justifyContent: 'center' },

  // Auth
  authCard: { background: '#0f172a', padding: '40px', borderRadius: '24px', border: '1px solid #1e293b', width: '340px' },
  input: { width: '100%', padding: '12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', color: 'white', marginBottom: 15, outline: 'none', boxSizing: 'border-box' },
  primaryBtn: { width: '100%', padding: '12px', background: '#3b82f6', border: 'none', color: 'white', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
  toggleText: { textAlign: 'center', fontSize: 13, color: '#94a3b8', cursor: 'pointer', marginTop: 20 },

  // Quiz
  quizLayout: { display: 'flex', height: '100vh' },
  imgSide: { flex: 1, position: 'relative' },
  fullImg: { width: '100%', height: '100%', objectFit: 'cover' },
  imgMask: { position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(2,6,23,0), #020617)' },
  progressLine: { position: 'absolute', bottom: 40, left: 40, right: 40, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 },
  progressInner: { height: '100%', background: '#3b82f6', transition: '0.3s' },
  questionSide: { flex: 1, padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  stepCount: { color: '#3b82f6', fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase' },
  questionTitle: { fontSize: '2.5rem', fontWeight: '800', margin: '20px 0 40px' },
  optionsList: { display: 'flex', flexDirection: 'column', gap: 15 },
  optionItem: { display: 'flex', alignItems: 'center', gap: 15, padding: '18px', background: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '15px', textAlign: 'left', cursor: 'pointer' },
  optAlpha: { width: 30, height: 30, background: '#1e293b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold' },

  // Result Downward Flow
  resultView: { height: '100%', overflowY: 'auto', background: 'radial-gradient(circle at top, #0f172a 0%, #020617 100%)' },
  resContainer: { maxWidth: '800px', margin: '0 auto', padding: '100px 20px' },
  resHero: { textAlign: 'center', marginBottom: 60 },
  iconCircle: { width: 80, height: 80, background: '#1e293b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' },
  resStreamTitle: { fontSize: '4rem', fontWeight: '900', margin: 0, background: 'linear-gradient(to bottom, #fff, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  resSubtitle: { color: '#94a3b8', fontSize: '1.1rem' },
  sectionHeader: { fontSize: '12px', fontWeight: 'bold', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, marginTop: 40 },
  scoreSummary: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 15 },
  scorePill: { background: '#0f172a', padding: '20px', borderRadius: '16px', border: '1px solid #1e293b', textAlign: 'center' },
  pillLabel: { fontSize: '10px', color: '#64748b', display: 'block', marginBottom: 5 },
  pillVal: { fontSize: '24px', fontWeight: '900' },
  blueprintGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 },
  blueprintCard: { background: '#0f172a', padding: '25px', borderRadius: '20px', border: '1px solid #1e293b' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 },
  cardBody: { color: '#94a3b8', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 },
  actions: { marginTop: 60, textAlign: 'center' },
  resetBtn: { padding: '16px 40px', background: '#ffffff', border: 'none', color: '#020617', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, margin: '0 auto' },
  loadOverlay: { position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }
};