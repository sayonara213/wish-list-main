import React from 'react';

import { WishlistItemForm } from '../item-form/item-form';

import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface IWishlistAddItemProps {
  wishlistId: number;
}

export const WishlistAddItem: React.FC<IWishlistAddItemProps> = ({ wishlistId }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title='Add new item'>
        <WishlistItemForm wishlistId={wishlistId} closeModal={close} />
      </Modal>
      <Button onClick={open}>Add item</Button>
    </>
  );
};
