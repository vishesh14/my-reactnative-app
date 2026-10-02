import { type PropsWithChildren } from 'react';

/**
 * Wraps the app with global providers (auth, data fetching, etc.).
 * Add new context providers here and render <AppProvider> in `src/app/_layout.tsx`.
 */
export function AppProvider({ children }: PropsWithChildren) {
  return <>{children}</>;
}
