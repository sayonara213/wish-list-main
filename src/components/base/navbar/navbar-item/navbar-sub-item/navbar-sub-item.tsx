import React from 'react';

import styles from './navbar-sub-item.module.scss';

import { toNormalCase } from '@/utils/text';

interface INavbarSubItemProps {
  name: string;
  link?: string;
}

export const NavbarSubItem: React.FC<INavbarSubItemProps> = ({ name, link }) => {
  return <button className={styles.item}>{toNormalCase(name)}</button>;
};
