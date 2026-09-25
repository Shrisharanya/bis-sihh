from copy import deepcopy
from typing import Any, Dict, List, Optional

# --- DOMAIN 1: CABLES ---
CABLE = {
    "id": "is-7098-p1-1988",
    "code": "IS 7098 (Part 1) : 1988",
    "title": "Crosslinked Polyethylene Insulated Thermoplastic Sheathed Cables",
    "domain": "cables",
    "status": "CURRENT & ACTIVE",
    "year": "1988",
    "ics": "29.060.20",
    "scope": "XLPE insulated, PVC sheathed cables for working voltages up to and including 1100 V. The standard defines construction, dimensions, electrical properties and acceptance tests for power distribution cable assemblies.",
    "confidence": 98.4,
    "qco": "Wires and Cables (Quality Control) Order, 2023",
    "qcoShort": "Wires & Cables QCO 2023",
    "qco_mandatory": True,
    "scheme": "ISI Mark Scheme I",
    "scheme_type": "ISI",
    "amendments": "Amendments 1 to 4",
    "allied": [
        {"code": "IS 8130 : 2013", "title": "Conductors for insulated electric cables", "group": "Conductor Specs", "relevance": "Conductor material, resistance and stranding", "verified": True},
        {"code": "IS 5831 : 1984", "title": "PVC insulation and sheath of electric cables", "group": "Conductor Specs", "relevance": "Insulation and sheath compound requirements", "verified": True},
        {"code": "IS 3975 : 1999", "title": "Mild steel wires, formed wires and tapes for armouring", "group": "Armouring Material", "relevance": "Armour material and mechanical properties", "verified": True},
        {"code": "IS 10810 (Part 53)", "title": "Methods of test for cables — flame retardance", "group": "Compulsory Test Methods", "relevance": "Vertical flame propagation / fire performance", "verified": True},
        {"code": "IS 10810 (Part 1)", "title": "Conductor resistance test", "group": "Compulsory Test Methods", "relevance": "Routine electrical acceptance test", "verified": True},
        {"code": "IS 10810 (Part 62)", "title": "Smoke density of cable materials", "group": "Compulsory Test Methods", "relevance": "Low-smoke performance evidence", "verified": True},
    ],
    "clauses": [
        {
            "clause_id": "cables-c1",
            "clause_number": "Clause 12.1",
            "title": "Conductor Resistance Test",
            "category": "electrical_testing",
            "text": "Maximum electrical resistance of conductors shall conform to IS 8130 when tested in accordance with IS 10810 (Part 1) at 20 degrees Celsius.",
            "normative_ref": "IS 8130 / IS 10810 Part 1",
        },
        {
            "clause_id": "cables-c2",
            "clause_number": "Clause 15.3",
            "title": "Vertical Flame Retardance Test",
            "category": "fire_safety",
            "text": "The cable samples shall pass vertical flame propagation test as per IS 10810 (Part 53). After the flame application period, the sample shall be self-extinguishing and the uncharred portion measured from the lower edge of the top clamp shall not be less than 50 mm.",
            "normative_ref": "IS 10810 (Part 53)",
        },
        {
            "clause_id": "cables-c3",
            "clause_number": "Clause 16.2",
            "title": "Smoke Density of Sheathing",
            "category": "fire_safety",
            "text": "Smoke density of cable materials tested in accordance with IS 10810 (Part 62) under fire conditions shall exhibit a minimum light transmittance of 60 percent.",
            "normative_ref": "IS 10810 (Part 62)",
        },
        {
            "clause_id": "cables-c4",
            "clause_number": "Clause 9.1",
            "title": "Armour Construction & Galvanizing",
            "category": "mechanical_specs",
            "text": "Armouring where specified shall be of galvanized mild steel wires or formed strips complying with IS 3975 with minimum calculated armour coverage of 90 percent.",
            "normative_ref": "IS 3975 : 1999",
        },
        {
            "clause_id": "cables-c5",
            "clause_number": "Clause 20.1",
            "title": "Mandatory BIS ISI Certification",
            "category": "regulatory_qco",
            "text": "The cable shall bear the BIS Standard Mark (ISI license) under Wires and Cables (Quality Control) Order, 2023. Cables without valid ISI mark shall be rejected.",
            "normative_ref": "Wires and Cables QCO 2023",
        },
    ],
    "clause": "The bidder shall offer 3.5 core, 1.1 kV grade XLPE insulated and PVC sheathed power cables conforming to IS 7098 (Part 1) : 1988 with Amendments 1 to 4. Conductors shall comply with IS 8130 : 2013; insulation and sheath with IS 5831 : 1984; armour, where specified, with IS 3975 : 1999. Testing shall be carried out as per the applicable IS 10810 series methods. The product shall bear the BIS Standard Mark under the Wires and Cables QCO 2023 and valid ISI licence.",
}

