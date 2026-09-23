import type { AlliedStandard, AuditResponse, GraphEdge, GraphNode, StandardResult } from "./types";
import { fallbackCable, fallbackCement } from "./types";

export type DomainKey = "cables" | "cement" | "steel" | "electronics";
export type ClauseFilter = "all" | "scope" | "tests" | "sampling" | "acceptance";
export type SavedDraft = { id: string; title: string; standard: string; updated: string; status: "Saved" | "Review" };
export type AuditHistoryEntry = { id: string; file: string; date: string; status: "2 Defects Resolved" | "Fully Compliant" | "Audit Pending" };

const allied = (items: AlliedStandard[]): AlliedStandard[] => items;

export const steelStandard: StandardResult = {
  id: "is-1786-2008", code: "IS 1786 : 2008", title: "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement", status: "CURRENT & ACTIVE", year: "2008", ics: "77.140.15", confidence: 96.9,
  scope: "Requirements for high strength deformed steel bars and wires for concrete reinforcement, including Fe 500D mechanical properties, chemical composition, bond performance and certification.", qco: "Steel and Steel Products QCO, 2024", qcoShort: "Steel Products QCO 2024", scheme: "ISI Mark Scheme I", amendments: "Amendments 1 to 3",
  allied: allied([
    { code: "IS 1608 : 2005", title: "Mechanical testing of metals", group: "Compulsory Test Methods", relevance: "Yield strength, elongation and tensile test procedure", verified: true },
    { code: "IS 432 (Part 1)", title: "Mild steel and medium tensile steel bars", group: "Conductor Specs", relevance: "Bar dimensions, mass and tolerance reference", verified: true },
    { code: "IS 13920 : 2016", title: "Ductile detailing of reinforced concrete structures", group: "Physical tests", relevance: "Seismic design compatibility", verified: true },
  ]),
  clause: "Reinforcement steel shall be Fe 500D grade conforming to IS 1786 : 2008 with Amendments 1 to 3. Each heat shall be traceable and supported by tensile, bend, re-bend and chemical analysis certificates. The product shall bear the BIS Standard Mark under the applicable Steel Products QCO.",
};

export const electronicsStandard: StandardResult = {
  id: "is-13252-crs", code: "IS 13252 (Part 1) : 2010", title: "Safety of Information Technology Equipment — CRS Electronics", status: "CURRENT & ACTIVE", year: "2010", ics: "35.020", confidence: 94.6,
  scope: "Safety requirements for information technology and audio-video equipment covered under the Compulsory Registration Scheme, including electrical, thermal, fire and mechanical safeguards.", qco: "Electronics and IT Goods (CRS), MeitY", qcoShort: "MeitY CRS", scheme: "CRS Registration", amendments: "Amendments 1 to 2",
  allied: allied([
    { code: "IS 616 : 2017", title: "Audio, video and similar electronic apparatus safety", group: "Safety Codes", relevance: "Electrical safety and abnormal operation", verified: true },
    { code: "IS 302 (Part 1)", title: "Safety of household and similar electrical appliances", group: "Compulsory Test Methods", relevance: "Insulation, leakage and dielectric tests", verified: true },
    { code: "MeitY CRS Order", title: "Compulsory Registration Scheme product list", group: "Regulatory Orders", relevance: "Registration and marking requirements", verified: true },
  ]),
  clause: "IT equipment shall conform to IS 13252 (Part 1) : 2010 and shall be covered by an active MeitY Compulsory Registration Scheme registration. The bidder shall furnish registration details, safety test reports and product marking evidence for the offered model.",
};

export const domainStandards: Record<DomainKey, StandardResult> = { cables: fallbackCable, cement: fallbackCement, steel: steelStandard, electronics: electronicsStandard };

export const domainLabels: Record<DomainKey, string> = { cables: "Cables & Conductors", cement: "Cement & Concrete", steel: "Structural Steel (TMT)", electronics: "Electronics (CRS)" };
export const domainShortLabels: Record<DomainKey, string> = { cables: "Wires & Cables", cement: "Portland Cement 53G", steel: "Fe 500D TMT Steel", electronics: "IT Displays / Electronics" };
export const domainOrder: DomainKey[] = ["cables", "cement", "steel", "electronics"];

export const savedDrafts: SavedDraft[] = [
  { id: "NIT-204", title: "33kV Substation Cables", standard: "IS 7098 (Part 1) : 1988", updated: "Today · 11:42 IST", status: "Saved" },
  { id: "NIT-188", title: "Bridge Pier 53G Cement Supply", standard: "IS 12269 : 2013", updated: "21 Sep · 16:05 IST", status: "Review" },
  { id: "NIT-163", title: "Fe 500D Reinforcement Package", standard: "IS 1786 : 2008", updated: "18 Sep · 09:18 IST", status: "Saved" },
];
export const auditHistory: AuditHistoryEntry[] = [
  { id: "AUD-672", file: "Tender_GeM_Elect_2026.pdf", date: "22 Sep 2026 · 12:14", status: "2 Defects Resolved" },
  { id: "AUD-641", file: "NIT-188_Cement_Supply.pdf", date: "21 Sep 2026 · 16:04", status: "Fully Compliant" },
  { id: "AUD-603", file: "IT_Peripherals_CRS.docx", date: "19 Sep 2026 · 10:36", status: "Audit Pending" },
];

