'use client';

import { Navbar } from './components/base/navbar/navbar';
import { Button } from './components/ui/button/button';

export default function Home() {
  return (
    <main className='min-h-screen flex-row items-center justify-between'>
      <Navbar />
    </main>
  );
}
