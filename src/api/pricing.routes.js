const express = require("express");
const { calculateOrderTotal } = require("../pricing/order");
const { applyPromoCode } = require("../pricing/promo");
const { calculateSurge } = require("../pricing/surge");
const { createOrder, getOrderById, resetOrders } = require("./orders.service");

const router = express.Router();

router.post("/orders/simulate", (req, res) => {
  try {
    const { items, distance, weight, promoCode, hour, dayOfWeek } = req.body;

    const result = calculateOrderTotal(
      items,
      distance,
      weight,
      promoCode,
      hour,
      dayOfWeek
    );

    if (result === null) {
      return res.status(400).json({
        error: "Invalid order data",
      });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/orders", (req, res) => {
  try {
    const { items, distance, weight, promoCode, hour, dayOfWeek } = req.body;

    const result = calculateOrderTotal(
      items,
      distance,
      weight,
      promoCode,
      hour,
      dayOfWeek
    );

    if (result === null) {
      return res.status(400).json({
        error: "Invalid order data",
      });
    }

    const order = createOrder({
      items,
      distance,
      weight,
      promoCode,
      hour,
      dayOfWeek,
      ...result,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/orders/:id", (req, res) => {
  const { id } = req.params;
  const order = getOrderById(Number(id));

  if (!order) {
    return res.status(404).json({
      error: "Order not found",
    });
  }

  res.status(200).json(order);
});

router.post("/promo/validate", (req, res) => {
  const { subtotal, promoCode } = req.body;

  if (typeof subtotal !== "number" || subtotal < 0) {
    return res.status(400).json({
      error: "Invalid subtotal",
    });
  }

  if (typeof promoCode !== "string") {
    // Si le code est missing / pas une string → 400
    return res.status(400).json({
      error: "Missing or invalid promo code",
    });
  }

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

  const result = applyPromoCode(subtotal, promoCode, promoCodes);

  if (result === null) {
    return res.status(400).json({
      error: "Invalid promo code or rules",
    });
  }

  const discount = subtotal - result;

  res.status(200).json({
    subtotal,
    discount: Number(discount.toFixed(2)),
    total: Number(result.toFixed(2)),
    promoCode,
    valid: true,
  });
});

module.exports = router;