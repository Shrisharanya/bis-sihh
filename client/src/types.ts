export type Language = "en" | "hi";
export type ActiveView = "search" | "audit" | "graph" | "workspace";
export type StandardStatus = "CURRENT & ACTIVE" | "WITHDRAWN" | "SUPERSEDED";

export interface AlliedStandard {
  code: string;
  title: string;
  group: "Conductor Specs" | "Armouring Material" | "Compulsory Test Methods" | "Physical tests" | "Chemical analysis" | "Safety Codes" | "Regulatory Orders";
  relevance: string;
  verified: boolean;
}

export interface StandardResult {
  id: string;
  code: string;
  title: string;
  status: StandardStatus;
  year: string;
  ics: string;
  scope: string;
  confidence: number;
  qco: string;
  qcoShort: string;
  scheme: string;
  amendments: string;
  allied: AlliedStandard[];
  clause: string;
}

export interface GraphNode {
  id: string;
  label: string;
  kind: "primary" | "normative_refs" | "test_methods" | "qco_mandates" | "superseded_refs";
  x: number;
  y: number;
  detail: string;
}

export interface GraphEdge { from: string; to: string; label: string; }
export interface AuditItem { line: string; title: string; standard: string; status: "critical" | "compliant"; finding: string; recommendation: string; }
export interface AuditResponse { fileName: string; items: AuditItem[]; summary: { critical: number; compliant: number; coverage: string }; }
export interface ClauseDraft { heading: string; body: string; source: string; }
export interface SearchResponse { primary: StandardResult; matchedOn: string[]; }
export interface ApiState { connected: boolean; lastSync: string; }

export const fallbackCable: StandardResult = {
  id: "is-7098-p1-1988", code: "IS 7098 (Part 1) : 1988", title: "Crosslinked Polyethylene Insulated Thermoplastic Sheathed Cables", status: "CURRENT & ACTIVE", year: "1988", ics: "29.060.20",
  scope: "XLPE insulated, PVC sheathed cables for working voltages up to and including 1100 V. The standard defines construction, dimensions, electrical properties and acceptance tests for power distribution cable assemblies.", confidence: 98.4,
  qco: "Wires and Cables (Quality Control) Order, 2023", qcoShort: "Wires & Cables QCO 2023", scheme: "ISI Mark Scheme I", amendments: "Amendments 1 to 4",
  allied: [
    { code: "IS 8130 : 2013", title: "Conductors for insulated electric cables", group: "Conductor Specs", relevance: "Conductor material, resistance and stranding", verified: true },
    { code: "IS 5831 : 1984", title: "PVC insulation and sheath of electric cables", group: "Conductor Specs", relevance: "Insulation and sheath compound requirements", verified: true },
    { code: "IS 3975 : 1999", title: "Mild steel wires, formed wires and tapes for armouring", group: "Armouring Material", relevance: "Armour material and mechanical properties", verified: true },
    { code: "IS 10810 (Part 53)", title: "Methods of test for cables — flame retardance", group: "Compulsory Test Methods", relevance: "Vertical flame propagation / fire performance", verified: true },
    { code: "IS 10810 (Part 1)", title: "Conductor resistance test", group: "Compulsory Test Methods", relevance: "Routine electrical acceptance test", verified: true },
    { code: "IS 10810 (Part 62)", title: "Smoke density of cable materials", group: "Compulsory Test Methods", relevance: "Low-smoke performance evidence", verified: true },
  ],
  clause: "The bidder shall offer 3.5 core, 1.1 kV grade XLPE insulated and PVC sheathed power cables conforming to IS 7098 (Part 1) : 1988 with Amendments 1 to 4. Conductors shall comply with IS 8130 : 2013; insulation and sheath with IS 5831 : 1984; armour, where specified, with IS 3975 : 1999. Testing shall be carried out as per the applicable IS 10810 series methods. The product shall bear the BIS Standard Mark under the Wires and Cables QCO 2023 and valid ISI licence.",
};

