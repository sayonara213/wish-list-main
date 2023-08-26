import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Navbar } from '@/components/base/navbar/navbar';
import container from '@/styles/container.module.scss';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  return (
    <div>
      <Navbar />

      <div className={container.container}>{children}</div>
    </div>
  );
};

export default AppLayout;
