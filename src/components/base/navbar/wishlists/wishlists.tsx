import React from 'react';

import Link from 'next/link';

import { NavbarWishlistsItem } from './wishlists-item/wishlists-item';
import styles from './wishlists.module.scss';

import { TWishlist } from '@/types/database.types';

import { Button } from '@mantine/core';

interface INavbarWishlistsProps {
  wishlists: TWishlist[];
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
        <Link href={`/app/wishlist/${wishlist.id}`} key={wishlist.id}>
          <NavbarWishlistsItem title={wishlist.title} />
        </Link>
      ))}
    </div>
  );
};
