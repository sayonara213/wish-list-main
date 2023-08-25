'use client';

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { themeMantine } from '@/styles/themeConfig';

import { MantineProvider } from '@mantine/core';

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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...themeMantine, colorScheme: theme === 'dark' ? 'dark' : 'light' }}
      >
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  return useContext(ThemeContext);
};
