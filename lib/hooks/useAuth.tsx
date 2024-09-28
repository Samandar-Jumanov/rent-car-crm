import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

interface User {
  id: string;
  phoneNumber: string;
}

interface Session {
  user: User | null;
  expiresAt: number | null;
}

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

const API_BASE_URL = 'https://your-external-api.com';
export const AUTH_COOKIE_NAME = 'auth_token';
export const SESSION_COOKIE_NAME = 'user_session';

export const useAuthSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<AuthStatus>('idle');

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setStatus('loading');
    const token = Cookies.get(AUTH_COOKIE_NAME);
    const sessionData = Cookies.get(SESSION_COOKIE_NAME);

    if (token && sessionData) {
      try {
        const parsedSession = JSON.parse(sessionData) as Session;
        if (Date.now() < parsedSession.expiresAt!) {
          setSession(parsedSession);
          setStatus('authenticated');
        } else {
          await refreshSession(token);
        }
      } catch (error) {
        console.error('Failed to parse session:', error);
        setStatus('error');
      }
    } else {
      setStatus('unauthenticated');
    }
  };

  const login = async (username: string, password: string) => {
    setStatus('loading');
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
      const { token, user, expiresIn } = response.data;
      const expiresAt = Date.now() + expiresIn * 1000;

      Cookies.set(AUTH_COOKIE_NAME, token, { expires: expiresIn / 86400 }); // Convert seconds to days
      const newSession: Session = { user, expiresAt };
      Cookies.set(SESSION_COOKIE_NAME, JSON.stringify(newSession), { expires: expiresIn / 86400 });

      setSession(newSession);
      setStatus('authenticated');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setStatus('error');
      return false;
    }
  };

  const logout = async () => {
    setStatus('loading');
    try {
      // Optionally call logout endpoint on your API
      // await axios.post(`${API_BASE_URL}/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove(AUTH_COOKIE_NAME);
      Cookies.remove(SESSION_COOKIE_NAME);
      setSession(null);
      setStatus('unauthenticated');
    }
  };

  const refreshSession = async (token: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/refresh`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const { user, expiresIn } = response.data;
      const expiresAt = Date.now() + expiresIn * 1000;

      const newSession: Session = { user, expiresAt };
      Cookies.set(SESSION_COOKIE_NAME, JSON.stringify(newSession), { expires: expiresIn / 86400 });

      setSession(newSession);
      setStatus('authenticated');
    } catch (error) {
      console.error('Failed to refresh session:', error);
      logout();
    }
  };

  return {
    session,
    status,
    login,
    logout,
    refreshSession,
  };
};