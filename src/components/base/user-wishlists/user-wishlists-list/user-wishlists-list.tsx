import React from 'react';

import { WishlistsItem } from './item/wishlists-item';
import styles from './user-wishlists-list.module.scss';

import { TWishlist } from '@/types/database.types';

interface IWishlistsListProps {
  wishlists: TWishlist[];
}

export const WishlistsList: React.FC<IWishlistsListProps> = ({ wishlists }) => {
  return (
    <ul className={styles.list}>
      {wishlists?.map((wishlist) => <WishlistsItem wishlist={wishlist} key={wishlist.id} />)}
    </ul>
  );
};
