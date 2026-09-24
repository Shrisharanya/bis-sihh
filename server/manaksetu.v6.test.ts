import { describe, expect, it } from "vitest";
import { buildAuditRecord, fallbackAudit } from "../client/src/types";
import { tx } from "../client/src/utils/translations";

describe("ManakSetu dark institutional refactor", () => {
  it("uses institutional BIS search language", () => {
    expect(tx("en", "searchScope")).toContain("BIS");
    expect(tx("en", "searchScope").toLowerCase()).not.toContain("intent routing");
  });

  it("creates a flagged officer audit record from a tender result", () => {
    const record = buildAuditRecord(fallbackAudit, "sample-tender.pdf", "1.2 MB");
    expect(record.fileName).toBe("sample-tender.pdf");
    expect(record.status).toBe("FLAGGED");
    expect(record.supersededStandard).toBe("IS 694 : 1990");
  });
});
