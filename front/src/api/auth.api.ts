import { post } from './http';
import type { ForgotPasswordPayload, LoginCredentials, RegisterCredentials, ResetPasswordPayload, Session } from '../types/auth';

export function login(credentials: LoginCredentials) {
  return post<Session>('/auth/login', credentials);
}

export function register(credentials: RegisterCredentials) {
  return post<Session>('/auth/register', credentials);
}

export function requestPasswordReset(payload: ForgotPasswordPayload) {
  return post<void>('/auth/forgot-password', payload);
}

export function resetPassword(payload: ResetPasswordPayload) {
  return post<void>('/auth/reset-password', payload);
}
