import React from 'react';

import { EditSection } from './edit-section/edit-section';
import ListItemBody from './list-item-body/list-item-body';
import styles from './list-item.module.scss';

import { useWishlist } from '@/components/base/provider/wishlist-provider';
import { useRaisedShadow } from '@/hooks/use-raised-shdows';
import { TWishlistItem } from '@/types/database.types';

import { AnimatePresence, Reorder, useDragControls, useMotionValue } from 'framer-motion';

interface IWishlistListItemProps {
  item: TWishlistItem;
  deleteServerItem: (itemId: number) => void;
}

export const WishlistListItem: React.FC<IWishlistListItemProps> = ({ item, deleteServerItem }) => {
  const y = useMotionValue(0);
  const controls = useDragControls();
  const boxShadow = useRaisedShadow(y);
  const { isEditing, deleteItem, updateItem } = useWishlist();

  const handleDrag = (event: React.PointerEvent) => {
    event.preventDefault();
    isEditing && controls.start(event);
  };

  const handleDelete = async () => {
    try {
      await deleteServerItem(item.id);
      deleteItem(item.id);
    } catch {
      console.log('error deleting item');
    }
  };

  return (
    <Reorder.Item
      key={item.id}
      value={item}
      style={{ y, boxShadow }}
      dragControls={controls}
      dragListener={false}
      className={styles.dragitem}
    >
      <ListItemBody item={item} isEditing={isEditing}>
        <AnimatePresence>
          {isEditing && (
            <EditSection
              handleDrag={handleDrag}
              handleDelete={handleDelete}
              handleEdit={updateItem}
              item={item}
            />
          )}
        </AnimatePresence>
      </ListItemBody>
    </Reorder.Item>
  );
};
