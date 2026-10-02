import { request } from '@/services/api-client';
import type { ApiResult } from '@/types/api';

import type { AuthSession, LoginCredentials } from '../types';

export function login(credentials: LoginCredentials): Promise<ApiResult<AuthSession>> {
  return request<AuthSession>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}
