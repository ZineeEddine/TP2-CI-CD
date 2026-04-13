const { calculateDeliveryFee } = require("./delivery");
const { applyPromoCode } = require("./promo");
const { calculateSurge } = require("./surge");

function calculateOrderTotal(items, distance, weight, promoCode, hour, dayOfWeek) {
  if (!Array.isArray(items) || items.length === 0) return null;
  if (distance < 0 || distance > 10) return null;
  if (weight < 0) return null;
  if (typeof hour !== "number" || hour < 0 || hour > 23) return null;
  if (typeof dayOfWeek !== "string") return null;

  const subtotal = items.reduce((acc, item) => {
    if (item.quantity <= 0) return acc;
    if (item.price < 0) return acc;
    return acc + item.price * item.quantity;
  }, 0);

  if (subtotal === 0) return null;

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

  const beforePromo = subtotal;
  const afterPromo = promoCode
    ? applyPromoCode(beforePromo, promoCode, promoCodes)
    : beforePromo;

  if (afterPromo === null) return null;

  const deliveryFee = calculateDeliveryFee(distance, weight);
  if (deliveryFee === null) return null;

  const surge = calculateSurge(hour, dayOfWeek);
  if (surge === 0) return null;

  const total = Number((afterPromo + deliveryFee * surge).toFixed(2));
  const discount = Number((beforePromo - afterPromo).toFixed(2));

  return {
    subtotal,
    discount,
    deliveryFee,
    surge,
    total,
  };
}

module.exports = {
  calculateOrderTotal,
};