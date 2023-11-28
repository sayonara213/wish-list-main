import React from 'react';

import { Exo_2 } from 'next/font/google';
import { cookies } from 'next/headers';

import AuthProvider from '@/components/base/provider/auth-provider';
import { themeMantine } from '@/styles/themeConfig';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import '@/styles/globals.scss';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const inter = Exo_2({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript defaultColorScheme='auto' />
      </head>
      <body className={`${inter.className}`} suppressHydrationWarning={true}>
        <AuthProvider accessToken={accessToken}>
          <MantineProvider theme={themeMantine}>{children}</MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export const dynamic = 'force-dynamic';
