function calculateDeliveryFee(distance, weight) {
  if (distance < 0 || weight < 0) return null;
  if (distance > 10) return null;

  let baseFee = 2.0;
  let extraByDistance = 0;
  if (distance > 3) {
    const extraKm = distance - 3;
    extraByDistance = extraKm * 0.5;
  }

  let extraByWeight = 0;
  if (weight > 5) {
    extraByWeight = 1.5;
  }

  const total = baseFee + extraByDistance + extraByWeight;
  return Number(total.toFixed(2));
}

module.exports = {
  calculateDeliveryFee,
};