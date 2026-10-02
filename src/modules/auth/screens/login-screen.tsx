import { router, useLocalSearchParams } from 'expo-router';

import { AuthFooterLink } from '../components/auth-footer-link';
import { AuthLayout } from '../components/auth-layout';
import { LoginForm } from '../components/login-form';

export function LoginScreen() {
  const { email, registered } = useLocalSearchParams<{ email?: string; registered?: string }>();

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your account"
      footer={
        <AuthFooterLink
          prompt="Don't have an account?"
          action="Sign up"
          onPress={() => router.push('/signup')}
        />
      }>
      <LoginForm
        key={`${email ?? ''}-${registered ?? ''}`}
        initialEmail={email}
        notice={registered ? 'Account created. Sign in with your new password.' : undefined}
        onSuccess={() => router.replace('/')}
      />
    </AuthLayout>
  );
}
