function applyPromoCode(subtotal, promoCode, promoCodes) {
  if (typeof subtotal !== "number" || subtotal < 0) return null;

  if (!promoCode || typeof promoCode !== "string") return subtotal;

  const rule = promoCodes.find((p) => p.code === promoCode);
  if (!rule) return null;

  const now = new Date();
  const expiresAt = new Date(rule.expiresAt);
  if (now > expiresAt) return null;

  if (subtotal < rule.minOrder) return null;

  let discount;

  if (rule.type === "percentage") {
    const value = Number(rule.value);
    if (!Number.isFinite(value) || value < 0) return null;
    discount = (subtotal * value) / 100;
  } else if (rule.type === "fixed") {
    const value = Number(rule.value);
    if (!Number.isFinite(value) || value < 0) return null;
    discount = value;
  } else {
    return null;
  }

  const total = Math.max(0, subtotal - discount);
  return Number(total.toFixed(2));
}

module.exports = {
  applyPromoCode,
};