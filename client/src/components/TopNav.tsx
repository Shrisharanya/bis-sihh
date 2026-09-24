import { BookOpenCheck, FileSearch, GitBranch, ShieldCheck, UserRound } from "lucide-react";
import type { ActiveView, Language } from "../types";
import { navItems } from "../types";
import { tx } from "../utils/translations";
interface TopNavProps { view: ActiveView; setView: (view: ActiveView) => void; language: Language; setLanguage: (language: Language) => void; }
const icons = { search: BookOpenCheck, audit: FileSearch, graph: GitBranch, workspace: UserRound };
export default function TopNav({ view, setView, language, setLanguage }: TopNavProps) {
  const labels = { search: tx(language, "search"), audit: tx(language, "audit"), graph: tx(language, "graph"), workspace: tx(language, "workspace") };
  return <header className="top-nav"><div className="brand-block"><div className="brand-mark"><ShieldCheck size={21} strokeWidth={1.8} /></div><div className="brand-copy"><div className="brand-name">{tx(language, "brandTitle")}</div><div className="brand-subtitle">{tx(language, "brandSubtitle")}</div></div></div><nav className="primary-tabs" aria-label="Primary navigation">{navItems.map((item) => { const Icon = icons[item.id]; return <button key={item.id} className={`nav-tab ${view === item.id ? "active" : ""}`} onClick={() => setView(item.id)} aria-label={labels[item.id]}><Icon size={15} /><span>{labels[item.id]}</span></button>; })}</nav><div className="nav-status"><div className="sync-pill"><span className="live-dot" /><span>{tx(language, "gazette")}</span></div><div className="language-toggle" role="group" aria-label="Interface language"><button className={language === "en" ? "selected" : ""} onClick={() => setLanguage("en")}>EN</button><button className={language === "hi" ? "selected" : ""} onClick={() => setLanguage("hi")}>हिन्दी</button></div></div></header>;
}
