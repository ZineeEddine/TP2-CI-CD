const { calculateOrderTotal } = require("../../src/pricing/order");

describe("calculateOrderTotal", () => {
  const pizza = { name: "Pizza", price: 12.5, quantity: 2 };
  const items = [pizza];

  it("should compute total 2 pizzas 12.5 at 5 km, tuesday 15h, no promo", () => {
    const result = calculateOrderTotal(items, 5, 3, null, 15, "tuesday");
    expect(result).toEqual({
      subtotal: 25.0,
      discount: 0.0,
      deliveryFee: 3.0,
      surge: 1.0,
      total: 28.0,
    });
  });

  it("should apply 20% promo on 2 pizzas 12.5 at 5 km, tuesday 15h", () => {
    const result = calculateOrderTotal(items, 5, 3, "BIENVENUE20", 15, "tuesday");
    expect(result).toEqual({
      subtotal: 25.0,
      discount: 5.0,
      deliveryFee: 3.0,
      surge: 1.0,
      total: 23.0,
    });
  });

  it("should apply fixed 5 promo on 2 pizzas 12.5 at 5 km, tuesday 15h", () => {
    const result = calculateOrderTotal(items, 5, 3, "FIXED5", 15, "tuesday");
    expect(result).toEqual({
      subtotal: 25.0,
      discount: 5.0,
      deliveryFee: 3.0,
      surge: 1.0,
      total: 23.0,
    });
  });

  it("should compute higher total on friday 20h (surge 1.8)", () => {
    const result = calculateOrderTotal(items, 5, 3, null, 20, "friday");
    expect(result).toEqual({
      subtotal: 25.0,
      discount: 0.0,
      deliveryFee: 3.0,
      surge: 1.8,
      total: 30.4,
    });
  });

  it("should compute 2 pizzas with 10 km, 6 kg, 20h, 20% promo, friday", () => {
    const items2 = [
      { name: "Pizza", price: 12.5, quantity: 2 },
      { name: "Drinks", price: 3.0, quantity: 2 },
    ];
    const result = calculateOrderTotal(items2, 10, 6, "BIENVENUE20", 20, "friday");
    const subtotal = 25.0 + 6.0;
    const discount = 31.0 * 0.2;
    const deliveryFee = 7.0;
    const surge = 1.8;
    const total = subtotal - discount + deliveryFee * surge;
    expect(result).toEqual({
      subtotal: 31.0,
      discount: 6.2,
      deliveryFee: 7.0,
      surge: 1.8,
      total: Math.round(total * 100) / 100,
    });
  });

  it("should return null for empty items", () => {
    const result = calculateOrderTotal([], 5, 3, null, 15, "tuesday");
    expect(result).toBeNull();
  });

  it("should return null for item with quantity 0", () => {
    const itemsZero = [{ name: "Pizza", price: 12.5, quantity: 0 }];
    const result = calculateOrderTotal(itemsZero, 5, 3, null, 15, "tuesday");
    expect(result).toBeNull();
  });

  it("should return null for item with negative price", () => {
    const itemsNeg = [{ name: "Pizza", price: -12.5, quantity: 1 }];
    const result = calculateOrderTotal(itemsNeg, 5, 3, null, 15, "tuesday");
    expect(result).toBeNull();
  });

  it("should return null for 23h (surge 0, closed)", () => {
    const result = calculateOrderTotal(items, 5, 3, null, 23, "tuesday");
    expect(result).toBeNull();
  });

  it("should return null for 15 km (out of zone)", () => {
    const result = calculateOrderTotal(items, 15, 3, null, 15, "tuesday");
    expect(result).toBeNull();
  });

  it("should return null for negative distance", () => {
    const result = calculateOrderTotal(items, -1, 3, null, 15, "tuesday");
    expect(result).toBeNull();
  });

  it("should return null for negative weight", () => {
    const result = calculateOrderTotal(items, 5, -1, null, 15, "tuesday");
    expect(result).toBeNull();
  });

  it("should return null for invalid promoCode", () => {
    const result = calculateOrderTotal(items, 5, 3, "INCONNU", 15, "tuesday");
    expect(result).toBeNull();
  });
});