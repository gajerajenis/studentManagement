import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

const USERS_KEY    = 'edumange_users';
const SESSION_KEY  = 'edumange_session';

const loadUsers    = () => JSON.parse(localStorage.getItem(USERS_KEY)    || '[]');
const saveUsers    = (u) => localStorage.setItem(USERS_KEY, JSON.stringify(u));
const loadSession  = () => JSON.parse(localStorage.getItem(SESSION_KEY)  || 'null');
const saveSession  = (u) => localStorage.setItem(SESSION_KEY, JSON.stringify(u));
const clearSession = ()  => localStorage.removeItem(SESSION_KEY);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => loadSession());

  // Keep session in sync if another tab logs out
  useEffect(() => {
    const sync = () => setUser(loadSession());
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  /* ── Sign Up ─────────────────────────────────────────────────────────── */
  const signup = ({ firstName, lastName, email, password }) => {
    const users = loadUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists.' };
    }
    const newUser = {
      id:        Date.now(),
      firstName: firstName.trim(),
      lastName:  lastName.trim(),
      email:     email.trim().toLowerCase(),
      password,                      // plain for demo; hash in production
      avatar:    `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`,
      joinedAt:  new Date().toISOString(),
    };
    saveUsers([...users, newUser]);
    return { ok: true };
  };

  /* ── Login ───────────────────────────────────────────────────────────── */
  const login = ({ email, password }) => {
    const users = loadUsers();
    const found = users.find(
      u => u.email === email.trim().toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: 'Invalid email or password.' };
    // Strip password before storing in session
    const { password: _pw, ...sessionUser } = found;
    saveSession(sessionUser);
    setUser(sessionUser);
    return { ok: true, user: sessionUser };
  };

  /* ── Logout ──────────────────────────────────────────────────────────── */
  const logout = () => {
    clearSession();
    setUser(null);
  };

  /* ── Update profile (for future use) ────────────────────────────────── */
  const updateProfile = (changes) => {
    const updated = { ...user, ...changes };
    saveSession(updated);
    setUser(updated);
    // Also update in users array
    const users = loadUsers();
    saveUsers(users.map(u => (u.id === updated.id ? { ...u, ...changes } : u)));
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateProfile, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};