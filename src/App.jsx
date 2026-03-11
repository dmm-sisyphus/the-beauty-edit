import { useState, useReducer, useEffect, createContext, useContext, useRef, useCallback } from "react";

// ─── Icons (inline SVG components) ──────────────────────────────────
const Icons = {
  Home: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Package: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  Plus: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Heart: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  BarChart: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Search: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  ChevronLeft: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="15 18 9 12 15 6"/></svg>,
  ChevronRight: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="9 18 15 12 9 6"/></svg>,
  Edit: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Camera: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Star: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Clock: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Tag: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  ArrowUp: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="18 15 12 9 6 15"/></svg>,
  X: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Sparkles: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M5 18l.7 2.1L7.8 21l-2.1.7L5 24l-.7-2.1L2.2 21l2.1-.7L5 18z"/><path d="M19 14l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1z"/></svg>,
  Filter: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Sort: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="16" y2="12"/><line x1="4" y1="18" x2="12" y2="18"/></svg>,
  Settings: (p) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

// ─── Constants ──────────────────────────────────────────────────────
const CATEGORIES = ["Skincare", "Makeup", "Haircare", "Body Care", "Fragrance", "Tools & Accessories", "Other"];
const STATUSES = ["new", "in-use", "finished"];
const THOUGHT_TYPES = ["first-impression", "during-use", "final-verdict"];
const PRIORITIES = ["high", "medium", "low"];
const CATEGORY_EMOJIS = { Skincare: "✨", Makeup: "💄", Haircare: "💇‍♀️", "Body Care": "🧴", Fragrance: "🌸", "Tools & Accessories": "🪞", Other: "📦" };

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const now = () => new Date().toISOString();
const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtCurrency = (n) => typeof n === "number" && !isNaN(n) ? `$${n.toFixed(2)}` : "—";

// ─── Sample Data ────────────────────────────────────────────────────
const SAMPLE_PRODUCTS = [
  {
    id: uid(), name: "Glow Recipe Watermelon Moisturizer", brand: "Glow Recipe", category: "Skincare",
    imageUri: "", purchaseLocation: "Sephora", originalPrice: 39, discountDescription: "15% off sale", finalPrice: 33.15,
    status: "in-use", rating: 8, wouldRepurchase: "yes",
    thoughts: [
      { id: uid(), date: "2026-01-15T10:00:00Z", type: "first-impression", text: "Love the scent! Texture feels lightweight and absorbs quickly." },
      { id: uid(), date: "2026-02-20T10:00:00Z", type: "during-use", text: "Two months in — my skin looks more plump and hydrated. Using it every night." },
    ],
    createdAt: "2026-01-15T10:00:00Z", updatedAt: "2026-02-20T10:00:00Z",
  },
  {
    id: uid(), name: "Charlotte Tilbury Pillow Talk Lipstick", brand: "Charlotte Tilbury", category: "Makeup",
    imageUri: "", purchaseLocation: "Nordstrom", originalPrice: 35, discountDescription: "", finalPrice: 35,
    status: "finished", rating: 9, wouldRepurchase: "yes",
    thoughts: [
      { id: uid(), date: "2025-11-01T10:00:00Z", type: "first-impression", text: "The most perfect nude-pink shade. Creamy formula, no drying." },
      { id: uid(), date: "2026-02-10T10:00:00Z", type: "final-verdict", text: "Holy grail lip color. Already on my second tube!" },
    ],
    createdAt: "2025-11-01T10:00:00Z", updatedAt: "2026-02-10T10:00:00Z",
  },
  {
    id: uid(), name: "Olaplex No. 3 Hair Perfector", brand: "Olaplex", category: "Haircare",
    imageUri: "", purchaseLocation: "Ulta Beauty", originalPrice: 30, discountDescription: "BOGO 50% off", finalPrice: 22.50,
    status: "new", rating: 0, wouldRepurchase: "maybe",
    thoughts: [],
    createdAt: "2026-03-01T10:00:00Z", updatedAt: "2026-03-01T10:00:00Z",
  },
];

const SAMPLE_WISHLIST = [
  { id: uid(), name: "Drunk Elephant Protini Polypeptide Cream", brand: "Drunk Elephant", category: "Skincare", reasonForInterest: "Heard amazing things about the peptide formula for anti-aging", estimatedPrice: 68, source: "TikTok", priority: "high", createdAt: "2026-02-15T10:00:00Z" },
  { id: uid(), name: "Dyson Airwrap", brand: "Dyson", category: "Tools & Accessories", reasonForInterest: "Want to try the heatless curling — everyone raves about it", estimatedPrice: 599, source: "Instagram", priority: "medium", createdAt: "2026-01-20T10:00:00Z" },
];

// ─── Reducer ────────────────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT": return { ...state, products: [action.payload, ...state.products] };
    case "UPDATE_PRODUCT": return { ...state, products: state.products.map(p => p.id === action.payload.id ? action.payload : p) };
    case "DELETE_PRODUCT": return { ...state, products: state.products.filter(p => p.id !== action.payload) };
    case "ADD_WISHLIST": return { ...state, wishlist: [action.payload, ...state.wishlist] };
    case "UPDATE_WISHLIST": return { ...state, wishlist: state.wishlist.map(w => w.id === action.payload.id ? action.payload : w) };
    case "DELETE_WISHLIST": return { ...state, wishlist: state.wishlist.filter(w => w.id !== action.payload) };
    case "PROMOTE_WISHLIST": {
      const item = state.wishlist.find(w => w.id === action.payload);
      if (!item) return state;
      return { ...state, wishlist: state.wishlist.filter(w => w.id !== action.payload) };
    }
    case "COMPLETE_ONBOARDING": return { ...state, onboarded: true };
    default: return state;
  }
}

const AppContext = createContext();

// ─── Shared UI Components ───────────────────────────────────────────
const colors = {
  cream: "#FFF8F3", rose: "#E8A0BF", roseDark: "#C5739B", roseLight: "#F5D5E0",
  rosePale: "#FFF0F5", blush: "#F9E4EC", text: "#3D2C2C", textLight: "#8B7272",
  white: "#FFFFFF", border: "#F0E0E0", shadow: "0 2px 12px rgba(200,150,170,0.12)",
  shadowMd: "0 4px 20px rgba(200,150,170,0.15)",
};

