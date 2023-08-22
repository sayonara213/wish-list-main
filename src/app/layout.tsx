import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} bg-accentLight transition-colors duration-100 dark:bg-accent`}
      >
        {children}
      </body>
    </html>
  );
}
