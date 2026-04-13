const orders = {};

let idCounter = 1;

function createOrder(data) {
  const id = idCounter++;
  const order = { id, ...data };
  orders[id] = order;
  return order;
}

function getOrderById(id) {
  return orders[id] || null;
}

function resetOrders() {
  for (const id in orders) {
    delete orders[id];
  }
  idCounter = 1;
}

module.exports = {
  createOrder,
  getOrderById,
  resetOrders,
};