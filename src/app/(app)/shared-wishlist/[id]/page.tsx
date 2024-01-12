import React from 'react';

import { cookies } from 'next/headers';

import container from '../../app.module.scss';
import styles from '../shared-wishlist.module.scss';

import { Wishlist } from '@/components/base/wishlist/wishlist';
import { Database } from '@/lib/schema';
import { TWishlist } from '@/types/database.types';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

interface ISharedWishlistJoin {
  wishlist_one: TWishlist;
  wishlist_two: TWishlist;
}

const WishlistPage = async ({ params }: { params: { id: number } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: wishlistsJoin, error } = (await supabase
    .from('shared_wishlists')
    .select(
      `
            wishlist_one: wishlists!wishlist_id_one (*), 
            wishlist_two: wishlists!wishlist_id_two (*)
        `,
    )
    .eq('id', params.id)
    .single()) as never as { data: ISharedWishlistJoin; error: Error };

  if (wishlistsJoin === null) return null;

  const { wishlist_one, wishlist_two } = wishlistsJoin;

  return (
    <div className={container.container}>
      <section className={styles.wishlistsWrapper}>
        {wishlistsJoin ? (
          <>
            <Wishlist wishlist={wishlist_one} isOwnWishlist={wishlist_one.owner_id === user?.id} />
            <Wishlist wishlist={wishlist_two} isOwnWishlist={wishlist_two.owner_id === user?.id} />
          </>
        ) : (
          <></>
        )}
      </section>
    </div>
  );
};

export default WishlistPage;
