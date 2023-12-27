'use client';

import React from 'react';

import { ToolbarEdit } from './toolbar-edit/toolbar-edit';
import { ToolbarSort } from './toolbar-sort/toolbar-sort';
import styles from './toolbar.module.scss';

import { useWishlist } from '../../provider/wishlist-provider';

import { Paragraph } from '@/components/ui/text/text';
import { toNormalCase } from '@/utils/text';

export const WishlistToolbar: React.FC = () => {
  const { isEditing, setIsEditing, wishlist, isOwnWishlist } = useWishlist();

  return (
    <div className={styles.wrapper}>
      <Paragraph>{toNormalCase(wishlist.title)} wishlist</Paragraph>
      <div className={styles.pair}>
        <ToolbarSort />
        {isOwnWishlist && <ToolbarEdit isEditing={isEditing} setIsEditing={setIsEditing} />}
      </div>
    </div>
  );
};
