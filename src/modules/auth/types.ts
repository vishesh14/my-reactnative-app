export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

export type LoginFieldErrors = Partial<Record<keyof LoginCredentials, string>>;
