'use client';

import React, { useEffect, useState } from 'react';

import { ShopLinksItemAdd } from './shop-links-add/shop-links-item-add';
import { ShopLinksItem, ShopLinksItemLoading } from './shop-links-item/shop-links-item';
import styles from './shop-links.module.scss';

import { TShop } from '@/types/database.types';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import { Text } from '@mantine/core';

interface IShopLinksProps {
  userId: string;
}

export const ShopLinks: React.FC<IShopLinksProps> = ({ userId }) => {
  const supabase = createClientComponentClient();

  const [shopLinks, setShopLinks] = useState<TShop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchShopLinks = async () => {
    setIsLoading(true);

    try {
      const { data } = await supabase.from('shops').select().eq('user_id', userId);
      if (!data) return;
      setShopLinks(data);
      setIsLoading(false);
    } catch (error) {
      console.error('ERROR:', error);
    }
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

  return (
    <div>
      <div className={styles.wrapper}>
        <Text size='md' fw='bold'>
          Shops
        </Text>
        <Text size='sm' c='dimmed'>
          Save links to your favourite shops!
        </Text>
      </div>
      <AnimatePresence mode='popLayout'>
        {isLoading ? (
          <motion.div>
            <ShopLinksLoader />
          </motion.div>
        ) : (
          <motion.ul className={styles.list}>
            <motion.li
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring' }}
            >
              <ShopLinksItemAdd addLink={addShopLink} />
            </motion.li>
            {shopLinks.map((shop) => (
              <motion.li
                key={shop.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring' }}
              >
                <ShopLinksItem shop={shop} deleteLink={deleteShopLink} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ShopLinksLoader: React.FC = () => {
  return (
    <div className={styles.list}>
      <ShopLinksItemLoading />
      <ShopLinksItemLoading />
      <ShopLinksItemLoading />
    </div>
  );
};
