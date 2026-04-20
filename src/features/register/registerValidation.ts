import type { RegisterFieldErrors, RegisterRequest } from "./registerTypes";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function passwordComplexityMessage(password: string): string | null {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password must contain at least one special character";
  }
  return null;
}

export function validateRegisterForm(
  data: RegisterRequest,
): RegisterFieldErrors {
  const errors: RegisterFieldErrors = {};
  const first = data.firstname.trim();
  const last = data.lastname.trim();
  const email = data.email.trim();
  const phone = data.phone.trim();

  if (!first) {
    errors.firstname = "First name is required";
  } else if (first.length < 2) {
    errors.firstname = "First name must be at least 2 characters";
  }

  if (!last) {
    errors.lastname = "Last name is required";
  } else if (last.length < 2) {
    errors.lastname = "Last name must be at least 2 characters";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!data.gender?.trim()) {
    errors.gender = "Gender is required";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else {
    const pwdMsg = passwordComplexityMessage(data.password);
    if (pwdMsg) errors.password = pwdMsg;
  }

  if (!data.confirm_password) {
    errors.confirm_password = "Confirm password is required";
  } else if (data.confirm_password !== data.password) {
    errors.confirm_password = "Passwords do not match";
  }

  if (phone) {
    if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone must be exactly 10 digits";
    }
  }

  return errors;
}

export function hasValidationErrors(errors: RegisterFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
