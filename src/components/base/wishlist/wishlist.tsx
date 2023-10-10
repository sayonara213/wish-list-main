'use client';

import React from 'react';

import { WishlistList } from './list/list';
import { WishlistToolbar } from './toolbar/toolbar';

import { IWishlist } from '@/types/wishlist';

interface IWishlistProps {
  wishlist: IWishlist;
}

export const Wishlist: React.FC<IWishlistProps> = ({ wishlist }) => {
  return (
    <main>
      <WishlistToolbar />
      <WishlistList wishlist={wishlist} />
    </main>
  );
};
