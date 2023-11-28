'use client';

import React, { useEffect, useState } from 'react';

import { WishlistAddItem } from './add-item/add-item';
import { WishlistListItem } from './list-item/list-item';
import styles from './list.module.scss';

import { Database } from '@/lib/schema';
import { TWishlist, TWishlistItem } from '@/types/database.types';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Reorder } from 'framer-motion';

interface IWishlistListProps {
  wishlist: TWishlist;
}

export const WishlistList: React.FC<IWishlistListProps> = ({ wishlist }) => {
  const [items, setItems] = useState<TWishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const supabase = createClientComponentClient<Database>();

  const fetchItems = async () => {
    const { data, error } = await supabase.from('items').select().eq('wishlist_id', wishlist.id);

    if (error) {
      console.error('ERROR:', error);
    }

    if (!data) return;

    setIsLoading(false);
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className={styles.wrapper}>
      <WishlistAddItem wishlistId={wishlist.id} />
      <Reorder.Group values={items} onReorder={setItems} className={styles.list}>
        {items.map((item) => (
          <Reorder.Item key={item.id} value={item}>
            <WishlistListItem item={item} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};
