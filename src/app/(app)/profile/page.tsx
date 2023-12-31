import React from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Profile } from '@/components/base/profile/profile';
import styles from '@/styles/container.module.scss';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const ProfilePage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  return (
    <div className={styles.centerContainer}>
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;
