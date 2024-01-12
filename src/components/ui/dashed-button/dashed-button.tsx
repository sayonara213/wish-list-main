import React, { ButtonHTMLAttributes } from 'react';

import styles from './dashed-button.module.scss';

interface IAddItemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const DashedButton: React.FC<IAddItemButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={styles.wrapper}>
      {children}
    </button>
  );
};