export const fallbackCement: StandardResult = {
  id: "is-12269-2013", code: "IS 12269 : 2013", title: "Ordinary Portland Cement — 53 Grade", status: "CURRENT & ACTIVE", year: "2013", ics: "91.100.10",
  scope: "Requirements for ordinary Portland cement of 53 grade used for structural concrete and high-strength applications, including chemical, physical and performance requirements.", confidence: 97.8,
  qco: "Cement (Quality Control) Order, 2003", qcoShort: "Cement QCO 2003", scheme: "ISI Mark Scheme I", amendments: "Amendments 1 to 2",
  allied: [
    { code: "IS 4031 Series", title: "Methods of physical tests for hydraulic cement", group: "Physical tests", relevance: "Fineness, soundness, setting time and strength", verified: true },
    { code: "IS 4032 : 1985", title: "Method of chemical analysis of hydraulic cement", group: "Chemical analysis", relevance: "Chemical composition and loss on ignition", verified: true },
  ],
  clause: "Ordinary Portland Cement 53 Grade shall conform to IS 12269 : 2013 with Amendments 1 to 2. The supplier shall furnish a valid BIS licence and test certificates covering the chemical requirements of IS 4032 and physical tests under the IS 4031 series. Each consignment shall be accompanied by batch-wise conformity documentation.",
};

export const fallbackAudit: AuditResponse = {
  fileName: "Tender_GeM_Elect_2026.pdf",
  items: [
    { line: "Line Item 1", title: "PVC insulated power cable, 1.1 kV", standard: "IS 694 : 1990", status: "critical", finding: "Cited standard is withdrawn and superseded. The clause also omits low-smoke and zero-halogen fire test mandates.", recommendation: "Replace with IS 694 : 2010 + Amendments 1 to 4 and add IS 10810 flame-retardance evidence." },
    { line: "Line Item 2", title: "High-strength deformed steel bar Fe 500D", standard: "IS 1786 : 2008", status: "compliant", finding: "Reference is active for the cited product class. Mechanical and chemical conformity fields are present.", recommendation: "Retain reference; request heat-wise test certificate and BIS licence number at supply stage." },
  ], summary: { critical: 1, compliant: 1, coverage: "82%" },
};

export const graphNodes: GraphNode[] = [
  { id: "primary", label: "IS 7098\n(Part 1):1988", kind: "primary", x: 50, y: 46, detail: "Primary product standard — XLPE insulated cables up to 1100 V." },
  { id: "conductor", label: "IS 8130:2013", kind: "normative_refs", x: 18, y: 20, detail: "Conductor material, resistance and stranding requirements." },
  { id: "sheath", label: "IS 5831:1984", kind: "normative_refs", x: 17, y: 72, detail: "PVC insulation and sheath compound requirements." },
  { id: "armour", label: "IS 3975:1999", kind: "normative_refs", x: 80, y: 19, detail: "Mild steel wires, formed wires and tapes for armouring." },
  { id: "flame", label: "IS 10810\nPart 53", kind: "test_methods", x: 82, y: 70, detail: "Vertical flame propagation and flame retardance test method." },
  { id: "qco", label: "Cables QCO\n2023", kind: "qco_mandates", x: 50, y: 88, detail: "Statutory Quality Control Order — BIS Standard Mark mandatory." },
  { id: "old", label: "IS 694:1990", kind: "superseded_refs", x: 8, y: 47, detail: "Withdrawn reference detected in tender draft; do not cite." },
];
export const graphEdges: GraphEdge[] = [
  { from: "primary", to: "conductor", label: "requires" }, { from: "primary", to: "sheath", label: "requires" }, { from: "primary", to: "armour", label: "requires" }, { from: "primary", to: "flame", label: "tested by" }, { from: "primary", to: "qco", label: "mandated by" }, { from: "old", to: "primary", label: "superseded by" },
];
export const graphKindMeta = {
  primary: { label: "Primary standard", color: "#2f7bf6" }, normative_refs: { label: "Normative reference", color: "#e1a63b" }, test_methods: { label: "Test method", color: "#a855f7" }, qco_mandates: { label: "QCO / legal order", color: "#dc3f56" }, superseded_refs: { label: "Superseded reference", color: "#778092" },
};
export const stats = [
  { value: "21,480", label: "Standards indexed", note: "BIS catalogue snapshot" }, { value: "1,420", label: "Active QCOs", note: "Legal orders monitored" }, { value: "0.0%", label: "Hallucination", note: "Citation-bound answers" }, { value: "READY", label: "GeM API", note: "Integration surface" },
];
export const navItems = [{ id: "search" as const, index: "01", label: "Standards Explorer & Clause Search" }, { id: "audit" as const, index: "02", label: "Tender Document Auditor" }, { id: "graph" as const, index: "03", label: "Normative Knowledge Graph" }, { id: "workspace" as const, index: "04", label: "Officer Workspace" }];
export const apiState: ApiState = { connected: false, lastSync: "22 Sep 2026 · 12:28 IST" };

