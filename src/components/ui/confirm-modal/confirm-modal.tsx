import React, { useState } from 'react';

import styles from './confirm-modal.module.scss';

import { Paragraph } from '../text/text';

import { Button, Modal } from '@mantine/core';

interface IConfirmModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  opened: boolean;
}

export const ConfirmModal: React.FC<IConfirmModalProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  opened,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    onCancel();
  };

  return (
    <Modal opened={opened} onClose={onCancel} title={title} centered>
      <Paragraph>{description}</Paragraph>
      <div className={styles.wrapper}>
        <Button onClick={handleConfirm} loading={isLoading}>
          Confirm
        </Button>
        <Button onClick={onCancel} variant='outline' color='red'>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
