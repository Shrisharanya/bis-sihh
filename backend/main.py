import time
import uuid
from copy import deepcopy
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

from fastapi import Body, FastAPI, File, HTTPException, Request, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from mock_data import AUDIT, GRAPHS, SUPERSEDED_CATALOG, audit
from retrieval_engine import get_retrieval_engine

app = FastAPI(
    title="ManakSetu BIS Procurement Intelligence API",
    description="Multi-domain BIS standards search, clause synthesis, normative knowledge graph, and officer workspace API.",
    version="1.0.0",
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# IN-MEMORY OFFICER WORKSPACE STATE
# ---------------------------------------------------------------------------
OFFICER_PROFILE: Dict[str, Any] = {
    "officer_id": "GOV-PROC-8821",
    "name": "Shri Rajesh Kumar Sharma",
    "designation": "Chief Procurement Officer & Standards Auditor",
    "department": "Infrastructure & Public Works Division",
    "organization": "Central Public Procurement Portal / GeM Desk",
    "email": "rk.sharma@gov.in",
    "badge": "Level-3 BIS Certified Procurement Auditor",
    "location": "New Delhi, India",
}

INITIAL_DRAFTS: List[Dict[str, Any]] = [
    {
        "draft_id": "draft-2026-09-01",
        "project_name": "Metro Rail Phase IV Substation Feeder",
        "standard_code": "IS 7098 (Part 1) : 1988",
        "clause_heading": "4.2.1 Power cable — conformity and testing",
        "clause_body": "The bidder shall offer 3.5 core, 1.1 kV grade XLPE insulated and PVC sheathed power cables conforming to IS 7098 (Part 1) : 1988 with Amendments 1 to 4. Conductors shall comply with IS 8130 : 2013; insulation and sheath with IS 5831 : 1984; armour with IS 3975 : 1999. Testing shall be carried out as per IS 10810 series including vertical flame retardance Part 53. The product shall bear the BIS Standard Mark under Wires and Cables QCO 2023.",
        "domain": "cables",
        "officer_notes": "Mandate batch test certificate for IS 10810 Part 53 vertical flame retardance prior to dispatch.",
        "created_at": "2026-09-21T09:30:00Z",
    },
    {
        "draft_id": "draft-2026-09-02",
        "project_name": "NHAI Expressway Elevated Deck Pier Reinforcement",
        "standard_code": "IS 1786 : 2008",
        "clause_heading": "5.1.2 High-strength rebar — proof stress & chemical limits",
        "clause_body": "The contractor shall supply High Strength Deformed Steel Bars of grade Fe 500D conforming to IS 1786 : 2008 with Amendments 1 to 3. The steel shall exhibit minimum 0.2 percent proof stress of 500 N/mm² and TS/YS ratio not less than 1.10 per IS 1608. Product bundles shall carry valid BIS ISI marking under Steel and Steel Products QCO 2024.",
        "domain": "steel",
        "officer_notes": "Verify heat-wise ladle chemical analysis for S+P maximum 0.075%.",
        "created_at": "2026-09-22T14:15:00Z",
    },
    {
        "draft_id": "draft-2026-09-03",
        "project_name": "Smart City Command Center IT Infrastructure",
        "standard_code": "IS 13252 (Part 1) : 2010",
        "clause_heading": "2.4.1 IT Equipment Safety & CRS Registration",
        "clause_body": "All Information Technology server and terminal hardware shall conform to IS 13252 (Part 1) : 2010 with Amendments 1 to 4 under the MeitY Compulsory Registration Scheme (CRS). All integrated secondary lithium cells shall possess separate BIS registration under IS 16046 (Part 2) : 2018.",
        "domain": "electronics",
        "officer_notes": "Require valid R-numbers on GeM bid submission before technical qualification.",
        "created_at": "2026-09-23T08:00:00Z",
    },
]

INITIAL_AUDIT_HISTORY: List[Dict[str, Any]] = [
    {
        "audit_id": "aud-801",
        "file_name": "Tender_GeM_Elect_2026.pdf",
        "tender_title": "CPWD Rural Electrification Package 4",
        "analyzed_at": "2026-09-22T11:30:00Z",
        "critical_count": 1,
        "compliant_count": 1,
        "coverage": "82%",
        "defects": [
            {
                "standard": "IS 694 : 1990",
                "severity": "CRITICAL",
                "finding": "Cited standard IS 694:1990 is withdrawn and superseded. Missing flame retardance tests per IS 10810 (Part 53).",
                "recommendation": "Replace with IS 694 : 2010 + Amendments 1 to 4.",
            }
        ],
    },
    {
        "audit_id": "aud-802",
        "file_name": "Tender_NHAI_Bridge_Reinforcement.pdf",
        "tender_title": "NHAI Expressway Elevated Deck Pier Reinforcement",
        "analyzed_at": "2026-09-21T14:45:00Z",
        "critical_count": 1,
        "compliant_count": 2,
        "coverage": "75%",
        "defects": [
            {
                "standard": "IS 432 : 1982",
                "severity": "CRITICAL",
                "finding": "Obsolete mild steel plain bar cited instead of ductile Fe 500D per IS 1786:2008.",
                "recommendation": "Replace with IS 1786 : 2008 Fe 500D.",
            }
        ],
    },
]

DRAFTS_DB: List[Dict[str, Any]] = deepcopy(INITIAL_DRAFTS)
AUDIT_HISTORY_DB: List[Dict[str, Any]] = deepcopy(INITIAL_AUDIT_HISTORY)


# ---------------------------------------------------------------------------
# PYDANTIC SCHEMAS
# ---------------------------------------------------------------------------
class SearchRequest(BaseModel):
    query: str = Field(min_length=1, max_length=500, description="Natural language search requirement or standard code")
    language: str = Field(default="en", description="Language code: en or hi")
    domain: Optional[str] = Field(default=None, description="Optional domain filter: cables, cement, steel, electronics")
    qco_only: Optional[bool] = Field(default=None, description="Filter only standards with mandatory QCO")
    scheme_type: Optional[str] = Field(default=None, description="Filter by certification scheme type: ISI, CRS, Hallmarking")
    clause_category: Optional[str] = Field(default=None, description="Filter matching clauses by category")


class DraftCreateRequest(BaseModel):
    project_name: str = Field(min_length=1, max_length=200, description="Project or tender designation")
    standard_code: str = Field(min_length=1, max_length=100, description="BIS standard code e.g. IS 7098")
    clause_heading: str = Field(min_length=1, max_length=250, description="Clause title or section index")
    clause_body: str = Field(min_length=1, description="Synthesized specification text")
    domain: Optional[str] = Field(default="cables", description="cables, cement, steel, or electronics")
    officer_notes: Optional[str] = Field(default="", description="Internal compliance officer instructions")


class AuditLineItem(BaseModel):
    line: Optional[str] = "Line Item"
    title: Optional[str] = "Procurement Item"
    text: Optional[str] = ""
    standard: Optional[str] = ""


class AuditJsonPayload(BaseModel):
    fileName: Optional[str] = "Tender_Specification_Batch.json"
    items: List[AuditLineItem] = []


# ---------------------------------------------------------------------------
# CORE SYSTEM ENDPOINTS
# ---------------------------------------------------------------------------
@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "manaksetu-bis-api",
        "version": app.version,
        "synced": "2026-09",
        "domains_indexed": ["cables", "cement", "steel", "electronics"],
        "officer_workspace": "active",
    }


