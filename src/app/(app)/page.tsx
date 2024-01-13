import React from 'react';

import { cookies } from 'next/headers';

import styles from './app.module.scss';

import { ShopLinks } from '@/components/base/shop-links/shop-links';
import { UserWishlists } from '@/components/base/user-wishlists/user-wishlists';
import { Wishlist } from '@/components/base/wishlist/wishlist';
import { Database } from '@/lib/schema';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const App = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: wishlists } = await supabase
    .from('wishlists')
    .select()
    .eq('owner_id', user?.id!)
    .eq('is_shared', false)
    .order('created_at', { ascending: false });

  return (
    <div className={styles.container}>
      <section className={styles.wishlistWrapper}>
        <UserWishlists wishlists={wishlists} />
      </section>
      <section className={styles.linksWrapper}>
        <ShopLinks userId={user?.id!} />
      </section>
    </div>
  );
};

export default App;
