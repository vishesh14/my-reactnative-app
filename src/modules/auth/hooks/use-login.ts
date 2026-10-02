import { useState } from 'react';

import { login } from '../services/auth-service';
import type { AuthSession, LoginCredentials, LoginFieldErrors } from '../types';
import { validateLogin } from '../utils/validate-login';

type UseLoginOptions = {
  onSuccess?: (session: AuthSession) => void;
};

export function useLogin({ onSuccess }: UseLoginOptions = {}) {
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  async function submit(credentials: LoginCredentials) {
    const errors = validateLogin(credentials);
    setFieldErrors(errors);
    setFormError(undefined);
    if (errors.email || errors.password) return;

    setSubmitting(true);
    const result = await login({ ...credentials, email: credentials.email.trim() });
    setSubmitting(false);

    if (!result.ok) {
      setFormError(result.status === 401 ? 'Incorrect email or password' : result.error);
      return;
    }
    onSuccess?.(result.data);
  }

  function clearFieldError(field: keyof LoginFieldErrors) {
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  return { submit, submitting, fieldErrors, formError, clearFieldError };
}
