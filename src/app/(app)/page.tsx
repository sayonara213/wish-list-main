import React from 'react';

import { cookies } from 'next/headers';

import styles from './app.module.scss';

import { Birthdays } from '@/components/base/birthdays/birthdays';
import { ShopLinks } from '@/components/base/shop-links/shop-links';
import { UserWishlists } from '@/components/base/user-wishlists/user-wishlists';
import { Database } from '@/lib/schema';
import { ISharedWishlistJoinProfile, TWishlist } from '@/types/database.types';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

type TWishlistsList = (TWishlist | ISharedWishlistJoinProfile)[];

const App = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: wishlists } = (await supabase
    .from('wishlists')
    .select()
    .eq('owner_id', user?.id!)
    .eq('is_shared', false)
    .order('updated_at', { ascending: false })) as never as { data: TWishlist[]; error: Error };

  const { data: sharedWishlists, error } = (await supabase.rpc(
    'get_shared_wishlists_with_friends',
    {
      current_user_id: user.id,
    },
  )) as never as { data: ISharedWishlistJoinProfile[]; error: Error };

  const wishlistsList: TWishlistsList = [...wishlists, ...sharedWishlists].sort(
    (a, b) => +new Date(b.created_at) - +new Date(a.created_at),
  );

  return (
    <div className={styles.container}>
      <section className={styles.wishlistWrapper}>
        <UserWishlists wishlists={wishlistsList} />
        <Birthdays userId={user.id} />
      </section>
      <section className={styles.linksWrapper}>
        <ShopLinks userId={user?.id!} />
      </section>
    </div>
  );
};

export default App;
