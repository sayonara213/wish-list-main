'use client';

import React from 'react';

import Link from 'next/link';

import styles from '../user-wishlists-list.module.scss';

import { Avatar } from '@/components/ui/avatar/avatar';
import { Paragraph } from '@/components/ui/text/text';
import { ISharedWishlistJoinProfile } from '@/types/database.types';
import { formatDateToNow } from '@/utils/date';
import { toNormalCase } from '@/utils/text';

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
          <Paragraph weight='medium' className={styles.title}>
            {toNormalCase(wishlist.title)}
          </Paragraph>
          <Paragraph size='sm' color='muted'>
            {wishlist.friend_profile?.full_name}
          </Paragraph>
        </div>
      </Link>
      <div className={styles.right}>
        <Paragraph size='sm' color='muted'>
          {formatDateToNow(wishlist.created_at)}
        </Paragraph>
      </div>
    </li>
  );
};
