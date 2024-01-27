import React from 'react';

import Link from 'next/link';

import styles from '../user-wishlists-list.module.scss';

import { TWishlist } from '@/types/database.types';
import { formatDateToNow } from '@/utils/date';
import { toNormalCase } from '@/utils/text';
import { Text } from '@mantine/core';

interface IWishlistsItemProps {
  wishlist: TWishlist;
  isOwnWishlist?: boolean;
}

export const WishlistsItem: React.FC<IWishlistsItemProps> = ({ wishlist, isOwnWishlist }) => {
  return (
    <Link href={`/wishlist/${wishlist.id}`} className={styles.item}>
      <li className={styles.name}>{toNormalCase(wishlist.title)}</li>
      <div className={styles.pair}>
        <Text size='sm' c='dimmed'>
          {formatDateToNow(wishlist.updated_at)}
        </Text>
      </div>
    </Link>
  );
};
