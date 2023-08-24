import React from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Navbar } from '@/components/base/navbar/navbar';

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
