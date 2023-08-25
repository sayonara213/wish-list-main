import React from 'react';

import Image from 'next/image';

import styles from './shop-links-item.module.scss';

import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';

interface IShopLinksItemProps {
  link_url: string;
  link_name: string;
}

export const ShopLinksItem: React.FC<IShopLinksItemProps> = ({ link_url, link_name }) => {
  return (
    <a href={link_url} target='_blank'>
      <div className={styles.wrapper}>
        <Image
          width={32}
          height={32}
          src={`https://www.google.com/s2/favicons?domain=${link_url.slice(8, -1)}&sz=64`}
          loading='lazy'
          alt='icon'
        />
        <Paragraph size='sm'>{link_name}</Paragraph>
      </div>
    </a>
  );
};

export const ShopLinksItemAdd: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Icon name='add' size={32} />
      <Paragraph size='sm'>Add</Paragraph>
    </div>
  );
};
