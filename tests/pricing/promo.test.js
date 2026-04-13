const { applyPromoCode } = require("../../src/pricing/promo");

describe("applyPromoCode", () => {
  const promoCodes = [
    {
      code: "BIENVENUE20",
      type: "percentage",
      value: 20,
      minOrder: 15.0,
      expiresAt: "2026-12-31",
    },
    {
      code: "FIXED5",
      type: "fixed",
      value: 5,
      minOrder: 10.0,
      expiresAt: "2026-12-31",
    },
  ];

  it("should apply 20% on 50 → 40", () => {
    const result = applyPromoCode(50, "BIENVENUE20", promoCodes);
    expect(result).toBe(40.0);
  });

  it("should apply fixed 5 on 30 → 25", () => {
    const result = applyPromoCode(30, "FIXED5", promoCodes);
    expect(result).toBe(25.0);
  });

  it("should accept valid code with minOrder respected", () => {
    const result = applyPromoCode(20, "BIENVENUE20", promoCodes);
    expect(result).toBe(16.0);
  });

  it("should refuse expired code", () => {
    const expiredCodes = [
      { ...promoCodes[0], expiresAt: "2025-01-01" },
    ];
    const result = applyPromoCode(50, "BIENVENUE20", expiredCodes);
    expect(result).toBeNull();
  });

  it("should refuse code if subtotal below minOrder", () => {
    const result = applyPromoCode(10, "BIENVENUE20", promoCodes);
    expect(result).toBeNull();
  });

  it("should refuse unknown code", () => {
    const result = applyPromoCode(50, "INCONNU", promoCodes);
    expect(result).toBeNull();
  });

  it("should handle fixed 10 on 5 → clamp to 0", () => {
    const fixed10 = [
      { code: "BIG10", type: "fixed", value: 10, minOrder: 0, expiresAt: "2026-12-31" },
    ];
    const result = applyPromoCode(5, "BIG10", fixed10);
    expect(result).toBe(0.0);
  });

  it("should handle 100% → 0", () => {
    const percent100 = [
      { code: "100PERCENT", type: "percentage", value: 100, minOrder: 0, expiresAt: "2026-12-31" },
    ];
    const result = applyPromoCode(50, "100PERCENT", percent100);
    expect(result).toBe(0.0);
  });

  it("should handle subtotal 0 → 0", () => {
    const result = applyPromoCode(0, "BIENVENUE20", promoCodes);
    expect(result).toBeNull();
  });

  it("should return null for negative subtotal", () => {
    const result = applyPromoCode(-10, "BIENVENUE20", promoCodes);
    expect(result).toBeNull();
  });

  it("should not apply reduction for null promoCode", () => {
    const result = applyPromoCode(50, null, promoCodes);
    expect(result).toBe(50.0);
  });

  it("should not apply reduction for empty promoCode", () => {
    const result = applyPromoCode(50, "", promoCodes);
    expect(result).toBe(50.0);
  });
});