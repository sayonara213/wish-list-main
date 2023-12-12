'use client';

import React from 'react';

import { ToolbarEdit } from './toolbar-edit/toolbar-edit';
import { ToolbarSort } from './toolbar-sort/toolbar-sort';
import styles from './toolbar.module.scss';

import { useWishlist } from '../../provider/wishlist-provider';

interface IWishlistToolbarProps {
  ownWishlist?: boolean;
}

export const WishlistToolbar: React.FC<IWishlistToolbarProps> = ({ ownWishlist = true }) => {
  const { isEditing, setIsEditing } = useWishlist();

  return (
    <div className={styles.wrapper}>
      <ToolbarSort />
      {ownWishlist && <ToolbarEdit isEditing={isEditing} setIsEditing={setIsEditing} />}
    </div>
  );
};