# --- DOMAIN 2: CEMENT ---
CEMENT = {
    "id": "is-269-2015",
    "code": "IS 269 : 2015",
    "title": "Ordinary Portland Cement — Specification (Sixth Revision, unifying 33, 43, and 53 Grades)",
    "domain": "cement",
    "status": "CURRENT & ACTIVE",
    "year": "2015",
    "ics": "91.100.10",
    "scope": "Covers manufacture, chemical and physical requirements for Ordinary Portland Cement of 33, 43, and 53 grades. Supersedes IS 8112 and IS 12269.",
    "confidence": 98.5,
    "qco": "Cement (Quality Control) Order, 2003",
    "qcoShort": "Cement QCO 2003",
    "qco_mandatory": True,
    "scheme": "ISI Mark Scheme I",
    "scheme_type": "ISI",
    "amendments": "Amendments 1 to 3",
    "allied": [
        {"code": "IS 4031 Series", "title": "Methods of physical tests for hydraulic cement", "group": "Physical tests", "relevance": "Fineness, soundness, setting time and strength", "verified": True},
        {"code": "IS 4031 (Part 6)", "title": "Methods of physical tests for hydraulic cement: Compressive strength", "group": "Physical tests", "relevance": "Compressive strength determination at 3, 7, and 28 days", "verified": True},
        {"code": "IS 4031 (Part 3)", "title": "Methods of physical tests for hydraulic cement: Soundness", "group": "Physical tests", "relevance": "Soundness by Le Chatelier and Autoclave methods", "verified": True},
        {"code": "IS 4032 : 1985", "title": "Method of chemical analysis of hydraulic cement", "group": "Chemical analysis", "relevance": "Chemical composition and loss on ignition", "verified": True},
        {"code": "IS 4987 : 1993", "title": "Recommendations for sampling of cement", "group": "Physical tests", "relevance": "Sampling guidelines and lot acceptance criteria", "verified": True},
    ],
    "clauses": [
        {
            "clause_id": "cement-c1",
            "clause_number": "Clause 6.1",
            "title": "Compressive Strength Requirements (33, 43, 53 Grades)",
            "category": "mechanical_specs",
            "text": "The compressive strength of mortar cubes tested in accordance with IS 4031 (Part 6) shall satisfy the specified minimum strengths: For 53 Grade OPC: 72±1 hours (3 days) not less than 27 MPa; 168±2 hours (7 days) not less than 37 MPa; and 672±4 hours (28 days) not less than 53 MPa.",
            "normative_ref": "IS 4031 (Part 6)",
        },
        {
            "clause_id": "cement-c2",
            "clause_number": "Clause 5.2",
            "title": "Chemical Composition Limits",
            "category": "chemical_analysis",
            "text": "Chemical composition determined per IS 4032 shall meet: Insoluble residue shall not exceed 4.0 percent; total loss on ignition shall not exceed 4.0 percent; Magnesia shall not exceed 6.0 percent.",
            "normative_ref": "IS 4032 : 1985",
        },
        {
            "clause_id": "cement-c3",
            "clause_number": "Clause 6.2",
            "title": "Soundness and Setting Times",
            "category": "physical_testing",
            "text": "Soundness tested per IS 4031 (Part 3) shall not exceed 10 mm by Le Chatelier method and 0.8 percent by autoclave test. Initial setting time shall not be less than 30 minutes; final setting time not more than 600 minutes.",
            "normative_ref": "IS 4031 (Part 3)",
        },
        {
            "clause_id": "cement-c4",
            "clause_number": "Clause 10.1",
            "title": "Sampling Guidelines",
            "category": "quality_assurance",
            "text": "Representative samples for lot acceptance and testing shall be drawn in accordance with recommendations of IS 4987.",
            "normative_ref": "IS 4987 : 1993",
        },
        {
            "clause_id": "cement-c5",
            "clause_number": "Clause 12.1",
            "title": "Mandatory Cement QCO ISI Certification",
            "category": "regulatory_qco",
            "text": "Each bag or bulk container of Ordinary Portland Cement (33, 43, or 53 Grade) shall bear the BIS Standard Mark (ISI) with valid license number as mandated under the Cement (Quality Control) Order, 2003.",
            "normative_ref": "Cement QCO 2003",
        },
    ],
    "clause": "Ordinary Portland Cement (33, 43, and 53 Grades) shall conform to IS 269 : 2015 (Sixth Revision) with current amendments. The supplier shall furnish a valid BIS licence and test certificates covering the chemical requirements of IS 4032 and physical tests under the IS 4031 series. Each consignment shall be accompanied by batch-wise conformity documentation.",
}

