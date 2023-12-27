import React from 'react';

import { cookies } from 'next/headers';

import styles from '../../app.module.scss';

import { Wishlist } from '@/components/base/wishlist/wishlist';
import { Database } from '@/lib/schema';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const WishlistPage = async ({ params }: { params: { id: number } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: wishlist } = await supabase.from('wishlists').select().eq('id', params.id).single();

  if (wishlist === null) return null;

  return (
    <div className={styles.container}>
      <section className={styles.wishlistWrapper}>
        {wishlist ? <Wishlist wishlist={wishlist} isOwnWishlist={false} /> : <></>}
      </section>
    </div>
  );
};

export default WishlistPage;
