import pytest
from fastapi.testclient import TestClient

from main import app, DRAFTS_DB, AUDIT_HISTORY_DB

client = TestClient(app)


def test_health_and_root():
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ok"
    assert "cables" in data["domains_indexed"]
    assert "cement" in data["domains_indexed"]
    assert "steel" in data["domains_indexed"]
    assert "electronics" in data["domains_indexed"]

    root_res = client.get("/")
    assert root_res.status_code == 200
    assert "ManakSetu" in root_res.json()["name"]


def test_search_multi_domain_cable():
    res = client.post("/api/search", json={"query": "3.5 core XLPE cable 1.1kV", "language": "en"})
    assert res.status_code == 200
    data = res.json()
    assert "primary" in data
    assert data["primary"]["code"] == "IS 7098 (Part 1) : 1988"
    assert data["primary"]["domain"] == "cables"
    assert data["primary"]["qco_mandatory"] is True
    assert "Wires & Cables QCO 2023" in data["primary"]["qcoShort"]

    # Verify allied standards
    allied_codes = [a["code"] for a in data["primary"]["allied"]]
    assert any("8130" in c for c in allied_codes)
    assert any("5831" in c for c in allied_codes)
    assert any("3975" in c for c in allied_codes)
    assert any("10810" in c for c in allied_codes)


def test_search_multi_domain_cement():
    res = client.post("/api/search", json={"query": "Ordinary Portland Cement 53 grade", "domain": "cement"})
    assert res.status_code == 200
    data = res.json()
    assert data["primary"]["code"] == "IS 12269 : 2013"
    assert data["primary"]["domain"] == "cement"
    allied_codes = [a["code"] for a in data["primary"]["allied"]]
    assert any("4031" in c for c in allied_codes)
    assert any("4032" in c for c in allied_codes)
    assert any("4987" in c for c in allied_codes)


def test_search_multi_domain_steel():
    res = client.post("/api/search", json={"query": "Fe 500D TMT high strength deformed steel rebar"})
    assert res.status_code == 200
    data = res.json()
    assert data["primary"]["code"] == "IS 1786 : 2008"
    assert data["primary"]["domain"] == "steel"
    allied_codes = [a["code"] for a in data["primary"]["allied"]]
    assert any("1608" in c for c in allied_codes)
    assert any("1599" in c for c in allied_codes)
    assert any("228" in c for c in allied_codes)


def test_search_multi_domain_electronics():
    res = client.post("/api/search", json={"query": "IT Equipment Safety MeitY CRS hardware"})
    assert res.status_code == 200
    data = res.json()
    assert data["primary"]["code"] == "IS 13252 (Part 1) : 2010"
    assert data["primary"]["domain"] == "electronics"
    assert data["primary"]["scheme_type"] == "CRS"
    allied_codes = [a["code"] for a in data["primary"]["allied"]]
    assert any("616" in c for c in allied_codes)
    assert any("16046" in c for c in allied_codes)


def test_granular_clause_query_flame_retardance():
    # Query matching specific clause: "flame retardance Part 53"
    res = client.post("/api/search", json={"query": "flame retardance Part 53"})
    assert res.status_code == 200
    data = res.json()
    assert data["primary"]["domain"] == "cables"
    assert len(data["matching_clauses"]) > 0
    top_clause = data["matching_clauses"][0]
    assert "flame" in top_clause["title"].lower() or "10810 (part 53)" in top_clause["text"].lower()


def test_granular_clause_query_compressive_strength():
    # Query matching specific clause: "compressive strength 7 days"
    res = client.post("/api/search", json={"query": "compressive strength 7 days"})
    assert res.status_code == 200
    data = res.json()
    assert data["primary"]["domain"] == "cement"
    assert len(data["matching_clauses"]) > 0
    top_clause = data["matching_clauses"][0]
    assert "compressive" in top_clause["title"].lower() or "37 mpa" in top_clause["text"].lower()


def test_granular_clause_query_proof_stress():
    # Query matching specific clause: "0.2 percent proof stress"
    res = client.post("/api/search", json={"query": "0.2 percent proof stress"})
    assert res.status_code == 200
    data = res.json()
    assert data["primary"]["domain"] == "steel"
    assert len(data["matching_clauses"]) > 0
    top_clause = data["matching_clauses"][0]
    assert "proof stress" in top_clause["title"].lower() or "0.2 percent proof stress" in top_clause["text"].lower()


def test_granular_clause_query_lithium_cells():
    # Query matching: "lithium cells battery safety"
    res = client.post("/api/search", json={"query": "lithium cells battery safety"})
    assert res.status_code == 200
    data = res.json()
    assert data["primary"]["domain"] == "electronics"
    assert len(data["matching_clauses"]) > 0
    top_clause = data["matching_clauses"][0]
    assert "battery" in top_clause["title"].lower() or "is 16046" in top_clause["text"].lower()


def test_filters_domain_and_scheme():
    # Filter by domain steel
    res = client.post("/api/search", json={"query": "tensile strength", "domain": "steel"})
    assert res.status_code == 200
    assert res.json()["primary"]["domain"] == "steel"

    # Filter by scheme_type CRS
    res_crs = client.post("/api/search", json={"query": "safety equipment", "scheme_type": "CRS"})
    assert res_crs.status_code == 200
    assert res_crs.json()["primary"]["scheme_type"] == "CRS"

    # Filter by clause category fire_safety
    res_fire = client.post(
        "/api/search",
        json={"query": "cable", "clause_category": "fire_safety"}
    )
    assert res_fire.status_code == 200
    for clause in res_fire.json()["matching_clauses"]:
        assert clause["category"] == "fire_safety"


