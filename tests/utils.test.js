const {
  capitalize,
  calculateAverage,
  slugify,
  clamp,
} = require('../src/utils');

describe('utils', () => {
  describe('capitalize', () => {
    test('should capitalize a lowercase word', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    test('should normalize uppercase text', () => {
      expect(capitalize('WORLD')).toBe('World');
    });

    test('should return an empty string when input is empty', () => {
      expect(capitalize('')).toBe('');
    });

    test('should return an empty string when input is null', () => {
      expect(capitalize(null)).toBe('');
    });
  });

  describe('calculateAverage', () => {
    test('should calculate the average of multiple numbers', () => {
      expect(calculateAverage([10, 12, 14])).toBe(12);
    });

    test('should return the same number for a single value', () => {
      expect(calculateAverage([15])).toBe(15);
    });

    test('should return 0 for an empty array', () => {
      expect(calculateAverage([])).toBe(0);
    });

    test('should return 0 when input is null', () => {
      expect(calculateAverage(null)).toBe(0);
    });
  });

  describe('slugify', () => {
    test('should convert words to a lowercase slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    test('should trim spaces and replace them with hyphens', () => {
      expect(slugify(' Spaces Everywhere ')).toBe('spaces-everywhere');
    });

    test('should remove special characters and accents', () => {
      expect(slugify("C'est l'ete !")).toBe('cest-lete');
    });

    test('should return an empty string when input is empty', () => {
      expect(slugify('')).toBe('');
    });
  });

  describe('clamp', () => {
    test('should return the value when it is within bounds', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    test('should return the minimum when value is below range', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    test('should return the maximum when value is above range', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    test('should return the same value when min and max are equal', () => {
      expect(clamp(0, 0, 0)).toBe(0);
    });
  });
});