const Pill = ({ children, active, onClick, style }) => (
  <button onClick={onClick} style={{
    padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${active ? colors.rose : colors.border}`,
    background: active ? colors.rosePale : colors.white, color: active ? colors.roseDark : colors.textLight,
    fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap", ...style,
  }}>{children}</button>
);

const Badge = ({ children, color = colors.rose, bg = colors.rosePale }) => (
  <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 12, background: bg, color, fontSize: 11, fontWeight: 600 }}>{children}</span>
);

const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{
    background: colors.white, borderRadius: 16, padding: 20, boxShadow: colors.shadow,
    border: `1px solid ${colors.border}`, cursor: onClick ? "pointer" : "default",
    transition: "transform 0.2s, box-shadow 0.2s", ...style,
  }}>{children}</div>
);

const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: colors.textLight, marginBottom: 6, letterSpacing: 0.3 }}>{label}</label>}
    <input {...props} style={{
      width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${colors.border}`,
      background: colors.cream, fontSize: 15, color: colors.text, outline: "none", boxSizing: "border-box",
      transition: "border-color 0.2s", fontFamily: "inherit", ...(props.style || {}),
    }} onFocus={e => e.target.style.borderColor = colors.rose} onBlur={e => e.target.style.borderColor = colors.border} />
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: colors.textLight, marginBottom: 6 }}>{label}</label>}
    <textarea {...props} style={{
      width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${colors.border}`,
      background: colors.cream, fontSize: 15, color: colors.text, outline: "none", boxSizing: "border-box",
      minHeight: 80, resize: "vertical", fontFamily: "inherit", ...(props.style || {}),
    }} onFocus={e => e.target.style.borderColor = colors.rose} onBlur={e => e.target.style.borderColor = colors.border} />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: colors.textLight, marginBottom: 6 }}>{label}</label>}
    <select {...props} style={{
      width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${colors.border}`,
      background: colors.cream, fontSize: 15, color: colors.text, outline: "none", boxSizing: "border-box",
      fontFamily: "inherit", appearance: "none", cursor: "pointer", ...(props.style || {}),
    }}>
      <option value="">Select...</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const Btn = ({ children, variant = "primary", style, ...props }) => {
  const styles = {
    primary: { background: `linear-gradient(135deg, ${colors.rose}, ${colors.roseDark})`, color: "#fff", border: "none" },
    secondary: { background: colors.white, color: colors.roseDark, border: `1.5px solid ${colors.rose}` },
    ghost: { background: "transparent", color: colors.roseDark, border: "none" },
  };
  return (
    <button {...props} style={{
      padding: "12px 24px", borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: "pointer",
      transition: "all 0.2s", fontFamily: "inherit", display: "inline-flex", alignItems: "center",
      justifyContent: "center", gap: 8, ...styles[variant], ...style,
    }}>{children}</button>
  );
};

const BackHeader = ({ title, onBack, right }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", marginBottom: 8 }}>
    <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", color: colors.roseDark }}>
      <Icons.ChevronLeft style={{ width: 22, height: 22 }} />
      <span style={{ fontSize: 15, fontWeight: 500 }}>Back</span>
    </button>
    <span style={{ fontSize: 17, fontWeight: 600, color: colors.text }}>{title}</span>
    <div style={{ width: 60 }}>{right}</div>
  </div>
);

const RatingSlider = ({ value, onChange }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: colors.textLight, marginBottom: 10 }}>
      Rating — <span style={{ fontSize: 22, fontWeight: 700, color: colors.roseDark }}>{value || "—"}</span><span style={{ fontSize: 13, color: colors.textLight }}>/10</span>
    </label>
    <div style={{ display: "flex", gap: 6 }}>
      {[1,2,3,4,5,6,7,8,9,10].map(n => (
        <button key={n} onClick={() => onChange(n)} style={{
          width: 30, height: 30, borderRadius: 10, border: "none", cursor: "pointer",
          background: n <= value ? `linear-gradient(135deg, ${colors.rose}, ${colors.roseDark})` : colors.cream,
          color: n <= value ? "#fff" : colors.textLight, fontSize: 12, fontWeight: 600, transition: "all 0.15s",
        }}>{n}</button>
      ))}
    </div>
  </div>
);

const StatusSelector = ({ value, onChange }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: colors.textLight, marginBottom: 8 }}>Status</label>
    <div style={{ display: "flex", gap: 8 }}>
      {STATUSES.map(s => (
        <Pill key={s} active={value === s} onClick={() => onChange(s)}>
          {s === "new" ? "✨ New" : s === "in-use" ? "💫 In Use" : "✅ Finished"}
        </Pill>
      ))}
    </div>
  </div>
);

const RepurchaseSelector = ({ value, onChange }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: colors.textLight, marginBottom: 8 }}>Would repurchase?</label>
    <div style={{ display: "flex", gap: 8 }}>
      {["yes", "no", "maybe"].map(v => (
        <Pill key={v} active={value === v} onClick={() => onChange(v)}>
          {v === "yes" ? "💕 Yes" : v === "no" ? "👎 No" : "🤔 Maybe"}
        </Pill>
      ))}
    </div>
  </div>
);

const ProductImage = ({ uri, size = 80, style }) => (
  <div style={{
    width: size, height: size, borderRadius: 14, background: `linear-gradient(135deg, ${colors.blush}, ${colors.roseLight})`,
    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0, ...style,
  }}>
    {uri ? <img src={uri} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      : <Icons.Sparkles style={{ width: size * 0.4, height: size * 0.4, color: colors.rose }} />}
  </div>
);

const EmptyState = ({ icon: Icon, title, subtitle, action }) => (
  <div style={{ textAlign: "center", padding: "48px 24px" }}>
    <div style={{ width: 64, height: 64, borderRadius: 20, background: colors.blush, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
      <Icon style={{ width: 28, height: 28, color: colors.rose }} />
    </div>
    <div style={{ fontSize: 18, fontWeight: 600, color: colors.text, marginBottom: 6 }}>{title}</div>
    <div style={{ fontSize: 14, color: colors.textLight, marginBottom: 20 }}>{subtitle}</div>
    {action}
  </div>
);

// ─── SCREEN: Onboarding ─────────────────────────────────────────────
const OnboardingScreen = () => {
  const { dispatch } = useContext(AppContext);
  const [step, setStep] = useState(0);
  const slides = [
    { emoji: "✨", title: "Track your beauty journey", desc: "Document every product from first impression to final verdict — your personal beauty diary." },
    { emoji: "💕", title: "Build your wishlist", desc: "Keep a curated list of products you're dying to try, with notes on why you want them." },
    { emoji: "📊", title: "See your spending insights", desc: "Know exactly where your money goes and discover your true beauty favorites." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, ${colors.cream} 0%, ${colors.rosePale} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🌸</div>
        <h1 style={{ fontSize: 32, fontWeight: 300, color: colors.text, letterSpacing: -0.5, margin: 0 }}>The Beauty Edit</h1>
        <p style={{ fontSize: 14, color: colors.textLight, marginTop: 6, fontStyle: "italic" }}>Your personal beauty journal</p>
      </div>

      <Card style={{ maxWidth: 340, width: "100%", textAlign: "center", padding: 32, marginBottom: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{slides[step].emoji}</div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: "0 0 8px" }}>{slides[step].title}</h2>
        <p style={{ fontSize: 14, color: colors.textLight, lineHeight: 1.6, margin: 0 }}>{slides[step].desc}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setStep(i)} style={{
              width: i === step ? 24 : 8, height: 8, borderRadius: 4, cursor: "pointer",
              background: i === step ? colors.rose : colors.border, transition: "all 0.3s",
            }} />
          ))}
        </div>
      </Card>

      <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 340 }}>
        {step < 2 ? (
          <>
            <Btn variant="ghost" onClick={() => dispatch({ type: "COMPLETE_ONBOARDING" })} style={{ flex: 1 }}>Skip</Btn>
            <Btn onClick={() => setStep(s => s + 1)} style={{ flex: 2 }}>Next →</Btn>
          </>
        ) : (
          <Btn onClick={() => dispatch({ type: "COMPLETE_ONBOARDING" })} style={{ flex: 1, padding: "16px 24px", fontSize: 17 }}>
            Get Started 🌸
          </Btn>
        )}
      </div>
    </div>
  );
};

