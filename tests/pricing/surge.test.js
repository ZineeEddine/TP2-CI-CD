const { calculateSurge } = require("../../src/pricing/surge");

describe("calculateSurge", () => {
  it("should return 1.0 for Tuesday 15h (normal)", () => {
    const result = calculateSurge(15, "tuesday");
    expect(result).toBe(1.0);
  });

  it("should return 1.3 for Wednesday 12.5h (lunch)", () => {
    const result = calculateSurge(12.5, "wednesday");
    expect(result).toBe(1.3);
  });

  it("should return 1.5 for Thursday 20h (dinner)", () => {
    const result = calculateSurge(20, "thursday");
    expect(result).toBe(1.5);
  });

  it("should return 1.8 for Friday 21h (weekend evening)", () => {
    const result = calculateSurge(21, "friday");
    expect(result).toBe(1.8);
  });

  it("should return 1.2 for Sunday 14h (sunday all day)", () => {
    const result = calculateSurge(14, "sunday");
    expect(result).toBe(1.2);
  });

  it("should return 1.0 at 11.5h (11h30) in normal slot", () => {
    const result = calculateSurge(11.5, "monday");
    expect(result).toBe(1.0);
  });

  it("should return 1.3 at 12h", () => {
    const result = calculateSurge(12, "monday");
    expect(result).toBe(1.3);
  });

  it("should return 1.5 at 19h", () => {
    const result = calculateSurge(19, "thursday");
    expect(result).toBe(1.5);
  });

  it("should return 0 at 22h (after surge)", () => {
    const result = calculateSurge(22, "friday");
    expect(result).toBe(0);
  });

  it("should return 0 before 10h (9.99)", () => {
    const result = calculateSurge(9.99, "monday");
    expect(result).toBe(0);
  });

  it("should return 1.0 at 10h (open)", () => {
    const result = calculateSurge(10, "monday");
    expect(result).toBe(1.0);
  });

  it("should return 0 for invalid hour (negative)", () => {
    const result = calculateSurge(-1, "monday");
    expect(result).toBe(0);
  });

  it("should return 0 for invalid hour (25)", () => {
    const result = calculateSurge(25, "monday");
    expect(result).toBe(0);
  });

  it("should return 0 for invalid dayOfWeek (null)", () => {
    const result = calculateSurge(12, null);
    expect(result).toBe(0);
  });
});