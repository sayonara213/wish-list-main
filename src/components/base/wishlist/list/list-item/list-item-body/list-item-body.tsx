import React, { memo } from 'react';

import Link from 'next/link';

import styles from '../list-item.module.scss';

import { ShopLinkImage } from '@/components/base/shop-links/shop-links-item/shop-link-image/shop-link-image';
import { Paragraph } from '@/components/ui/text/text';
import { TWishlistItem } from '@/types/database.types';
import { classes } from '@/utils/styles';

interface IListItemBodyProps {
  item: TWishlistItem;
  children?: React.ReactNode;
  isEditing?: boolean;
}

const ListItemBody: React.FC<IListItemBodyProps> = ({ item, children, isEditing }) => {
  return (
    <div className={styles.container}>
      <div className={classes(styles.wrapper, isEditing && styles.editing)}>
        <div className={styles.pair}>
          {item.link && (
            <Link href={item.link}>
              <ShopLinkImage src={item.link} />
            </Link>
          )}
          <div className={styles.main}>
            <Paragraph size='base' weight='medium'>
              {item.name}
            </Paragraph>
            <Paragraph size='sm' weight='normal' color='muted'>
              {item.description}
            </Paragraph>
          </div>
        </div>
        <div className={styles.pair}>
          <Paragraph size='md' weight='medium'>
            {item.price} USD
          </Paragraph>
          {children}
        </div>
      </div>
    </div>
  );
};

export default memo(ListItemBody);
