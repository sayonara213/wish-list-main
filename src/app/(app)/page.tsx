import React from 'react';

import { cookies } from 'next/headers';

import styles from './app.module.scss';

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

  const { data: wishlists } = (await supabase
    .from('wishlists')
    .select()
    .eq('owner_id', user?.id!)
    .eq('is_shared', false)
    .order('created_at', { ascending: false })) as never as { data: TWishlist[]; error: Error };

  const { data: sharedWishlists } = (await supabase
    .from('shared_wishlists')
    .select(
      `
        *, 
        friendship:friendships!friendship_id (*)
      `,
    )
    .or(`user_id.eq.${user?.id},friend_id.eq.${user?.id}`, {
      referencedTable: 'friendships',
    })) as never as { data: ISharedWishlistJoinProfile[]; error: Error };

  const wishlistsList: TWishlistsList = [...wishlists, ...sharedWishlists].sort(
    (a, b) => +new Date(b.created_at) - +new Date(a.created_at),
  );

  return (
    <div className={styles.container}>
      <section className={styles.wishlistWrapper}>
        <UserWishlists wishlists={wishlistsList} />
      </section>
      <section className={styles.linksWrapper}>
        <ShopLinks userId={user?.id!} />
      </section>
    </div>
  );
};

export default App;
