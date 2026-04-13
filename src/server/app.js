const express = require("express");
const pricingRoutes = require("../api/pricing.routes");

const app = express();

app.use(express.json());

app.use("/api", pricingRoutes);

module.exports = app;
