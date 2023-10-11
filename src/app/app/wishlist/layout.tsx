import React from 'react';

import { cookies } from 'next/headers';

import styles from './wishlist-layout.module.scss';

import { toNormalCase } from '@/utils/text';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const WishlistLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const username = await supabase.from('profiles').select('user_name').eq('id', user!.id);

  return <div className={styles.container}>{children}</div>;
};

export default WishlistLayout;
