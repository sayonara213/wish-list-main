'use client';

import React from 'react';

import { WishlistAddItem } from './add-item/add-item';
import { WishlistListItem } from './list-item/list-item';
import styles from './list.module.scss';
import { useWishlistListState } from './list.state';

import { CustomIcon } from '@/components/ui/icon/custom-icon';

import { Skeleton, Text } from '@mantine/core';
import { Reorder } from 'framer-motion';

export const WishlistList: React.FC = () => {
  const { isOwnWishlist, wishlist, items, reorder, handleDeleteItem, isWishlistEmpty } =
    useWishlistListState();

  return (
    <div className={styles.wrapper}>
      {isOwnWishlist && (
        <div className={styles.buttonWrapper}>
          <WishlistAddItem wishlistId={wishlist.id} />
        </div>
      )}
      {isWishlistEmpty ? (
        <div className={styles.empty}>
          <CustomIcon name={'emptyPresent'} />
          <Text size='xl'>
            {isOwnWishlist ? 'Your wishlist is empty :(' : 'That wishlist is empty'}
          </Text>
        </div>
      ) : (
        <Reorder.Group values={items} onReorder={reorder} className={styles.list} axis='y'>
          {items.map((item) => (
            <WishlistListItem item={item} key={item.id} deleteServerItem={handleDeleteItem} />
          ))}
        </Reorder.Group>
      )}
    </div>
  );
};

const WishlistItemSkeleton = () => {
  return (
    <ul className={styles.list}>
      <Skeleton width={'100%'} height={60} radius={8} />
      <Skeleton width={'100%'} height={60} radius={8} />
      <Skeleton width={'100%'} height={60} radius={8} />
    </ul>
  );
};
