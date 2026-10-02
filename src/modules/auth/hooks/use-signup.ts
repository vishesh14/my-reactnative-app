import { useState } from 'react';

import { signup } from '../services/auth-service';
import type { AuthUser, SignupFieldErrors, SignupInput } from '../types';
import { validateSignup } from '../utils/validate-signup';

type UseSignupOptions = {
  onSuccess?: (user: AuthUser) => void;
};

export function useSignup({ onSuccess }: UseSignupOptions = {}) {
  const [fieldErrors, setFieldErrors] = useState<SignupFieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  async function submit(input: SignupInput) {
    const errors = validateSignup(input);
    setFieldErrors(errors);
    setFormError(undefined);
    if (Object.values(errors).some(Boolean)) return;

    setSubmitting(true);
    const result = await signup(input);
    setSubmitting(false);

    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    onSuccess?.(result.data);
  }

  function clearFieldError(field: keyof SignupFieldErrors) {
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  return { submit, submitting, fieldErrors, formError, clearFieldError };
}
