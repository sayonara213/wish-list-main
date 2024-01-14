'use client';

import React, { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';

import styles from '../user-wishlists-list.module.scss';

import { useAuth } from '@/components/base/provider/auth-provider';
import { Avatar } from '@/components/ui/avatar/avatar';
import { Paragraph } from '@/components/ui/text/text';
import { Database } from '@/lib/schema';
import { ISharedWishlistJoinProfile, TProfile } from '@/types/database.types';
import { formatDateToNow } from '@/utils/date';
import { toNormalCase } from '@/utils/text';

import { Skeleton } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface ISharedWishlistsItemProps {
  wishlist: ISharedWishlistJoinProfile;
  isOwnWishlist?: boolean;
}

export const SharedWishlistsItem: React.FC<ISharedWishlistsItemProps> = ({
  wishlist,
  isOwnWishlist,
}) => {
  const [profile, setProfile] = useState<TProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const user = useAuth();
  const supabase = createClientComponentClient<Database>();

  const { friendship } = wishlist;

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    const friendId = friendship.friend_id === user.id ? friendship.user_id : friendship.friend_id;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', friendId!)
      .single();

    if (error) {
      console.log('error', error);
      return;
    }

    setProfile(data);
    setIsLoading(false);
  }, [wishlist]);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <li className={styles.item}>
      <Link href={`/shared-wishlist/${wishlist.id}`} className={styles.shared}>
        {!isLoading ? (
          <>
            <Avatar src={profile?.avatar_url!} size={36} />
            <div className={styles.pair}>
              <Paragraph weight='medium' className={styles.title}>
                {toNormalCase(wishlist.title)}
              </Paragraph>
              <Paragraph size='sm' color='muted'>
                {profile?.full_name}
              </Paragraph>
            </div>
          </>
        ) : (
          <>
            <Skeleton width={36} height={36} radius={'100%'} />
            <div className={styles.skeleton}>
              <Skeleton width={150} height={16} radius={'sm'} />
              <Skeleton width={200} height={14} radius={'sm'} />
            </div>
          </>
        )}
      </Link>
      <div className={styles.right}>
        <Paragraph size='sm' color='muted'>
          {formatDateToNow(wishlist.created_at)}
        </Paragraph>
      </div>
    </li>
  );
};
