import React from 'react';

import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

import AuthProvider from '@/components/base/navbar/auth/auth-provider';
import ThemeProvider from '@/components/base/provider/theme-provider';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import '@/styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitializerScript,
          }}
        ></script>
        <AuthProvider accessToken={accessToken}>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export const dynamic = 'force-dynamic';

const themeInitializerScript = `(function () 
{document.body.dataset.theme = window.localStorage.getItem("theme") 
|| "dark"; })();
`;