# --- DOMAIN 3: STEEL ---
STEEL = {
    "id": "is-1786-2008",
    "code": "IS 1786 : 2008",
    "title": "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement",
    "domain": "steel",
    "status": "CURRENT & ACTIVE",
    "year": "2008",
    "ics": "77.140.15",
    "scope": "Requirements for high strength deformed steel bars and wires for use as reinforcement in concrete. Covers nominal sizes, chemical composition, 0.2 percent proof stress, tensile strength, bend and rebend properties for grade Fe 500D.",
    "confidence": 98.1,
    "qco": "Steel and Steel Products (Quality Control) Order, 2024",
    "qcoShort": "Steel & Steel Products QCO 2024",
    "qco_mandatory": True,
    "scheme": "ISI Mark Scheme I",
    "scheme_type": "ISI",
    "amendments": "Amendments 1 to 3",
    "allied": [
        {"code": "IS 1608 (Part 1) : 2022", "title": "Metallic materials — Tensile testing at room temperature", "group": "Physical tests", "relevance": "0.2 percent proof stress and tensile strength verification", "verified": True},
        {"code": "IS 1599 : 2019", "title": "Metallic materials — Bend test", "group": "Physical tests", "relevance": "Bend and rebend testing around standard mandrels", "verified": True},
        {"code": "IS 228 (Series)", "title": "Methods for chemical analysis of steels", "group": "Chemical analysis", "relevance": "Spectrometric and wet chemical analysis for C, S, P", "verified": True},
    ],
    "clauses": [
        {
            "clause_id": "steel-c1",
            "clause_number": "Clause 8.1",
            "title": "Mechanical Properties & 0.2 Percent Proof Stress",
            "category": "mechanical_specs",
            "text": "For Fe 500D grade, minimum 0.2 percent proof stress / yield stress shall be 500.0 N/mm²; tensile strength shall be not less than 565.0 N/mm² (minimum TS/YS ratio 1.10); elongation shall be minimum 16.0 percent and total elongation at maximum force (Agt) minimum 5.0 percent when tested per IS 1608.",
            "normative_ref": "IS 1608 (Part 1)",
        },
        {
            "clause_id": "steel-c2",
            "clause_number": "Clause 9.1",
            "title": "Bend and Rebend Requirements",
            "category": "mechanical_specs",
            "text": "Test pieces shall withstand bend test through 180 degrees without rupture or transverse cracking on outside of bent portion as per IS 1599 around specified mandrel diameter.",
            "normative_ref": "IS 1599 : 2019",
        },
        {
            "clause_id": "steel-c3",
            "clause_number": "Clause 4.2",
            "title": "Chemical Composition Limits",
            "category": "chemical_analysis",
            "text": "Chemical composition for Fe 500D analyzed per IS 228 series: Carbon max 0.25%, Sulphur max 0.040%, Phosphorus max 0.040%, and combined Sulphur + Phosphorus max 0.075%.",
            "normative_ref": "IS 228 Series",
        },
        {
            "clause_id": "steel-c4",
            "clause_number": "Clause 11.1",
            "title": "BIS Marking & QCO Compliance",
            "category": "regulatory_qco",
            "text": "Each bundle of steel bars shall carry manufacturer identification, grade Fe 500D, and BIS Standard Mark (ISI) under Steel and Steel Products (Quality Control) Order, 2024.",
            "normative_ref": "Steel & Steel Products QCO 2024",
        },
    ],
    "clause": "The contractor shall supply High Strength Deformed Steel Bars of grade Fe 500D conforming to IS 1786 : 2008 with Amendments 1 to 3. The steel shall exhibit a minimum 0.2 percent proof stress of 500 N/mm² and TS/YS ratio of at least 1.10 when tested as per IS 1608. Bend and rebend tests shall comply with IS 1599. Chemical analysis shall be verified as per IS 228 series. Product bundles shall carry valid BIS ISI marking under the Steel and Steel Products QCO 2024.",
}

# --- DOMAIN 4: ELECTRONICS ---
ELECTRONICS = {
    "id": "is-13252-p1-2010",
    "code": "IS 13252 (Part 1) : 2010",
    "title": "Information Technology Equipment — Safety: General Requirements",
    "domain": "electronics",
    "status": "CURRENT & ACTIVE",
    "year": "2010",
    "ics": "35.020",
    "scope": "Safety requirements for mains-powered or battery-powered information technology equipment, including electrical business equipment and associated telecommunication equipment, operating up to 600 V.",
    "confidence": 96.9,
    "qco": "Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order",
    "qcoShort": "MeitY CRS Order",
    "qco_mandatory": True,
    "scheme": "MeitY Compulsory Registration Scheme (CRS)",
    "scheme_type": "CRS",
    "amendments": "Amendments 1 to 4",
    "allied": [
        {"code": "IS 616 : 2017", "title": "Audio, video and similar electronic apparatus — Safety requirements", "group": "Compulsory Test Methods", "relevance": "Audio visual safety harmonization and dielectric test", "verified": True},
        {"code": "IS 16046 (Part 2) : 2018", "title": "Secondary cells and batteries containing alkaline or other non-acid electrolytes — Secondary lithium cells and batteries", "group": "Compulsory Test Methods", "relevance": "Lithium cells battery safety, overcharge protection, thermal testing", "verified": True},
    ],
    "clauses": [
        {
            "clause_id": "elec-c1",
            "clause_number": "Clause 2.1",
            "title": "Protection from Electric Shock and Energy Hazards",
            "category": "electrical_safety",
            "text": "Operator access areas shall be designed to prevent contact with bare parts at hazardous voltage. Creepage distances and electrical clearances shall withstand rated dielectric impulse tests.",
            "normative_ref": "IS 13252 (Part 1)",
        },
        {
            "clause_id": "elec-c2",
            "clause_number": "Clause 4.3",
            "title": "Battery and Secondary Lithium Cells Safety",
            "category": "battery_safety",
            "text": "Rechargeable secondary lithium cells and battery packs integrated into the IT equipment shall be certified to IS 16046 (Part 2) with proven safety controls preventing overcharge, thermal runaway, and reverse charging.",
            "normative_ref": "IS 16046 (Part 2)",
        },
        {
            "clause_id": "elec-c3",
            "clause_number": "Clause 1.5",
            "title": "MeitY CRS Compulsory Registration Mark",
            "category": "regulatory_qco",
            "text": "The equipment shall hold valid registration under the MeitY Compulsory Registration Scheme (CRS) and bear the official 'Self-Declaration — Conforming to IS 13252 (Part 1) : 2010' mark with unique R-number on both product and packaging.",
            "normative_ref": "MeitY CRS Order",
        },
        {
            "clause_id": "elec-c4",
            "clause_number": "Clause 4.7",
            "title": "Resistance to Fire and Flammability",
            "category": "fire_safety",
            "text": "Fire enclosures and plastic components shall satisfy flammability classes V-1 or better to mitigate ignition risk, harmonized with safety provisions of IS 616.",
            "normative_ref": "IS 616 / IS 13252 Part 1",
        },
    ],
    "clause": "All Information Technology hardware shall conform to IS 13252 (Part 1) : 2010 with Amendments 1 to 4 under the MeitY Compulsory Registration Scheme (CRS). All integrated secondary lithium cells and battery packs shall possess separate BIS registration under IS 16046 (Part 2) : 2018. The bidder shall provide valid BIS CRS registration numbers (R-numbers) on the equipment rating plate and GeM bid submission.",
}

