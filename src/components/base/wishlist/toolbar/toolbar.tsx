'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { ToolbarDelete } from './toolbar-delete/toolbar-delete';
import { ToolbarEdit } from './toolbar-edit/toolbar-edit';
import { ToolbarLastSeen } from './toolbar-last-seen/last-seen';
import { ToolbarSort } from './toolbar-sort/toolbar-sort';
import { ToolbarTitle } from './toolbar-title/toolbar-title';
import styles from './toolbar.module.scss';

import { useSharedWishlist } from '../../provider/shared-wishlist-provider';
import { useWishlist } from '../../provider/wishlist-provider';

import { Avatar } from '@/components/ui/avatar/avatar';
import { Paragraph } from '@/components/ui/text/text';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';

import { Skeleton } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const WishlistToolbar: React.FC = () => {
  const { isEditing, setIsEditing, isOwnWishlist, wishlist } = useWishlist();
  const { isFriendOnline } = useSharedWishlist();

  const [profile, setProfile] = useState<TProfile | null>(null);

  const supabase = createClientComponentClient<Database>();

  const fetchProfile = useCallback(async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', wishlist.owner_id)
      .single();

    if (error || !data) {
      return;
    }

    setProfile(data);
  }, [wishlist, supabase]);

  useEffect(() => {
    if (!isOwnWishlist && wishlist.is_shared) {
      fetchProfile();
    }
  }, [wishlist]);

  return wishlist.is_shared ? (
    <div className={styles.wrapper}>
      {!isOwnWishlist ? (
        <div className={styles.profile}>
          {profile ? (
            <>
              <Avatar src={profile?.avatar_url} size={36} />
              <Paragraph>{profile.full_name}</Paragraph>
              <ToolbarLastSeen isOnline={isFriendOnline} />
            </>
          ) : (
            <>
              <Skeleton height={36} width={36} radius='100%' />
              <Skeleton height={16} width={100} radius='sm' />
            </>
          )}
        </div>
      ) : (
        <div className={styles.pair}>
          <ToolbarSort />
          {isOwnWishlist && <ToolbarDelete />}
          {isOwnWishlist && <ToolbarEdit isEditing={isEditing} setIsEditing={setIsEditing} />}
        </div>
      )}
    </div>
  ) : (
    <div className={styles.wrapper}>
      <ToolbarTitle />
      <div className={styles.pair}>
        <ToolbarSort />
        {isOwnWishlist && <ToolbarDelete />}
        {isOwnWishlist && <ToolbarEdit isEditing={isEditing} setIsEditing={setIsEditing} />}
      </div>
    </div>
  );
};
