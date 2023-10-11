'use client';

import React from 'react';

import { WishlistList } from './list/list';
import { WishlistToolbar } from './toolbar/toolbar';

import { TWishlist } from '@/types/database.types';

interface IWishlistProps {
  wishlist: TWishlist;
}

export const Wishlist: React.FC<IWishlistProps> = ({ wishlist }) => {
  return (
    <main>
      <WishlistToolbar />
      <WishlistList wishlist={wishlist} />
    </main>
  );
};
