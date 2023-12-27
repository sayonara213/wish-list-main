import React, { useEffect, useRef } from 'react';

import { EditSection } from './edit-section/edit-section';
import ListItemBody from './list-item-body/list-item-body';
import styles from './list-item.module.scss';

import { useWishlist } from '@/components/base/provider/wishlist-provider';
import { useRaisedShadow } from '@/hooks/use-raised-shdows';
import { TWishlistItem } from '@/types/database.types';
import { classes } from '@/utils/styles';

import { AnimatePresence, Reorder, useDragControls, useMotionValue } from 'framer-motion';

interface IWishlistListItemProps {
  item: TWishlistItem;
  index: number;
  deleteServerItem: (itemId: number) => void;
}

export const WishlistListItem: React.FC<IWishlistListItemProps> = ({
  item,
  deleteServerItem,
  index,
}) => {
  const y = useMotionValue(0);
  const controls = useDragControls();
  const boxShadow = useRaisedShadow(y);
  const { isEditing, deleteItem, updateItem } = useWishlist();

  const iRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const touchHandler: React.TouchEventHandler<HTMLElement> = (e) => e.preventDefault();

    const iTag = iRef.current;

    if (iTag) {
      //@ts-ignore
      iTag.addEventListener('touchstart', touchHandler, { passive: false });

      return () => {
        //@ts-ignore
        iTag.removeEventListener('touchstart', touchHandler, {
          passive: false,
        });
      };
    }
    return;
  }, [iRef]);

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
      ref={iRef}
      key={item.id}
      value={item}
      style={{ y, boxShadow }}
      dragControls={controls}
      dragListener={false}
      className={classes(styles.dragitem, index < 3 && styles.fav)}
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
