'use client';

import React from 'react';

import { ToolbarEdit } from './toolbar-edit/toolbar-edit';
import { ToolbarSort } from './toolbar-sort/toolbar-sort';
import { ToolbarTitle } from './toolbar-title/toolbar-title';
import styles from './toolbar.module.scss';

import { useWishlist } from '../../provider/wishlist-provider';

export const WishlistToolbar: React.FC = () => {
  const { isEditing, setIsEditing, isOwnWishlist } = useWishlist();

  return (
    <div className={styles.wrapper}>
      <ToolbarTitle />
      <div className={styles.pair}>
        <ToolbarSort />
        {isOwnWishlist && <ToolbarEdit isEditing={isEditing} setIsEditing={setIsEditing} />}
      </div>
    </div>
  );
};