export function routeSearch(query: string): SearchResponse {
  const normalized = query.toLowerCase();
  const isCable = ["cable", "xlpe", "तार", "केबल", "1.1kv", "7098"].some((term) => normalized.includes(term));
  return { primary: isCable ? fallbackCable : fallbackCement, matchedOn: isCable ? ["XLPE", "cable", "1.1 kV", "IS 7098"] : ["cement", "53 grade", "IS 12269"] };
}

export interface SearchFilters {
  domain?: string;
  qcoOnly?: boolean;
  schemeType?: string;
  clauseCategory?: string;
}

export const API_BASE = (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL)
  ? (import.meta.env.VITE_API_URL as string).replace(/\/$/, "")
  : "/api";

async function apiFetch(endpoint: string, options?: RequestInit): Promise<Response> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE}${cleanEndpoint}`;
  try {
    const res = await fetch(url, options);
    if (!res.ok && res.status >= 500) {
      throw new Error(`Server returned ${res.status}`);
    }
    return res;
  } catch (err) {
    // If relative `/api` failed (e.g. dev server without proxy running), attempt direct port 8000
    if (url.startsWith("/api")) {
      const directUrl = `http://127.0.0.1:8000/api${cleanEndpoint}`;
      return await fetch(directUrl, options);
    }
    throw err;
  }
}

export async function apiSearch(
  query: string,
  language: Language,
  filters?: SearchFilters
): Promise<SearchResponse> {
  try {
    const payload = {
      query,
      language,
      domain: filters?.domain && filters.domain !== "all" ? filters.domain : undefined,
      qco_only: filters?.qcoOnly || undefined,
      scheme_type: filters?.schemeType || undefined,
      clause_category: filters?.clauseCategory && filters.clauseCategory !== "all" ? filters.clauseCategory : undefined,
    };
    const response = await apiFetch("/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("API unavailable");
    const data = await response.json();
    return { primary: data.primary as StandardResult, matchedOn: data.matched_on ?? [] };
  } catch {
    return routeSearch(query);
  }
}

export async function apiAudit(file?: File): Promise<AuditResponse> {
  try {
    const form = new FormData();
    if (file) form.append("file", file);
    const response = await apiFetch("/audit-tender", { method: "POST", body: form });
    if (!response.ok) throw new Error("API unavailable");
    return (await response.json()) as AuditResponse;
  } catch {
    return fallbackAudit;
  }
}

export async function apiAuditCorrected(): Promise<AuditResponse> {
  try {
    const response = await apiFetch("/audit-tender/corrected", { method: "POST" });
    if (!response.ok) throw new Error("API unavailable");
    return (await response.json()) as AuditResponse;
  } catch {
    return getAuditWithCorrection(true);
  }
}

export async function apiHealth(): Promise<boolean> {
  try {
    const res = await apiFetch("/health", { signal: AbortSignal.timeout(1200) });
    return res.ok;
  } catch {
    return false;
  }
}

export async function apiGetGraph(domain: string): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] } | null> {
  try {
    const res = await apiFetch(`/graph/${domain}`);
    if (!res.ok) throw new Error("Graph API error");
    const data = await res.json();
    return { nodes: data.nodes, edges: data.edges };
  } catch {
    return null;
  }
}

export async function apiGetWorkspace(): Promise<{ officer: any; drafts: any[]; audit_history: any[]; stats: any } | null> {
  try {
    const res = await apiFetch("/officer/workspace");
    if (!res.ok) throw new Error("Workspace API error");
    return await res.json();
  } catch {
    return null;
  }
}

