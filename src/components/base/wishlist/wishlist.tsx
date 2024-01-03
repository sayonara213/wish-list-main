'use client';

import React from 'react';

import { WishlistList } from './list/list';
import { WishlistToolbar } from './toolbar/toolbar';
import styles from './wishlist.module.scss';

import WishlistProvider from '../provider/wishlist-provider';

import { TWishlist } from '@/types/database.types';

interface IWishlistProps {
  wishlist: TWishlist;
  isOwnWishlist?: boolean;
}

export const Wishlist: React.FC<IWishlistProps> = ({ wishlist, isOwnWishlist = false }) => {
  return (
    <WishlistProvider wishlist={wishlist!} isOwn={isOwnWishlist}>
      <main className={styles.container}>
        <WishlistToolbar />
        <WishlistList />
      </main>
    </WishlistProvider>
  );
};
