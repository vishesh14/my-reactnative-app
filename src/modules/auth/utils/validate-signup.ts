import { isValidEmail } from '@/utils/validation';

import type { SignupFieldErrors, SignupInput } from '../types';
import { MIN_PASSWORD_LENGTH } from './validate-login';

export function validateSignup({ name, email, password, confirmPassword }: SignupInput): SignupFieldErrors {
  const errors: SignupFieldErrors = {};
  if (!name.trim()) errors.name = 'Name is required';
  if (!email.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address';
  if (!password) errors.password = 'Password is required';
  else if (password.length < MIN_PASSWORD_LENGTH)
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  if (!confirmPassword) errors.confirmPassword = 'Please confirm your password';
  else if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match';
  return errors;
}
