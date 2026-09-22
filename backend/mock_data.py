from copy import deepcopy

CABLE = {
    "id": "is-7098-p1-1988",
    "code": "IS 7098 (Part 1) : 1988",
    "title": "Crosslinked Polyethylene Insulated Thermoplastic Sheathed Cables",
    "status": "CURRENT & ACTIVE",
    "year": "1988",
    "ics": "29.060.20",
    "scope": "XLPE insulated, PVC sheathed cables for working voltages up to and including 1100 V. The standard defines construction, dimensions, electrical properties and acceptance tests for power distribution cable assemblies.",
    "confidence": 98.4,
    "qco": "Wires and Cables (Quality Control) Order, 2023",
    "qcoShort": "Wires & Cables QCO 2023",
    "scheme": "ISI Mark Scheme I",
    "amendments": "Amendments 1 to 4",
    "allied": [
        {"code": "IS 8130 : 2013", "title": "Conductors for insulated electric cables", "group": "Conductor Specs", "relevance": "Conductor material, resistance and stranding", "verified": True},
        {"code": "IS 5831 : 1984", "title": "PVC insulation and sheath of electric cables", "group": "Conductor Specs", "relevance": "Insulation and sheath compound requirements", "verified": True},
        {"code": "IS 3975 : 1999", "title": "Mild steel wires, formed wires and tapes for armouring", "group": "Armouring Material", "relevance": "Armour material and mechanical properties", "verified": True},
        {"code": "IS 10810 (Part 53)", "title": "Methods of test for cables — flame retardance", "group": "Compulsory Test Methods", "relevance": "Vertical flame propagation / fire performance", "verified": True},
        {"code": "IS 10810 (Part 1)", "title": "Conductor resistance test", "group": "Compulsory Test Methods", "relevance": "Routine electrical acceptance test", "verified": True},
        {"code": "IS 10810 (Part 62)", "title": "Smoke density of cable materials", "group": "Compulsory Test Methods", "relevance": "Low-smoke performance evidence", "verified": True},
    ],
    "clause": "The bidder shall offer 3.5 core, 1.1 kV grade XLPE insulated and PVC sheathed power cables conforming to IS 7098 (Part 1) : 1988 with Amendments 1 to 4. Conductors shall comply with IS 8130 : 2013; insulation and sheath with IS 5831 : 1984; armour, where specified, with IS 3975 : 1999. Testing shall be carried out as per the applicable IS 10810 series methods. The product shall bear the BIS Standard Mark under the Wires and Cables QCO 2023 and valid ISI licence."
}

CEMENT = {
    "id": "is-12269-2013",
    "code": "IS 12269 : 2013",
    "title": "Ordinary Portland Cement — 53 Grade",
    "status": "CURRENT & ACTIVE",
    "year": "2013",
    "ics": "91.100.10",
    "scope": "Requirements for ordinary Portland cement of 53 grade used for structural concrete and high-strength applications, including chemical, physical and performance requirements.",
    "confidence": 97.8,
    "qco": "Cement (Quality Control) Order, 2003",
    "qcoShort": "Cement QCO 2003",
    "scheme": "ISI Mark Scheme I",
    "amendments": "Amendments 1 to 2",
    "allied": [
        {"code": "IS 4031 Series", "title": "Methods of physical tests for hydraulic cement", "group": "Physical tests", "relevance": "Fineness, soundness, setting time and strength", "verified": True},
        {"code": "IS 4032 : 1985", "title": "Method of chemical analysis of hydraulic cement", "group": "Chemical analysis", "relevance": "Chemical composition and loss on ignition", "verified": True},
    ],
    "clause": "Ordinary Portland Cement 53 Grade shall conform to IS 12269 : 2013 with Amendments 1 to 2. The supplier shall furnish a valid BIS licence and test certificates covering the chemical requirements of IS 4032 and physical tests under the IS 4031 series. Each consignment shall be accompanied by batch-wise conformity documentation."
}

GRAPH = {
    "nodes": [
        {"id": "primary", "label": "IS 7098 (Part 1):1988", "kind": "primary", "detail": "Primary product standard — XLPE insulated cables up to 1100 V."},
        {"id": "conductor", "label": "IS 8130:2013", "kind": "normative_refs", "detail": "Conductor material, resistance and stranding requirements."},
        {"id": "sheath", "label": "IS 5831:1984", "kind": "normative_refs", "detail": "PVC insulation and sheath compound requirements."},
        {"id": "armour", "label": "IS 3975:1999", "kind": "normative_refs", "detail": "Mild steel wires, formed wires and tapes for armouring."},
        {"id": "flame", "label": "IS 10810 Part 53", "kind": "test_methods", "detail": "Vertical flame propagation and flame retardance test method."},
        {"id": "qco", "label": "Cables QCO 2023", "kind": "qco_mandates", "detail": "Statutory Quality Control Order — BIS Standard Mark mandatory."},
        {"id": "old", "label": "IS 694:1990", "kind": "superseded_refs", "detail": "Withdrawn reference detected in tender draft; do not cite."},
    ],
    "edges": [
        {"from": "primary", "to": "conductor", "label": "requires"},
        {"from": "primary", "to": "sheath", "label": "requires"},
        {"from": "primary", "to": "armour", "label": "requires"},
        {"from": "primary", "to": "flame", "label": "tested by"},
        {"from": "primary", "to": "qco", "label": "mandated by"},
        {"from": "old", "to": "primary", "label": "superseded by"},
    ]
}

AUDIT = {
    "fileName": "Tender_GeM_Elect_2026.pdf",
    "items": [
        {"line": "Line Item 1", "title": "PVC insulated power cable, 1.1 kV", "standard": "IS 694 : 1990", "status": "critical", "finding": "Cited standard is withdrawn and superseded. The clause also omits low-smoke and zero-halogen fire test mandates.", "recommendation": "Replace with IS 694 : 2010 + Amendments 1 to 4 and add IS 10810 flame-retardance evidence."},
        {"line": "Line Item 2", "title": "High-strength deformed steel bar Fe 500D", "standard": "IS 1786 : 2008", "status": "compliant", "finding": "Reference is active for the cited product class. Mechanical and chemical conformity fields are present.", "recommendation": "Retain reference; request heat-wise test certificate and BIS licence number at supply stage."},
    ],
    "summary": {"critical": 1, "compliant": 1, "coverage": "82%"}
}

def search(query: str):
    normalized = query.lower()
    cable_terms = ("cable", "xlpe", "तार", "केबल", "1.1kv", "7098")
    is_cable = any(term in normalized for term in cable_terms)
    result = deepcopy(CABLE if is_cable else CEMENT)
    return {"primary": result, "matched_on": ["XLPE", "cable", "1.1 kV", "IS 7098"] if is_cable else ["cement", "53 grade", "IS 12269"]}


def audit(corrected: bool = False):
    result = deepcopy(AUDIT)
    if corrected:
        result["items"][0].update({"standard": "IS 694 : 2010 + Amd. 1 to 4", "status": "compliant", "finding": "Draft corrected: current reference inserted and fire test requirement restored.", "recommendation": "Review the generated clause, then issue the updated tender version."})
        result["summary"] = {"critical": 0, "compliant": 2, "coverage": "100%"}
    return result
