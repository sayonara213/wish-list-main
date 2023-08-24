'use client';

import React, { ReactNode } from 'react';

import { theme } from '@/styles/themeConfig';

import { MantineProvider } from '@mantine/core';

interface IProviders {
  children: ReactNode;
}

const Mantine = ({ children }: IProviders) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      {children}
    </MantineProvider>
  );
};

export default Mantine;
