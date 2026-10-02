import { isValidEmail } from '@/utils/validation';

import type { LoginCredentials, LoginFieldErrors } from '../types';

export const MIN_PASSWORD_LENGTH = 6;

export function validateLogin({ email, password }: LoginCredentials): LoginFieldErrors {
  const errors: LoginFieldErrors = {};
  if (!email.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address';
  if (!password) errors.password = 'Password is required';
  else if (password.length < MIN_PASSWORD_LENGTH)
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  return errors;
}
