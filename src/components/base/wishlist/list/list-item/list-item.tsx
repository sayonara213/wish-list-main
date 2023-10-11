import React from 'react';

import styles from './list-item.module.scss';

import { Paragraph } from '@/components/ui/text/text';
import { TWishlistItem } from '@/types/database.types';

interface IWishlistListItemProps {
  item: TWishlistItem;
}

export const WishlistListItem: React.FC<IWishlistListItemProps> = ({ item }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Paragraph size='base' weight='medium'>
          {item.name}
        </Paragraph>
        <Paragraph size='sm' weight='normal' color='muted'>
          {item.description}
        </Paragraph>
      </div>
      <Paragraph size='md' weight='medium'>
        300 UAH
      </Paragraph>
    </div>
  );
};
