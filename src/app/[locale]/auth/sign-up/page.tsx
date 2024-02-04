import React from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Auth from '@/components/base/auth/auth';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const SignUpPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect('/');
  }

  return <Auth isSignIn={false} />;
};

export default SignUpPage;
