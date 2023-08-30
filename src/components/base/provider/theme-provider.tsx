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
  const [theme, setTheme] = useState<Theme>(undefined);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme === 'dark' ? 'dark' : 'light');
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

  return theme ? (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CacheProvider value={cache}>
        <MantineProvider theme={{ ...themeMantine, colorScheme: theme }}>
          {children}
        </MantineProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  ) : null;
};

export default ThemeProvider;

export const useTheme = () => {
  return useContext(ThemeContext);
};
