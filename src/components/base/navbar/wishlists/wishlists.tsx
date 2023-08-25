import React from 'react';

import Link from 'next/link';

import { NavbarWishlistsItem } from './wishlists-item/wishlists-item';
import styles from './wishlists.module.scss';

import { Button } from '@mantine/core';

interface INavbarWishlistsProps {
  wishlists: any[];
}

export const NavbarWishlists: React.FC<INavbarWishlistsProps> = ({ wishlists }) => {
  return (
    <div className={styles.wrapper}>
      <Link href={'/app/wishlist/add-wishlist'}>
        <Button fullWidth variant='outline' className={styles.button}>
          Add new
        </Button>
      </Link>

      {wishlists.map((wishlist) => (
        <NavbarWishlistsItem title={wishlist.title} key={wishlist.id} />
      ))}
    </div>
  );
};
