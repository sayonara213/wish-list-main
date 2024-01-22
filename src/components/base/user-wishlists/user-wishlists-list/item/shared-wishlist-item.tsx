'use client';

import React from 'react';

import Link from 'next/link';

import styles from '../user-wishlists-list.module.scss';

import { Avatar } from '@/components/ui/avatar/avatar';
import { ISharedWishlistJoinProfile } from '@/types/database.types';
import { formatDateToNow } from '@/utils/date';
import { toNormalCase } from '@/utils/text';
import { Text } from '@mantine/core';

interface ISharedWishlistsItemProps {
  wishlist: ISharedWishlistJoinProfile;
  isOwnWishlist?: boolean;
}

export const SharedWishlistsItem: React.FC<ISharedWishlistsItemProps> = ({
  wishlist,
  isOwnWishlist,
}) => {
  return (
    <li className={styles.item}>
      <Link href={`/shared-wishlist/${wishlist.id}`} className={styles.shared}>
        <Avatar src={wishlist.friend_profile?.avatar_url!} size={36} />
        <div className={styles.pair}>
          <Text fw='bold' className={styles.title}>
            {toNormalCase(wishlist.title)}
          </Text>
          <Text size='sm' c='dimmed'>
            {wishlist.friend_profile?.full_name}
          </Text>
        </div>
      </Link>
      <div className={styles.right}>
        <Text size='sm' c='dimmed'>
          {formatDateToNow(wishlist.created_at)}
        </Text>
      </div>
    </li>
  );
};
