import { Activity, BookOpenCheck, FileSearch, GitBranch, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import type { ActiveView, ApiState, Language } from "../types";
import { liveSyncCopy, brandTitle, brandSubtitle, productScope, navItems, navAria, activeLanguageCopy } from "../types";

interface TopNavProps {
  view: ActiveView;
  setView: (view: ActiveView) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  api: ApiState;
}

const icons = { search: BookOpenCheck, audit: FileSearch, graph: GitBranch, workspace: UserRound };

export default function TopNav({ view, setView, language, setLanguage, api }: TopNavProps) {
  return (
    <header className="top-nav">
      <div className="brand-block">
        <div className="brand-mark"><ShieldCheck size={22} strokeWidth={1.8} /><span>MS</span></div>
        <div className="brand-copy">
          <div className="brand-name">{brandTitle()} <span className="brand-pill">BIS / GOVTECH</span></div>
          <div className="brand-subtitle">{brandSubtitle()} <span className="brand-slash">/</span> {productScope()}</div>
        </div>
      </div>
      <nav className="primary-tabs" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = icons[item.id];
          return <button key={item.id} className={`nav-tab ${view === item.id ? "active" : ""}`} onClick={() => setView(item.id)} aria-label={navAria(item.id)}>
            <span className="tab-index">{item.index}</span><Icon size={16} /><span>{item.label}</span>
          </button>;
        })}
      </nav>
      <div className="nav-status">
        <div className="sync-pill"><span className="live-dot" /> <span>{liveSyncCopy()}</span></div>
        <div className="api-pill"><Activity size={13} /><span>{api.connected ? "API LIVE" : "DEMO MODE"}</span></div>
        <div className="language-toggle" role="group" aria-label="Interface language">
          <button className={language === "en" ? "selected" : ""} onClick={() => setLanguage("en")}>EN</button>
          <button className={language === "hi" ? "selected" : ""} onClick={() => setLanguage("hi")}>हिन्दी</button>
        </div>
        <button className="avatar-button" aria-label="S. Sharma, Executive Engineer, PWD GeM Officer"><span>SS</span><Sparkles size={12} /></button>
      </div>
    </header>
  );
}