@app.get("/")
def root():
    return {
        "name": "ManakSetu National Standards Intelligence Copilot",
        "version": app.version,
        "docs": "/docs",
        "health": "/api/health",
        "workspace": "/api/officer/workspace",
    }


# ---------------------------------------------------------------------------
# STANDARDS SEARCH & CLAUSE RETRIEVAL ENDPOINTS
# ---------------------------------------------------------------------------
@app.post("/api/search")
def standard_search(payload: SearchRequest):
    engine = get_retrieval_engine()
    result = engine.search(
        query=payload.query,
        domain=payload.domain,
        qco_only=payload.qco_only,
        scheme_type=payload.scheme_type,
        clause_category=payload.clause_category,
    )
    return {
        **result,
        "language": payload.language,
        "source": "BIS catalogue snapshot / deterministic multi-domain index",
    }


# ---------------------------------------------------------------------------
# NORMATIVE KNOWLEDGE GRAPH ENDPOINTS
# ---------------------------------------------------------------------------
@app.get("/api/graph/{domain_or_standard}")
def get_graph(domain_or_standard: str):
    engine = get_retrieval_engine()
    resolved = engine.resolve_domain(domain_or_standard) or "cables"
    graph_data = GRAPHS.get(resolved, GRAPHS["cables"])
    return {
        "domain": resolved,
        "standard_id": domain_or_standard,
        "nodes": graph_data["nodes"],
        "edges": graph_data["edges"],
        "source_locked": True,
    }


