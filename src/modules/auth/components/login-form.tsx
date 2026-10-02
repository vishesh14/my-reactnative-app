import { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, type TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';
import { Spacing } from '@/constants/theme';

import { useLogin } from '../hooks/use-login';
import type { AuthSession } from '../types';
import { FormBanner } from './form-banner';
import { PasswordToggle } from './password-toggle';

type LoginFormProps = {
  initialEmail?: string;
  notice?: string;
  onSuccess?: (session: AuthSession) => void;
};

export function LoginForm({ initialEmail = '', notice, onSuccess }: LoginFormProps) {
  const passwordRef = useRef<TextInput>(null);
  const { submit, submitting, fieldErrors, formError, clearFieldError } = useLogin({ onSuccess });

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => submit({ email, password });

  return (
    <ThemedView style={styles.form}>
      {formError ? (
        <FormBanner message={formError} />
      ) : notice ? (
        <FormBanner message={notice} tone="success" />
      ) : null}

      <TextField
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChangeText={(value) => {
          setEmail(value);
          clearFieldError('email');
        }}
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
        placeholder="Enter your password"
        value={password}
        onChangeText={(value) => {
          setPassword(value);
          clearFieldError('password');
        }}
        error={fieldErrors.password}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={handleSubmit}
        right={
          <PasswordToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />
        }
      />

      <Pressable
        style={styles.forgot}
        hitSlop={Spacing.two}
        accessibilityRole="link"
        onPress={() => Alert.alert('Forgot password', 'Password reset is not set up yet.')}>
        <ThemedText type="smallBold" themeColor="primary">
          Forgot password?
        </ThemedText>
      </Pressable>

      <Button title="Sign in" loading={submitting} onPress={handleSubmit} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: Spacing.three,
  },
  forgot: {
    alignSelf: 'flex-end',
  },
});
