'use client';
import { Header, ThemeStateProvider, Loading } from '@english/components';
import { usePathname, useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, useMemo, useCallback, useEffect, useState, useContext } from 'react';
import { api } from '@english/api';

const UserContext = createContext(null);

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  const pathname = usePathname();
  const client = useMemo(() => new QueryClient(), []);
  const router = useRouter();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (!savedUser) return;
    const theme = localStorage.getItem('theme');
    if (theme) {
      document.body.dataset.theme = theme;
      localStorage.setItem('theme', theme);
    }
    api.auth
      .signIn(savedUser.email, savedUser.password)
      .then((resp) => {
        setUser(resp);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
    api.audio.initiate();
  }, [setUser]);

  const setTheme = useCallback(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      document.body.dataset.theme = theme;
      localStorage.setItem('theme', theme);
    }
  }, []);

  const onLogout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/auth');
  }, [router]);

  const authorize = useCallback(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (!savedUser) {
      setIsAppLoaded(true);
      return;
    }
    api.auth
      .signIn(savedUser.email, savedUser.password)
      .then((resp) => {
        setUser(resp);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      })
      .finally(() => {
        setIsAppLoaded(true);
      });
    api.audio.initiate();
  }, []);

  useEffect(() => {
    setTheme();
    authorize();
  }, [authorize, setTheme]);

  return (
    <html lang="en">
      <body>
        <div id="portal" />
        <main>
          <ThemeStateProvider>
            <UserContext.Provider value={{ user, setUser }}>
              <QueryClientProvider client={client}>
                {!isAppLoaded ? (
                  <Loading />
                ) : (
                  <>
                    {pathname !== '/auth' && user && <Header uid={user.uid} onLogout={onLogout} />}
                    {children}
                  </>
                )}
              </QueryClientProvider>
            </UserContext.Provider>
          </ThemeStateProvider>
        </main>
      </body>
    </html>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within an UserContextProvider');
  }
  return context;
};
