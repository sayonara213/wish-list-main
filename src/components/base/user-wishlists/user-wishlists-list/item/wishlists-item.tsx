import React from 'react';

import Link from 'next/link';

import styles from '../user-wishlists-list.module.scss';

import { Paragraph } from '@/components/ui/text/text';
import { TWishlist } from '@/types/database.types';
import { formatDateToNow } from '@/utils/date';

interface IWishlistsItemProps {
  wishlist: TWishlist;
  isOwnWishlist?: boolean;
}

export const WishlistsItem: React.FC<IWishlistsItemProps> = ({ wishlist, isOwnWishlist }) => {
  return (
    <li className={styles.item}>
      <Link href={`/wishlist/${wishlist.id}`} className={styles.name}>
        {wishlist.title}
      </Link>
      <div className={styles.pair}>
        <Paragraph size='sm' color='muted'>
          {formatDateToNow(wishlist.created_at)}
        </Paragraph>
      </div>
    </li>
  );
};
