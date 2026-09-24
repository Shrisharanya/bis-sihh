import { ArrowUpRight, Check, Command, Filter, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import type { Language } from "../types";
import { getQuickQueries, queryScope, queryLabel, searchPlaceholder, chipLabel, commandKey, queryRoutingCopy, actionLabel } from "../types";
import type { ClauseFilter, DomainKey } from "../mockData";
import { domainLabels } from "../mockData";

interface SearchConsoleProps {
  query: string;
  setQuery: (value: string) => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onSearch: (overrideQuery?: string) => void;
  loading: boolean;
  domain: DomainKey | "all";
  setDomain: (domain: DomainKey | "all") => void;
  clause: ClauseFilter;
  setClause: (clause: ClauseFilter) => void;
  qcoOnly: boolean;
  setQcoOnly: (value: boolean) => void;
  isiOnly: boolean;
  setIsiOnly: (value: boolean) => void;
  crsOnly: boolean;
  setCrsOnly: (value: boolean) => void;
}

const clauseOptions: { value: ClauseFilter; label: string }[] = [
  { value: "all", label: "All clause types" },
  { value: "scope", label: "Scope" },
  { value: "tests", label: "Mandatory test procedures" },
  { value: "sampling", label: "Sampling rules" },
  { value: "acceptance", label: "Acceptance criteria" },
];

export default function SearchConsole({
  query,
  setQuery,
  language,
  onLanguageChange,
  onSearch,
  loading,
  domain,
  setDomain,
  clause,
  setClause,
  qcoOnly,
  setQcoOnly,
  isiOnly,
  setIsiOnly,
  crsOnly,
  setCrsOnly,
}: SearchConsoleProps) {
  const quickQueries = getQuickQueries(language);
  const toggle = (value: boolean, setter: (value: boolean) => void) => setter(!value);
  return (
    <section className="search-console panel-grid-lines">
      <div className="section-kicker">
        <span className="kicker-dot" /> {queryLabel()} <span className="kicker-divider" /> {queryRoutingCopy()}
      </div>
      <div className="search-title-row">
        <div>
          <h1>
            Find the standard<br />
            <em>before you write the clause.</em>
          </h1>
          <p>{queryScope()}</p>
        </div>
        <div className="search-status-chip">
          <Sparkles size={14} /> {language === "hi" ? "हिन्दी + English" : "Bilingual intent routing"}
        </div>
      </div>
      <div className="command-shell">
        <Search size={20} className="command-search-icon" />
        <input
          aria-label={searchPlaceholder(language)}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onSearch();
          }}
          placeholder={searchPlaceholder(language)}
        />
        <div className="command-actions">
          <span className="command-hint">
            <Command size={12} /> {commandKey()}
          </span>
          <button
            type="button"
            className="primary-button command-button"
            onClick={() => onSearch()}
            disabled={loading}
          >
            {loading ? "ROUTING…" : actionLabel()} <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
      <div className="quick-row">
        <span className="quick-label">QUICK ROUTES</span>
        {quickQueries.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className="quick-chip"
            onClick={() => {
              setQuery(item.query);
              onLanguageChange(language);
              onSearch(item.query);
            }}
          >
            <span>{chipLabel(item)}</span>
            <small>⌥{index + 1}</small>
          </button>
        ))}
      </div>
      <div className="filter-toolbar">
        <div className="filter-toolbar-label">
          <SlidersHorizontal size={14} /> CLAUSE-LEVEL FILTERS
        </div>
        <label className="filter-select">
          <span>DOMAIN</span>
          <select
            value={domain}
            onChange={(event) => setDomain(event.target.value as DomainKey | "all")}
          >
            <option value="all">All domains</option>
            {Object.entries(domainLabels).map(([key, label]) => (
              <option value={key} key={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="filter-select clause-select">
          <span>CLAUSE TYPE</span>
          <select
            value={clause}
            onChange={(event) => setClause(event.target.value as ClauseFilter)}
          >
            {clauseOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={`filter-toggle ${qcoOnly ? "on" : ""}`}
          onClick={() => toggle(qcoOnly, setQcoOnly)}
        >
          {qcoOnly ? <Check size={13} /> : <Filter size={13} />} Mandatory QCO only
        </button>
        <button
          type="button"
          className={`filter-toggle ${isiOnly ? "on" : ""}`}
          onClick={() => toggle(isiOnly, setIsiOnly)}
        >
          {isiOnly ? <Check size={13} /> : <Filter size={13} />} ISI Mark / Scheme I
        </button>
        <button
          type="button"
          className={`filter-toggle ${crsOnly ? "on" : ""}`}
          onClick={() => toggle(crsOnly, setCrsOnly)}
        >
          {crsOnly ? <Check size={13} /> : <Filter size={13} />} CRS Electronics
        </button>
        <button
          type="button"
          className="filter-clear"
          onClick={() => {
            setDomain("all");
            setClause("all");
            setQcoOnly(false);
            setIsiOnly(false);
            setCrsOnly(false);
          }}
          aria-label="Clear filters"
        >
          <X size={13} /> Clear
        </button>
      </div>
    </section>
  );
}
