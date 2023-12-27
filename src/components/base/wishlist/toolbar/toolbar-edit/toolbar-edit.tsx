import React from 'react';

import styles from '../toolbar.module.scss';

import { useWishlist } from '@/components/base/provider/wishlist-provider';
import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AnimatePresence, motion } from 'framer-motion';

interface IToolbarEditProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const ToolbarEdit: React.FC<IToolbarEditProps> = ({ isEditing, setIsEditing }) => {
  const supabase = createClientComponentClient();
  const { items, orderChanged, setOrderChanged } = useWishlist();

  const handleReorder = async () => {
    try {
      if (orderChanged) {
        setOrderChanged(false);
        const { data, error } = await supabase.from('items').upsert(items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    if (isEditing) {
      await handleReorder();
    }

    setIsEditing(!isEditing);
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
            <Paragraph>Save</Paragraph>
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
            <Paragraph>Edit</Paragraph>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
