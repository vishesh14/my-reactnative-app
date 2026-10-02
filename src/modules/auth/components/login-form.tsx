import { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, type TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { useLogin } from '../hooks/use-login';
import type { AuthSession } from '../types';

type LoginFormProps = {
  onSuccess?: (session: AuthSession) => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const theme = useTheme();
  const passwordRef = useRef<TextInput>(null);
  const { submit, submitting, fieldErrors, formError, clearFieldError } = useLogin({ onSuccess });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => submit({ email, password });

  return (
    <ThemedView style={styles.form}>
      {formError ? (
        <ThemedView style={[styles.banner, { borderColor: theme.danger }]} accessibilityRole="alert">
          <ThemedText type="small" themeColor="danger">
            {formError}
          </ThemedText>
        </ThemedView>
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
          <Pressable
            onPress={() => setShowPassword((value) => !value)}
            hitSlop={Spacing.two}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
            <ThemedText type="smallBold" themeColor="primary">
              {showPassword ? 'Hide' : 'Show'}
            </ThemedText>
          </Pressable>
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
  banner: {
    borderWidth: 1,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  forgot: {
    alignSelf: 'flex-end',
  },
});
