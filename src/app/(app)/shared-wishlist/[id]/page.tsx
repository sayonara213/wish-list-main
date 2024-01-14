import React from 'react';

import { cookies } from 'next/headers';

import container from '../../app.module.scss';
import styles from '../shared-wishlist.module.scss';

import SharedWishlistProvider from '@/components/base/provider/shared-wishlist-provider';
import { ToolbarSharedTitle } from '@/components/base/wishlist/toolbar/toolbar-shared-title/toolbar-shared-title';
import { Wishlist } from '@/components/base/wishlist/wishlist';
import { Database } from '@/lib/schema';
import { TSharedWishlist, TWishlist } from '@/types/database.types';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

interface ISharedWishlistJoin extends TSharedWishlist {
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
        *,
        wishlist_one: wishlists!wishlist_id_one (*), 
        wishlist_two: wishlists!wishlist_id_two (*)
      `,
    )
    .eq('id', params.id)
    .single()) as never as { data: ISharedWishlistJoin; error: Error };

  if (wishlistsJoin === null) return null;

  const { wishlist_one, wishlist_two, ...sharedWishlist } = wishlistsJoin;

  return (
    <div className={container.container}>
      <section className={styles.wishlistsWrapper}>
        {wishlistsJoin ? (
          <SharedWishlistProvider sharedWishlist={sharedWishlist}>
            <ToolbarSharedTitle />
            <Wishlist
              wishlist={wishlist_one.owner_id === user?.id ? wishlist_one : wishlist_two}
              isOwnWishlist={true}
            />
            <Wishlist
              wishlist={wishlist_two.owner_id === user?.id ? wishlist_one : wishlist_two}
              isOwnWishlist={false}
            />
          </SharedWishlistProvider>
        ) : (
          <></>
        )}
      </section>
    </div>
  );
};

export default WishlistPage;
