import {
  Archive,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileEdit,
  FolderOpen,
  History,
  LockKeyhole,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  apiDeleteDraft,
  apiGetAuditHistory,
  apiGetWorkspace,
  apiSaveDraft,
} from "../types";
import { auditHistory as fallbackAuditHistory, savedDrafts as fallbackDrafts } from "../mockData";

interface OfficerWorkspaceProps {
  onLoadDraft: (standard: string) => void;
}

export default function OfficerWorkspace({ onLoadDraft }: OfficerWorkspaceProps) {
  const [profile, setProfile] = useState<any>({
    officer_id: "GOV-8941",
    name: "S. Sharma",
    designation: "Exec. Engineer · PWD / GeM Officer",
  });
  const [drafts, setDrafts] = useState<any[]>(fallbackDrafts);
  const [auditList, setAuditList] = useState<any[]>(fallbackAuditHistory);
  const [stats, setStats] = useState<any>({
    total_drafts: 3,
    total_audits: 12,
    critical_defects_intercepted: 2,
    last_active: "04:12",
  });
  const [refreshing, setRefreshing] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [newProject, setNewProject] = useState("");
  const [newCode, setNewCode] = useState("IS 7098 (Part 1) : 1988");
  const [newHeading, setNewHeading] = useState("4.2.1 Power cable — conformity and testing");
  const [newBody, setNewBody] = useState(
    "The bidder shall offer 3.5 core, 1.1 kV grade XLPE insulated and PVC sheathed power cables conforming to IS 7098 (Part 1) : 1988 with Amendments 1 to 4."
  );

  const loadWorkspace = async () => {
    setRefreshing(true);
    const data = await apiGetWorkspace();
    if (data) {
      if (data.officer) setProfile(data.officer);
      if (data.drafts && data.drafts.length > 0) {
        setDrafts(
          data.drafts.map((d: any) => ({
            id: d.draft_id || d.id,
            title: d.project_name || d.title,
            standard: d.standard_code || d.standard,
            updated: d.created_at ? new Date(d.created_at).toLocaleDateString() : "Today",
            status: "Saved",
          }))
        );
      }
      if (data.audit_history && data.audit_history.length > 0) {
        setAuditList(
          data.audit_history.map((a: any) => ({
            id: a.audit_id || a.id,
            file: a.file_name || a.file,
            date: a.analyzed_at ? new Date(a.analyzed_at).toLocaleDateString() : "Recent",
            status: a.critical_count ? `${a.critical_count} Defects Flagged` : "Fully Compliant",
          }))
        );
      }
      if (data.stats) setStats(data.stats);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    void loadWorkspace();
  }, []);

  const handleCreateDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.trim()) return;
    await apiSaveDraft({
      project_name: newProject.trim(),
      standard_code: newCode.trim(),
      clause_heading: newHeading.trim(),
      clause_body: newBody.trim(),
      domain: newCode.includes("7098") ? "cables" : newCode.includes("12269") ? "cement" : "steel",
      officer_notes: "Officer created specification draft.",
    });
    setShowNewModal(false);
    setNewProject("");
    await loadWorkspace();
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await apiDeleteDraft(id);
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  const handleOpenFullHistory = async () => {
    setShowFullHistory(!showFullHistory);
    if (!showFullHistory) {
      const full = await apiGetAuditHistory();
      if (full && full.length > 0) {
        setAuditList(
          full.map((a: any) => ({
            id: a.audit_id || a.id,
            file: a.file_name || a.file,
            date: a.analyzed_at ? new Date(a.analyzed_at).toLocaleDateString() : "Recent",
            status: a.critical_count ? `${a.critical_count} Defects Flagged` : "Fully Compliant",
          }))
        );
      }
    }
  };

  return (
    <section className="workspace-view">
      <div className="view-heading-row">
        <div>
          <div className="section-kicker">
            <span className="kicker-dot green-dot" /> OFFICER WORKSPACE / AUTHENTICATED SESSION
          </div>
          <h1>My procurement workspace</h1>
          <p>Save working clauses, revisit audit findings and keep every tender decision source-backed.</p>
        </div>
        <div className="workspace-profile">
          <div className="profile-avatar">
            {profile.name
              ? profile.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
              : "SS"}
          </div>
          <div>
            <strong>{profile.name || "S. Sharma"}</strong>
            <span>{profile.designation || "Exec. Engineer · PWD / GeM Officer"}</span>
            <small className="mono">ID #{profile.officer_id || "GOV-8941"}</small>
          </div>
          <LockKeyhole size={14} />
        </div>
      </div>

      <div className="workspace-metrics">
        <div>
          <span className="workspace-metric-icon">
            <FileEdit size={15} />
          </span>
          <strong>{drafts.length.toString().padStart(2, "0")}</strong>
          <span>Saved drafts</span>
        </div>
        <div>
          <span className="workspace-metric-icon">
            <History size={15} />
          </span>
          <strong>{auditList.length.toString().padStart(2, "0")}</strong>
          <span>Audit records</span>
        </div>
        <div>
          <span className="workspace-metric-icon">
            <ShieldCheck size={15} />
          </span>
          <strong>96%</strong>
          <span>Compliant issue rate</span>
        </div>
        <div>
          <span className="workspace-metric-icon">
            <Clock3 size={15} />
          </span>
          <strong>04:12</strong>
          <span>Next catalogue sync</span>
        </div>
      </div>

      {showNewModal && (
        <div
          style={{
            marginBottom: "16px",
            padding: "16px",
            background: "rgba(16, 26, 43, 0.95)",
            border: "1px solid var(--blue)",
            borderRadius: "6px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <strong style={{ color: "#dce8f8", fontSize: "14px" }}>Create New Tender Specification Draft</strong>
            <button
              type="button"
              className="icon-button"
              onClick={() => setShowNewModal(false)}
              aria-label="Close form"
            >
              <X size={14} />
            </button>
          </div>
          <form onSubmit={handleCreateDraft} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
              <label style={{ display: "block", color: "var(--muted)", fontSize: "11px", marginBottom: "4px" }}>
                Project / Tender Designation
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#0a0f1d",
                  border: "1px solid var(--line)",
                  borderRadius: "4px",
                  color: "#fff",
                }}
                placeholder="e.g. CPWD Hospital Feeder Cable Package"
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
                required
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div>
                <label style={{ display: "block", color: "var(--muted)", fontSize: "11px", marginBottom: "4px" }}>
                  BIS Standard Code
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: "8px",
                    background: "#0a0f1d",
                    border: "1px solid var(--line)",
                    borderRadius: "4px",
                    color: "#fff",
                  }}
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  required
                />
              </div>
              <div>
                <label style={{ display: "block", color: "var(--muted)", fontSize: "11px", marginBottom: "4px" }}>
                  Clause Section Heading
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: "8px",
                    background: "#0a0f1d",
                    border: "1px solid var(--line)",
                    borderRadius: "4px",
                    color: "#fff",
                  }}
                  value={newHeading}
                  onChange={(e) => setNewHeading(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label style={{ display: "block", color: "var(--muted)", fontSize: "11px", marginBottom: "4px" }}>
                Synthesized Specification Clause
              </label>
              <textarea
                rows={3}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#0a0f1d",
                  border: "1px solid var(--line)",
                  borderRadius: "4px",
                  color: "#fff",
                  fontFamily: "var(--mono)",
                  fontSize: "11px",
                }}
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                required
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowNewModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="primary-button">
                Save to Backend Workspace
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="workspace-grid">
        <article className="workspace-card card-surface">
          <div className="workspace-card-heading">
            <div>
              <span className="eyebrow blue-eyebrow">
                <FolderOpen size={13} /> SAVED TENDER DRAFTS
              </span>
              <h2>Continue a working specification</h2>
            </div>
            <button
              type="button"
              className="secondary-button"
              onClick={() => setShowNewModal(true)}
            >
              <Plus size={14} /> New draft
            </button>
          </div>
          <div className="draft-table">
            <div className="draft-table-head">
              <span>DOCUMENT / STANDARD</span>
              <span>LAST UPDATED</span>
              <span>STATE</span>
              <span />
            </div>
            {drafts.map((draft) => (
              <div
                className="draft-row"
                key={draft.id}
                role="button"
                tabIndex={0}
                onClick={() => onLoadDraft(draft.standard)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onLoadDraft(draft.standard);
                }}
                style={{ cursor: "pointer" }}
              >
                <span className="draft-name">
                  <span className="draft-icon">
                    <FileEdit size={14} />
                  </span>
                  <span>
                    <strong>{draft.title}</strong>
                    <small className="mono">
                      {draft.id} · {draft.standard}
                    </small>
                  </span>
                </span>
                <span className="draft-date mono">{draft.updated}</span>
                <span className={`draft-status ${draft.status === "Saved" ? "saved" : "review"}`}>
                  {draft.status === "Saved" ? <CheckCircle2 size={13} /> : <Clock3 size={13} />}
                  {draft.status}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <button
                    type="button"
                    style={{
                      border: 0,
                      background: "transparent",
                      color: "var(--red)",
                      cursor: "pointer",
                      padding: "2px",
                    }}
                    onClick={(e) => void handleDelete(e, draft.id)}
                    title="Delete draft"
                    aria-label="Delete draft"
                  >
                    <Trash2 size={13} />
                  </button>
                  <ArrowUpRight size={14} className="row-arrow" />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="workspace-card card-surface">
          <div className="workspace-card-heading">
            <div>
              <span className="eyebrow amber-eyebrow">
                <History size={13} /> AUDIT HISTORY
              </span>
              <h2>Recent tender checks</h2>
            </div>
            <button
              type="button"
              className="icon-button"
              onClick={() => void loadWorkspace()}
              title="Refresh workspace from backend"
              aria-label="Refresh workspace"
            >
              <RefreshCw size={15} className={refreshing ? "spin" : ""} />
            </button>
          </div>
          <div className="history-list">
            {(showFullHistory ? auditList : auditList.slice(0, 3)).map((entry) => (
              <div className="history-row" key={entry.id}>
                <div className="history-icon">
                  <Archive size={14} />
                </div>
                <div className="history-copy">
                  <strong>{entry.file}</strong>
                  <small className="mono">
                    {entry.id} · {entry.date}
                  </small>
                </div>
                <span
                  className={`history-status ${
                    entry.status.includes("Compliant")
                      ? "good"
                      : entry.status.includes("Pending")
                      ? "pending"
                      : "resolved"
                  }`}
                >
                  {entry.status}
                </span>
              </div>
            ))}
          </div>
          <div className="workspace-card-footer">
            <span>
              <ShieldCheck size={13} /> All records are private to this officer session.
            </span>
            <button
              type="button"
              className="text-button"
              onClick={() => void handleOpenFullHistory()}
            >
              {showFullHistory ? "Collapse history" : "Open full history"} <ArrowUpRight size={13} />
            </button>
          </div>
        </article>
      </div>

      <div className="workspace-bottom-note">
        <BookOpen size={15} />
        <span>
          <strong>Source-lock policy:</strong> saved drafts preserve the exact BIS references, amendment set and QCO
          basis used during synthesis.
        </span>
        <Search size={14} />
        <span className="mono">LAST SYNC · {stats.last_active ? new Date(stats.last_active).toLocaleDateString() : "TODAY"} / IST</span>
      </div>
    </section>
  );
}
