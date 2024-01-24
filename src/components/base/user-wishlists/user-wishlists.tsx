'use client';

import React from 'react';

import { CreateWishlistForm } from './create-wishlist-form/create-wishlist-form';
import { WishlistsList } from './user-wishlists-list/user-wishlists-list';
import styles from './user-wishlists.module.scss';

import { DashedButton } from '@/components/ui/dashed-button/dashed-button';
import { ISharedWishlistJoinProfile, TWishlist } from '@/types/database.types';

import { ActionIcon, Button, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Icon } from '@/components/ui/icon/icon';

interface IUserWishlistsProps {
  wishlists: (TWishlist | ISharedWishlistJoinProfile)[] | null;
}

export const UserWishlists: React.FC<IUserWishlistsProps> = ({ wishlists }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Text size='xxl' fw='bold'>
          Your wishlists
        </Text>
        <ActionIcon
          variant='gradient'
          gradient={{ from: '#7745e9', to: '#9a45e9', deg: 45 }}
          size='md'
          onClick={open}
        >
          <Icon name='add' />
        </ActionIcon>
      </div>
      <div className={styles.list}>
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
