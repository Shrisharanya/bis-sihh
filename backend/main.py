from typing import Optional

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from mock_data import GRAPH, audit, search

app = FastAPI(title="ManakSetu BIS Procurement Intelligence API", version="0.9.6")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


class SearchRequest(BaseModel):
    query: str = Field(min_length=1, max_length=500)
    language: str = Field(default="en", pattern="^(en|hi)$")


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "manaksetu-bis-api", "version": app.version, "synced": "2026-09"}


@app.post("/api/search")
def standard_search(payload: SearchRequest):
    result = search(payload.query)
    return {**result, "language": payload.language, "source": "BIS catalogue snapshot / deterministic demo index"}


@app.get("/api/graph/{standard_id}")
def graph(standard_id: str):
    return {"standard_id": standard_id, **GRAPH, "source_locked": True}


@app.post("/api/audit-tender")
def audit_tender(file: Optional[UploadFile] = File(default=None)):
    file_name = file.filename if file and file.filename else "Tender_GeM_Elect_2026.pdf"
    result = audit(False)
    result["fileName"] = file_name
    return result


@app.post("/api/audit-tender/corrected")
def corrected_audit():
    return audit(True)


@app.get("/")
def root():
    return {"name": "ManakSetu", "docs": "/docs", "health": "/api/health"}
