import {describe, it, expect} from "vitest";
import {stress, policyCheck} from "./credit";

describe("credit arithmetic", () => {
  it("derives seven DSCR values from the projection", () => {
    const result = stress({facilityCr: 3.25});
    expect(result.years).toHaveLength(7);
    expect(result.years[0].principalRepaymentCr).toBe(0);
    expect(result.years[1].principalRepaymentCr).toBeGreaterThan(0);
    expect(result.minDscr).toBeGreaterThanOrEqual(1.25);
    expect(result.fundingGapCr).toBe(0);
  });
  it("grant delay adds debt and pushes DSCR below the policy floor", () => {
    const result = stress({facilityCr: 3.25, grantDelayed: true});
    expect(result.fundingGapCr).toBeGreaterThan(0);
    expect(result.debtEquity).toBeGreaterThan(stress({facilityCr: 3.25}).debtEquity);
    expect(result.minDscr).toBeLessThan(1.25);
  });
  it("each slider facility is calculated from the same projection", () => {
    for (const facilityCr of [2, 2.7, 3.25, 3.75]) {
      const result = stress({facilityCr});
      expect(result.years).toHaveLength(7);
      expect(result.dscr).toEqual(result.years.map(year => year.dscr));
    }
  });
  it("keeps the policy-floor boundary explicit", () => {
    expect(policyCheck(1.25)).toBe(true);
    expect(policyCheck(1.249)).toBe(false);
  });
});
