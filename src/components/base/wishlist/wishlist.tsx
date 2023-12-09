'use client';

import React from 'react';

import { WishlistList } from './list/list';
import { WishlistToolbar } from './toolbar/toolbar';
import styles from './wishlist.module.scss';

import { TWishlist } from '@/types/database.types';

interface IWishlistProps {
  wishlist: TWishlist | null;
}

export const Wishlist: React.FC<IWishlistProps> = ({ wishlist }) => {
  return (
    <main className={styles.container}>
      <WishlistToolbar />
      {wishlist ? <WishlistList wishlist={wishlist} /> : <p>Wishlist not found</p>}
    </main>
  );
};
