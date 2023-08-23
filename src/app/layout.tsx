import React from 'react';

import { Inter } from 'next/font/google';

import StyledComponentsRegistry from './lib/antdRegistry';

import './styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