export async function apiSaveDraft(draft: {
  project_name: string;
  standard_code: string;
  clause_heading: string;
  clause_body: string;
  domain?: string;
  officer_notes?: string;
}): Promise<any> {
  try {
    const res = await apiFetch("/officer/drafts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    if (!res.ok) throw new Error("Failed to save draft");
    return await res.json();
  } catch (e) {
    console.warn("apiSaveDraft failed, continuing in mock mode", e);
    return null;
  }
}

export async function apiDeleteDraft(draftId: string): Promise<boolean> {
  try {
    const res = await apiFetch(`/officer/drafts/${draftId}`, { method: "DELETE" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function apiGetAuditHistory(): Promise<any[] | null> {
  try {
    const res = await apiFetch("/officer/audit-history");
    if (!res.ok) throw new Error("Audit history API error");
    const data = await res.json();
    return data.history ?? [];
  } catch {
    return null;
  }
}

export async function apiExportClause(payload: {
  standard_code: string;
  clause_heading: string;
  clause_body: string;
  domain?: string;
  format?: string;
}): Promise<any> {
  try {
    const res = await apiFetch("/export/clause", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return await res.json();
  } catch {
    // handled gracefully
  }
  return null;
}

export async function apiCopilotQuery(prompt: string, domain?: string, language?: Language): Promise<any> {
  try {
    const res = await apiFetch("/copilot/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, domain, language: language || "en" }),
    });
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  return null;
}

export function getAuditWithCorrection(corrected: boolean): AuditResponse {
  if (!corrected) return fallbackAudit;
  return {
    ...fallbackAudit,
    items: fallbackAudit.items.map((item) =>
      item.status === "critical"
        ? {
            ...item,
            standard: "IS 694 : 2010 + Amd. 1 to 4",
            status: "compliant",
            finding: "Draft corrected: current reference inserted and fire test requirement restored.",
            recommendation: "Review the generated clause, then issue the updated tender version.",
          }
        : item
    ),
    summary: { critical: 0, compliant: 2, coverage: "100%" },
  };
}

export const defaultClause: ClauseDraft = { heading: "4.2.1  Power cable — conformity and testing", body: fallbackCable.clause, source: "Synthesized from IS 7098 (Part 1):1988 • IS 8130:2013 • IS 5831:1984 • IS 3975:1999 • IS 10810 series" };
export const correctedClause: ClauseDraft = { heading: "1.1  Cable reference — corrected tender text", body: "The bidder shall supply cables conforming to IS 694 : 2010 with Amendments 1 to 4, including low-smoke zero-halogen fire performance evidence as applicable to the installation environment. Product conformity shall be supported by current BIS licensing and batch-wise test certificates.", source: "Auto-corrected from Tender_GeM_Elect_2026.pdf • supersession graph verified" };

export const englishQuickQueries = [{ icon: "⚡", label: "3.5 Core XLPE Cable 1.1kV", query: "3.5 core XLPE cable 1.1kV" }, { icon: "🏗", label: "Portland Cement 53G", query: "Portland cement 53 grade" }, { icon: "🌐", label: "भूमिगत केबल (Hindi)", query: "भूमिगत केबल" }, { icon: "💻", label: "MeitY IT Hardware (CRS)", query: "MeitY IT hardware CRS" }];
export const hindiQuickQueries = [{ icon: "⚡", label: "3.5 कोर XLPE केबल", query: "3.5 कोर XLPE केबल 1.1kV" }, { icon: "🏗", label: "पोर्टलैंड सीमेंट 53 ग्रेड", query: "पोर्टलैंड सीमेंट 53 ग्रेड" }, { icon: "🌐", label: "भूमिगत केबल", query: "भूमिगत केबल" }, { icon: "💻", label: "MeitY IT हार्डवेयर", query: "MeitY IT hardware CRS" }];

export function getQuickQueries(language: Language) { return language === "hi" ? hindiQuickQueries : englishQuickQueries; }
export function formatSearchHint(language: Language) { return language === "hi" ? "मानक, उत्पाद या निविदा आवश्यकता खोजें…" : "Search a product, requirement or BIS code…"; }
export function searchPlaceholder(language: Language) { return formatSearchHint(language); }
export function safeCopy(text: string) { if (typeof navigator !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(text).catch(() => undefined); }
export function getClauseForStandard(standard: StandardResult): ClauseDraft { return standard.id === fallbackCement.id ? { heading: "6.1  Cement — conformity and testing", body: standard.clause, source: "Synthesized from IS 12269:2013 • IS 4031 series • IS 4032:1985" } : defaultClause; }
export function clauseForStandard(standard: StandardResult) { return getClauseForStandard(standard); }
export function clauseSourceText(standard: StandardResult) { return clauseForStandard(standard).source; }
export function sourceCount(standard: StandardResult) { return (standard?.allied?.length ?? 0) + 1; }

export function allGroups(standard?: StandardResult | null): AlliedStandard["group"][] {
  if (!standard || !Array.isArray(standard.allied)) return [];
  const groups = standard.allied.map((item) => item?.group).filter(Boolean);
  return Array.from(new Set(groups)) as AlliedStandard["group"][];
}

export function groupDescription(group: string): string {
  const descMap: Record<string, string> = {
    "Conductor Specs": "Material and construction requirements",
    "Armouring Material": "Mechanical protection and armour inputs",
    "Compulsory Test Methods": "Evidence required for acceptance",
    "Physical tests": "Performance and durability test methods",
    "Chemical analysis": "Chemical composition verification",
    "Safety Codes": "Electrical and product safety evidence",
    "Regulatory Orders": "Registration and statutory marking",
    electrical_testing: "Conductor resistance & insulation tests",
    fire_safety: "Vertical flame propagation & smoke density",
    mechanical_specs: "Tensile, yield stress and elongation",
    regulatory_qco: "Mandatory Quality Control Order compliance",
    quality_assurance: "Lot sampling & conformity documentation",
  };
  return descMap[group] || "Normative specification requirements";
}

export function matrixGroupCode(group: string): string {
  if (!group) return "NORM";
  if (group === "Compulsory Test Methods") return "TEST";
  if (group === "Armouring Material") return "ARM";
  if (group === "Conductor Specs") return "COND";
  if (group === "Physical tests" || group === "physical_testing") return "PHYS";
  if (group === "Chemical analysis" || group === "chemical_analysis") return "CHEM";
  if (group === "Safety Codes" || group === "electrical_safety" || group === "fire_safety") return "SAFE";
  if (group === "Regulatory Orders" || group === "regulatory_qco") return "REG";
  if (group === "mechanical_specs") return "MECH";
  if (group === "quality_assurance") return "QA";
  return "NORM";
}

export function matrixSummary(standard?: StandardResult | null): string {
  return `${standard?.allied?.length ?? 0} allied references`;
}

export function matrixHeading() { return "Allied normative standards"; }
export function matrixSubheading() { return "Grouped references resolved from the primary standard"; }
export function sourceVerified(item?: AlliedStandard | null): boolean { return Boolean(item?.verified); }
export function confidenceWidth(value: number) { return `${Math.min(value, 100)}%`; }
export function dossierBreadcrumb(standard: StandardResult) { return `Standards / ${standard.code}`; }
export function legalBasis(standard: StandardResult) { return `${standard.qco} / ${standard.scheme}`; }
export function standardMetadata(standard: StandardResult) { return `${standard.code} · ICS ${standard.ics} · published ${standard.year}`; }
export function statusDescription(status: StandardStatus) { return status === "CURRENT & ACTIVE" ? "Current reference with active amendments" : "Historical reference; do not cite"; }
export function amendmentsText(standard: StandardResult) { return standard.amendments || "No amendments"; }
export function confidenceMeterLabel() { return "MATCH QUALITY"; }
export function confidenceMeterSubcopy() { return "Current reference / semantic overlap / legal context"; }
export function primaryTypeCopy() { return "PRIMARY STANDARD"; }
export function secondarySourceLabel() { return "ALLIED / NORMATIVE"; }
export function clauseTextLabel() { return "FORMATTED TENDER CLAUSE"; }
export function clauseTextSubcopy() { return "Generated only from resolved normative sources"; }
export function sourceLockedLabel() { return "SOURCE-LOCKED"; }
export function clauseReadyCopy() { return "Ready to paste into a GeM / CPPP tender"; }
export function copyButtonLabel(copied: boolean) { return copied ? "COPIED TO CLIPBOARD" : "COPY FORMATTED CLAUSE"; }
export function copyFeedback() { return "Formatted clause copied to clipboard"; }
export function auditStatusText(item: AuditItem) { return item.status === "critical" ? "CRITICAL SUPERSEDED WARNING" : "COMPLIANT REFERENCE"; }
export function auditFileMeta(response: AuditResponse) { return `${response.fileName} · ${response.items.length.toString().padStart(2, "0")} parsed line items`; }
export function auditCriticalCopy() { return "Do not issue this tender until the reference is corrected."; }
export function auditCompliantCopy() { return "Reference and supporting evidence are present."; }
export function auditSubheading() { return "Document-level checks for superseded standards, QCOs and missing test mandates"; }
export function sampleTenderCopy() { return "Use the sample tender to preview the supersession workflow."; }
export function uploadTenderCopy() { return "Upload a tender PDF to run the same deterministic checks."; }
export function auditCorrectButtonLabel(corrected: boolean) { return corrected ? "SPECIFICATION CORRECTED" : "AUTO-CORRECT SPECIFICATION IN TENDER DRAFT"; }
export function graphColor(kind: GraphNode["kind"]) { return graphKindMeta[kind].color; }
export function graphTypeName(node: GraphNode) { return graphKindMeta[node.kind].label; }
export function graphNodeCode(node: GraphNode) { return node.label.replace("\n", " "); }
export function graphNodeIcon(kind: GraphNode["kind"]) { return kind === "primary" ? "◎" : kind === "qco_mandates" ? "⚖" : kind === "superseded_refs" ? "!" : kind === "test_methods" ? "⌁" : "◈"; }
export function selectedGraphDetail(node: GraphNode) { return `${graphTypeName(node)} · ${node.detail}`; }
export function graphInspectorTitle(node: GraphNode) { return graphNodeCode(node); }
export function graphInspectorPrompt() { return "Select a relationship to inspect the official clause text."; }
export function graphAccessibleText() { return "Interactive relationship graph showing the primary standard and its cited references."; }
export function graphSubheading() { return "Click any node to inspect the official clause relationship"; }
export function graphNodeCountCopy() { return `${graphNodes.length} nodes mapped`; }
export function graphRelationCountCopy() { return `${graphEdges.length} cited directed relations`; }
export function queryLabel() { return "NATURAL LANGUAGE REQUIREMENT"; }
export function queryScope() { return "English + Hindi · BIS standards · allied test methods · QCOs"; }
export function queryRoutingCopy() { return "Keyword and semantic routing"; }
export function commandKey() { return "⌘ K"; }
export function chipLabel(item: { icon: string; label: string }) { return `${item.icon} ${item.label}`; }
export function actionLabel() { return "RUN STANDARD ROUTER"; }
export function titleForView(view: ActiveView) { return navItems.find((item) => item.id === view)?.label ?? navItems[0].label; }
export function navAria(view: ActiveView) { return `Open ${titleForView(view)}`; }
export function liveSyncCopy() { return "BIS Gazette Synced · Sept 2026"; }
export function brandTitle() { return "ManakSetu"; }
export function brandSubtitle() { return "National Standards Intelligence Copilot"; }
export function productScope() { return "GeM & CPPP"; }
export function activeLanguageCopy(language: Language) { return language === "hi" ? "हिन्दी" : "EN"; }
export function apiModeLabel(connected: boolean) { return connected ? "FASTAPI ONLINE" : "STANDALONE FALLBACK"; }
export function demoModeCopy() { return "Fallback data is active while the FastAPI service is offline."; }
export function apiConnectedCopy() { return "Live local service connected; data still remains deterministic."; }
export function footerDisclaimer() { return "Prototype only. Confirm final tender clauses against the latest official BIS publication before issue."; }
export function graphCopyText() { return "The graph is a verified relationship map, not a generative answer."; }
export function defaultQuery() { return "3.5 core XLPE cable 1.1kV"; }
export function defaultLanguage(): Language { return "en"; }
export function defaultView(): ActiveView { return "search"; }

export function auditSummaryLine(response: AuditResponse) { return `${response.summary.critical} critical · ${response.summary.compliant} compliant · ${response.summary.coverage} coverage`; }
