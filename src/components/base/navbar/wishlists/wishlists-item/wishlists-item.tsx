import React from 'react';

import styles from './wishlists-item.module.scss';

import { toNormalCase } from '@/utils/text';

interface INavbarWishlistsItemProps {
  title: string;
}

export const NavbarWishlistsItem: React.FC<INavbarWishlistsItemProps> = ({ title }) => {
  return <button className={styles.item}>{toNormalCase(title)}</button>;
};
