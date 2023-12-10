import React, { ButtonHTMLAttributes } from 'react';

import styles from './add-item-button.module.scss';

interface IAddItemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const AddItemButton: React.FC<IAddItemButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.wrapper}>
      New wish!
    </button>
  );
};
