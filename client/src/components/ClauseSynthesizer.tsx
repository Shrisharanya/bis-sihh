import { Check, Clipboard, Download, FileText, Save, Sparkles } from "lucide-react";
import { useState } from "react";
import type { ClauseDraft, StandardResult } from "../types";
import {
  apiExportClause,
  apiSaveDraft,
  clauseForStandard,
  clauseReadyCopy,
  clauseSourceText,
  clauseTextLabel,
  clauseTextSubcopy,
  copyButtonLabel,
  copyFeedback,
  safeCopy,
  sourceCount,
  sourceLockedLabel,
} from "../types";

interface ClauseSynthesizerProps {
  standard: StandardResult;
  corrected?: ClauseDraft;
  onSave?: () => void;
  onExport?: () => void;
}

export default function ClauseSynthesizer({ standard, corrected, onSave, onExport }: ClauseSynthesizerProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [exported, setExported] = useState(false);
  const [saving, setSaving] = useState(false);
  const clause = corrected ?? clauseForStandard(standard);

  const copyClause = () => {
    safeCopy(`${clause.heading}\n\n${clause.body}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const saveDraft = async () => {
    setSaving(true);
    await apiSaveDraft({
      project_name: `Tender Specification - ${standard.code}`,
      standard_code: standard.code,
      clause_heading: clause.heading,
      clause_body: clause.body,
      domain: (standard as any).domain || "cables",
      officer_notes: "Synthesized specification clause saved from Standards Explorer.",
    });
    setSaving(false);
    setSaved(true);
    onSave?.();
    window.setTimeout(() => setSaved(false), 2000);
  };

  const exportDocx = async () => {
    const payload = {
      standard_code: standard.code,
      clause_heading: clause.heading,
      clause_body: clause.body,
      domain: (standard as any).domain || "cables",
      format: "docx",
    };
    const apiRes = await apiExportClause(payload);
    const filename = apiRes?.filename || `${standard.id || "tender"}-clause.docx`;
    const content = apiRes?.content || `${clause.heading}\n\n${clause.body}`;
    const blob = new Blob([content], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
    setExported(true);
    onExport?.();
    window.setTimeout(() => setExported(false), 2000);
  };

  return (
    <article className="clause-card card-surface">
      <div className="clause-header">
        <div>
          <div className="eyebrow green-eyebrow">
            <Sparkles size={13} /> {sourceLockedLabel()}
          </div>
          <h2>{clauseTextLabel()}</h2>
          <p>{clauseTextSubcopy()}</p>
        </div>
        <div className="clause-ready">
          <Check size={14} /> {clauseReadyCopy()}
        </div>
      </div>
      <div className="clause-editor">
        <div className="clause-toolbar">
          <span className="mono">{clause.heading}</span>
          <span className="clause-toolbar-right">
            <span>
              <FileText size={13} /> {sourceCount(standard)} sources
            </span>
            <span className="mono">GeM / CPPP</span>
          </span>
        </div>
        <div className="clause-body">
          <p>{clause.body}</p>
        </div>
        <div className="clause-source">
          <span>{clauseSourceText(standard)}</span>
          <span className="mono">DRAFT · {standard.code}</span>
        </div>
      </div>
      <div className="clause-actions">
        <span className="clause-disclaimer">Auto-synthesized from current, cited records. Review before issue.</span>
        <div className="clause-action-buttons">
          <button
            type="button"
            className="secondary-button"
            onClick={() => void saveDraft()}
            disabled={saving}
          >
            <Save size={14} /> {saved ? "SAVED TO WORKSPACE" : saving ? "SAVING…" : "SAVE TO MY WORKSPACE"}
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => void exportDocx()}
          >
            <Download size={14} /> {exported ? "DOCX READY" : "EXPORT TO GeM DOCX"}
          </button>
          <button
            type="button"
            className={`primary-button copy-button ${copied ? "success" : ""}`}
            onClick={copyClause}
          >
            {copied ? <Check size={15} /> : <Clipboard size={15} />} {copyButtonLabel(copied)}
          </button>
        </div>
      </div>
      {(copied || saved || exported) && (
        <div className="toast-inline">
          <Check size={13} />{" "}
          {copied ? copyFeedback() : saved ? "Draft saved to officer workspace database" : "DOCX export prepared"}
        </div>
      )}
    </article>
  );
}
