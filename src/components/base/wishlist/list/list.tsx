'use client';

import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { WishlistAddItem } from './add-item/add-item';
import { WishlistListItem } from './list-item/list-item';
import styles from './list.module.scss';

import { useWishlist } from '../../provider/wishlist-provider';

import { CustomIcon } from '@/components/ui/icon/custom-icon';
import { Paragraph } from '@/components/ui/text/text';
import { Database } from '@/lib/schema';

import { Skeleton } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Reorder } from 'framer-motion';

export const WishlistList: React.FC = () => {
  const { items, reorder, setItems, wishlist, isOwnWishlist } = useWishlist();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  const supabase = createClientComponentClient<Database>();

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('items')
      .select()
      .eq('wishlist_id', wishlist.id)
      .order(searchParams.get('sort') || 'priority', {
        ascending: searchParams.get('order') === 'asc' || searchParams.has('order') === false,
      });

    if (error || !data) {
      return;
    }

    setIsLoading(false);
    setItems(data);
  };

  const deleteItem = async (itemId: number) => {
    const { error, data } = await supabase.from('items').delete().eq('id', itemId);

    if (error) {
      console.log(error);

      return;
    }
  };

  useEffect(() => {
    fetchItems();
  }, [searchParams]);

  const isWishlistEmpty = items.length === 0 && !isLoading;

  return (
    <div className={styles.wrapper}>
      {isOwnWishlist && (
        <div className={styles.buttonWrapper}>
          <WishlistAddItem wishlistId={wishlist.id} />
        </div>
      )}
      {isLoading && <WishlistItemSkeleton />}
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
            <WishlistListItem item={item} key={item.id} deleteServerItem={deleteItem} />
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
