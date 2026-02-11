/**
 * Tests for Figma Variables and Smart Fallback Logic
 * 
 * These tests ensure that:
 * 1. Variable paths are generated correctly
 * 2. Smart fallback logic works as expected
 * 3. Metadata is accurate and complete
 * 4. JSON exports are valid and structured correctly
 */

import {
  getRecoveryText,
  getVariablePath,
  getProcedureMetadata,
  generateFigmaTokensJSON,
  exportForServerAPI,
  getCardBackground,
} from "../figmaVariables";

describe("Variable Path Generation", () => {
  test("generates correct path for TURP day 7 today text", () => {
    const path = getVariablePath("TURP", 7, "today");
    expect(path).toBe("recovery-turp/day-07/today-text");
  });

  test("generates correct path for Circumcision day 14 forecast", () => {
    const path = getVariablePath("Circumcision", 14, "forecast");
    expect(path).toBe("recovery-circumcision/day-14/forecast-text");
  });

  test("handles day 0 with correct padding", () => {
    const path = getVariablePath("TURP", 0, "redflag");
    expect(path).toBe("recovery-turp/day-00/redflag-text");
  });

  test("normalizes procedure names with spaces and special characters", () => {
    const path = getVariablePath("Varicocele Repair", 7, "today");
    expect(path).toBe("recovery-varicocele-repair/day-07/today-text");
  });
});

describe("Smart Fallback Logic", () => {
  test("returns exact match for TURP day 7", () => {
    const text = getRecoveryText("TURP", 7);
    expect(text).toBeTruthy();
    expect(text?.["today-text"]).toContain("leakage");
    expect(text?.["day-title-text"]).toBe("Week One Check");
  });

  test("returns exact match for Circumcision day 14", () => {
    const text = getRecoveryText("Circumcision", 14);
    expect(text).toBeTruthy();
    expect(text?.["today-text"]).toContain("stitches");
    expect(text?.["day-title-text"]).toBe("Two Week Milestone");
  });

  test("falls back to generic for unknown procedure", () => {
    const text = getRecoveryText("Unknown Procedure", 7);
    expect(text).toBeTruthy();
    expect(text?.["today-text"]).toBeTruthy();
    expect(text?.["forecast-text"]).toBeTruthy();
    expect(text?.["redflag-text"]).toBeTruthy();
  });

  test("falls back to closest day for missing day in known procedure", () => {
    const text = getRecoveryText("Varicocele Repair", 15);
    expect(text).toBeTruthy();
    // Should fall back to generic data
    expect(text?.["today-text"]).toBeTruthy();
  });

  test("uses generic fallback for unknown procedure and out-of-range day", () => {
    const text = getRecoveryText("Nonexistent Procedure", 999);
    expect(text).toBeTruthy();
    expect(text?.["today-text"]).toBeTruthy();
    expect(text?.["forecast-text"]).toBeTruthy();
  });

  test("includes all required fields in fallback", () => {
    const text = getRecoveryText("Unknown", 5);
    expect(text).toHaveProperty("today-text");
    expect(text).toHaveProperty("forecast-text");
    expect(text).toHaveProperty("redflag-text");
    expect(text).toHaveProperty("day-title-text");
  });
});

describe("Metadata Accuracy", () => {
  test("returns correct metadata for TURP", () => {
    const metadata = getProcedureMetadata("TURP");
    expect(metadata.source).toContain("BAUS");
    expect(metadata.version).toBeTruthy();
    expect(metadata.readingLevel).toBe("Year 7 (UK)");
    expect(metadata.fleschScore).toBeGreaterThanOrEqual(72);
  });

  test("returns correct metadata for Circumcision", () => {
    const metadata = getProcedureMetadata("Circumcision");
    expect(metadata.source).toContain("BAUS");
    expect(metadata.reviewer).toContain("FRCS Urol");
  });

  test("falls back to generic metadata for unknown procedure", () => {
    const metadata = getProcedureMetadata("Unknown Procedure");
    expect(metadata.source).toContain("GGO Med");
    expect(metadata.readingLevel).toBe("Year 7 (UK)");
  });

  test("metadata includes all required governance fields", () => {
    const metadata = getProcedureMetadata("turp");
    expect(metadata).toHaveProperty("source");
    expect(metadata).toHaveProperty("lastReviewed");
    expect(metadata).toHaveProperty("author");
    expect(metadata).toHaveProperty("reviewer");
    expect(metadata).toHaveProperty("version");
    expect(metadata).toHaveProperty("readingLevel");
    expect(metadata).toHaveProperty("fleschScore");
  });
});

