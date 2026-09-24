import { ChevronDown, ChevronRight, FlaskConical, Layers3, ShieldCheck, Wrench } from "lucide-react";
import { useState } from "react";
import type { AlliedStandard, Language, StandardResult } from "../types";
import { tx } from "../utils/translations";
import { allGroups, groupDescription, matrixGroupCode, matrixHeading, matrixSubheading, matrixSummary, sourceVerified, secondarySourceLabel } from "../types";

interface AlliedMatrixProps { standard: StandardResult; language?: Language; }
const groupIcons: Record<string, typeof Wrench> = { "Conductor Specs": Layers3, "Armouring Material": Wrench, "Compulsory Test Methods": FlaskConical, "Physical tests": FlaskConical, "Chemical analysis": ShieldCheck };

export default function AlliedMatrix({ standard, language = "en" }: AlliedMatrixProps) {
  const [open, setOpen] = useState<Record<string, boolean>>({ [allGroups(standard)[0]]: true });
  return <article className="matrix-card card-surface">
    <div className="card-topline"><span className="eyebrow amber-eyebrow">{secondarySourceLabel()}</span><span className="record-id">{matrixSummary(standard)}</span></div>
    <div className="panel-heading"><div><h2>{language === "hi" ? tx(language, "allied") : matrixHeading()}</h2><p>{matrixSubheading()}</p></div><span className="verified-count"><ShieldCheck size={14} /> {language === "hi" ? "सभी सत्यापित" : "all verified"}</span></div>
    <div className="matrix-list">{allGroups(standard).map((group) => { const Icon = groupIcons[group]; const items = standard.allied.filter((item) => item.group === group); const isOpen = open[group]; return <div className={`matrix-group ${isOpen ? "expanded" : ""}`} key={group}>
      <button className="matrix-group-button" onClick={() => setOpen({ ...open, [group]: !isOpen })}><span className="group-icon"><Icon size={15} /></span><span className="group-title"><strong>{group}</strong><small>{groupDescription(group)}</small></span><span className="group-count mono">{items.length.toString().padStart(2, "0")}</span>{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</button>
      {isOpen && <div className="matrix-items">{items.map((item: AlliedStandard) => <div className="matrix-item" key={item.code}><div><div className="matrix-code mono">{item.code}</div><div className="matrix-name">{item.title}</div><div className="matrix-relevance">{item.relevance}</div></div><div className="matrix-item-right"><span className="group-code mono">{matrixGroupCode(group)}</span>{sourceVerified(item) && <ShieldCheck size={14} className="verified-icon" />}</div></div>)}</div>}
    </div>; })}</div>
    <div className="matrix-footer"><span>References are linked to primary standard clauses</span><span className="mono">{standard.allied.length} refs</span></div>
  </article>;
}
