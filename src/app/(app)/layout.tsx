import React from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Navbar } from '@/components/base/navbar/navbar';
import { SubNav } from '@/components/base/sub-nav/sub-nav';
import { Database } from '@/lib/schema';
import container from '@/styles/container.module.scss';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  const profile = await supabase.from('profiles').select().eq('id', user.id);

  return (
    <main className={container.container}>
      <Navbar />
      <SubNav profile={profile.data![0]} />
      {children}
    </main>
  );
};

export default AppLayout;
