import React from 'react';

import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import styles from '../shared-wishlist.module.scss';

import { SharedWishlist } from '@/components/base/shared-wishlist/shared-wishlist';
import { Database } from '@/lib/schema';
import container from '@/styles/app/app.module.scss';
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

  if (wishlistsJoin === null || !user) {
    notFound();
  }

  const { wishlist_one, wishlist_two, ...sharedWishlist } = wishlistsJoin;

  return (
    <div className={container.container}>
      <section className={styles.wishlistsWrapper}>
        <SharedWishlist
          sharedWishlist={sharedWishlist}
          wishlistOne={wishlist_one}
          wishlistTwo={wishlist_two}
          userId={user?.id}
        />
      </section>
    </div>
  );
};

export default WishlistPage;