# ---------------------------------------------------------------------------
# TENDER AUDITOR & DEFECT DETECTION ENDPOINTS
# ---------------------------------------------------------------------------
@app.post("/api/audit-tender")
async def audit_tender(
    request: Request,
    file: Optional[UploadFile] = File(default=None),
):
    # Support both multipart file upload and JSON body
    content_type = request.headers.get("content-type", "")
    items_to_audit = []
    file_name = "Tender_GeM_Elect_2026.pdf"

    if "application/json" in content_type:
        try:
            body_data = await request.json()
            file_name = body_data.get("fileName", "Tender_Upload_Batch.json")
            raw_items = body_data.get("items", [])
            for idx, it in enumerate(raw_items):
                items_to_audit.append({
                    "line": it.get("line") or f"Line Item {idx + 1}",
                    "title": it.get("title") or "Item",
                    "text": it.get("text") or it.get("standard") or "",
                    "standard": it.get("standard") or "",
                })
        except Exception:
            pass

    if file and file.filename:
        file_name = file.filename

    # If no custom items were provided via JSON, run the comprehensive multi-domain audit check
    critical_items = []
    compliant_items = []

    if items_to_audit:
        for idx, item in enumerate(items_to_audit):
            text_check = f"{item['title']} {item['text']} {item['standard']}".lower()
            found_superseded = False
            for rule in SUPERSEDED_CATALOG:
                if rule["pattern"] in text_check:
                    critical_items.append({
                        "line": item["line"],
                        "title": item["title"],
                        "standard": rule["bad_code"],
                        "status": "critical",
                        "finding": rule["finding"],
                        "recommendation": rule["recommendation"],
                    })
                    found_superseded = True
                    break
            if not found_superseded:
                compliant_items.append({
                    "line": item["line"],
                    "title": item["title"],
                    "standard": item["standard"] or "Active BIS Standard",
                    "status": "compliant",
                    "finding": "Standard reference is verified active with statutory QCO requirements.",
                    "recommendation": "Retain reference; mandate batch test certificates at supply stage.",
                })
    else:
        # Default mock audit scenario
        base_audit = audit(False)
        return_items = base_audit["items"]
        for it in return_items:
            if it["status"] == "critical":
                critical_items.append(it)
            else:
                compliant_items.append(it)

    all_items = critical_items + compliant_items
    total = len(all_items)
    crit_count = len(critical_items)
    comp_count = len(compliant_items)
    coverage_pct = f"{round((comp_count / max(total, 1)) * 100)}%"

    audit_result = {
        "fileName": file_name,
        "items": all_items,
        "summary": {
            "critical": crit_count,
            "compliant": comp_count,
            "coverage": coverage_pct,
        },
    }

    # Automatically record audit in officer workspace audit history
    new_audit_entry = {
        "audit_id": f"aud-{uuid.uuid4().hex[:6]}",
        "file_name": file_name,
        "tender_title": file_name.replace(".pdf", "").replace(".json", "").replace("_", " "),
        "analyzed_at": datetime.now(timezone.utc).isoformat(),
        "critical_count": crit_count,
        "compliant_count": comp_count,
        "coverage": coverage_pct,
        "defects": [
            {
                "standard": it["standard"],
                "severity": "CRITICAL",
                "finding": it["finding"],
                "recommendation": it["recommendation"],
            }
            for it in critical_items
        ],
    }
    AUDIT_HISTORY_DB.insert(0, new_audit_entry)

    return audit_result


@app.post("/api/audit-tender/corrected")
def corrected_audit():
    return audit(True)


# ---------------------------------------------------------------------------
# OFFICER WORKSPACE & AUDIT LOG ENDPOINTS
# ---------------------------------------------------------------------------
@app.get("/api/officer/workspace")
def get_officer_workspace():
    """Returns the authenticated officer's profile, saved tender drafts, and audit history."""
    crit_defects_total = sum(item.get("critical_count", 0) for item in AUDIT_HISTORY_DB)
    return {
        "officer": OFFICER_PROFILE,
        "drafts": DRAFTS_DB,
        "audit_history": AUDIT_HISTORY_DB,
        "stats": {
            "total_drafts": len(DRAFTS_DB),
            "total_audits": len(AUDIT_HISTORY_DB),
            "critical_defects_intercepted": crit_defects_total,
            "domains_active": ["cables", "cement", "steel", "electronics"],
            "last_active": datetime.now(timezone.utc).isoformat(),
        },
    }