STANDARDS_CATALOG: Dict[str, Dict[str, Any]] = {
    "cables": CABLE,
    "cement": CEMENT,
    "steel": STEEL,
    "electronics": ELECTRONICS,
}

# --- KNOWLEDGE GRAPHS PER DOMAIN ---
GRAPHS: Dict[str, Dict[str, Any]] = {
    "cables": {
        "nodes": [
            {"id": "primary", "label": "IS 7098 (Part 1):1988", "kind": "primary", "x": 50, "y": 46, "detail": "Primary product standard — XLPE insulated cables up to 1100 V."},
            {"id": "conductor", "label": "IS 8130:2013", "kind": "normative_refs", "x": 18, "y": 20, "detail": "Conductor material, resistance and stranding requirements."},
            {"id": "sheath", "label": "IS 5831:1984", "kind": "normative_refs", "x": 17, "y": 72, "detail": "PVC insulation and sheath compound requirements."},
            {"id": "armour", "label": "IS 3975:1999", "kind": "normative_refs", "x": 80, "y": 19, "detail": "Mild steel wires, formed wires and tapes for armouring."},
            {"id": "flame", "label": "IS 10810 Part 53", "kind": "test_methods", "x": 82, "y": 70, "detail": "Vertical flame propagation and flame retardance test method."},
            {"id": "qco", "label": "Cables QCO 2023", "kind": "qco_mandates", "x": 50, "y": 88, "detail": "Statutory Quality Control Order — BIS Standard Mark mandatory."},
            {"id": "old", "label": "IS 694:1990", "kind": "superseded_refs", "x": 8, "y": 47, "detail": "Withdrawn reference detected in tender draft; do not cite."},
        ],
        "edges": [
            {"from": "primary", "to": "conductor", "label": "requires"},
            {"from": "primary", "to": "sheath", "label": "requires"},
            {"from": "primary", "to": "armour", "label": "requires"},
            {"from": "primary", "to": "flame", "label": "tested by"},
            {"from": "primary", "to": "qco", "label": "mandated by"},
            {"from": "old", "to": "primary", "label": "superseded by"},
        ],
    },
    "cement": {
        "nodes": [
            {"id": "primary", "label": "IS 269:2015", "kind": "primary", "x": 50, "y": 46, "detail": "Primary product standard — Ordinary Portland Cement (unifying 33, 43, 53 Grades)."},
            {"id": "compressive", "label": "IS 4031 (Part 6)", "kind": "test_methods", "x": 20, "y": 25, "detail": "Compressive strength determination at 3, 7, and 28 days."},
            {"id": "soundness", "label": "IS 4031 (Part 3)", "kind": "test_methods", "x": 20, "y": 70, "detail": "Soundness testing by Le Chatelier and autoclave methods."},
            {"id": "chemical", "label": "IS 4032:1985", "kind": "test_methods", "x": 80, "y": 25, "detail": "Chemical analysis for insoluble residue, loss on ignition, and magnesia."},
            {"id": "sampling", "label": "IS 4987:1993", "kind": "normative_refs", "x": 80, "y": 70, "detail": "Recommendations for sampling and batch acceptance."},
            {"id": "qco", "label": "Cement QCO 2003", "kind": "qco_mandates", "x": 50, "y": 88, "detail": "Mandatory BIS certification under Cement (Quality Control) Order."},
            {"id": "old", "label": "IS 12269:2013", "kind": "superseded_refs", "x": 10, "y": 48, "detail": "Withdrawn & superseded 53 Grade OPC standard; unified into IS 269:2015."},
        ],
        "edges": [
            {"from": "primary", "to": "compressive", "label": "tested by"},
            {"from": "primary", "to": "soundness", "label": "tested by"},
            {"from": "primary", "to": "chemical", "label": "analyzed by"},
            {"from": "primary", "to": "sampling", "label": "sampled per"},
            {"from": "primary", "to": "qco", "label": "mandated by"},
            {"from": "old", "to": "primary", "label": "superseded by"},
        ],
    },
    "steel": {
        "nodes": [
            {"id": "primary", "label": "IS 1786:2008", "kind": "primary", "x": 50, "y": 46, "detail": "High strength deformed steel bars for concrete reinforcement — Fe 500D."},
            {"id": "tensile", "label": "IS 1608 (Part 1)", "kind": "test_methods", "x": 20, "y": 25, "detail": "Tensile testing: 0.2 percent proof stress, TS/YS ratio, Agt elongation."},
            {"id": "bend", "label": "IS 1599:2019", "kind": "test_methods", "x": 20, "y": 70, "detail": "Bend and rebend testing around standard mandrels."},
            {"id": "chemical", "label": "IS 228 Series", "kind": "test_methods", "x": 80, "y": 25, "detail": "Spectrometric chemical analysis for Carbon, Sulphur, and Phosphorus."},
            {"id": "qco", "label": "Steel QCO 2024", "kind": "qco_mandates", "x": 50, "y": 88, "detail": "Steel and Steel Products (Quality Control) Order, 2024."},
            {"id": "old", "label": "IS 432:1982", "kind": "superseded_refs", "x": 10, "y": 48, "detail": "Mild steel plain bars; obsolete for modern seismic RCC structures."},
        ],
        "edges": [
            {"from": "primary", "to": "tensile", "label": "tested by"},
            {"from": "primary", "to": "bend", "label": "tested by"},
            {"from": "primary", "to": "chemical", "label": "analyzed by"},
            {"from": "primary", "to": "qco", "label": "mandated by"},
            {"from": "old", "to": "primary", "label": "superseded by"},
        ],
    },
    "electronics": {
        "nodes": [
            {"id": "primary", "label": "IS 13252 (Part 1):2010", "kind": "primary", "x": 50, "y": 46, "detail": "Safety of Information Technology Equipment — General Requirements."},
            {"id": "audiovideo", "label": "IS 616:2017", "kind": "normative_refs", "x": 20, "y": 25, "detail": "Harmonized safety requirements for AV and electronic apparatus."},
            {"id": "lithium", "label": "IS 16046 (Part 2)", "kind": "normative_refs", "x": 80, "y": 25, "detail": "Mandatory safety standard for secondary lithium cells and packs."},
            {"id": "qco", "label": "MeitY CRS Order", "kind": "qco_mandates", "x": 50, "y": 88, "detail": "Compulsory Registration Scheme for electronics and IT goods."},
            {"id": "old", "label": "IS 13252:2003", "kind": "superseded_refs", "x": 10, "y": 48, "detail": "Superseded edition; lacking modern lithium cell safety provisions."},
        ],
        "edges": [
            {"from": "primary", "to": "audiovideo", "label": "harmonized with"},
            {"from": "primary", "to": "lithium", "label": "requires compliance"},
            {"from": "primary", "to": "qco", "label": "registered under"},
            {"from": "old", "to": "primary", "label": "superseded by"},
        ],
    },
}

