'use client';

import React, { useEffect, useState } from 'react';

import { WishlistAddItem } from './add-item/add-item';
import { WishlistListItem } from './list-item/list-item';
import styles from './list.module.scss';

import { useWishlist } from '../../provider/wishlist-provider';

import { Database } from '@/lib/schema';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Reorder } from 'framer-motion';

export const WishlistList: React.FC = () => {
  const { items, setItems, wishlist } = useWishlist();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const supabase = createClientComponentClient<Database>();

  const fetchItems = async () => {
    const { data, error } = await supabase.from('items').select().eq('wishlist_id', wishlist.id);

    if (error || !data) {
      return;
    }

    setIsLoading(false);
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className={styles.wrapper}>
      <WishlistAddItem wishlistId={wishlist.id} />
      <Reorder.Group values={items} onReorder={setItems} className={styles.list} axis='y'>
        {items.map((item) => (
          <WishlistListItem item={item} key={item.id} />
        ))}
      </Reorder.Group>
    </div>
  );
};
