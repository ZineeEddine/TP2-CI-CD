const request = require("supertest");
const app = require("../../src/server/app");
const { resetOrders } = require("../../src/api/orders.service");

describe("API integration tests", () => {
  beforeEach(() => {
    resetOrders();
  });

  describe("POST /api/orders/simulate", () => {
    const items = [{ name: "Pizza", price: 12.5, quantity: 2 }];

    it("should return 200 for valid order", async () => {
      const res = await request(app)
        .post("/api/orders/simulate")
        .send({
          items,
          distance: 5,
          weight: 3,
          hour: 15,
          dayOfWeek: "tuesday",
          promoCode: null,
        });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        subtotal: 25.0,
        discount: 0.0,
        deliveryFee: 3.0,
        surge: 1.0,
        total: 28.0,
      });
    });

    it("should apply 20% promo in simulate", async () => {
      const res = await request(app)
        .post("/api/orders/simulate")
        .send({
          items,
          distance: 5,
          weight: 3,
          hour: 15,
          dayOfWeek: "tuesday",
          promoCode: "BIENVENUE20",
        });

      expect(res.status).toBe(200);
      expect(res.body.subtotal).toBe(25.0);
      expect(res.body.discount).toBe(5.0);
      expect(res.body.deliveryFee).toBe(3.0);
      expect(res.body.surge).toBe(1.0);
      expect(res.body.total).toBe(23.0);
    });

    it("should return 400 for expired promo code in simulate", async () => {
      const res = await request(app)
        .post("/api/orders/simulate")
        .send({
          items,
          distance: 5,
          weight: 3,
          hour: 15,
          dayOfWeek: "tuesday",
          promoCode: "EXPIRE",
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
    });

    it("should return 400 for empty items in simulate", async () => {
      const res = await request(app)
        .post("/api/orders/simulate")
        .send({
          items: [],
          distance: 5,
          weight: 3,
          hour: 15,
          dayOfWeek: "tuesday",
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
    });

    it("should return 400 for 15 km (out of zone) in simulate", async () => {
      const res = await request(app)
        .post("/api/orders/simulate")
        .send({
          items,
          distance: 15,
          weight: 3,
          hour: 15,
          dayOfWeek: "tuesday",
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
    });

    it("should return 400 for 23h (closed) in simulate", async () => {
      const res = await request(app)
        .post("/api/orders/simulate")
        .send({
          items,
          distance: 5,
          weight: 3,
          hour: 23,
          dayOfWeek: "tuesday",
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
    });

    it("should return correct surge pricing on friday 20h in simulate", async () => {
      const res = await request(app)
        .post("/api/orders/simulate")
        .send({
          items,
          distance: 5,
          weight: 3,
          hour: 20,
          dayOfWeek: "friday",
        });

      expect(res.status).toBe(200);
      expect(res.body.subtotal).toBe(25.0);
      expect(res.body.deliveryFee).toBe(3.0);
      expect(res.body.surge).toBe(1.8);
      expect(res.body.total).toBe(30.4);
    });
  });

  describe("POST /api/orders", () => {
    const items = [{ name: "Pizza", price: 12.5, quantity: 2 }];

    it("should create order and return 201 with id", async () => {
      const res = await request(app)
        .post("/api/orders")
        .send({
          items,
          distance: 5,
          weight: 3,
          hour: 15,
          dayOfWeek: "tuesday",
          promoCode: null,
        });

      expect(res.status).toBe(201);
      expect(res.body.id).toBe(1);
      expect(res.body.subtotal).toBe(25.0);
      expect(res.body.discount).toBe(0.0);
    });

    it("should be retrievable via GET /api/orders/:id", async () => {
      const res1 = await request(app)
        .post("/api/orders")
        .send({
          items,
          distance: 5,
          weight: 3,
          hour: 15,
          dayOfWeek: "tuesday",
        });

      const res2 = await request(app).get(`/api/orders/${res1.body.id}`);
      expect(res2.status).toBe(200);
      expect(res2.body).toEqual(res1.body);
    });

    it("should generate different ids for two orders", async () => {
      const res1 = await request(app)
        .post("/api/orders")
        .send({
          items,
          distance: 5,
          weight: 3,
          hour: 15,
          dayOfWeek: "tuesday",
        });

      const res2 = await request(app)
        .post("/api/orders")
        .send({
          items,
          distance: 5,
          weight: 3,
          hour: 15,
          dayOfWeek: "tuesday",
        });

      expect(res1.body.id).toBe(1);
      expect(res2.body.id).toBe(2);
      expect(res1.body.id).not.toBe(res2.body.id);
    });

    it("should return 400 and not create order for invalid data", async () => {
      const res = await request(app)
        .post("/api/orders")
        .send({
          items: [],
          distance: 15,
          weight: 3,
          hour: 23,
          dayOfWeek: "tuesday",
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();

      const res2 = await request(app).get("/api/orders/1");
      expect(res2.status).toBe(404);
    });

    it("should return 400 and not register invalid order", async () => {
      await request(app)
        .post("/api/orders")
        .send({
          items: [],
          distance: 15,
          weight: 3,
          hour: 23,
          dayOfWeek: "tuesday",
        });

      const res = await request(app).get("/api/orders/1");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /api/orders/:id", () => {
    const items = [{ name: "Pizza", price: 12.5, quantity: 2 }];

    it("should return 200 for existing order", async () => {
      const res1 = await request(app)
        .post("/api/orders")
        .send({
          items,
          distance: 5,
          weight: 3,
          hour: 15,
          dayOfWeek: "tuesday",
        });

      const res2 = await request(app).get(`/api/orders/${res1.body.id}`);
      expect(res2.status).toBe(200);
      expect(res2.body).toEqual(res1.body);
    });

    it("should return 404 for non existing id", async () => {
      const res = await request(app).get("/api/orders/999");
      expect(res.status).toBe(404);
      expect(res.body.error).toBeTruthy();
    });

    it("should return correct structure for existing order", async () => {
      const res = await request(app)
        .post("/api/orders")
        .send({
          items,
          distance: 5,
          weight: 3,
          hour: 15,
          dayOfWeek: "tuesday",
        });

      const res2 = await request(app).get(`/api/orders/${res.body.id}`);
      expect(res2.status).toBe(200);
      expect(res2.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          subtotal: 25.0,
          discount: 0.0,
          deliveryFee: 3.0,
          surge: 1.0,
          total: 28.0,
        })
      );
    });
  });

  describe("POST /api/promo/validate", () => {
    it("should validate valid promo code and return discount", async () => {
      const res = await request(app)
        .post("/api/promo/validate")
        .send({
          subtotal: 50,
          promoCode: "BIENVENUE20",
        });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        subtotal: 50.0,
        discount: 10.0,
        total: 40.0,
        promoCode: "BIENVENUE20",
        valid: true,
      });
    });

    it("should return 400 for expired code", async () => {
      const res = await request(app)
        .post("/api/promo/validate")
        .send({
          subtotal: 50,
          promoCode: "EXPIRE",
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
    });

    it("should return 400 for order below minOrder", async () => {
      const res = await request(app)
        .post("/api/promo/validate")
        .send({
          subtotal: 10,
          promoCode: "BIENVENUE20",
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
    });

    it("should return 400 for unknown code", async () => {
      const res = await request(app)
        .post("/api/promo/validate")
        .send({
          subtotal: 50,
          promoCode: "INCONNU",
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
    });

    it("should return 400 when promoCode is missing", async () => {
      const res = await request(app)
        .post("/api/promo/validate")
        .send({
          subtotal: 50,
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
    });
  });
});