const {
  capitalize,
  calculateAverage,
  slugify,
  clamp,
  sortStudents,
} = require("../src/utils");

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

describe("sortStudents", () => {
  const students = [
    { name: "Charlie", grade: 80, age: 20 },
    { name: "Alice", grade: 95, age: 22 },
    { name: "Bob", grade: 70, age: 19 },
  ];

  it("should sort students by grade ascending", () => {
    const result = sortStudents(students, "grade", "asc");
    expect(result).toEqual([
      { name: "Bob", grade: 70, age: 19 },
      { name: "Charlie", grade: 80, age: 20 },
      { name: "Alice", grade: 95, age: 22 },
    ]);
  });

  it("should sort students by grade descending", () => {
    const result = sortStudents(students, "grade", "desc");
    expect(result).toEqual([
      { name: "Alice", grade: 95, age: 22 },
      { name: "Charlie", grade: 80, age: 20 },
      { name: "Bob", grade: 70, age: 19 },
    ]);
  });

  it("should sort students by name ascending", () => {
    const result = sortStudents(students, "name", "asc");
    expect(result).toEqual([
      { name: "Alice", grade: 95, age: 22 },
      { name: "Bob", grade: 70, age: 19 },
      { name: "Charlie", grade: 80, age: 20 },
    ]);
  });

  it("should sort students by age ascending", () => {
    const result = sortStudents(students, "age", "asc");
    expect(result).toEqual([
      { name: "Bob", grade: 70, age: 19 },
      { name: "Charlie", grade: 80, age: 20 },
      { name: "Alice", grade: 95, age: 22 },
    ]);
  });

  it("should return empty array for null input", () => {
    const result = sortStudents(null, "grade");
    expect(result).toEqual([]);
  });

  it("should return empty array for empty input", () => {
    const result = sortStudents([], "grade");
    expect(result).toEqual([]);
  });

  it("should not modify the original array", () => {
    const original = [
      { name: "Charlie", grade: 80, age: 20 },
      { name: "Alice", grade: 95, age: 22 },
      { name: "Bob", grade: 70, age: 19 },
    ];
    const copy = [...original];

    sortStudents(original, "grade");

    expect(original).toEqual(copy);
  });

  it("should default to ascending order", () => {
    const result = sortStudents(students, "grade");  
    expect(result).toEqual([
      { name: "Bob", grade: 70, age: 19 },
      { name: "Charlie", grade: 80, age: 20 },
      { name: "Alice", grade: 95, age: 22 },
    ]);
  });
});