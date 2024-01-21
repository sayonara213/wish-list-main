import React from 'react';

import { cookies } from 'next/headers';

import { WishlistList } from './list/list';
import { WishlistToolbar } from './toolbar/toolbar';
import styles from './wishlist.module.scss';

import WishlistProvider from '../provider/wishlist-provider';

import { Database } from '@/lib/schema';
import { TWishlist } from '@/types/database.types';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

interface IWishlistProps {
  wishlist: TWishlist;
  isOwnWishlist?: boolean;
  searchParams: { [key: string]: string | undefined };
}

export const Wishlist: React.FC<IWishlistProps> = async ({
  wishlist,
  isOwnWishlist = false,
  searchParams,
}) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: items, error } = await supabase
    .from('items')
    .select()
    .eq('wishlist_id', wishlist.id)
    .order(searchParams['sort'] || 'priority', {
      ascending: searchParams['order'] === 'asc' || !searchParams['order'],
    });

  return (
    <WishlistProvider wishlist={wishlist!} isOwn={isOwnWishlist} items={items || []}>
      <main className={styles.container}>
        <WishlistToolbar />
        <WishlistList />
      </main>
    </WishlistProvider>
  );
};
