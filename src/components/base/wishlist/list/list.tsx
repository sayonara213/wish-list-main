'use client';

import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { WishlistAddItem } from './add-item/add-item';
import { WishlistListItem } from './list-item/list-item';
import styles from './list.module.scss';

import { useWishlist } from '../../provider/wishlist-provider';

import { Database } from '@/lib/schema';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Reorder } from 'framer-motion';

export const WishlistList: React.FC = () => {
  const { items, reorder, setItems, wishlist } = useWishlist();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  const supabase = createClientComponentClient<Database>();

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('items')
      .select()
      .eq('wishlist_id', wishlist.id)
      .order(searchParams.get('sort') || 'name', {
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

  return (
    <div className={styles.wrapper}>
      <WishlistAddItem wishlistId={wishlist.id} />
      <Reorder.Group values={items} onReorder={reorder} className={styles.list} axis='y'>
        {items.map((item) => (
          <WishlistListItem
            item={item}
            key={item.id}
            deleteServerItem={deleteItem}
            index={item.priority!}
          />
        ))}
      </Reorder.Group>
    </div>
  );
};
