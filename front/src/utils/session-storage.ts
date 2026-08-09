import type { Session } from '../types/auth';

const SESSION_KEY = 'managerqa.session';

export function getStoredSession(): Session | null {
  const rawSession = sessionStorage.getItem(SESSION_KEY);
  if (!rawSession) return null;

  try {
    const session = JSON.parse(rawSession) as Session;
    return session.name && session.token ? session : null;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function storeSession(session: Session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function removeStoredSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
