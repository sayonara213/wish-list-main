'use client';

import React from 'react';

import { CreateWishlistForm } from './create-wishlist-form/create-wishlist-form';
import { WishlistsList } from './user-wishlists-list/user-wishlists-list';
import styles from './user-wishlists.module.scss';

import { DashedButton } from '@/components/ui/dashed-button/dashed-button';
import { ISharedWishlistJoinProfile, TWishlist } from '@/types/database.types';

import { Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface IUserWishlistsProps {
  wishlists: (TWishlist | ISharedWishlistJoinProfile)[] | null;
}

export const UserWishlists: React.FC<IUserWishlistsProps> = ({ wishlists }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={styles.wrapper}>
      <Text size='xxl' fw='bold'>
        Your wishlists:
      </Text>
      <div className={styles.list}>
        <DashedButton onClick={open}>New Wishlist</DashedButton>
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          centered
          title='Create wishlist'
          className={styles.modal}
        >
          <CreateWishlistForm />
        </Modal>
        {wishlists && <WishlistsList wishlists={wishlists} />}
      </div>
    </div>
  );
};
