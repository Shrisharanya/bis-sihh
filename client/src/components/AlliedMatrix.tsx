import { ChevronDown, ChevronRight, FileText, FlaskConical, Layers3, Scale, ShieldCheck, Wrench } from "lucide-react";
import { useState, useMemo } from "react";
import type { AlliedStandard, StandardResult } from "../types";
import {
  allGroups,
  groupDescription,
  matrixGroupCode,
  matrixHeading,
  matrixSubheading,
  matrixSummary,
  sourceVerified,
  secondarySourceLabel,
} from "../types";

interface AlliedMatrixProps {
  standard?: StandardResult | null;
}

const groupIcons: Record<string, typeof Wrench> = {
  "Conductor Specs": Layers3,
  "Armouring Material": Wrench,
  "Compulsory Test Methods": FlaskConical,
  "Physical tests": FlaskConical,
  "Chemical analysis": ShieldCheck,
  "Safety Codes": ShieldCheck,
  "Regulatory Orders": Scale,
  electrical_testing: FlaskConical,
  fire_safety: ShieldCheck,
  mechanical_specs: Wrench,
  regulatory_qco: Scale,
  chemical_analysis: ShieldCheck,
  physical_testing: FlaskConical,
  quality_assurance: ShieldCheck,
};

export default function AlliedMatrix({ standard }: AlliedMatrixProps) {
  const groups = useMemo(() => (standard ? allGroups(standard) : []), [standard]);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const isGroupOpen = (group: string) => {
    if (open[group] !== undefined) return open[group];
    return group === groups[0];
  };

  const toggleGroup = (group: string) => {
    setOpen((prev) => ({ ...prev, [group]: !isGroupOpen(group) }));
  };

  const alliedList = standard?.allied ?? [];

  return (
    <article className="matrix-card card-surface">
      <div className="card-topline">
        <span className="eyebrow amber-eyebrow">{secondarySourceLabel()}</span>
        <span className="record-id">{standard ? matrixSummary(standard) : "0 allied references"}</span>
      </div>
      <div className="panel-heading">
        <div>
          <h2>{matrixHeading()}</h2>
          <p>{matrixSubheading()}</p>
        </div>
        <span className="verified-count">
          <ShieldCheck size={14} /> all verified
        </span>
      </div>
      <div className="matrix-list">
        {groups.length === 0 ? (
          <div
            className="matrix-empty"
            style={{
              padding: "24px 16px",
              color: "var(--muted)",
              fontStyle: "italic",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            No allied standards registered for this clause snapshot.
          </div>
        ) : (
          groups.map((group) => {
            const Icon = group && groupIcons[group] ? groupIcons[group] : FileText;
            const items = alliedList.filter((item) => item?.group === group);
            const isOpen = isGroupOpen(group);
            return (
              <div className={`matrix-group ${isOpen ? "expanded" : ""}`} key={group}>
                <button
                  type="button"
                  className="matrix-group-button"
                  onClick={() => toggleGroup(group)}
                  aria-expanded={isOpen}
                >
                  <span className="group-icon">
                    <Icon size={15} />
                  </span>
                  <span className="group-title">
                    <strong>{group}</strong>
                    <small>{groupDescription(group)}</small>
                  </span>
                  <span className="group-count mono">{items.length.toString().padStart(2, "0")}</span>
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                {isOpen && (
                  <div className="matrix-items">
                    {items.map((item: AlliedStandard, idx: number) => (
                      <div className="matrix-item" key={item?.code || `item-${idx}`}>
                        <div>
                          <div className="matrix-code mono">{item?.code || "REF"}</div>
                          <div className="matrix-name">{item?.title || "Untitled Reference"}</div>
                          <div className="matrix-relevance">{item?.relevance || "Normative requirement"}</div>
                        </div>
                        <div className="matrix-item-right">
                          <span className="group-code mono">{matrixGroupCode(group)}</span>
                          {sourceVerified(item) && <ShieldCheck size={14} className="verified-icon" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      <div className="matrix-footer">
        <span>References are linked to primary standard clauses</span>
        <span className="mono">{alliedList.length} refs</span>
      </div>
    </article>
  );
}
