import { describe, expect, it } from "vitest";
import { fallbackAudit, getAuditWithCorrection } from "../client/src/types";

describe("TenderAuditor replacement workflow", () => {
  it("changes the withdrawn line into a compliant corrected audit", () => {
    const corrected = getAuditWithCorrection(true);
    expect(fallbackAudit.summary.critical).toBe(1);
    expect(corrected.summary).toEqual({ critical: 0, compliant: 2, coverage: "100%" });
    expect(corrected.items[0]?.standard).toBe("IS 694 : 2010 + Amd. 1 to 4");
    expect(corrected.items[0]?.status).toBe("compliant");
  });
});
