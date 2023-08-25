'use client';

import React from 'react';

import { ShopLinksItem, ShopLinksItemAdd } from './shop-links-item/shop-links-item';
import styles from './shop-links.module.scss';

interface IShopLinksProps {
  userId: string;
  shops: any;
}

export const ShopLinks: React.FC<IShopLinksProps> = ({ userId, shops }) => {
  return (
    <div className={styles.wrapper}>
      {shops.map((shop: any) => (
        <ShopLinksItem link_name={shop.link_name} link_url={shop.link_url} key={shop.id} />
      ))}
      <ShopLinksItemAdd />
    </div>
  );
};
