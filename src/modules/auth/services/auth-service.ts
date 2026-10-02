import * as Crypto from 'expo-crypto';

import { secureStorage } from '@/services/secure-storage';

import type {
  AuthResult,
  AuthSession,
  AuthUser,
  LoginCredentials,
  SignupInput,
  StoredAccount,
} from '../types';

const SESSION_KEY = 'auth.session';

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function sha256(value: string) {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, value);
}

function toHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

// SecureStore keys can't contain "@", so accounts are keyed by a hash of the email.
async function accountKey(email: string) {
  return `auth.account.${await sha256(normalizeEmail(email))}`;
}

function hashPassword(password: string, salt: string) {
  return sha256(`${salt}:${password}`);
}

async function readAccount(email: string): Promise<StoredAccount | null> {
  const raw = await secureStorage.getItem(await accountKey(email));
  return raw ? (JSON.parse(raw) as StoredAccount) : null;
}

async function startSession(user: AuthUser): Promise<AuthSession> {
  const session: AuthSession = { token: Crypto.randomUUID(), user };
  await secureStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function signup({ name, email, password }: SignupInput): Promise<AuthResult<AuthUser>> {
  try {
    if (await readAccount(email)) {
      return { ok: false, error: 'An account with this email already exists' };
    }

    const salt = toHex(Crypto.getRandomBytes(16));
    const account: StoredAccount = {
      id: Crypto.randomUUID(),
      name: name.trim(),
      email: normalizeEmail(email),
      salt,
      passwordHash: await hashPassword(password, salt),
      createdAt: new Date().toISOString(),
    };
    await secureStorage.setItem(await accountKey(email), JSON.stringify(account));

    return { ok: true, data: { id: account.id, name: account.name, email: account.email } };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Could not create account' };
  }
}

export async function login({ email, password }: LoginCredentials): Promise<AuthResult<AuthSession>> {
  try {
    const account = await readAccount(email);
    if (!account || (await hashPassword(password, account.salt)) !== account.passwordHash) {
      return { ok: false, error: 'Incorrect email or password' };
    }

    const session = await startSession({ id: account.id, name: account.name, email: account.email });
    return { ok: true, data: session };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Could not sign in' };
  }
}

export async function getSession(): Promise<AuthSession | null> {
  const raw = await secureStorage.getItem(SESSION_KEY);
  return raw ? (JSON.parse(raw) as AuthSession) : null;
}

export function logout() {
  return secureStorage.removeItem(SESSION_KEY);
}
