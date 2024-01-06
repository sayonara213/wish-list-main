import React from 'react';

import { AddItemButton } from './add-item-button/add-item-button';
import { WishlistItemForm } from './item-form/item-form';

import { useWishlist } from '@/components/base/provider/wishlist-provider';

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface IWishlistAddItemProps {
  wishlistId: number;
}

export const WishlistAddItem: React.FC<IWishlistAddItemProps> = ({ wishlistId }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { addItem } = useWishlist();

  return (
    <>
      <Modal opened={opened} onClose={close} title='Add new item' centered>
        <WishlistItemForm wishlistId={wishlistId} closeModal={close} optimisticAction={addItem} />
      </Modal>
      <AddItemButton onClick={open}>Add item</AddItemButton>
    </>
  );
};
