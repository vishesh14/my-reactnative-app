/**
 * SecureStore is not available on web, so this falls back to `localStorage`.
 * This is NOT encrypted — do not rely on it for sensitive data in production web builds.
 */
export const secureStorage = {
  getItem: async (key: string) => (typeof localStorage === 'undefined' ? null : localStorage.getItem(key)),
  setItem: async (key: string, value: string) => localStorage.setItem(key, value),
  removeItem: async (key: string) => localStorage.removeItem(key),
};
