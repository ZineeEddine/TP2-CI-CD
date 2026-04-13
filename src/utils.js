function capitalize(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function calculateAverage(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return 0;
  }

  const validNumbers = numbers.filter((n) => typeof n === 'number' && Number.isFinite(n));

  if (validNumbers.length === 0) {
    return 0;
  }

  const sum = validNumbers.reduce((acc, num) => acc + num, 0);
  return Number((sum / validNumbers.length).toFixed(2));
}

function slugify(text) {
  if (typeof text !== 'string' || text.trim() === '') {
    return '';
  }

  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function clamp(value, min, max) {
  if ([value, min, max].some((v) => typeof v !== 'number' || Number.isNaN(v))) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

module.exports = {
  capitalize,
  calculateAverage,
  slugify,
  clamp,
};