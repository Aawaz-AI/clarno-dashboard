'use client';

import { ConfigProvider, theme as antdTheme } from 'antd';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import GlobalLoader from '@/components/GlobalLoader';
import { AuthProvider } from '@/components/AuthProvider';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useThemeMode(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeMode must be used within Providers');
  }
  return ctx;
}

export default function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'light';
    setTheme(initial);
    setMounted(true);

    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const ctxValue = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme]
  );

  return (
    <>
      {!mounted || isLoading ? <GlobalLoader /> : null}
      <div style={{ display: !mounted || isLoading ? 'none' : 'block' }}>
        <ThemeContext.Provider value={ctxValue}>
          <ConfigProvider
            theme={{
              algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
              token: {
                colorPrimary: '#3b82f6',
                borderRadius: 8,
              },
            }}
          >
            <AuthProvider>{children}</AuthProvider>
          </ConfigProvider>
        </ThemeContext.Provider>
      </div>
    </>
  );
}
