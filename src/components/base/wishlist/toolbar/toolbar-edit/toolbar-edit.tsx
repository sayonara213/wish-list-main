import React from 'react';

import styles from '../toolbar.module.scss';

import { useSharedWishlist } from '@/components/base/provider/shared-wishlist-provider';
import { useWishlist } from '@/components/base/provider/wishlist-provider';
import { Icon } from '@/components/ui/icon/icon';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import { Text } from '@mantine/core';

interface IToolbarEditProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const ToolbarEdit: React.FC<IToolbarEditProps> = ({ isEditing, setIsEditing }) => {
  const supabase = createClientComponentClient();
  const { items, orderChanged, setOrderChanged } = useWishlist();
  const { setIsEditing: sharedSetIsEditing, isEditing: sharedIsEditing } = useSharedWishlist();

  const handleReorder = async () => {
    try {
      if (orderChanged) {
        setOrderChanged(false);
        const { data, error } = await supabase.from('items').upsert(items);
      }
    } catch (error) {}
  };

  const handleClick = async () => {
    if (isEditing) {
      await handleReorder();
    }

    setIsEditing(!isEditing);
    sharedSetIsEditing(!sharedIsEditing);
  };

  return (
    <button className={styles.edit} onClick={handleClick} style={{ position: 'relative' }}>
      <AnimatePresence>
        {isEditing ? (
          <motion.div
            key={'save'}
            className={styles.button}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'absolute' }}
          >
            <Icon name='check' />
            <Text>Save</Text>
          </motion.div>
        ) : (
          <motion.div
            key={'edit'}
            className={styles.button}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'absolute' }}
          >
            <Icon name='edit' />
            <Text>Edit</Text>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
