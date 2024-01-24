import React from 'react';

import { SharedWishlistsItem } from './item/shared-wishlist-item';
import { WishlistsItem } from './item/wishlists-item';
import styles from './user-wishlists-list.module.scss';

import { ISharedWishlistJoinProfile, TWishlist } from '@/types/database.types';

interface IWishlistsListProps {
  wishlists: (TWishlist | ISharedWishlistJoinProfile)[];
}

export const WishlistsList: React.FC<IWishlistsListProps> = ({ wishlists }) => {
  return (
    <ul className={styles.list}>
      {wishlists?.map((wishlist) =>
        'friendship_id' in wishlist ? (
          <SharedWishlistsItem wishlist={wishlist} key={wishlist.id} />
        ) : (
          <WishlistsItem wishlist={wishlist} key={wishlist.id} />
        ),
      )}
    </ul>
  );
};