# Compatibility alias for existing single graph usage
GRAPH = GRAPHS["cables"]

# --- AUDIT DEFAULTS & LOG DATA ---
AUDIT = {
    "fileName": "Tender_GeM_Elect_2026.pdf",
    "items": [
        {
            "line": "Line Item 1",
            "title": "PVC insulated power cable, 1.1 kV",
            "standard": "IS 694 : 1990",
            "status": "critical",
            "finding": "Cited standard is withdrawn and superseded. The clause also omits low-smoke and zero-halogen fire test mandates.",
            "recommendation": "Replace with IS 694 : 2010 + Amendments 1 to 4 and add IS 10810 flame-retardance evidence.",
        },
        {
            "line": "Line Item 2",
            "title": "High-strength deformed steel bar Fe 500D",
            "standard": "IS 1786 : 2008",
            "status": "compliant",
            "finding": "Reference is active for the cited product class. Mechanical and chemical conformity fields are present.",
            "recommendation": "Retain reference; request heat-wise test certificate and BIS licence number at supply stage.",
        },
    ],
    "summary": {"critical": 1, "compliant": 1, "coverage": "82%"},
}

# Enhanced Regulatory Supersession Database
SUPERSEDED_CATALOG = [
    {
        "pattern": "is 694 : 1990",
        "alias_patterns": ["is 694:1990", "is 694", "is694"],
        "domain": "cables",
        "title": "PVC insulated power cable, 1.1 kV",
        "bad_code": "IS 694 : 1990",
        "cited_code": "IS 694 : 1990",
        "status": "SUPERSEDED_WITHDRAWN",
        "flag": "SUPERSEDED_WITHDRAWN",
        "good_code": "IS 694 : 2010 (Fourth Revision) + Amendments 1 to 4",
        "replacement": "IS 694 : 2010 (Fourth Revision) + Amendments 1 to 4",
        "replacement_code": "IS 694 : 2010",
        "risk_severity": "CRITICAL",
        "missing_tests": [
            "IS 10810 (Part 53) - Flame Retardance Test",
            "IS 8130 : 2013 - Conductor Resistance",
        ],
        "rationale": "The 1990 edition lacks mandatory Low Smoke Zero Halogen (LSZH) test compliance under the Wires & Cables QCO.",
        "finding": "Cited standard IS 694:1990 is withdrawn and superseded. Missing flame retardance tests per IS 10810 (Part 53).",
        "recommendation": "Replace with IS 694 : 2010 + Amendments 1 to 4 and mandate IS 10810 Part 53 flame test.",
    },
    {
        "pattern": "is 12269 : 2013",
        "alias_patterns": ["is 12269:2013", "is 12269", "is12269"],
        "domain": "cement",
        "title": "Ordinary Portland Cement 53 Grade",
        "bad_code": "IS 12269 : 2013",
        "cited_code": "IS 12269 : 2013",
        "status": "SUPERSEDED_WITHDRAWN",
        "flag": "SUPERSEDED_WITHDRAWN",
        "good_code": "IS 269 : 2015 (Unified Ordinary Portland Cement Specification)",
        "replacement": "IS 269 : 2015 (Unified Ordinary Portland Cement Specification)",
        "replacement_code": "IS 269 : 2015 (Unified Ordinary Portland Cement Specification)",
        "risk_severity": "CRITICAL",
        "missing_tests": [
            "IS 4031 (Part 6) - 28-day Compressive Strength Test (53 Grade)",
            "IS 4032 : 1985 - Chemical Composition Limits",
            "IS 4987 : 1993 - Sampling and Lot Acceptance Criteria",
        ],
        "rationale": "IS 12269 was withdrawn by BIS following the revision of IS 269 : 2015, which unified 33, 43, and 53 Grade OPC under one standard.",
        "finding": "Cited standard IS 12269 : 2013 is withdrawn and superseded. 53 Grade OPC must be procured under unified IS 269 : 2015.",
        "recommendation": "Replace with IS 269 : 2015 (Unified Ordinary Portland Cement Specification) and mandate Cement QCO 2003 compliance.",
    },
    {
        "pattern": "is 8112 : 2013",
        "alias_patterns": ["is 8112:2013", "is 8112", "is8112"],
        "domain": "cement",
        "title": "Ordinary Portland Cement 43 Grade",
        "bad_code": "IS 8112 : 2013",
        "cited_code": "IS 8112 : 2013",
        "status": "SUPERSEDED_WITHDRAWN",
        "flag": "SUPERSEDED_WITHDRAWN",
        "good_code": "IS 269 : 2015 (Unified Ordinary Portland Cement Specification)",
        "replacement": "IS 269 : 2015 (Unified Ordinary Portland Cement Specification)",
        "replacement_code": "IS 269 : 2015 (Unified Ordinary Portland Cement Specification)",
        "risk_severity": "CRITICAL",
        "missing_tests": [
            "IS 4031 (Part 6) - Compressive Strength Test (43 Grade)",
            "IS 4032 : 1985 - Chemical Composition Limits",
            "IS 4987 : 1993 - Sampling and Lot Acceptance Criteria",
        ],
        "rationale": "IS 8112 was withdrawn by BIS following the revision of IS 269 : 2015, which unified 33, 43, and 53 Grade OPC under one standard.",
        "finding": "Cited standard IS 8112 is withdrawn and superseded by IS 269 : 2015.",
        "recommendation": "Replace with IS 269 : 2015 (Unified Ordinary Portland Cement Specification) and mandate Cement QCO 2003 compliance.",
    },
    {
        "pattern": "is 269 : 1976",
        "alias_patterns": ["is 269:1976", "is 269:1989", "is 269 : 1989"],
        "domain": "cement",
        "title": "Ordinary Portland Cement (Obsolete Revisions)",
        "bad_code": "IS 269 : 1976",
        "cited_code": "IS 269 : 1976",
        "status": "SUPERSEDED_WITHDRAWN",
        "flag": "SUPERSEDED_WITHDRAWN",
        "good_code": "IS 269 : 2015 (Unified Ordinary Portland Cement Specification)",
        "replacement": "IS 269 : 2015 (Unified Ordinary Portland Cement Specification)",
        "replacement_code": "IS 269 : 2015 (Unified Ordinary Portland Cement Specification)",
        "risk_severity": "CRITICAL",
        "missing_tests": [
            "IS 4031 (Part 6) - 28-day Compressive Strength Test",
            "IS 4032 : 1985 - Chemical Composition Limits",
        ],
        "rationale": "Older editions of IS 269 (1976, 1989) are superseded by IS 269 : 2015 (Sixth Revision), which unified 33, 43, and 53 Grade OPC under one standard.",
        "finding": "Obsolete edition of IS 269 cited. Must be updated to the Sixth Revision IS 269 : 2015.",
        "recommendation": "Update to IS 269 : 2015 (Sixth Revision) with batch-wise IS 4031 test certification and Cement QCO 2003 compliance.",
    },
    {
        "pattern": "is 432",
        "alias_patterns": ["is 432:1982", "is 432 : 1982", "is432"],
        "domain": "steel",
        "title": "Reinforcement Steel Bars",
        "bad_code": "IS 432 : 1982",
        "cited_code": "IS 432 : 1982",
        "status": "SUPERSEDED_WITHDRAWN",
        "flag": "SUPERSEDED_WITHDRAWN",
        "good_code": "IS 1786 : 2008 (Fe 500D)",
        "replacement": "IS 1786 : 2008 (Fe 500D)",
        "replacement_code": "IS 1786 : 2008",
        "risk_severity": "CRITICAL",
        "missing_tests": [
            "IS 1608 (Part 1) - 0.2% Proof Stress",
            "IS 1599 : 2019 - Bend and Rebend Test",
        ],
        "rationale": "IS 432 mild steel plain bars lack high ductility and seismic proof stress mandates under Steel QCO 2024.",
        "finding": "IS 432 (Mild steel plain bars) lacks ductility and proof stress required for seismic-resistant RCC structures.",
        "recommendation": "Replace with IS 1786 : 2008 Fe 500D with minimum 0.2% proof stress of 500 N/mm² under Steel QCO 2024.",
    },
    {
        "pattern": "is 13252 : 2003",
        "alias_patterns": ["is 13252:2003", "is 13252", "is13252"],
        "domain": "electronics",
        "title": "IT Server and Workstation Hardware",
        "bad_code": "IS 13252 : 2003",
        "cited_code": "IS 13252 : 2003",
        "status": "SUPERSEDED_WITHDRAWN",
        "flag": "SUPERSEDED_WITHDRAWN",
        "good_code": "IS 13252 (Part 1) : 2010",
        "replacement": "IS 13252 (Part 1) : 2010",
        "replacement_code": "IS 13252 (Part 1) : 2010",
        "risk_severity": "CRITICAL",
        "missing_tests": [
            "IS 16046 (Part 2) : 2018 - Secondary Lithium Cells Safety",
        ],
        "rationale": "Withdrawn edition lacks mandatory secondary lithium battery safety and MeitY CRS registration.",
        "finding": "Withdrawn edition cited. Omits secondary lithium battery safety certification under IS 16046 (Part 2) and MeitY CRS registration.",
        "recommendation": "Update to IS 13252 (Part 1) : 2010 and mandate MeitY CRS R-number with IS 16046 (Part 2) battery compliance.",
    },
]

