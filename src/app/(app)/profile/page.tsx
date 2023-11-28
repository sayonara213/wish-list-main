import React from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Profile } from '@/components/base/profile/profile';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const ProfilePage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  return <Profile user={user} />;
};

export default ProfilePage;
