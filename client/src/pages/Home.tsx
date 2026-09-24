import { useEffect, useState } from "react";
import { ArrowDownRight, Database, FileEdit, History, LockKeyhole, ShieldCheck, Wifi } from "lucide-react";
import TopNav from "../components/TopNav";
import SearchConsole from "../components/SearchConsole";
import StandardsDossier from "../components/StandardsDossier";
import AlliedMatrix from "../components/AlliedMatrix";
import ClauseSynthesizer from "../components/ClauseSynthesizer";
import TenderAuditor from "../components/TenderAuditor";
import KnowledgeGraph from "../components/KnowledgeGraph";
import OfficerWorkspace from "../components/OfficerWorkspace";
import type { ActiveView, ApiState, AuditResponse, Language, StandardResult } from "../types";
import { apiHealth, apiSearch, defaultLanguage, defaultQuery, defaultView, fallbackAudit, fallbackCable, footerDisclaimer, stats, titleForView } from "../types";
import type { ClauseFilter, DomainKey } from "../mockData";
import { clauseMatches, domainLabels, domainStandards, searchDomain } from "../mockData";

function MetricStrip({ standard, api }: { standard: StandardResult; api: ApiState }) {
  const icons = [Database, ShieldCheck, LockKeyhole, Wifi];
  return <section className="metric-strip">{stats.map((stat, index) => { const Icon = icons[index]; return <div className="metric-card" key={stat.label}><div className="metric-top"><span className="metric-icon"><Icon size={15} /></span><span className="metric-note">{index === 3 ? (api.connected ? "FASTAPI ONLINE" : "STANDALONE FALLBACK") : "INDEXED"}</span></div><strong className={index === 3 ? "metric-ready" : ""}>{stat.value}</strong><span>{stat.label}</span><small>{index === 1 && standard.qco ? "Current legal order surface" : stat.note}</small></div>; })}</section>;
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
  const [graphDomain, setGraphDomain] = useState<DomainKey>("cables");
  const [graphNode, setGraphNode] = useState("primary");
  const [searchDomainFilter, setSearchDomainFilter] = useState<DomainKey | "all">("all");
  const [clause, setClause] = useState<ClauseFilter>("all");
  const [qcoOnly, setQcoOnly] = useState(false);
  const [isiOnly, setIsiOnly] = useState(false);
  const [crsOnly, setCrsOnly] = useState(false);
  const [filterNotice, setFilterNotice] = useState("");

  useEffect(() => { void apiHealth().then((connected) => setApi((current) => ({ ...current, connected }))); }, []);

  const runSearch = async (overrideQuery?: string) => {
    const activeQuery = (overrideQuery ?? query).trim();
    if (!activeQuery) return;
    setLoading(true);
    const selectedDomain = searchDomainFilter === "all" ? undefined : searchDomainFilter;
    const filters = {
      domain: selectedDomain,
      qcoOnly: qcoOnly ? true : undefined,
      schemeType: isiOnly ? "ISI" : crsOnly ? "CRS" : undefined,
      clauseCategory: clause !== "all" ? clause : undefined,
    };
    const result = await apiSearch(activeQuery, language, filters);
    setStandard(result.primary);
    setMatchedOn(result.matchedOn.length ? result.matchedOn : ["BIS", "current reference"]);
    const hasFilterMatch = clauseMatches(result.primary, clause) && (!qcoOnly || Boolean(result.primary.qco)) && (!isiOnly || result.primary.scheme.includes("ISI")) && (!crsOnly || searchDomainFilter === "electronics");
    setFilterNotice(hasFilterMatch ? "Filters resolved against this source" : "No exact clause/filter match — showing nearest source record");
    setLoading(false);
  };

  const loadDraft = (standardCode: string) => {
    const domain = Object.entries(domainStandards).find(([, item]) => item.code === standardCode)?.[0] as DomainKey | undefined;
    if (domain) {
      setStandard(domainStandards[domain]);
      const newQuery = domain === "cables" ? "3.5 core XLPE cable 1.1kV" : domainLabels[domain];
      setQuery(newQuery);
      setSearchDomainFilter(domain);
      setView("search");
      void runSearch(newQuery);
    }
  };

  return <div className="app-shell"><TopNav view={view} setView={setView} language={language} setLanguage={setLanguage} api={api} /><main className="app-main">
    <div className="top-utility"><span><span className="green-pulse" /> {api.connected ? "Live local service connected; data still remains deterministic." : "Fallback data is active while the FastAPI service is offline."}</span><span className="utility-divider" /><span className="mono">MS-2026.09</span><span className="utility-spacer" /><span className="mono">22 SEP 2026 / IST</span><span className="utility-divider" /><span>S. Sharma · #GOV-8941</span></div>
    {view === "search" && <><SearchConsole query={query} setQuery={setQuery} language={language} onLanguageChange={setLanguage} onSearch={() => void runSearch()} loading={loading} domain={searchDomainFilter} setDomain={setSearchDomainFilter} clause={clause} setClause={setClause} qcoOnly={qcoOnly} setQcoOnly={setQcoOnly} isiOnly={isiOnly} setIsiOnly={setIsiOnly} crsOnly={crsOnly} setCrsOnly={setCrsOnly} /><MetricStrip standard={standard} api={api} /><div className="view-label-row"><div><span className="section-number">01</span><span className="view-label">{titleForView(view)}</span></div><span className="mono">{standard.code} / {filterNotice || "CURRENT SNAPSHOT"}</span></div><section className="results-grid"><StandardsDossier standard={standard} matchedOn={matchedOn} /><AlliedMatrix standard={standard} /></section><ClauseSynthesizer standard={standard} onSave={() => setView("workspace")} onExport={() => setFilterNotice("DOCX export prepared for download") } /></>}
    {view === "audit" && <TenderAuditor response={audit} setResponse={setAudit} corrected={corrected} setCorrected={setCorrected} onSave={() => setView("workspace")} />}
    {view === "graph" && <KnowledgeGraph selectedNode={graphNode} setSelectedNode={setGraphNode} domain={graphDomain} setDomain={setGraphDomain} />}
    {view === "workspace" && <OfficerWorkspace onLoadDraft={loadDraft} />}
    <footer className="app-footer"><div><span className="footer-brand">MANAKSETU</span><span>{footerDisclaimer()}</span></div><div><span className="mono">{view === "search" ? "SEARCH / SOURCE-LOCKED" : view === "audit" ? "AUDIT / DRAFT-SAFE" : view === "graph" ? "GRAPH / CITATION-LOCKED" : "WORKSPACE / PRIVATE"}</span><ArrowDownRight size={14} /></div></footer>
  </main></div>;
}
