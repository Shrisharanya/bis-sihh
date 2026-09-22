import { Check, Clipboard, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import type { ClauseDraft, StandardResult } from "../types";
import { clauseForStandard, clauseReadyCopy, clauseSourceText, clauseTextLabel, clauseTextSubcopy, copyButtonLabel, copyFeedback, safeCopy, sourceCount, sourceLockedLabel } from "../types";

interface ClauseSynthesizerProps { standard: StandardResult; corrected?: ClauseDraft; }

export default function ClauseSynthesizer({ standard, corrected }: ClauseSynthesizerProps) {
  const [copied, setCopied] = useState(false);
  const clause = corrected ?? clauseForStandard(standard);
  const copyClause = () => { safeCopy(`${clause.heading}\n\n${clause.body}`); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  return <article className="clause-card card-surface">
    <div className="clause-header"><div><div className="eyebrow green-eyebrow"><Sparkles size={13} /> {sourceLockedLabel()}</div><h2>{clauseTextLabel()}</h2><p>{clauseTextSubcopy()}</p></div><div className="clause-ready"><Check size={14} /> {clauseReadyCopy()}</div></div>
    <div className="clause-editor"><div className="clause-toolbar"><span className="mono">{clause.heading}</span><span className="clause-toolbar-right"><span><FileText size={13} /> {sourceCount(standard)} sources</span><span className="mono">GE M / CPPP</span></span></div><div className="clause-body"><p>{clause.body}</p></div><div className="clause-source"><span>{clauseSourceText(standard)}</span><span className="mono">DRAFT · {standard.code}</span></div></div>
    <div className="clause-actions"><span className="clause-disclaimer">Auto-synthesized from current, cited records. Review before issue.</span><button className={`primary-button copy-button ${copied ? "success" : ""}`} onClick={copyClause}>{copied ? <Check size={15} /> : <Clipboard size={15} />} {copyButtonLabel(copied)}</button></div>
    {copied && <div className="toast-inline"><Check size={13} /> {copyFeedback()}</div>}
  </article>;
}
