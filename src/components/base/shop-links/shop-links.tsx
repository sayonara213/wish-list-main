'use client';

import React, { useEffect, useState } from 'react';

import { ShopLinksItemAdd } from './shop-links-add/shop-links-item-add';
import { ShopLinksItem, ShopLinksItemLoading } from './shop-links-item/shop-links-item';
import styles from './shop-links.module.scss';

import { TShop } from '@/types/database.types';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AnimatePresence, motion } from 'framer-motion';

interface IShopLinksProps {
  userId: string;
}

export const ShopLinks: React.FC<IShopLinksProps> = ({ userId }) => {
  const supabase = createClientComponentClient();

  const [shopLinks, setShopLinks] = useState<TShop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchShopLinks = async () => {
    const { data } = await supabase.from('shops').select().eq('user_id', userId);

    if (!data) return;

    setShopLinks(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchShopLinks();
  }, []);

  const deleteShopLink = (id: number) => {
    setShopLinks(shopLinks.filter((shop) => shop.id !== id));
  };

  const addShopLink = (shop: TShop) => {
    setShopLinks([...shopLinks, shop]);
  };

  return isLoading ? (
    <div className={styles.wrapper}>
      <ShopLinksItemLoading />
      <ShopLinksItemLoading />
      <ShopLinksItemLoading />
      <ShopLinksItemAdd addLink={addShopLink} />
    </div>
  ) : (
    <AnimatePresence mode='popLayout'>
      <motion.ul className={styles.wrapper}>
        {shopLinks.map((shop) => (
          <motion.li
            layout
            key={shop.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring' }}
          >
            <ShopLinksItem shop={shop} deleteLink={deleteShopLink} />
          </motion.li>
        ))}
        <motion.li
          layout
          key={'delete'}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring' }}
        >
          <ShopLinksItemAdd addLink={addShopLink} />
        </motion.li>
      </motion.ul>
    </AnimatePresence>
  );
};
