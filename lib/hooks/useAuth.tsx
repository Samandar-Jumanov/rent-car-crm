import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const AUTH_COOKIE_NAME = 'auth_token';
// export const SESSION_COOKIE_NAME = 'user_session';

type AuthStatus = 'idle' | 'authenticated' | 'unauthenticated';

export const useAuthSession = () => {
  const [status, setStatus] = useState<AuthStatus>('idle');
  const router = useRouter()

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    // const sessionData = Cookies.get(SESSION_COOKIE_NAME);

    if (token ) {
      setStatus('authenticated');
    } else {
      setStatus('unauthenticated');
    }
  };

  const logout = () => {
    Cookies.remove(AUTH_COOKIE_NAME);
    setStatus('unauthenticated');
    router.push('/login');
  };

  const setUserAuth = (token: string) => {
    Cookies.set(AUTH_COOKIE_NAME, token);
    setStatus('authenticated');
  };

  return {
    status,
    logout,
    setUserAuth,
  };
};