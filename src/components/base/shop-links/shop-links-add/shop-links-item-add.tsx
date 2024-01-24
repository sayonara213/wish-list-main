import React, { useState } from 'react';

import { AddLinkForm } from './add-link-form/add-link-form';
import styles from './shop-links-item-add.module.scss';

import { Icon } from '@/components/ui/icon/icon';
import { TShop } from '@/types/database.types';

import { Popover, Text } from '@mantine/core';

interface IShopLinksItemAddProps {
  addLink: (link: TShop) => void;
}

export const ShopLinksItemAdd: React.FC<IShopLinksItemAddProps> = ({ addLink }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Popover
      width={220}
      position='bottom'
      withArrow
      shadow='md'
      opened={isOpened}
      onChange={setIsOpened}
    >
      <Popover.Target>
        <div className={styles.button} onClick={() => setIsOpened((o) => !o)}>
          <Icon name='add' size={32} />
          <Text size='sm'>Add</Text>
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <AddLinkForm addLink={addLink} closePopover={() => setIsOpened(false)} />
      </Popover.Dropdown>
    </Popover>
  );
};