// ─── SCREEN: Home Dashboard ─────────────────────────────────────────
const HomeScreen = ({ navigate }) => {
  const { state } = useContext(AppContext);
  const { products, wishlist } = state;
  const totalProducts = products.length;
  const avgRating = totalProducts ? (products.reduce((s, p) => s + (p.rating || 0), 0) / products.filter(p => p.rating > 0).length || 0).toFixed(1) : "—";
  const totalSpent = products.reduce((s, p) => s + (p.finalPrice || 0), 0);
  const recent = [...products].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 3);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ padding: "20px 20px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 14, color: colors.textLight }}>{greeting} ✨</div>
          <h1 style={{ fontSize: 26, fontWeight: 300, color: colors.text, margin: "4px 0 0", letterSpacing: -0.5 }}>The Beauty Edit</h1>
        </div>
        <button onClick={() => navigate("settings")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: colors.textLight, marginTop: 4 }}>
          <Icons.Settings style={{ width: 22, height: 22 }} />
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Products", value: totalProducts, emoji: "📦" },
          { label: "Avg Rating", value: avgRating, emoji: "⭐" },
          { label: "Total Spent", value: fmtCurrency(totalSpent), emoji: "💰" },
        ].map(s => (
          <Card key={s.label} style={{ padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.emoji}</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: colors.text }}>{s.value}</div>
            <div style={{ fontSize: 11, color: colors.textLight, marginTop: 2 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
        <Card onClick={() => navigate("products")} style={{ padding: 20, cursor: "pointer", textAlign: "center" }}>
          <Icons.Package style={{ width: 28, height: 28, color: colors.rose, marginBottom: 8 }} />
          <div style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>My Products</div>
          <div style={{ fontSize: 12, color: colors.textLight, marginTop: 2 }}>{totalProducts} entries</div>
        </Card>
        <Card onClick={() => navigate("wishlist")} style={{ padding: 20, cursor: "pointer", textAlign: "center" }}>
          <Icons.Heart style={{ width: 28, height: 28, color: colors.rose, marginBottom: 8 }} />
          <div style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>The Favorites Edit</div>
          <div style={{ fontSize: 12, color: colors.textLight, marginTop: 2 }}>{wishlist.length} items</div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div style={{ marginBottom: 8 }}>
        <h2 style={{ fontSize: 17, fontWeight: 600, color: colors.text, margin: "0 0 14px" }}>Recent Activity</h2>
        {recent.length === 0 ? (
          <Card style={{ textAlign: "center", padding: 32, color: colors.textLight }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🌿</div>
            <div>Your beauty journal is waiting for its first entry!</div>
          </Card>
        ) : recent.map(p => (
          <Card key={p.id} onClick={() => navigate("product-detail", p)} style={{ display: "flex", alignItems: "center", gap: 14, padding: 14, marginBottom: 10, cursor: "pointer" }}>
            <ProductImage uri={p.imageUri} size={50} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
              <div style={{ fontSize: 12, color: colors.textLight }}>{p.brand}</div>
            </div>
            {p.rating > 0 && <Badge>{p.rating}/10</Badge>}
          </Card>
        ))}
      </div>
    </div>
  );
};

// ─── SCREEN: Product List ───────────────────────────────────────────
const ProductListScreen = ({ navigate }) => {
  const { state } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [showFilters, setShowFilters] = useState(false);

  let filtered = state.products.filter(p => {
    const q = search.toLowerCase();
    if (q && !p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
    if (catFilter && p.category !== catFilter) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    return true;
  });

  filtered.sort((a, b) => {
    if (sortBy === "date") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "price") return (b.finalPrice || 0) - (a.finalPrice || 0);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div style={{ padding: "20px 20px 100px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 300, color: colors.text, margin: "0 0 16px", letterSpacing: -0.5 }}>My Products</h1>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <Icons.Search style={{ width: 18, height: 18, position: "absolute", left: 14, top: 13, color: colors.textLight }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products or brands..."
          style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: 14, border: `1.5px solid ${colors.border}`, background: colors.white, fontSize: 15, color: colors.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
        />
      </div>

      {/* Filter/Sort Toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <Pill active={showFilters} onClick={() => setShowFilters(!showFilters)} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icons.Filter style={{ width: 14, height: 14 }} /> Filters
        </Pill>
        {[{ k: "date", l: "Newest" }, { k: "rating", l: "Top Rated" }, { k: "price", l: "Price" }, { k: "name", l: "A–Z" }].map(s => (
          <Pill key={s.k} active={sortBy === s.k} onClick={() => setSortBy(s.k)}>{s.l}</Pill>
        ))}
      </div>

      {/* Filters */}
      {showFilters && (
        <Card style={{ padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Category</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
            <Pill active={!catFilter} onClick={() => setCatFilter("")}>All</Pill>
            {CATEGORIES.map(c => <Pill key={c} active={catFilter === c} onClick={() => setCatFilter(catFilter === c ? "" : c)}>{CATEGORY_EMOJIS[c]} {c}</Pill>)}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Status</div>
          <div style={{ display: "flex", gap: 6 }}>
            <Pill active={!statusFilter} onClick={() => setStatusFilter("")}>All</Pill>
            {STATUSES.map(s => <Pill key={s} active={statusFilter === s} onClick={() => setStatusFilter(statusFilter === s ? "" : s)}>{s === "new" ? "✨ New" : s === "in-use" ? "💫 In Use" : "✅ Finished"}</Pill>)}
          </div>
        </Card>
      )}

      {/* Product Cards */}
      {filtered.length === 0 ? (
        <EmptyState icon={Icons.Package} title="No products found" subtitle={search || catFilter || statusFilter ? "Try adjusting your filters" : "Add your first beauty product!"}
          action={!search && !catFilter && !statusFilter && <Btn onClick={() => navigate("add-product")}>Add Product</Btn>} />
      ) : filtered.map(p => (
        <Card key={p.id} onClick={() => navigate("product-detail", p)} style={{ display: "flex", alignItems: "center", gap: 14, padding: 14, marginBottom: 10, cursor: "pointer" }}>
          <ProductImage uri={p.imageUri} size={64} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</span>
            </div>
            <div style={{ fontSize: 12, color: colors.textLight, marginBottom: 4 }}>{p.brand}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <Badge bg={colors.cream} color={colors.textLight}>{CATEGORY_EMOJIS[p.category] || "📦"} {p.category}</Badge>
              <Badge bg={p.status === "new" ? "#E8F5E9" : p.status === "in-use" ? "#FFF3E0" : "#E3F2FD"} color={p.status === "new" ? "#2E7D32" : p.status === "in-use" ? "#E65100" : "#1565C0"}>
                {p.status === "new" ? "New" : p.status === "in-use" ? "In Use" : "Finished"}
              </Badge>
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            {p.rating > 0 && <div style={{ fontSize: 20, fontWeight: 700, color: colors.roseDark }}>{p.rating}</div>}
            {p.rating > 0 && <div style={{ fontSize: 10, color: colors.textLight }}>/10</div>}
            {p.finalPrice > 0 && <div style={{ fontSize: 12, color: colors.textLight, marginTop: 2 }}>{fmtCurrency(p.finalPrice)}</div>}
          </div>
        </Card>
      ))}
    </div>
  );
};

// ─── Image resize helper ─────────────────────────────────────────────
function resizeImageToDataURL(file, maxDimension = 800, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("FileReader failed"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Image load failed"));
      img.onload = () => {
        let { width, height } = img;
        if (width > height) {
          if (width > maxDimension) { height = Math.round(height * maxDimension / width); width = maxDimension; }
        } else {
          if (height > maxDimension) { width = Math.round(width * maxDimension / height); height = maxDimension; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ─── SCREEN: Add / Edit Product ─────────────────────────────────────
const AddEditProductScreen = ({ navigate, editProduct, prefill }) => {
  const { dispatch } = useContext(AppContext);
  const isEdit = !!editProduct;
  const initial = editProduct || prefill || {
    name: "", brand: "", category: "", imageUri: "", purchaseLocation: "",
    originalPrice: "", discountDescription: "", finalPrice: "",
    status: "new", rating: 0, wouldRepurchase: "", thoughts: [],
  };
  const [form, setForm] = useState(initial);
  const [newThought, setNewThought] = useState({ type: "first-impression", text: "" });
  const [section, setSection] = useState(0);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const fileInputRef = useRef(null);
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    try {
      const dataUrl = await resizeImageToDataURL(file);
      set("imageUri", dataUrl);
    } catch (err) {
      console.error("Photo processing failed:", err);
    }
  };

  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState(null);

  const handleAnalyze = async () => {
    const apiKey = localStorage.getItem("the-beauty-edit-api-key");
    if (!apiKey) { setAnalyzeError("Add your Anthropic API key in Settings first."); return; }
    if (!form.imageUri) return;
    setAnalyzing(true);
    setAnalyzeError(null);
    try {
      const base64 = form.imageUri.replace(/^data:image\/\w+;base64,/, "");
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 256,
          messages: [{ role: "user", content: [
            { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64 } },
            { type: "text", text: `This is a beauty/skincare product. Extract details and return JSON only (no markdown): {"name":"full product name","brand":"brand name","category":"one of: Skincare, Makeup, Haircare, Body Care, Fragrance, Tools & Accessories, Other"}. Leave a field as empty string if not visible.` },
          ]}],
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `API error ${res.status}`);
      }
      const data = await res.json();
      const raw = data.content?.[0]?.text || "{}";
      // Strip markdown code fences if Claude wraps the JSON
      const clean = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
      const extracted = JSON.parse(clean);
      if (extracted.name) set("name", extracted.name);
      if (extracted.brand) set("brand", extracted.brand);
      if (extracted.category && CATEGORIES.includes(extracted.category)) set("category", extracted.category);
    } catch (err) {
      console.error("Analyze error:", err);
      setAnalyzeError(err.message.includes("api_key") || err.message.includes("API key") ? "Invalid API key. Check Settings." : "Couldn't analyze photo. Try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const save = () => {
    if (!form.name.trim()) return;
    const entry = {
      ...form,
      id: form.id || uid(),
      originalPrice: parseFloat(form.originalPrice) || 0,
      finalPrice: parseFloat(form.finalPrice) || 0,
      createdAt: form.createdAt || now(),
      updatedAt: now(),
    };
    dispatch({ type: isEdit ? "UPDATE_PRODUCT" : "ADD_PRODUCT", payload: entry });
    navigate("back");
  };

  const addThought = () => {
    if (!newThought.text.trim()) return;
    const thought = { id: uid(), date: now(), type: newThought.type, text: newThought.text };
    set("thoughts", [...(form.thoughts || []), thought]);
    setNewThought({ type: "first-impression", text: "" });
  };

  const removeThought = (id) => set("thoughts", form.thoughts.filter(t => t.id !== id));

  const sections = ["Product Info", "Purchase Details", "My Thoughts"];

  return (
    <div style={{ padding: "20px 20px 100px" }}>
      <BackHeader title={isEdit ? "Edit Product" : "New Product"} onBack={() => navigate("back")}
        right={<Btn variant="ghost" onClick={save} style={{ padding: "6px 12px", fontSize: 14 }}>Save</Btn>} />

      {/* Section Tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 24, background: colors.cream, borderRadius: 14, padding: 3 }}>
        {sections.map((s, i) => (
          <button key={s} onClick={() => setSection(i)} style={{
            flex: 1, padding: "10px 8px", borderRadius: 12, border: "none", cursor: "pointer",
            background: section === i ? colors.white : "transparent", color: section === i ? colors.roseDark : colors.textLight,
            fontSize: 13, fontWeight: section === i ? 600 : 400, transition: "all 0.2s", boxShadow: section === i ? colors.shadow : "none", fontFamily: "inherit",
          }}>{s}</button>
        ))}
      </div>

      {/* Section 1: Product Info */}
      {section === 0 && (
        <div>
          <Input label="Product Name *" value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Watermelon Glow Moisturizer" />
          <Input label="Brand" value={form.brand} onChange={e => set("brand", e.target.value)} placeholder="e.g. Glow Recipe" />
          <Select label="Category" options={CATEGORIES} value={form.category} onChange={e => set("category", e.target.value)} />
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: colors.textLight, marginBottom: 6 }}>Photo</label>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
            {form.imageUri ? (
              <>
                <div style={{ position: "relative", width: "100%", height: 200, borderRadius: 14, overflow: "hidden" }}>
                  <img src={form.imageUri} alt="Product photo" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <button onClick={() => fileInputRef.current?.click()}
                    style={{ position: "absolute", inset: 0, width: "100%", background: "transparent", border: "none", cursor: "pointer" }}
                    aria-label="Change photo" />
                  <button onClick={() => set("imageUri", "")}
                    style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: 16,
                      background: "rgba(0,0,0,0.55)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    aria-label="Remove photo">
                    <Icons.X style={{ width: 16, height: 16, color: "#fff" }} />
                  </button>
                </div>
                <div style={{ marginTop: 10 }}>
                  <Btn onClick={handleAnalyze} disabled={analyzing} variant="secondary"
                    style={{ width: "100%", fontSize: 14, padding: "10px 16px", opacity: analyzing ? 0.7 : 1 }}>
                    <Icons.Sparkles style={{ width: 16, height: 16 }} />
                    {analyzing ? "Analyzing…" : "Analyze Photo"}
                  </Btn>
                  {analyzeError && <p style={{ fontSize: 12, color: "#C0392B", marginTop: 6, textAlign: "center" }}>{analyzeError}</p>}
                </div>
              </>
            ) : (
              <div onClick={() => fileInputRef.current?.click()}
                style={{ width: "100%", height: 140, borderRadius: 14, border: `2px dashed ${colors.border}`, background: colors.cream,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Icons.Camera style={{ width: 32, height: 32, color: colors.rose, marginBottom: 8 }} />
                <span style={{ fontSize: 13, color: colors.textLight }}>Tap to add a photo</span>
              </div>
            )}
          </div>
          <Btn onClick={() => setSection(1)} style={{ width: "100%" }}>Next: Purchase Details →</Btn>
        </div>
      )}

      {/* Section 2: Purchase Details */}
      {section === 1 && (
        <div>
          <Input label="Where bought" value={form.purchaseLocation} onChange={e => set("purchaseLocation", e.target.value)} placeholder="e.g. Sephora, Ulta, Amazon" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Original Price" type="number" value={form.originalPrice} onChange={e => set("originalPrice", e.target.value)} placeholder="$0.00" />
            <Input label="Final Price" type="number" value={form.finalPrice} onChange={e => set("finalPrice", e.target.value)} placeholder="$0.00" />
          </div>
          <Input label="Discount / Coupon" value={form.discountDescription} onChange={e => set("discountDescription", e.target.value)} placeholder="e.g. 20% off with code GLOW" />
          <div style={{ display: "flex", gap: 12 }}>
            <Btn variant="secondary" onClick={() => setSection(0)} style={{ flex: 1 }}>← Back</Btn>
            <Btn onClick={() => setSection(2)} style={{ flex: 2 }}>Next: My Thoughts →</Btn>
          </div>
        </div>
      )}

      {/* Section 3: My Thoughts */}
      {section === 2 && (
        <div>
          <StatusSelector value={form.status} onChange={v => set("status", v)} />
          <RatingSlider value={form.rating} onChange={v => set("rating", v)} />
          <RepurchaseSelector value={form.wouldRepurchase} onChange={v => set("wouldRepurchase", v)} />

          <div style={{ height: 1, background: colors.border, margin: "20px 0" }} />

          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, margin: "0 0 12px" }}>Thought Journal</h3>

          {/* Existing thoughts */}
          {(form.thoughts || []).map(t => (
            <Card key={t.id} style={{ padding: 12, marginBottom: 8, position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <Badge>{t.type === "first-impression" ? "💭 First Impression" : t.type === "during-use" ? "💫 During Use" : "✅ Final Verdict"}</Badge>
                <button onClick={() => removeThought(t.id)} style={{ background: "none", border: "none", cursor: "pointer", color: colors.textLight, padding: 2 }}>
                  <Icons.X style={{ width: 14, height: 14 }} />
                </button>
              </div>
              <div style={{ fontSize: 13, color: colors.text, lineHeight: 1.5 }}>{t.text}</div>
              <div style={{ fontSize: 11, color: colors.textLight, marginTop: 4 }}>{fmtDate(t.date)}</div>
            </Card>
          ))}

          {/* Add thought */}
          <Card style={{ padding: 14, marginBottom: 16, background: colors.cream }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
              {THOUGHT_TYPES.map(t => (
                <Pill key={t} active={newThought.type === t} onClick={() => setNewThought(n => ({ ...n, type: t }))}>
                  {t === "first-impression" ? "💭 First Impression" : t === "during-use" ? "💫 During Use" : "✅ Final Verdict"}
                </Pill>
              ))}
            </div>
            <textarea value={newThought.text} onChange={e => setNewThought(n => ({ ...n, text: e.target.value }))}
              placeholder="Write your thoughts..." style={{
                width: "100%", padding: 12, borderRadius: 12, border: `1.5px solid ${colors.border}`, background: colors.white,
                fontSize: 14, color: colors.text, outline: "none", boxSizing: "border-box", minHeight: 70, resize: "vertical", fontFamily: "inherit",
              }} />
            <Btn variant="secondary" onClick={addThought} style={{ marginTop: 10, width: "100%" }}>+ Add Thought</Btn>
          </Card>

          <div style={{ display: "flex", gap: 12 }}>
            <Btn variant="secondary" onClick={() => setSection(1)} style={{ flex: 1 }}>← Back</Btn>
            <Btn onClick={save} style={{ flex: 2 }}>
              {isEdit ? "Save Changes" : "Save Product"} 🌸
            </Btn>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── SCREEN: Product Detail ─────────────────────────────────────────
const ProductDetailScreen = ({ product, navigate }) => {
  const { dispatch } = useContext(AppContext);
  if (!product) return null;
  const p = product;
  const saved = p.originalPrice && p.finalPrice ? p.originalPrice - p.finalPrice : 0;
  const thoughts = [...(p.thoughts || [])].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ padding: "20px 20px 100px" }}>
      <BackHeader title="" onBack={() => navigate("back")}
        right={
          <button onClick={() => navigate("edit-product", p)} style={{ background: "none", border: "none", cursor: "pointer", color: colors.roseDark, display: "flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 500 }}>
            <Icons.Edit style={{ width: 16, height: 16 }} /> Edit
          </button>
        } />

      {/* Hero */}
      <ProductImage uri={p.imageUri} size="100%" style={{ height: 200, borderRadius: 20, marginBottom: 20 }} />

      {/* Name & Brand */}
      <h1 style={{ fontSize: 24, fontWeight: 300, color: colors.text, margin: "0 0 4px", letterSpacing: -0.5 }}>{p.name}</h1>
      <div style={{ fontSize: 15, color: colors.textLight, marginBottom: 12 }}>{p.brand}</div>

      {/* Badges */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        <Badge>{CATEGORY_EMOJIS[p.category] || "📦"} {p.category}</Badge>
        <Badge bg={p.status === "new" ? "#E8F5E9" : p.status === "in-use" ? "#FFF3E0" : "#E3F2FD"} color={p.status === "new" ? "#2E7D32" : p.status === "in-use" ? "#E65100" : "#1565C0"}>
          {p.status === "new" ? "✨ New" : p.status === "in-use" ? "💫 In Use" : "✅ Finished"}
        </Badge>
        {p.wouldRepurchase && <Badge bg={p.wouldRepurchase === "yes" ? "#E8F5E9" : p.wouldRepurchase === "no" ? "#FFEBEE" : "#FFF3E0"} color={p.wouldRepurchase === "yes" ? "#2E7D32" : p.wouldRepurchase === "no" ? "#C62828" : "#E65100"}>
          {p.wouldRepurchase === "yes" ? "💕 Would Repurchase" : p.wouldRepurchase === "no" ? "👎 Won't Repurchase" : "🤔 Maybe Repurchase"}
        </Badge>}
      </div>

      {/* Rating */}
      {p.rating > 0 && (
        <Card style={{ textAlign: "center", padding: 20, marginBottom: 16, background: `linear-gradient(135deg, ${colors.rosePale}, ${colors.cream})` }}>
          <div style={{ fontSize: 48, fontWeight: 200, color: colors.roseDark }}>{p.rating}</div>
          <div style={{ fontSize: 13, color: colors.textLight }}>/10 rating</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 8 }}>
            {[...Array(10)].map((_, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: 4, background: i < p.rating ? colors.rose : colors.border }} />
            ))}
          </div>
        </Card>
      )}

      {/* Purchase Info */}
      {(p.purchaseLocation || p.finalPrice > 0) && (
        <Card style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: colors.textLight, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 0.5 }}>Purchase Details</h3>
          {p.purchaseLocation && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>Where</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: colors.text }}>{p.purchaseLocation}</span>
          </div>}
          {p.originalPrice > 0 && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>Original Price</span>
            <span style={{ fontSize: 14, color: colors.textLight, textDecoration: saved > 0 ? "line-through" : "none" }}>{fmtCurrency(p.originalPrice)}</span>
          </div>}
          {p.discountDescription && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>Discount</span>
            <span style={{ fontSize: 14, color: "#2E7D32" }}>{p.discountDescription}</span>
          </div>}
          {p.finalPrice > 0 && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>Paid</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: colors.roseDark }}>{fmtCurrency(p.finalPrice)}</span>
          </div>}
          {saved > 0 && <div style={{ textAlign: "right", fontSize: 12, color: "#2E7D32", fontWeight: 500 }}>You saved {fmtCurrency(saved)}!</div>}
        </Card>
      )}

      {/* Thought Timeline */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: colors.textLight, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 0.5 }}>My Beauty Diary</h3>
        {thoughts.length === 0 ? (
          <Card style={{ textAlign: "center", padding: 24, color: colors.textLight }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📝</div>
            <div style={{ fontSize: 14 }}>No thoughts yet — tap Edit to start your journal</div>
          </Card>
        ) : thoughts.map((t, i) => (
          <div key={t.id} style={{ display: "flex", gap: 12, marginBottom: i < thoughts.length - 1 ? 0 : 0 }}>
            {/* Timeline line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: colors.rose, flexShrink: 0, marginTop: 6 }} />
              {i < thoughts.length - 1 && <div style={{ width: 2, flex: 1, background: colors.border, minHeight: 20 }} />}
            </div>
            <Card style={{ flex: 1, padding: 14, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <Badge>{t.type === "first-impression" ? "💭 First Impression" : t.type === "during-use" ? "💫 During Use" : "✅ Final Verdict"}</Badge>
                <span style={{ fontSize: 11, color: colors.textLight }}>{fmtDate(t.date)}</span>
              </div>
              <div style={{ fontSize: 14, color: colors.text, lineHeight: 1.6 }}>{t.text}</div>
            </Card>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, color: colors.textLight, textAlign: "center" }}>
        Added {fmtDate(p.createdAt)} · Updated {fmtDate(p.updatedAt)}
      </div>
    </div>
  );
};

// ─── SCREEN: Wishlist ───────────────────────────────────────────────
const WishlistScreen = ({ navigate }) => {
  const { state, dispatch } = useContext(AppContext);
  const { wishlist } = state;

  const promote = (item) => {
    dispatch({ type: "PROMOTE_WISHLIST", payload: item.id });
    navigate("add-product", null, { name: item.name, brand: item.brand, category: item.category });
  };

  const priorityColors = { high: { bg: "#FFEBEE", color: "#C62828" }, medium: { bg: "#FFF3E0", color: "#E65100" }, low: { bg: "#E8F5E9", color: "#2E7D32" } };

  return (
    <div style={{ padding: "20px 20px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 300, color: colors.text, margin: 0, letterSpacing: -0.5 }}>The Favorites Edit</h1>
          <p style={{ fontSize: 13, color: colors.textLight, margin: "4px 0 0", fontStyle: "italic" }}>Products you're dreaming about</p>
        </div>
        <Btn onClick={() => navigate("add-wishlist")} style={{ padding: "10px 16px", fontSize: 13 }}>+ Add</Btn>
      </div>

      {wishlist.length === 0 ? (
        <EmptyState icon={Icons.Heart} title="Your wishlist is empty" subtitle="Start adding products you want to try!"
          action={<Btn onClick={() => navigate("add-wishlist")}>Add to Wishlist</Btn>} />
      ) : wishlist.map(w => (
        <Card key={w.id} style={{ marginBottom: 12, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: colors.text }}>{w.name}</div>
              <div style={{ fontSize: 13, color: colors.textLight }}>{w.brand}</div>
            </div>
            <Badge bg={priorityColors[w.priority]?.bg} color={priorityColors[w.priority]?.color}>
              {w.priority}
            </Badge>
          </div>
          {w.reasonForInterest && <div style={{ fontSize: 13, color: colors.text, lineHeight: 1.5, marginBottom: 8, fontStyle: "italic" }}>"{w.reasonForInterest}"</div>}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            {w.category && <Badge bg={colors.cream} color={colors.textLight}>{CATEGORY_EMOJIS[w.category]} {w.category}</Badge>}
            {w.estimatedPrice > 0 && <Badge bg={colors.cream} color={colors.textLight}>~{fmtCurrency(w.estimatedPrice)}</Badge>}
            {w.source && <Badge bg={colors.cream} color={colors.textLight}>via {w.source}</Badge>}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="primary" onClick={() => promote(w)} style={{ flex: 1, padding: "8px 12px", fontSize: 13 }}>
              Promote to Journal ✨
            </Btn>
            <Btn variant="secondary" onClick={() => navigate("edit-wishlist", w)} style={{ padding: "8px 12px", fontSize: 13 }}>Edit</Btn>
            <button onClick={() => dispatch({ type: "DELETE_WISHLIST", payload: w.id })}
              style={{ background: "none", border: `1.5px solid ${colors.border}`, borderRadius: 12, padding: "8px 12px", cursor: "pointer", color: colors.textLight }}>
              <Icons.Trash style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

// ─── SCREEN: Add / Edit Wishlist ────────────────────────────────────
const AddEditWishlistScreen = ({ navigate, editItem }) => {
  const { dispatch } = useContext(AppContext);
  const isEdit = !!editItem;
  const [form, setForm] = useState(editItem || {
    name: "", brand: "", category: "", reasonForInterest: "", estimatedPrice: "", source: "", priority: "medium",
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.name.trim()) return;
    const entry = {
      ...form,
      id: form.id || uid(),
      estimatedPrice: parseFloat(form.estimatedPrice) || 0,
      createdAt: form.createdAt || now(),
    };
    dispatch({ type: isEdit ? "UPDATE_WISHLIST" : "ADD_WISHLIST", payload: entry });
    navigate("back");
  };

  return (
    <div style={{ padding: "20px 20px 100px" }}>
      <BackHeader title={isEdit ? "Edit Wishlist Item" : "Add to Wishlist"} onBack={() => navigate("back")} />

      <Input label="Product Name *" value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Drunk Elephant Protini" />
      <Input label="Brand" value={form.brand} onChange={e => set("brand", e.target.value)} placeholder="e.g. Drunk Elephant" />
      <Select label="Category" options={CATEGORIES} value={form.category} onChange={e => set("category", e.target.value)} />
      <TextArea label="Why are you interested?" value={form.reasonForInterest} onChange={e => set("reasonForInterest", e.target.value)} placeholder="What caught your eye about this product?" />
      <Input label="Estimated Price" type="number" value={form.estimatedPrice} onChange={e => set("estimatedPrice", e.target.value)} placeholder="$0.00" />
      <Input label="Where did you hear about it?" value={form.source} onChange={e => set("source", e.target.value)} placeholder="e.g. TikTok, friend recommendation, Sephora" />

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: colors.textLight, marginBottom: 8 }}>Priority</label>
        <div style={{ display: "flex", gap: 8 }}>
          {PRIORITIES.map(p => (
            <Pill key={p} active={form.priority === p} onClick={() => set("priority", p)}>
              {p === "high" ? "🔥 High" : p === "medium" ? "💫 Medium" : "🌿 Low"}
            </Pill>
          ))}
        </div>
      </div>

      <Btn onClick={save} style={{ width: "100%", padding: "14px 24px" }}>
        {isEdit ? "Save Changes" : "Add to Wishlist"} 💕
      </Btn>
    </div>
  );
};

// ─── SCREEN: Stats ──────────────────────────────────────────────────
const StatsScreen = () => {
  const { state } = useContext(AppContext);
  const { products } = state;

  const totalProducts = products.length;
  const ratedProducts = products.filter(p => p.rating > 0);
  const totalSpent = products.reduce((s, p) => s + (p.finalPrice || 0), 0);
  const totalOriginal = products.reduce((s, p) => s + (p.originalPrice || 0), 0);
  const totalSaved = totalOriginal - totalSpent;
  const avgRating = ratedProducts.length ? (ratedProducts.reduce((s, p) => s + p.rating, 0) / ratedProducts.length).toFixed(1) : "—";
  const repurchaseYes = products.filter(p => p.wouldRepurchase === "yes").length;
  const repurchaseRate = totalProducts ? Math.round((repurchaseYes / totalProducts) * 100) : 0;

  // Category breakdown
  const byCategory = {};
  products.forEach(p => {
    if (!byCategory[p.category]) byCategory[p.category] = { count: 0, spent: 0, ratings: [] };
    byCategory[p.category].count++;
    byCategory[p.category].spent += p.finalPrice || 0;
    if (p.rating > 0) byCategory[p.category].ratings.push(p.rating);
  });

  // Top brands
  const byBrand = {};
  products.forEach(p => {
    if (!p.brand) return;
    byBrand[p.brand] = (byBrand[p.brand] || 0) + 1;
  });
  const topBrands = Object.entries(byBrand).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const maxSpent = Math.max(...Object.values(byCategory).map(c => c.spent), 1);

  return (
    <div style={{ padding: "20px 20px 100px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 300, color: colors.text, margin: "0 0 6px", letterSpacing: -0.5 }}>Beauty Stats</h1>
      <p style={{ fontSize: 13, color: colors.textLight, margin: "0 0 20px", fontStyle: "italic" }}>Your beauty journey at a glance</p>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Products Reviewed", value: totalProducts, emoji: "📦" },
          { label: "Average Rating", value: avgRating, emoji: "⭐" },
          { label: "Total Spent", value: fmtCurrency(totalSpent), emoji: "💰" },
          { label: "Total Saved", value: fmtCurrency(totalSaved > 0 ? totalSaved : 0), emoji: "🎉" },
        ].map(s => (
          <Card key={s.label} style={{ padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{s.emoji}</div>
            <div style={{ fontSize: 22, fontWeight: 600, color: colors.text }}>{s.value}</div>
            <div style={{ fontSize: 12, color: colors.textLight, marginTop: 2 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Repurchase Rate */}
      <Card style={{ marginBottom: 16, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: 0 }}>Repurchase Rate</h3>
          <span style={{ fontSize: 24, fontWeight: 600, color: colors.roseDark }}>{repurchaseRate}%</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: colors.cream, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${repurchaseRate}%`, borderRadius: 4, background: `linear-gradient(90deg, ${colors.rose}, ${colors.roseDark})`, transition: "width 0.5s" }} />
        </div>
        <div style={{ fontSize: 12, color: colors.textLight, marginTop: 6 }}>
          {repurchaseYes} of {totalProducts} products you'd buy again
        </div>
      </Card>

      {/* Category Breakdown */}
      <Card style={{ marginBottom: 16, padding: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: "0 0 16px" }}>Spending by Category</h3>
        {Object.entries(byCategory).length === 0 ? (
          <div style={{ textAlign: "center", color: colors.textLight, fontSize: 13, padding: 16 }}>No data yet</div>
        ) : Object.entries(byCategory).sort((a, b) => b[1].spent - a[1].spent).map(([cat, data]) => (
          <div key={cat} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: colors.text }}>{CATEGORY_EMOJIS[cat]} {cat} ({data.count})</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: colors.roseDark }}>{fmtCurrency(data.spent)}</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: colors.cream, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(data.spent / maxSpent) * 100}%`, borderRadius: 3, background: `linear-gradient(90deg, ${colors.roseLight}, ${colors.rose})`, transition: "width 0.5s" }} />
            </div>
            {data.ratings.length > 0 && <div style={{ fontSize: 11, color: colors.textLight, marginTop: 2 }}>
              Avg rating: {(data.ratings.reduce((a, b) => a + b, 0) / data.ratings.length).toFixed(1)}/10
            </div>}
          </div>
        ))}
      </Card>

      {/* Top Brands */}
      <Card style={{ padding: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: "0 0 14px" }}>Top Brands</h3>
        {topBrands.length === 0 ? (
          <div style={{ textAlign: "center", color: colors.textLight, fontSize: 13, padding: 16 }}>No data yet</div>
        ) : topBrands.map(([brand, count], i) => (
          <div key={brand} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              background: i === 0 ? colors.rosePale : colors.cream, fontSize: 13, fontWeight: 600, color: i === 0 ? colors.roseDark : colors.textLight,
            }}>{i + 1}</div>
            <span style={{ flex: 1, fontSize: 14, color: colors.text }}>{brand}</span>
            <Badge>{count} product{count > 1 ? "s" : ""}</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
};

// ─── SCREEN: Settings ───────────────────────────────────────────────
const SettingsScreen = ({ navigate }) => {
  const saved = localStorage.getItem("the-beauty-edit-api-key") || "";
  const [apiKey, setApiKey] = useState(saved);
  const [showKey, setShowKey] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSave = () => {
    const trimmed = apiKey.trim();
    if (trimmed) { localStorage.setItem("the-beauty-edit-api-key", trimmed); setStatus("saved"); }
  };

  const handleClear = () => {
    localStorage.removeItem("the-beauty-edit-api-key");
    setApiKey("");
    setStatus("cleared");
  };

  return (
    <div style={{ padding: "20px 20px 100px" }}>
      <BackHeader title="Settings" onBack={() => navigate("back")} />
      <div style={{ background: colors.white, borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: colors.shadow }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: "0 0 6px" }}>Anthropic API Key</p>
        <p style={{ fontSize: 13, color: colors.textLight, margin: "0 0 16px", lineHeight: 1.6 }}>
          Used to analyze product photos and auto-fill details. Stored only on this device. Get a key at anthropic.com/api.
        </p>
        <div style={{ position: "relative", marginBottom: 12 }}>
          <input
            type={showKey ? "text" : "password"}
            value={apiKey}
            onChange={e => { setApiKey(e.target.value); setStatus(null); }}
            placeholder="sk-ant-..."
            style={{
              width: "100%", padding: "12px 52px 12px 14px", borderRadius: 12,
              border: `1.5px solid ${colors.border}`, fontSize: 14, fontFamily: "inherit",
              background: colors.cream, color: colors.text, boxSizing: "border-box",
            }}
          />
          <button onClick={() => setShowKey(v => !v)} style={{
            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", cursor: "pointer", color: colors.textLight, fontSize: 12, fontFamily: "inherit",
          }}>{showKey ? "Hide" : "Show"}</button>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn onClick={handleSave} style={{ flex: 1 }}>Save Key</Btn>
          {saved && <Btn variant="secondary" onClick={handleClear} style={{ flex: 1 }}>Clear</Btn>}
        </div>
        {status === "saved" && <p style={{ fontSize: 13, color: "#2D7A3A", marginTop: 10, textAlign: "center" }}>✓ API key saved</p>}
        {status === "cleared" && <p style={{ fontSize: 13, color: colors.textLight, marginTop: 10, textAlign: "center" }}>Key removed</p>}
      </div>
    </div>
  );
};

// ─── Storage Helpers ────────────────────────────────────────────────
const STORAGE_KEY = "the-beauty-edit-data";

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { products: parsed.products || [], wishlist: parsed.wishlist || [], onboarded: parsed.onboarded || false };
    }
  } catch (e) {
    console.warn("Failed to load saved data:", e);
  }
  return { products: SAMPLE_PRODUCTS, wishlist: SAMPLE_WISHLIST, onboarded: false };
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (e) {
    // Quota exceeded — strip images and retry so text data is always saved
    try {
      const stripped = {
        ...state,
        products: state.products.map(p => ({ ...p, imageUri: "" })),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stripped));
      return "images_dropped";
    } catch (e2) {
      console.warn("Failed to save data:", e2);
      return false;
    }
  }
}