# Bilingual Synthesized Specification Clauses
BILINGUAL_CLAUSES = {
    "is-7098-p1-1988": {
        "code": "IS 7098 (Part 1) : 1988",
        "en": "The supplied material shall strictly conform to IS 7098 (Part 1) : 1988 including all current amendments. Conductor materials and testing protocols must comply with IS 8130 : 2013 and IS 10810 (Series). Product must bear mandatory ISI Certification mark in compliance with Wires and Cables (Quality Control) Order, 2023.",
        "hi": "आपूर्त सामग्री को नवीनतम संशोधनों सहित IS 7098 (Part 1) : 1988 के पूर्णतः अनुरूप होना अनिवार्य है। चालक सामग्री IS 8130 : 2013 तथा परीक्षण विधियाँ IS 10810 शृंखला के अनुरूप होंगी। उत्पाद पर तार एवं केबल (गुणवत्ता नियंत्रण) आदेश, 2023 के अंतर्गत अनिवार्य ISI प्रमाणन चिह्न (योजना-I) होना अनिवार्य है।",
    },
    "is-269-2015": {
        "code": "IS 269 : 2015",
        "en": "The supplied material shall strictly conform to IS 269 : 2015 (Sixth Revision, unifying 33, 43, and 53 Grades) including all current amendments. Physical tests and 28-day compressive strength (minimum 53 MPa for 53 Grade) must comply with IS 4031 (Series) and chemical analysis with IS 4032. Product must bear mandatory ISI Certification mark in compliance with Cement (Quality Control) Order, 2003.",
        "hi": "आपूर्त सामग्री को नवीनतम संशोधनों सहित IS 269 : 2015 (छठा पुनरीक्षण, 33, 43 और 53 ग्रेड का एकीकरण) के पूर्णतः अनुरूप होना अनिवार्य है। भौतिक परीक्षण एवं 28-दिवसीय संपीड़न सामर्थ्य (53 ग्रेड के लिए न्यूनतम 53 MPa) IS 4031 शृंखला तथा रासायनिक विश्लेषण IS 4032 के अनुरूप होना चाहिए। उत्पाद पर सीमेंट (गुणवत्ता नियंत्रण) आदेश, 2003 के अंतर्गत अनिवार्य ISI प्रमाणन चिह्न होना अनिवार्य है।",
    },
    "is-12269-2013": {
        "code": "IS 269 : 2015",
        "en": "The supplied material shall strictly conform to IS 269 : 2015 (Sixth Revision, unifying 33, 43, and 53 Grades) including all current amendments. Physical tests and 28-day compressive strength (minimum 53 MPa for 53 Grade) must comply with IS 4031 (Series) and chemical analysis with IS 4032. Product must bear mandatory ISI Certification mark in compliance with Cement (Quality Control) Order, 2003.",
        "hi": "आपूर्त सामग्री को नवीनतम संशोधनों सहित IS 269 : 2015 (छठा पुनरीक्षण, 33, 43 और 53 ग्रेड का एकीकरण) के पूर्णतः अनुरूप होना अनिवार्य है। भौतिक परीक्षण एवं 28-दिवसीय संपीड़न सामर्थ्य (53 ग्रेड के लिए न्यूनतम 53 MPa) IS 4031 शृंखला तथा रासायनिक विश्लेषण IS 4032 के अनुरूप होना चाहिए। उत्पाद पर सीमेंट (गुणवत्ता नियंत्रण) आदेश, 2003 के अंतर्गत अनिवार्य ISI प्रमाणन चिह्न होना अनिवार्य है।",
    },
    "is-1786-2008": {
        "code": "IS 1786 : 2008",
        "en": "The supplied material shall strictly conform to IS 1786 : 2008 (Grade Fe 500D) including all current amendments. Mechanical properties, 0.2 percent proof stress, and bend tests must comply with IS 1608 (Part 1) and IS 1599. Product must bear mandatory ISI Certification mark in compliance with Steel and Steel Products (Quality Control) Order, 2024.",
        "hi": "आपूर्त सामग्री को नवीनतम संशोधनों सहित IS 1786 : 2008 (ग्रेड Fe 500D) के पूर्णतः अनुरूप होना अनिवार्य है। यांत्रिक गुण, 0.2 प्रतिशत प्रूफ स्ट्रेस तथा बेंड परीक्षण IS 1608 (भाग 1) एवं IS 1599 के अनुरूप होंगे। उत्पाद पर इस्पात एवं इस्पात उत्पाद (गुणवत्ता नियंत्रण) आदेश, 2024 के अंतर्गत अनिवार्य ISI प्रमाणन चिह्न होना अनिवार्य है।",
    },
    "is-13252-p1-2010": {
        "code": "IS 13252 (Part 1) : 2010",
        "en": "The supplied material shall strictly conform to IS 13252 (Part 1) : 2010 including all current amendments. Secondary lithium cell and battery assemblies must comply with IS 16046 (Part 2) : 2018. Product must bear mandatory MeitY CRS Registration Mark under Electronics and IT Goods (Requirement for Compulsory Registration) Order.",
        "hi": "आपूर्त सामग्री को नवीनतम संशोधनों सहित IS 13252 (Part 1) : 2010 के पूर्णतः अनुरूप होना अनिवार्य है। द्वितीयक लिथियम सेल एवं बैटरी संयोजन IS 16046 (भाग 2) : 2018 के अनुरूप होने चाहिए। उत्पाद पर इलेक्ट्रॉनिक्स और आईटी सामान (अनिवार्य पंजीकरण आवश्यकता) आदेश के अंतर्गत अनिवार्य MeitY CRS पंजीकरण चिह्न होना अनिवार्य है।",
    },
}

