const { calculateDeliveryFee } = require("../../src/pricing/delivery");

describe("calculateDeliveryFee", () => {
  it("should return 2.00 for 2 km, 1 kg (base only)", () => {
    const result = calculateDeliveryFee(2, 1);
    expect(result).toBe(2.0);
  });

  it("should compute 7 km, 3 kg → 2.00 + 4 * 0.50 = 4.00", () => {
    const result = calculateDeliveryFee(7, 3);
    expect(result).toBe(4.0);
  });

  it("should compute 5 km, 8 kg (lourd) → 2.00 + 2 * 0.50 + 1.50 = 4.50", () => {
    const result = calculateDeliveryFee(5, 8);
    expect(result).toBe(4.5);
  });

  it("should keep base fee at exactly 3 km", () => {
    const result = calculateDeliveryFee(3, 2);
    expect(result).toBe(2.0);
  });

  it("should allow exactly 10 km → 2.00 + 7 * 0.50 = 5.50", () => {
    const result = calculateDeliveryFee(10, 2);
    expect(result).toBe(5.5);
  });

  it("should not add weight supplement at exactly 5 kg", () => {
    const result = calculateDeliveryFee(5, 5);
    expect(result).toBe(3.0);
  });

  it("should compute 6 km, 2 kg → 2.00 + 3 * 0.50 = 3.50", () => {
    const result = calculateDeliveryFee(6, 2);
    expect(result).toBe(3.5);
  });

  it("should compute 10 km, 6 kg → 2.00 + 7 * 0.50 + 1.50 = 7.00", () => {
    const result = calculateDeliveryFee(10, 6);
    expect(result).toBe(7.0);
  });

  it("should refuse delivery for 15 km (hors zone → null)", () => {
    const result = calculateDeliveryFee(15, 2);
    expect(result).toBeNull();
  });

  it("should return null for negative distance", () => {
    const result = calculateDeliveryFee(-1, 2);
    expect(result).toBeNull();
  });

  it("should return null for negative weight", () => {
    const result = calculateDeliveryFee(5, -1);
    expect(result).toBeNull();
  });

  it("should accept distance 0 km → 2.00", () => {
    const result = calculateDeliveryFee(0, 2);
    expect(result).toBe(2.0);
  });
});