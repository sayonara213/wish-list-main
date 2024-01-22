import React, { memo } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import styles from './list-item-body.module.scss';

import { ShopLinkImage } from '@/components/base/shop-links/shop-links-item/shop-link-image/shop-link-image';
import { CustomIcon } from '@/components/ui/icon/custom-icon';
import { TWishlistItem } from '@/types/database.types';
import { classes } from '@/utils/styles';

import { Text } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';

interface IListItemBodyProps {
  item: TWishlistItem;
  children?: React.ReactNode;
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

const ListItemBody: React.FC<IListItemBodyProps> = ({ item, children }) => {
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
      <div className={classes(styles.wrapper)}>
        <div className={styles.pair}>
          {item.image_url && (
            <div className={styles.imageWrapper}>
              <Image src={item.image_url} width={100} height={100} alt='item-image' />
            </div>
          )}
          <div className={styles.main}>
            <Text fw='bold'>{item.name}</Text>
            {item.description && (
              <Text size='sm' c='dimmed' lineClamp={2}>
                {item.description}
              </Text>
            )}
            {item.price && (
              <Text size='sm' c='dimmed'>
                ${item.price}
              </Text>
            )}
          </div>
        </div>
        <div className={styles.pair}>
          {item.link && (
            <Link href={item.link}>
              <ShopLinkImage src={item.link} />
            </Link>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default memo(ListItemBody);
