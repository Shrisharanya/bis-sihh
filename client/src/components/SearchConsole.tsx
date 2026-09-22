import { ArrowUpRight, Command, Search, Sparkles } from "lucide-react";
import type { Language } from "../types";
import { getQuickQueries, queryScope, queryLabel, searchPlaceholder, chipLabel, commandKey, queryRoutingCopy, actionLabel } from "../types";

interface SearchConsoleProps {
  query: string;
  setQuery: (value: string) => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function SearchConsole({ query, setQuery, language, onLanguageChange, onSearch, loading }: SearchConsoleProps) {
  const quickQueries = getQuickQueries(language);
  return <section className="search-console panel-grid-lines">
    <div className="section-kicker"><span className="kicker-dot" /> {queryLabel()} <span className="kicker-divider" /> {queryRoutingCopy()}</div>
    <div className="search-title-row">
      <div><h1>Find the standard<br /><em>before you write the clause.</em></h1><p>{queryScope()}</p></div>
      <div className="search-status-chip"><Sparkles size={14} /> {language === "hi" ? "हिन्दी + English" : "Bilingual intent routing"}</div>
    </div>
    <div className="command-shell">
      <Search size={20} className="command-search-icon" />
      <input aria-label={searchPlaceholder(language)} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") onSearch(); }} placeholder={searchPlaceholder(language)} />
      <div className="command-actions"><span className="command-hint"><Command size={12} /> {commandKey()}</span><button className="primary-button command-button" onClick={onSearch} disabled={loading}>{loading ? "ROUTING…" : actionLabel()} <ArrowUpRight size={15} /></button></div>
    </div>
    <div className="quick-row"><span className="quick-label">QUICK ROUTES</span>{quickQueries.map((item, index) => <button key={item.label} className="quick-chip" onClick={() => { setQuery(item.query); onLanguageChange(language); }}><span>{chipLabel(item)}</span><small>⌥{index + 1}</small></button>)}</div>
  </section>;
}
