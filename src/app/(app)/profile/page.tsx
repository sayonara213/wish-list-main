import React from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Profile } from '@/components/base/profile/profile';
import styles from '@/styles/container.module.scss';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/schema';

const ProfilePage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase.from('profiles').select().eq('id', user?.id!).single();

  if (!profile) {
    return;
  }

  return (
    <div className={styles.centerContainer}>
      <Profile profile={profile} />
    </div>
  );
};

export default ProfilePage;
