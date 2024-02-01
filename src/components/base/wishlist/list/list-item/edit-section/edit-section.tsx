import React from 'react';

import styles from './edit-section.module.scss';

import { WishlistItemForm } from '../../add-item/item-form/item-form';

import { ConfirmModal } from '@/components/ui/confirm-modal/confirm-modal';
import { TWishlistItem } from '@/types/database.types';

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { motion } from 'framer-motion';
import {
  IconDotsVertical,
  IconDragDrop,
  IconEdit,
  IconGripVertical,
  IconTrash,
} from '@tabler/icons-react';

interface IEditSectionProps {
  handleDrag: (event: React.PointerEvent) => void;
  handleDelete: () => void;
  handleEdit?: (item: TWishlistItem) => void;
  item: TWishlistItem;
}

export const EditSection: React.FC<IEditSectionProps> = ({
  handleDrag,
  handleDelete,
  handleEdit,
  item,
}) => {
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);

  return (
    <>
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -40, opacity: 0 }}
        className={styles.wrapper}
      >
        <div className={styles.edit}>
          <button onClick={openEdit}>
            <IconEdit color='var(--text-color)' size={20} />
          </button>
          <button onClick={openDelete}>
            <IconTrash color='var(--text-color)' size={20} />
          </button>
        </div>
        <button className={styles.drag} style={{ touchAction: 'none' }} onPointerDown={handleDrag}>
          <IconGripVertical color='var(--text-color)' />
        </button>
      </motion.div>
      <ConfirmModal
        title='Confirmation'
        description={'Are you sure you want to delete this item?'}
        onConfirm={handleDelete}
        onCancel={closeDelete}
        opened={openedDelete}
      />
      <Modal opened={openedEdit} onClose={closeEdit} title='Add new item' centered>
        <WishlistItemForm
          closeModal={closeEdit}
          isEdit
          item={item}
          optimisticAction={handleEdit}
          wishlistId={item.wishlist_id!}
        />
      </Modal>
    </>
  );
};