// ─── MAIN APP ───────────────────────────────────────────────────────
export default function TheBeautyEdit() {
  const [state, dispatch] = useReducer(appReducer, null, loadState);
  const [storageWarning, setStorageWarning] = useState(false);

  // Persist state on every change
  useEffect(() => {
    const result = saveState(state);
    if (result === "images_dropped") setStorageWarning(true);
    else if (result === true) setStorageWarning(false);
  }, [state]);

  const [navStack, setNavStack] = useState([{ screen: "home", data: null }]);
  const [activeTab, setActiveTab] = useState("home");

  const current = navStack[navStack.length - 1];

  const navigate = useCallback((screen, data = null, extra = null) => {
    if (screen === "back") {
      setNavStack(s => s.length > 1 ? s.slice(0, -1) : s);
      return;
    }
    // Tab screens reset the stack
    if (["home", "products", "wishlist", "stats"].includes(screen)) {
      setActiveTab(screen);
      setNavStack([{ screen, data }]);
    } else if (screen === "add-product") {
      setNavStack(s => [...s, { screen, data, extra }]);
    } else {
      setNavStack(s => [...s, { screen, data }]);
    }
  }, []);

  if (!state.onboarded) return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: colors.cream, minHeight: "100vh" }}>
        <OnboardingScreen />
      </div>
    </AppContext.Provider>
  );

  const renderScreen = () => {
    switch (current.screen) {
      case "home": return <HomeScreen navigate={navigate} />;
      case "products": return <ProductListScreen navigate={navigate} />;
      case "add-product": return <AddEditProductScreen navigate={navigate} prefill={current.extra} />;
      case "edit-product": return <AddEditProductScreen navigate={navigate} editProduct={current.data} />;
      case "product-detail": return <ProductDetailScreen product={current.data} navigate={navigate} />;
      case "wishlist": return <WishlistScreen navigate={navigate} />;
      case "add-wishlist": return <AddEditWishlistScreen navigate={navigate} />;
      case "edit-wishlist": return <AddEditWishlistScreen navigate={navigate} editItem={current.data} />;
      case "stats": return <StatsScreen />;
      case "settings": return <SettingsScreen navigate={navigate} />;
      default: return <HomeScreen navigate={navigate} />;
    }
  };

  const tabs = [
    { key: "home", label: "Home", icon: Icons.Home },
    { key: "products", label: "Products", icon: Icons.Package },
    { key: "add", label: "", icon: Icons.Plus },
    { key: "wishlist", label: "Wishlist", icon: Icons.Heart },
    { key: "stats", label: "Stats", icon: Icons.BarChart },
  ];

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: colors.cream, minHeight: "100vh", maxWidth: 480, margin: "0 auto", position: "relative" }}>
        {storageWarning && (
          <div style={{
            position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "100%", maxWidth: 480, zIndex: 200,
            background: "#FFF3CD", borderBottom: "1px solid #FFEAA7",
            padding: "10px 16px", display: "flex", alignItems: "center", gap: 10,
            fontSize: 13, color: "#856404",
          }}>
            <span style={{ flex: 1 }}>Storage full — photos won't be saved until space is freed. All other data is safe.</span>
            <button onClick={() => setStorageWarning(false)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#856404" }}>
              <Icons.X style={{ width: 16, height: 16 }} />
            </button>
          </div>
        )}
        {/* Screen Content */}
        <div style={{ paddingBottom: 0 }}>
          {renderScreen()}
        </div>

        {/* Bottom Tab Bar */}
        <div style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480,
          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", borderTop: `1px solid ${colors.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-around", padding: "8px 0 20px", zIndex: 100,
        }}>
          {tabs.map(tab => {
            const isAdd = tab.key === "add";
            const isActive = activeTab === tab.key;
            const Icon = tab.icon;
            return (
              <button key={tab.key} onClick={() => {
                if (isAdd) navigate("add-product");
                else navigate(tab.key);
              }} style={{
                background: isAdd ? `linear-gradient(135deg, ${colors.rose}, ${colors.roseDark})` : "none",
                border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center",
                gap: 2, padding: isAdd ? 0 : "4px 12px", borderRadius: isAdd ? 16 : 0,
                width: isAdd ? 48 : "auto", height: isAdd ? 48 : "auto", justifyContent: "center",
                marginTop: isAdd ? -16 : 0, boxShadow: isAdd ? colors.shadowMd : "none",
              }}>
                <Icon style={{ width: isAdd ? 24 : 22, height: isAdd ? 24 : 22, color: isAdd ? "#fff" : isActive ? colors.roseDark : colors.textLight }} />
                {!isAdd && <span style={{ fontSize: 10, color: isActive ? colors.roseDark : colors.textLight, fontWeight: isActive ? 600 : 400 }}>{tab.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </AppContext.Provider>
  );
}