export const graphByDomain: Record<DomainKey, { nodes: GraphNode[]; edges: GraphEdge[] }> = {
  cables: { nodes: [{ id: "primary", label: "IS 7098\n(Part 1):1988", kind: "primary", x: 50, y: 46, detail: "Primary product standard — XLPE insulated cables up to 1100 V." }, { id: "conductor", label: "IS 8130:2013", kind: "normative_refs", x: 18, y: 20, detail: "Conductor material, resistance and stranding requirements." }, { id: "flame", label: "IS 10810\nPart 53", kind: "test_methods", x: 82, y: 70, detail: "Vertical flame propagation and flame retardance test method." }, { id: "qco", label: "Cables QCO\n2023", kind: "qco_mandates", x: 50, y: 88, detail: "Statutory Quality Control Order — BIS Standard Mark mandatory." }, { id: "old", label: "IS 694:1990", kind: "superseded_refs", x: 8, y: 47, detail: "Withdrawn reference detected in tender draft; do not cite." }], edges: [{ from: "primary", to: "conductor", label: "requires" }, { from: "primary", to: "flame", label: "tested by" }, { from: "primary", to: "qco", label: "mandated by" }, { from: "old", to: "primary", label: "superseded by" }] },
  cement: { nodes: [{ id: "primary", label: "IS 12269:\n2013", kind: "primary", x: 50, y: 46, detail: "Primary standard — Ordinary Portland Cement, 53 Grade." }, { id: "physical", label: "IS 4031\nSeries", kind: "test_methods", x: 20, y: 28, detail: "Physical tests for fineness, soundness, setting and strength." }, { id: "chemical", label: "IS 4032:\n1985", kind: "normative_refs", x: 80, y: 27, detail: "Chemical analysis of hydraulic cement." }, { id: "qco", label: "Cement QCO\n2003", kind: "qco_mandates", x: 50, y: 84, detail: "Cement Quality Control Order — ISI Mark mandatory." }], edges: [{ from: "primary", to: "physical", label: "tested by" }, { from: "primary", to: "chemical", label: "analysed by" }, { from: "primary", to: "qco", label: "mandated by" }] },
  steel: { nodes: [{ id: "primary", label: "IS 1786:\n2008", kind: "primary", x: 50, y: 46, detail: "Primary standard — Fe 500D high-strength reinforcement steel." }, { id: "test", label: "IS 1608:\n2005", kind: "test_methods", x: 19, y: 25, detail: "Mechanical testing of metals for yield and tensile properties." }, { id: "chem", label: "Heat-wise\nChemistry", kind: "normative_refs", x: 81, y: 26, detail: "Chemical composition and traceability per heat." }, { id: "qco", label: "Steel QCO\n2024", kind: "qco_mandates", x: 50, y: 84, detail: "Steel Products Quality Control Order — BIS mark mandatory." }], edges: [{ from: "primary", to: "test", label: "tested by" }, { from: "primary", to: "chem", label: "verified by" }, { from: "primary", to: "qco", label: "mandated by" }] },
  electronics: { nodes: [{ id: "primary", label: "IS 13252\nPart 1:2010", kind: "primary", x: 50, y: 46, detail: "Primary standard — safety of IT equipment under CRS." }, { id: "safety", label: "IS 616:\n2017", kind: "test_methods", x: 18, y: 25, detail: "Safety of audio-video and similar electronic apparatus." }, { id: "marking", label: "CRS\nRegistration", kind: "normative_refs", x: 82, y: 25, detail: "Model-specific registration and product marking evidence." }, { id: "crs", label: "MeitY CRS\nOrder", kind: "qco_mandates", x: 50, y: 84, detail: "Compulsory Registration Scheme product coverage." }], edges: [{ from: "primary", to: "safety", label: "tested by" }, { from: "primary", to: "marking", label: "requires" }, { from: "primary", to: "crs", label: "mandated by" }] },
};

export function searchDomain(query: string): DomainKey { const q = query.toLowerCase(); if (q.includes("cement") || q.includes("53 grade") || q.includes("सीमेंट")) return "cement"; if (q.includes("steel") || q.includes("tmt") || q.includes("fe 500") || q.includes("1786")) return "steel"; if (q.includes("electronics") || q.includes("display") || q.includes("crs") || q.includes("hardware")) return "electronics"; return "cables"; }
export function clauseMatches(standard: StandardResult, clause: ClauseFilter): boolean { if (clause === "all") return true; if (clause === "scope") return Boolean(standard.scope); if (clause === "tests") return standard.allied.some((item) => item.group.includes("Test") || item.group.includes("Physical")); if (clause === "sampling") return standard.clause.toLowerCase().includes("batch") || standard.clause.toLowerCase().includes("heat"); return standard.clause.toLowerCase().includes("conform") || standard.clause.toLowerCase().includes("accept"); }
export function domainAuditFor(domain: DomainKey): AuditResponse { return domain === "cables" ? { fileName: "Tender_GeM_Elect_2026.pdf", items: [{ line: "Line Item 1", title: "PVC insulated power cable, 1.1 kV", standard: "IS 694 : 1990", status: "critical", finding: "Cited standard is withdrawn and superseded.", recommendation: "Replace with IS 694 : 2010 + Amendments 1 to 4." }, { line: "Line Item 2", title: "High-strength deformed steel bar Fe 500D", standard: "IS 1786 : 2008", status: "compliant", finding: "Reference is active for the cited product class.", recommendation: "Retain reference and request heat-wise certificate." }], summary: { critical: 1, compliant: 1, coverage: "82%" } } : { fileName: `${domainShortLabels[domain].replaceAll(" ", "_")}_Review.pdf`, items: [{ line: "Line Item 1", title: domainLabels[domain], standard: domainStandards[domain].code, status: "compliant", finding: "Primary reference and legal order are present in the sampled clause.", recommendation: "Retain source-locked reference and request current evidence." }], summary: { critical: 0, compliant: 1, coverage: "100%" } }; }
