import React from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Navbar } from '@/components/base/navbar/navbar';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  return (
    <main>
      <Navbar />
    </main>
  );
}
