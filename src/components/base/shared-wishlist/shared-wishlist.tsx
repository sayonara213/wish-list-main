'use client';

import React from 'react';

import SharedWishlistProvider from '../provider/shared-wishlist-provider';
import { ToolbarSharedTitle } from '../wishlist/toolbar/toolbar-shared-title/toolbar-shared-title';

import { TSharedWishlist, TWishlist } from '@/types/database.types';
import container from '@/styles/app/app.module.scss';
import { useTrackOnline } from '@/hooks/use-track-online';

interface ISharedWishlistProps {
  sharedWishlist: TSharedWishlist;
  wishlistOne: TWishlist;
  wishlistTwo: TWishlist;
  userId: string;
  children: React.ReactNode;
}

export const SharedWishlist: React.FC<ISharedWishlistProps> = ({
  sharedWishlist,
  wishlistOne,
  wishlistTwo,
  userId,
  children,
}) => {
  const friendId = userId === wishlistOne.owner_id ? wishlistTwo.owner_id : wishlistOne.owner_id;

  const isOnline = useTrackOnline(sharedWishlist.id, userId, friendId);

  return (
    <SharedWishlistProvider sharedWishlist={sharedWishlist} isFriendOnline={isOnline}>
      <ToolbarSharedTitle />
      <section className={container.sharedWishlistWrapper}>{children}</section>
    </SharedWishlistProvider>
  );
};
