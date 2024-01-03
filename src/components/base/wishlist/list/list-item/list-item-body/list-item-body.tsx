import React, { memo } from 'react';

import Link from 'next/link';

import styles from '../list-item.module.scss';

import { ShopLinkImage } from '@/components/base/shop-links/shop-links-item/shop-link-image/shop-link-image';
import { CustomIcon } from '@/components/ui/icon/custom-icon';
import { Paragraph } from '@/components/ui/text/text';
import { TWishlistItem } from '@/types/database.types';
import { classes } from '@/utils/styles';

import { AnimatePresence, motion } from 'framer-motion';

interface IListItemBodyProps {
  item: TWishlistItem;
  children?: React.ReactNode;
  isEditing?: boolean;
}

const variants = {
  hide: {
    opacity: 0,
    x: -100,
  },
  show: {
    opacity: 1,
    x: 0,
  },
};

const ListItemBody: React.FC<IListItemBodyProps> = ({ item, children, isEditing }) => {
  return (
    <div className={styles.container}>
      <AnimatePresence>
        {item.priority! < 3 && (
          <motion.div
            className={styles.fav}
            variants={variants}
            transition={{ ease: 'backInOut' }}
            initial='hide'
            animate='show'
            exit='hide'
          >
            <CustomIcon name='star' size={18} />
          </motion.div>
        )}
      </AnimatePresence>
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
            ${item.price}
          </Paragraph>
          {children}
        </div>
      </div>
    </div>
  );
};

export default memo(ListItemBody);
