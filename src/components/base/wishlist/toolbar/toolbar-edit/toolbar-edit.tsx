import React from 'react';

import styles from '../toolbar.module.scss';

import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';

import { AnimatePresence, motion } from 'framer-motion';

interface IToolbarEditProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const ToolbarEdit: React.FC<IToolbarEditProps> = ({ isEditing, setIsEditing }) => {
  return (
    <button
      className={styles.button}
      onClick={() => setIsEditing(!isEditing)}
      style={{ position: 'relative' }}
    >
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
