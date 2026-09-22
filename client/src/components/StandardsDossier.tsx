import { Check, FileCheck2, Fingerprint, Gavel, ShieldCheck } from "lucide-react";
import type { StandardResult } from "../types";
import { confidenceWidth, dossierBreadcrumb, legalBasis, statusDescription, standardMetadata, amendmentsText, confidenceMeterLabel, confidenceMeterSubcopy, primaryTypeCopy, safeCopy } from "../types";

interface StandardsDossierProps { standard: StandardResult; matchedOn: string[]; }

export default function StandardsDossier({ standard, matchedOn }: StandardsDossierProps) {
  return <article className="dossier-card card-surface">
    <div className="card-topline"><span className="eyebrow blue-eyebrow">{primaryTypeCopy()}</span><span className="record-id">{dossierBreadcrumb(standard)}</span></div>
    <div className="dossier-heading"><div><div className="standard-code mono">{standard.code}</div><h2>{standard.title}</h2></div><div className="status-badge verified-badge"><Check size={13} /> {standard.status}</div></div>
    <div className="status-copy"><ShieldCheck size={15} /><span>{statusDescription(standard.status)}</span></div>
    <div className="metadata-grid">
      <div className="meta-cell"><span className="meta-label">ICS CLASSIFICATION</span><span className="meta-value mono">{standard.ics}</span></div>
      <div className="meta-cell"><span className="meta-label">PUBLICATION YEAR</span><span className="meta-value mono">{standard.year}</span></div>
      <div className="meta-cell"><span className="meta-label">AMENDMENTS</span><span className="meta-value mono amendment-value">{amendmentsText(standard)}</span></div>
      <div className="meta-cell"><span className="meta-label">ALLIED SOURCES</span><span className="meta-value mono">{standard.allied.length.toString().padStart(2, "0")} resolved</span></div>
    </div>
    <div className="scope-block"><div className="block-label"><FileCheck2 size={14} /> SCOPE EXCERPT</div><p>{standard.scope}</p></div>
    <div className="match-block"><div className="match-header"><div><div className="block-label"><Fingerprint size={14} /> {confidenceMeterLabel()}</div><span className="match-subcopy">{confidenceMeterSubcopy()}</span></div><strong>{standard.confidence.toFixed(1)}<small>%</small></strong></div><div className="confidence-track"><span style={{ width: confidenceWidth(standard.confidence) }} /></div><div className="matched-row"><span>Matched signals</span><div>{matchedOn.map((signal) => <span key={signal} className="signal-pill">{signal}</span>)}</div></div></div>
    <div className="legal-strip"><div className="legal-icon"><Gavel size={17} /></div><div><div className="legal-title">QCO LEGAL STATUS <span className="status-badge amber-badge">MANDATORY</span></div><p>{standard.qco} <span className="mono">/ {standard.scheme}</span></p></div><button className="icon-button" onClick={() => safeCopy(legalBasis(standard))} aria-label="Copy legal basis"><FileCheck2 size={16} /></button></div>
    <div className="card-footer-note"><span><ShieldCheck size={13} /> BIS catalogue verified</span><span className="mono">{standardMetadata(standard)}</span></div>
  </article>;
}
