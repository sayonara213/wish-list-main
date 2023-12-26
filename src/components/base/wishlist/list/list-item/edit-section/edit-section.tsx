import React from 'react';

import styles from './edit-section.module.scss';

import { ConfirmModal } from '@/components/ui/confirm-modal/confirm-modal';
import { Icon } from '@/components/ui/icon/icon';

import { useDisclosure } from '@mantine/hooks';
import { motion } from 'framer-motion';

interface IEditSectionProps {
  handleDrag: (event: React.PointerEvent) => void;
  handleDelete: () => void;
  handleEdit?: () => void;
  isEditing?: boolean;
}

export const EditSection: React.FC<IEditSectionProps> = ({
  handleDrag,
  handleDelete,
  handleEdit,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -40, opacity: 0 }}
        className={styles.wrapper}
      >
        <div className={styles.edit}>
          <button>
            <Icon name='edit' />
          </button>
          <button onClick={open}>
            <Icon name='delete' />
          </button>
        </div>
        <button className={styles.drag} style={{ touchAction: 'none' }} onPointerDown={handleDrag}>
          <Icon name='drag_indicator' size={32} />
        </button>
      </motion.div>
      <ConfirmModal
        title='Confirmation'
        description={'Are you sure you want to delete this item?'}
        onConfirm={handleDelete}
        onCancel={close}
        opened={opened}
      />
    </>
  );
};
