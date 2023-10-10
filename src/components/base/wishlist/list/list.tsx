'use client';

import React, { useEffect, useState } from 'react';

import { WishlistListItem } from './list-item/list-item';
import styles from './list.module.scss';

import { Database } from '@/lib/schema';
import { IWishlist, IWishlistItem } from '@/types/wishlist';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface IWishlistListProps {
  wishlist: IWishlist;
}

export const WishlistList: React.FC<IWishlistListProps> = ({ wishlist }) => {
  const [items, setItems] = useState<IWishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const supabase = createClientComponentClient<Database>();

  const fetchItems = async () => {
    const { data, error } = await supabase.from('items').select().eq('wishlist_id', wishlist.id);

    if (error) {
      console.error('ERROR:', error);
    }

    if (!data) return;

    console.log(data);

    setIsLoading(false);
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className={styles.wrapper}>
      {items.map((item) => (
        <WishlistListItem item={item} key={item.id} />
      ))}
    </div>
  );
};
