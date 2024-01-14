'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { ToolbarEdit } from './toolbar-edit/toolbar-edit';
import { ToolbarSort } from './toolbar-sort/toolbar-sort';
import { ToolbarTitle } from './toolbar-title/toolbar-title';
import styles from './toolbar.module.scss';

import { useWishlist } from '../../provider/wishlist-provider';

import { Avatar } from '@/components/ui/avatar/avatar';
import { Paragraph } from '@/components/ui/text/text';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';

import { Skeleton } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const WishlistToolbar: React.FC = () => {
  const { isEditing, setIsEditing, isOwnWishlist, wishlist } = useWishlist();

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
          {isOwnWishlist && <ToolbarEdit isEditing={isEditing} setIsEditing={setIsEditing} />}
        </div>
      )}
    </div>
  ) : (
    <div className={styles.wrapper}>
      <ToolbarTitle />
      <div className={styles.pair}>
        <ToolbarSort />
        {isOwnWishlist && <ToolbarEdit isEditing={isEditing} setIsEditing={setIsEditing} />}
      </div>
    </div>
  );
};
