import { useRef, useState } from 'react';
import { StyleSheet, type TextInput } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';
import { Spacing } from '@/constants/theme';

import { useSignup } from '../hooks/use-signup';
import type { AuthUser, SignupInput } from '../types';
import { FormBanner } from './form-banner';
import { PasswordToggle } from './password-toggle';

type SignupFormProps = {
  onSuccess?: (user: AuthUser) => void;
};

const EMPTY_FORM: SignupInput = { name: '', email: '', password: '', confirmPassword: '' };

export function SignupForm({ onSuccess }: SignupFormProps) {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);
  const { submit, submitting, fieldErrors, formError, clearFieldError } = useSignup({ onSuccess });

  const [form, setForm] = useState(EMPTY_FORM);
  const [showPassword, setShowPassword] = useState(false);

  function update(field: keyof SignupInput) {
    return (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      clearFieldError(field);
    };
  }

  const handleSubmit = () => submit(form);
  const toggle = (
    <PasswordToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />
  );

  return (
    <ThemedView style={styles.form}>
      {formError ? <FormBanner message={formError} /> : null}

      <TextField
        label="Full name"
        placeholder="Jane Doe"
        value={form.name}
        onChangeText={update('name')}
        error={fieldErrors.name}
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => emailRef.current?.focus()}
      />

      <TextField
        ref={emailRef}
        label="Email"
        placeholder="you@example.com"
        value={form.email}
        onChangeText={update('email')}
        error={fieldErrors.email}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      <TextField
        ref={passwordRef}
        label="Password"
        placeholder="At least 6 characters"
        value={form.password}
        onChangeText={update('password')}
        error={fieldErrors.password}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => confirmRef.current?.focus()}
        right={toggle}
      />

      <TextField
        ref={confirmRef}
        label="Confirm password"
        placeholder="Re-enter your password"
        value={form.confirmPassword}
        onChangeText={update('confirmPassword')}
        error={fieldErrors.confirmPassword}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="go"
        onSubmitEditing={handleSubmit}
      />

      <Button title="Create account" loading={submitting} onPress={handleSubmit} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: Spacing.three,
  },
});
