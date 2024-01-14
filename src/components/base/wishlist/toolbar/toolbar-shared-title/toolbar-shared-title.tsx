'use client';

import React, { useEffect, useState } from 'react';

import styles from './toolbar-shared-title.module.scss';

import { useSharedWishlist } from '@/components/base/provider/shared-wishlist-provider';
import { Database } from '@/lib/schema';
import { TSharedWishlist } from '@/types/database.types';
import { classes } from '@/utils/styles';
import { notify } from '@/utils/toast';

import { Loader } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const ToolbarSharedTitle = () => {
  const { sharedWishlist, isEditing, setTitle } = useSharedWishlist();
  const [prevTitle, setPrevTitle] = useState<string>(sharedWishlist.title);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const supabase = createClientComponentClient<Database>();

  const updateWishlist = async (wishlist: TSharedWishlist) => {
    if (wishlist.title === prevTitle) return;
    setIsLoading(true);
    const { error } = await supabase
      .from('shared_wishlists')
      .update({ title: wishlist.title })
      .eq('id', wishlist.id);

    if (error) {
      notify('error', 'Error updating wishlist title');
      return;
    }
    setIsLoading(false);

    setPrevTitle(wishlist.title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    !isEditing && updateWishlist(sharedWishlist);
  }, [isEditing]);

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader size={16} />}
      <input
        value={sharedWishlist.title}
        onChange={handleTitleChange}
        disabled={!isEditing}
        className={classes(styles.input, isLoading && styles.loading)}
      />
    </div>
  );
};