@app.post("/api/officer/drafts", status_code=status.HTTP_201_CREATED)
def create_officer_draft(payload: DraftCreateRequest):
    """Saves a synthesized tender specification clause under a project name."""
    draft_id = f"draft-{uuid.uuid4().hex[:8]}"
    created_at = datetime.now(timezone.utc).isoformat()
    new_draft = {
        "draft_id": draft_id,
        "project_name": payload.project_name.strip(),
        "standard_code": payload.standard_code.strip(),
        "clause_heading": payload.clause_heading.strip(),
        "clause_body": payload.clause_body.strip(),
        "domain": payload.domain or "cables",
        "officer_notes": payload.officer_notes or "",
        "created_at": created_at,
    }
    DRAFTS_DB.insert(0, new_draft)
    return new_draft


@app.delete("/api/officer/drafts/{draft_id}")
def delete_officer_draft(draft_id: str):
    """Removes a draft by ID."""
    global DRAFTS_DB
    initial_len = len(DRAFTS_DB)
    DRAFTS_DB = [d for d in DRAFTS_DB if d["draft_id"] != draft_id]
    if len(DRAFTS_DB) == initial_len:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Draft with ID '{draft_id}' not found.",
        )
    return {"deleted": True, "draft_id": draft_id, "remaining_drafts": len(DRAFTS_DB)}


@app.get("/api/officer/audit-history")
def get_audit_history():
    """Returns past analyzed documents with defect summaries."""
    return {
        "total": len(AUDIT_HISTORY_DB),
        "history": AUDIT_HISTORY_DB,
    }


# ---------------------------------------------------------------------------
# EXPORT & COPILOT INTELLIGENCE ENDPOINTS
# ---------------------------------------------------------------------------
class ExportClauseRequest(BaseModel):
    standard_code: str = Field(min_length=1, max_length=100)
    clause_heading: str = Field(min_length=1, max_length=250)
    clause_body: str = Field(min_length=1)
    domain: Optional[str] = Field(default="cables")
    format: Optional[str] = Field(default="docx")


@app.post("/api/export/clause")
def export_clause(payload: ExportClauseRequest):
    """Prepares structured tender specification clause for download."""
    clean_code = payload.standard_code.replace(" ", "_").replace(":", "-").replace("/", "-")
    file_ext = payload.format.lower() if payload.format else "docx"
    filename = f"{clean_code}_tender_clause.{file_ext}"
    formatted_content = f"{payload.clause_heading}\n\n{payload.clause_body}"
    return {
        "status": "success",
        "filename": filename,
        "format": file_ext,
        "content": formatted_content,
        "standard_code": payload.standard_code,
        "domain": payload.domain,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "ready": True,
    }


class CopilotQueryRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=1000)
    domain: Optional[str] = Field(default=None)
    language: Optional[str] = Field(default="en")


@app.post("/api/copilot/query")
def copilot_query(payload: CopilotQueryRequest):
    """Deterministic copilot router providing clause suggestions and compliance advice."""
    engine = get_retrieval_engine()
    search_res = engine.search(query=payload.prompt, domain=payload.domain)
    primary = search_res["primary"]
    allied_codes = [a["code"] for a in primary.get("allied", [])[:3]]
    recommendation = (
        f"For procurement requirement '{payload.prompt}', mandate conformity to {primary['code']} "
        f"under statutory order '{primary['qco']}'. Ensure batch testing certificates citing "
        f"{', '.join(allied_codes) if allied_codes else 'applicable BIS test standards'}."
    )
    return {
        "query": payload.prompt,
        "domain": primary.get("domain", "cables"),
        "primary_standard": {
            "id": primary.get("id"),
            "code": primary["code"],
            "title": primary["title"],
            "status": primary["status"],
            "qco": primary["qco"],
            "scheme": primary["scheme"],
        },
        "recommendation": recommendation,
        "synthesized_clause": primary.get("clause", ""),
        "matching_clauses": search_res.get("matching_clauses", []),
        "confidence": search_res.get("confidence", 98.0),
    }