describe("Figma Tokens JSON Export", () => {
  test("generates valid JSON structure", () => {
    const tokens = generateFigmaTokensJSON();
    expect(tokens).toHaveProperty("recovery");
    expect(tokens).toHaveProperty("meta");
    expect(tokens).toHaveProperty("emotion");
  });

  test("includes all procedures", () => {
    const tokens = generateFigmaTokensJSON();
    expect(tokens.recovery).toHaveProperty("circumcision");
    expect(tokens.recovery).toHaveProperty("turp");
    expect(tokens.recovery).toHaveProperty("varicocele-repair");
  });

  test("each procedure has days structure", () => {
    const tokens = generateFigmaTokensJSON();
    expect(tokens.recovery.turp).toHaveProperty("days");
    expect(tokens.recovery.turp.days).toHaveProperty("0");
    expect(tokens.recovery.turp.days).toHaveProperty("28");
  });

  test("each day has correct variable structure", () => {
    const tokens = generateFigmaTokensJSON();
    const day0 = tokens.recovery.turp.days["0"];
    expect(day0).toHaveProperty("today-text");
    expect(day0).toHaveProperty("forecast-text");
    expect(day0).toHaveProperty("redflag-text");
    expect(day0).toHaveProperty("day-title-text");
    expect(day0["today-text"]).toHaveProperty("value");
    expect(day0["today-text"]).toHaveProperty("type");
    expect(day0["today-text"].type).toBe("string");
  });

  test("includes emotion variables", () => {
    const tokens = generateFigmaTokensJSON();
    expect(tokens.emotion).toHaveProperty("emotion-normal");
    expect(tokens.emotion).toHaveProperty("emotion-progress");
    expect(tokens.emotion).toHaveProperty("emotion-alert");
    expect(tokens.emotion["emotion-normal"].value).toBe("#00BE92");
  });

  test("metadata is included for each procedure", () => {
    const tokens = generateFigmaTokensJSON();
    expect(tokens.meta).toHaveProperty("turp");
    expect(tokens.meta.turp).toHaveProperty("source");
    expect(tokens.meta.turp).toHaveProperty("version");
  });
});

describe("Server API Export", () => {
  test("generates valid API structure", () => {
    const api = exportForServerAPI();
    expect(api).toHaveProperty("version");
    expect(api).toHaveProperty("generatedAt");
    expect(api).toHaveProperty("procedures");
    expect(api).toHaveProperty("emotionVariables");
    expect(api).toHaveProperty("componentVariants");
  });

  test("includes all procedures as array", () => {
    const api = exportForServerAPI();
    expect(Array.isArray(api.procedures)).toBe(true);
    expect(api.procedures.length).toBeGreaterThan(0);
  });

  test("each procedure has correct structure", () => {
    const api = exportForServerAPI();
    const turpProcedure = api.procedures.find((p: any) => p.id === "turp");
    expect(turpProcedure).toBeTruthy();
    expect(turpProcedure).toHaveProperty("id");
    expect(turpProcedure).toHaveProperty("name");
    expect(turpProcedure).toHaveProperty("metadata");
    expect(turpProcedure).toHaveProperty("days");
    expect(Array.isArray(turpProcedure!.days)).toBe(true);
  });

  test("each day in procedure has correct structure", () => {
    const api = exportForServerAPI();
    const turpProcedure = api.procedures.find((p: any) => p.id === "turp");
    expect(turpProcedure).toBeTruthy();
    const day0 = turpProcedure!.days[0];
    expect(day0).toHaveProperty("day");
    expect(day0).toHaveProperty("title");
    expect(day0).toHaveProperty("reassurance");
    expect(day0).toHaveProperty("forecast");
    expect(day0).toHaveProperty("redFlags");
    expect(Array.isArray(day0.redFlags)).toBe(true);
  });

  test("generatedAt is valid ISO date", () => {
    const api = exportForServerAPI();
    const date = new Date(api.generatedAt);
    expect(date instanceof Date).toBe(true);
    expect(isNaN(date.getTime())).toBe(false);
  });
});

