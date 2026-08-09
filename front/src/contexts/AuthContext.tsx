import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { login as loginRequest } from '../api/auth.api';
import type { LoginCredentials, Session } from '../types/auth';
import { getStoredSession, removeStoredSession, storeSession } from '../utils/session-storage';

type AuthContextValue = {
  session: Session | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(getStoredSession);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    async login(credentials) {
      const nextSession = await loginRequest(credentials);
      storeSession(nextSession);
      setSession(nextSession);
    },
    logout() {
      removeStoredSession();
      setSession(null);
    },
  }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  return context;
}
