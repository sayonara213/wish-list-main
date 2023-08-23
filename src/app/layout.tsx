'use client';

import React, { useEffect } from 'react';

import { Inter } from 'next/font/google';

import StyledComponentsRegistry from './lib/antdRegistry';

import './styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitializerScript,
          }}
        ></script>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

const themeInitializerScript = `(function () 
{document.body.dataset.theme = window.localStorage.getItem("theme") 
|| "light"; })();
`;
