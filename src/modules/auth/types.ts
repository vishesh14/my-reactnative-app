export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupInput = LoginCredentials & {
  name: string;
  confirmPassword: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

/** Account record kept in secure storage. The password is only stored as a salted hash. */
export type StoredAccount = AuthUser & {
  salt: string;
  passwordHash: string;
  createdAt: string;
};

export type AuthResult<T> = { ok: true; data: T } | { ok: false; error: string };

export type LoginFieldErrors = Partial<Record<keyof LoginCredentials, string>>;
export type SignupFieldErrors = Partial<Record<keyof SignupInput, string>>;
