import React from 'react';

import styles from './toolbar.module.scss';

import { Paragraph } from '@/components/ui/text/text';

export const WishlistToolbar = () => {
  return (
    <div className={styles.wrapper}>
      <Paragraph>Filter</Paragraph>
      <Paragraph>Sort</Paragraph>
    </div>
  );
};
