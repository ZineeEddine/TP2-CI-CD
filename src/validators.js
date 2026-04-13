function isValidEmail(email) {
  if (typeof email !== 'string' || email.trim() === '') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function isValidPassword(password) {
  const errors = [];

  if (typeof password !== 'string') {
    errors.push('Password must be a string');
    return { valid: false, errors };
  }

  const trimmedPassword = password.trim();

  if (trimmedPassword.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(trimmedPassword)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(trimmedPassword)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(trimmedPassword)) {
    errors.push('Password must contain at least one digit');
  }

  if (!/[!@#$%^&*]/.test(trimmedPassword)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function isValidAge(age) {
  if (typeof age !== 'number' || Number.isNaN(age) || !Number.isInteger(age)) {
    return false;
  }

  return age >= 0 && age <= 150;
}

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidAge,
};