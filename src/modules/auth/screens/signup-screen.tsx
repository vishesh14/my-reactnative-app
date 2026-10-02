import { router } from 'expo-router';

import { AuthFooterLink } from '../components/auth-footer-link';
import { AuthLayout } from '../components/auth-layout';
import { SignupForm } from '../components/signup-form';

export function SignupScreen() {
  return (
    <AuthLayout
      title="Create account"
      subtitle="Sign up to get started"
      footer={
        <AuthFooterLink
          prompt="Already have an account?"
          action="Sign in"
          onPress={() => router.dismissTo('/login')}
        />
      }>
      <SignupForm
        onSuccess={(user) =>
          router.dismissTo({ pathname: '/login', params: { email: user.email, registered: '1' } })
        }
      />
    </AuthLayout>
  );
}