def test_knowledge_graph_endpoints():
    domains = ["cables", "cement", "steel", "electronics"]
    for dom in domains:
        res = client.get(f"/api/graph/{dom}")
        assert res.status_code == 200
        data = res.json()
        assert data["domain"] == dom
        assert len(data["nodes"]) >= 5
        assert len(data["edges"]) >= 4
        # Validate node kinds
        kinds = {n["kind"] for n in data["nodes"]}
        assert "primary" in kinds
        assert "qco_mandates" in kinds

    # Test resolution by standard ID
    res_code = client.get("/api/graph/is-1786-2008")
    assert res_code.status_code == 200
    assert res_code.json()["domain"] == "steel"


def test_officer_workspace_lifecycle():
    # 1. Get workspace
    res = client.get("/api/officer/workspace")
    assert res.status_code == 200
    ws = res.json()
    assert "officer" in ws
    assert ws["officer"]["officer_id"] == "GOV-PROC-8821"
    assert "drafts" in ws
    assert len(ws["drafts"]) >= 3
    assert "audit_history" in ws
    assert ws["stats"]["total_drafts"] == len(ws["drafts"])

    # 2. Create new tender draft
    payload = {
        "project_name": "Solar Micro-grid Substation Cable Package",
        "standard_code": "IS 7098 (Part 1) : 1988",
        "clause_heading": "3.1 Underground solar distribution cables",
        "clause_body": "Cables shall comply with IS 7098 (Part 1) and bear ISI mark under Cables QCO 2023.",
        "domain": "cables",
        "officer_notes": "Verify supplier ISI license validity on BIS Manakonline portal.",
    }
    create_res = client.post("/api/officer/drafts", json=payload)
    assert create_res.status_code == 201
    created_draft = create_res.json()
    draft_id = created_draft["draft_id"]
    assert draft_id.startswith("draft-")
    assert created_draft["project_name"] == payload["project_name"]

    # Verify present in workspace
    ws2 = client.get("/api/officer/workspace").json()
    assert any(d["draft_id"] == draft_id for d in ws2["drafts"])

    # 3. Delete draft
    del_res = client.delete(f"/api/officer/drafts/{draft_id}")
    assert del_res.status_code == 200
    assert del_res.json()["deleted"] is True

    # Confirm not found after deletion
    del_res2 = client.delete(f"/api/officer/drafts/{draft_id}")
    assert del_res2.status_code == 404

    # 4. Get audit history
    history_res = client.get("/api/officer/audit-history")
    assert history_res.status_code == 200
    history = history_res.json()
    assert history["total"] >= 2
    assert len(history["history"]) >= 2


def test_tender_audit_and_correction():
    initial_audits = len(client.get("/api/officer/audit-history").json()["history"])

    # Default file-less audit
    res = client.post("/api/audit-tender")
    assert res.status_code == 200
    data = res.json()
    assert data["summary"]["critical"] >= 1
    assert data["summary"]["compliant"] >= 1

    # Check that audit was logged in officer audit history
    after_history = client.get("/api/officer/audit-history").json()["history"]
    assert len(after_history) == initial_audits + 1

    # Corrected audit
    corr_res = client.post("/api/audit-tender/corrected")
    assert corr_res.status_code == 200
    corr_data = corr_res.json()
    assert corr_data["summary"]["critical"] == 0
    assert corr_data["summary"]["compliant"] >= 2

    # Audit with custom JSON payload containing obsolete steel standard IS 432
    json_audit_payload = {
        "fileName": "Project_Highrise_Structural_Tender.json",
        "items": [
            {
                "line": "Item 101",
                "title": "Plain Round Mild Steel Reinforcement",
                "text": "Supply mild steel plain bars conforming to IS 432 for structural shear walls.",
                "standard": "IS 432 : 1982",
            },
            {
                "line": "Item 102",
                "title": "OPC 53 Grade High Performance Cement",
                "text": "Cement shall conform to IS 12269 : 2013 with 28-day strength of 53 MPa.",
                "standard": "IS 12269 : 2013",
            }
        ]
    }
    custom_res = client.post("/api/audit-tender", json=json_audit_payload)
    assert custom_res.status_code == 200
    custom_data = custom_res.json()
    assert custom_data["summary"]["critical"] == 1
    assert custom_data["summary"]["compliant"] == 1
    assert any("IS 432" in item["standard"] for item in custom_data["items"] if item["status"] == "critical")


def test_export_clause_endpoint():
    payload = {
        "standard_code": "IS 7098 (Part 1) : 1988",
        "clause_heading": "4.2.1 Power cable — conformity and testing",
        "clause_body": "The bidder shall offer 3.5 core, 1.1 kV grade XLPE cables...",
        "domain": "cables",
        "format": "docx",
    }
    res = client.post("/api/export/clause", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert "docx" in data["filename"]
    assert "4.2.1" in data["content"]
    assert data["ready"] is True


def test_copilot_query_endpoint():
    payload = {
        "prompt": "high strength deformed steel bars for seismic RCC columns",
        "domain": "steel",
    }
    res = client.post("/api/copilot/query", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["domain"] == "steel"
    assert "IS 1786" in data["primary_standard"]["code"]
    assert "Steel" in data["primary_standard"]["qco"]
    assert len(data["synthesized_clause"]) > 20
    assert data["confidence"] > 90.0
