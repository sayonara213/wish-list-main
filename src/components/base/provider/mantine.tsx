'use client';

import React, { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';

import { theme } from '@/styles/themeConfig';

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