describe("Card Background Logic", () => {
  test("returns reassurance-bg for today non-milestone", () => {
    const bg = getCardBackground(5, true);
    expect(bg).toContain("1E3A5B"); // Navy
    expect(bg).toContain("00856D"); // Dark teal
  });

  test("returns milestone-bg for today milestone day", () => {
    const bg = getCardBackground(7, true);
    expect(bg).toContain("C4941F"); // Gold
  });

  test("returns milestone-bg for day 14 today", () => {
    const bg = getCardBackground(14, true);
    expect(bg).toContain("C4941F");
  });

  test("returns milestone-bg for day 21 today", () => {
    const bg = getCardBackground(21, true);
    expect(bg).toContain("C4941F");
  });

  test("returns milestone-bg for day 28 today", () => {
    const bg = getCardBackground(28, true);
    expect(bg).toContain("C4941F");
  });

  test("returns calm-bg for non-today card", () => {
    const bg = getCardBackground(5, false);
    expect(bg).toContain("E6FDF8");
    expect(bg).toContain("FFFFFF");
  });

  test("day 0 is not treated as milestone", () => {
    const bg = getCardBackground(0, true);
    expect(bg).not.toContain("C4941F");
    expect(bg).toContain("1E3A5B"); // Navy
  });
});

describe("Data Integrity", () => {
  test("TURP has all 29 days (0-28)", () => {
    const tokens = generateFigmaTokensJSON();
    const turpDays = Object.keys(tokens.recovery.turp.days);
    expect(turpDays.length).toBe(29);
    expect(turpDays).toContain("0");
    expect(turpDays).toContain("28");
  });

  test("Circumcision has all 29 days (0-28)", () => {
    const tokens = generateFigmaTokensJSON();
    const circumcisionDays = Object.keys(tokens.recovery.circumcision.days);
    expect(circumcisionDays.length).toBe(29);
  });

  test("all TURP days have required text fields", () => {
    const tokens = generateFigmaTokensJSON();
    const turpDays = tokens.recovery.turp.days;
    Object.keys(turpDays).forEach((dayKey) => {
      const day = turpDays[dayKey];
      expect(day).toHaveProperty("today-text");
      expect(day).toHaveProperty("forecast-text");
      expect(day).toHaveProperty("redflag-text");
      expect(day).toHaveProperty("day-title-text");
      expect(day["today-text"].value).toBeTruthy();
      expect(day["forecast-text"].value).toBeTruthy();
      expect(day["redflag-text"].value).toBeTruthy();
    });
  });

  test("no null or undefined values in today-text", () => {
    const api = exportForServerAPI();
    api.procedures.forEach((procedure: any) => {
      procedure.days.forEach((day: any) => {
        expect(day.reassurance).toBeTruthy();
        expect(day.reassurance).not.toBeNull();
        expect(day.reassurance).not.toBeUndefined();
      });
    });
  });
});

describe("Accessibility Compliance", () => {
  test("all procedures meet reading level standard", () => {
    const api = exportForServerAPI();
    api.procedures.forEach((procedure: any) => {
      expect(procedure.metadata.readingLevel).toBe("Year 7 (UK)");
      expect(procedure.metadata.fleschScore).toBeGreaterThanOrEqual(72);
      expect(procedure.metadata.fleschScore).toBeLessThanOrEqual(76);
    });
  });

  test("red flag text is clear and actionable", () => {
    const text = getRecoveryText("TURP", 7);
    expect(text?.["redflag-text"]).toBeTruthy();
    expect(text?.["redflag-text"].length).toBeGreaterThan(10);
    // Should contain action words
    expect(
      text?.["redflag-text"].toLowerCase().includes("unable") ||
      text?.["redflag-text"].toLowerCase().includes("inability") ||
      text?.["redflag-text"].toLowerCase().includes("new")
    ).toBe(true);
  });
});

// Mock console to prevent test output clutter
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};
