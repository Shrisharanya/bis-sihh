import { describe, expect, it } from "vitest";
import { fallbackAudit, getAuditWithCorrection } from "../client/src/types";
import { fallbackCement } from "../client/src/types";
import { civilAuditSample, SUPERSEDED_RECORDS } from "../client/src/mockData";

describe("TenderAuditor replacement workflow", () => {
  it("changes the withdrawn line into a compliant corrected audit", () => {
    const corrected = getAuditWithCorrection(true);
    expect(fallbackAudit.summary.critical).toBe(1);
    expect(corrected.summary).toEqual({ critical: 0, compliant: 2, coverage: "100%" });
    expect(corrected.items[0]?.standard).toBe("IS 694 : 2010 + Amd. 1 to 4");
    expect(corrected.items[0]?.status).toBe("compliant");
  });

  it("uses IS 269 as the active cement standard and IS 12269 as its superseded record", () => {
    expect(fallbackCement.code).toBe("IS 269 : 2015");
    expect(fallbackCement.title).toContain("33, 43 & 53 Grade");
    expect(SUPERSEDED_RECORDS).toContainEqual({ withdrawn: "IS 12269 : 2013", replacement: "IS 269 : 2015", status: "verified replacement" });
    expect(civilAuditSample.items[0]?.standard).toBe("IS 12269 : 2013");
    expect(civilAuditSample.items[0]?.status).toBe("critical");
  });
});
