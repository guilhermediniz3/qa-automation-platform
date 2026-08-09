export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = LoginCredentials & { name: string };

export type ForgotPasswordPayload = { email: string };

export type ResetPasswordPayload = { token: string; password: string };

export type Session = {
  name: string;
  token: string;
};
