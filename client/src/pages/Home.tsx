import { useEffect, useState } from "react";
import { ArrowDownRight, CheckCircle2, Database, FileText, Gauge, LockKeyhole, ShieldCheck, Wifi, Zap } from "lucide-react";
import TopNav from "../components/TopNav";
import SearchConsole from "../components/SearchConsole";
import StandardsDossier from "../components/StandardsDossier";
import AlliedMatrix from "../components/AlliedMatrix";
import ClauseSynthesizer from "../components/ClauseSynthesizer";
import TenderAuditor from "../components/TenderAuditor";
import KnowledgeGraph from "../components/KnowledgeGraph";
import type { ActiveView, ApiState, AuditResponse, Language, StandardResult } from "../types";
import { apiHealth, apiSearch, defaultLanguage, defaultQuery, defaultView, fallbackAudit, fallbackCable, footerDisclaimer, graphNodes, stats, titleForView, apiModeLabel, demoModeCopy, apiConnectedCopy, graphCopyText } from "../types";

function MetricStrip({ standard, api }: { standard: StandardResult; api: ApiState }) {
  const icons = [Database, ShieldCheck, LockKeyhole, Wifi];
  return <section className="metric-strip">{stats.map((stat, index) => { const Icon = icons[index]; return <div className="metric-card" key={stat.label}><div className="metric-top"><span className="metric-icon"><Icon size={15} /></span><span className="metric-note">{index === 3 ? apiModeLabel(api.connected) : "INDEXED"}</span></div><strong className={index === 3 ? "metric-ready" : ""}>{stat.value}</strong><span>{stat.label}</span><small>{index === 1 && standard.qco ? "Current legal order surface" : stat.note}</small></div>; })}</section>;
}

export default function Home() {
  const [view, setView] = useState<ActiveView>(defaultView());
  const [language, setLanguage] = useState<Language>(defaultLanguage());
  const [query, setQuery] = useState(defaultQuery());
  const [standard, setStandard] = useState<StandardResult>(fallbackCable);
  const [matchedOn, setMatchedOn] = useState(["XLPE", "cable", "1.1 kV", "IS 7098"]);
  const [api, setApi] = useState<ApiState>({ connected: false, lastSync: "22 Sep 2026 · 12:28 IST" });
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState<AuditResponse>(fallbackAudit);
  const [corrected, setCorrected] = useState(false);
  const [selectedNode, setSelectedNode] = useState("primary");

  useEffect(() => { void apiHealth().then((connected) => setApi((current) => ({ ...current, connected }))); }, []);

  const runSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const result = await apiSearch(query, language);
    setStandard(result.primary);
    setMatchedOn(result.matchedOn.length ? result.matchedOn : ["BIS", "current reference"]);
    setLoading(false);
  };

  return <div className="app-shell">
    <TopNav view={view} setView={setView} language={language} setLanguage={setLanguage} api={api} />
    <main className="app-main">
      <div className="top-utility"><span><span className="green-pulse" /> {api.connected ? apiConnectedCopy() : demoModeCopy()}</span><span className="utility-divider" /><span className="mono">MS-2026.09</span><span className="utility-spacer" /><span className="mono">22 SEP 2026 / IST</span><span className="utility-divider" /><span>Operator console</span></div>
      {view === "search" && <>
        <SearchConsole query={query} setQuery={setQuery} language={language} onLanguageChange={setLanguage} onSearch={() => void runSearch()} loading={loading} />
        <MetricStrip standard={standard} api={api} />
        <div className="view-label-row"><div><span className="section-number">01</span><span className="view-label">{titleForView(view)}</span></div><span className="mono">{standard.code} / CURRENT SNAPSHOT</span></div>
        <section className="results-grid"><StandardsDossier standard={standard} matchedOn={matchedOn} /><AlliedMatrix standard={standard} /></section>
        <ClauseSynthesizer standard={standard} />
      </>}
      {view === "audit" && <TenderAuditor response={audit} setResponse={setAudit} corrected={corrected} setCorrected={setCorrected} />}
      {view === "graph" && <KnowledgeGraph selectedNode={selectedNode} setSelectedNode={setSelectedNode} />}
      <footer className="app-footer"><div><span className="footer-brand">MANAKSETU</span><span>{footerDisclaimer()}</span></div><div><span className="mono">{view === "search" ? "SEARCH / SOURCE-LOCKED" : view === "audit" ? "AUDIT / DRAFT-SAFE" : "GRAPH / CITATION-LOCKED"}</span><ArrowDownRight size={14} /></div></footer>
    </main>
  </div>;
}
