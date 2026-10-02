/**
 * App-wide configuration. Values prefixed with `EXPO_PUBLIC_` are inlined at build time.
 * Learn more: https://docs.expo.dev/guides/environment-variables/
 */

export const Config = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000',
} as const;
