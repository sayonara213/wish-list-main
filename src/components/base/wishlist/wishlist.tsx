'use client';

import React from 'react';

import { WishlistList } from './list/list';
import { WishlistToolbar } from './toolbar/toolbar';
import styles from './wishlist.module.scss';

import WishlistProvider from '../provider/wishlist-provider';

import { TWishlist } from '@/types/database.types';

interface IWishlistProps {
  wishlist: TWishlist | null;
}

export const Wishlist: React.FC<IWishlistProps> = ({ wishlist }) => {
  return (
    <WishlistProvider wishlist={wishlist!}>
      <main className={styles.container}>
        <WishlistToolbar />
        {wishlist ? <WishlistList /> : <p>Wishlist not found</p>}
      </main>
    </WishlistProvider>
  );
};
