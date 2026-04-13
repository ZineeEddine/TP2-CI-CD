const {
  isValidEmail,
  isValidPassword,
  isValidAge,
} = require('../src/validators');



describe('validators', () => {
  describe('isValidEmail', () => {
    test('should return true for valid email', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
    });

    test('should return true for complex valid email', () => {
      expect(isValidEmail('user.name+tag@domain.co')).toBe(true);
    });

    test('should return false for invalid email without domain', () => {
      expect(isValidEmail('invalid')).toBe(false);
    });

    test('should return false for email starting with @', () => {
      expect(isValidEmail('@domain.com')).toBe(false);
    });

    test('should return false for email ending with @', () => {
      expect(isValidEmail('user@')).toBe(false);
    });

    test('should return false for empty string', () => {
      expect(isValidEmail('')).toBe(false);
    });

    test('should return false for null', () => {
      expect(isValidEmail(null)).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    test('should return valid for password meeting all criteria', () => {
      const result = isValidPassword('Passw0rd!');
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    test('should return invalid for short password', () => {
      const result = isValidPassword('short');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must be at least 8 characters long');
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
      expect(result.errors).toContain('Password must contain at least one digit');
      expect(result.errors).toContain('Password must contain at least one special character (!@#$%^&*)');
    });

    test('should return error for missing uppercase', () => {
      const result = isValidPassword('alllowercase1!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
    });

    test('should return error for missing lowercase', () => {
      const result = isValidPassword('ALLUPPERCASE1!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one lowercase letter');
    });

    test('should return error for missing digit', () => {
      const result = isValidPassword('NoDigits!here');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one digit');
    });

    test('should return error for missing special character', () => {
      const result = isValidPassword('NoSpecial1here');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one special character (!@#$%^&*)');
    });

    test('should return invalid for empty string', () => {
      const result = isValidPassword('');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must be at least 8 characters long');
    });

    test('should return invalid for null', () => {
      const result = isValidPassword(null);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must be a string');
    });
  });

  describe('isValidAge', () => {
    test('should return true for valid age 25', () => {
      expect(isValidAge(25)).toBe(true);
    });

    test('should return true for minimum age 0', () => {
      expect(isValidAge(0)).toBe(true);
    });

    test('should return true for maximum age 150', () => {
      expect(isValidAge(150)).toBe(true);
    });

    test('should return false for negative age', () => {
      expect(isValidAge(-1)).toBe(false);
    });

    test('should return false for age above 150', () => {
      expect(isValidAge(151)).toBe(false);
    });

    test('should return false for non-integer age', () => {
      expect(isValidAge(25.5)).toBe(false);
    });

    test('should return false for string age', () => {
      expect(isValidAge('25')).toBe(false);
    });

    test('should return false for null', () => {
      expect(isValidAge(null)).toBe(false);
    });
  });
});