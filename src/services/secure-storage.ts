import * as SecureStore from 'expo-secure-store';

/**
 * Encrypted key-value storage (iOS Keychain / Android Keystore).
 * Keys may only contain alphanumeric characters, ".", "-" and "_".
 * Learn more: https://docs.expo.dev/versions/v57.0.0/sdk/securestore/
 */
export const secureStorage = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};
