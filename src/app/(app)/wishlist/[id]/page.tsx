import React from 'react';

import { cookies } from 'next/headers';

import { ShopLinks } from '@/components/base/shop-links/shop-links';
import { Wishlist } from '@/components/base/wishlist/wishlist';
import { Database } from '@/lib/schema';
import styles from '@/styles/app/app.module.scss';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { notFound } from 'next/navigation';

const WishlistPage = async ({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { [key: string]: string | undefined };
}) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: wishlist, error } = await supabase
    .from('wishlists')
    .select()
    .eq('id', params.id)
    .single();

  if (wishlist === null || error) {
    notFound();
  }

  const isOwn = user?.id === wishlist.owner_id;

  return (
    <div className={styles.container}>
      <section className={styles.wishlistWrapper}>
        <Wishlist wishlist={wishlist} isOwnWishlist={isOwn} searchParams={searchParams} />
      </section>
      {isOwn && (
        <section className={styles.linkWrapper}>
          <ShopLinks userId={user?.id!} />
        </section>
      )}
    </div>
  );
};

export default WishlistPage;