def get_bilingual_clause(standard_key_or_code: str, language: str = "en") -> str:
    """Return synthesized clause in requested language (en or hi)."""
    lang = "hi" if (language or "").strip().lower() in ["hi", "hindi"] else "en"
    key = standard_key_or_code.strip().lower().replace(" ", "-").replace(":", "-").replace("(", "").replace(")", "")
    
    # Direct match on key or standard code
    for k, v in BILINGUAL_CLAUSES.items():
        if k in key or v["code"].lower() in standard_key_or_code.lower() or key in v["code"].lower():
            return v[lang]
        
    # Match standard numbers
    if "7098" in standard_key_or_code:
        return BILINGUAL_CLAUSES["is-7098-p1-1988"][lang]
    elif "269" in standard_key_or_code or "12269" in standard_key_or_code or "8112" in standard_key_or_code:
        return BILINGUAL_CLAUSES["is-269-2015"][lang]
    elif "1786" in standard_key_or_code:
        return BILINGUAL_CLAUSES["is-1786-2008"][lang]
    elif "13252" in standard_key_or_code:
        return BILINGUAL_CLAUSES["is-13252-p1-2010"][lang]
    
    # Dynamic fallback synthesis
    clean_code = standard_key_or_code.strip()
    if lang == "hi":
        return f"आपूर्त सामग्री को नवीनतम संशोधनों सहित {clean_code} के पूर्णतः अनुरूप होना अनिवार्य है। सभी आवश्यक परीक्षण मानकों एवं लागू गुणवत्ता नियंत्रण आदेशों के अंतर्गत वैध BIS प्रमाणन चिह्न होना अनिवार्य है।"
    return f"The supplied material shall strictly conform to {clean_code} including all current amendments and applicable Quality Control Orders (QCOs) with mandatory BIS Certification marking."


# Legacy search helper for backward compatibility
def search(query: str):
    from retrieval_engine import get_retrieval_engine
    engine = get_retrieval_engine()
    return engine.search(query)


def audit(corrected: bool = False):
    result = deepcopy(AUDIT)
    if corrected:
        result["items"][0].update({
            "standard": "IS 694 : 2010 + Amd. 1 to 4",
            "status": "compliant",
            "finding": "Draft corrected: current reference inserted and fire test requirement restored.",
            "recommendation": "Review the generated clause, then issue the updated tender version.",
        })
        result["summary"] = {"critical": 0, "compliant": 2, "coverage": "100%"}
    return result

