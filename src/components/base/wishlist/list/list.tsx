'use client';

import React, { useEffect } from 'react';

import { WishlistAddItem } from './add-item/add-item';
import { WishlistListItem } from './list-item/list-item';
import styles from './list.module.scss';
import { useWishlistListState } from './list.state';

import { CustomIcon } from '@/components/ui/icon/custom-icon';
import { Paragraph } from '@/components/ui/text/text';

import { Skeleton } from '@mantine/core';
import { Reorder } from 'framer-motion';

export const WishlistList: React.FC = () => {
  const { isOwnWishlist, wishlist, isLoading, items, reorder, handleDeleteItem, isWishlistEmpty } =
    useWishlistListState();

  return (
    <div className={styles.wrapper}>
      {isOwnWishlist && (
        <div className={styles.buttonWrapper}>
          <WishlistAddItem wishlistId={wishlist.id} />
        </div>
      )}
      {isLoading ? (
        <WishlistItemSkeleton />
      ) : (
        <>
          {isWishlistEmpty ? (
            <div className={styles.empty}>
              <CustomIcon name={'emptyPresent'} />
              <Paragraph size='md'>
                {isOwnWishlist ? 'Your wishlist is empty :(' : 'That wishlist is empty'}
              </Paragraph>
            </div>
          ) : (
            <Reorder.Group values={items} onReorder={reorder} className={styles.list} axis='y'>
              {items.map((item) => (
                <WishlistListItem item={item} key={item.id} deleteServerItem={handleDeleteItem} />
              ))}
            </Reorder.Group>
          )}
        </>
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
