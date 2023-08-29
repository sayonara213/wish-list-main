'use client';

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { useServerInsertedHTML } from 'next/navigation';

import { themeMantine } from '@/styles/themeConfig';

import { CacheProvider } from '@emotion/react';
import { MantineProvider, useEmotionCache } from '@mantine/core';

interface IProviders {
  children: ReactNode;
}

type Theme = 'light' | 'dark' | undefined;

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: undefined,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: IProviders) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme === 'dark' ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    const root = document.body;
    if (theme !== undefined && root.dataset.theme !== theme) {
      localStorage.setItem('theme', theme);
      root.dataset.theme = theme;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CacheProvider value={cache}>
        <MantineProvider withGlobalStyles theme={{ ...themeMantine, colorScheme: theme }}>
          {children}
        </MantineProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  return useContext(ThemeContext);
};
