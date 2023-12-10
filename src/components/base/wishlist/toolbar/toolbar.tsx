import React, { useCallback, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from './toolbar.module.scss';

import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';
import { toNormalCase } from '@/utils/text';

import { Menu, MenuDropdown, MenuItem } from '@mantine/core';

const sortOptions = [
  { value: 'name', label: 'Name', icon: 'text_format' },
  { value: 'price', label: 'Price', icon: 'payments' },
  { value: 'created_at', label: 'Date added', icon: 'calendar_today' },
  { value: 'priority', label: 'Priority', icon: 'star' },
];

const orderOptions = [
  {
    value: 'asc',
    icon: 'trending_up',
  },
  {
    value: 'desc',
    icon: 'trending_down',
  },
];

export const WishlistToolbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const [sort, setSort] = useState<string>(
    sortOptions.find((option) => option.value === searchParams.get('sort'))?.label || 'Name',
  );
  const [order, setOrder] = useState<string>(
    (searchParams.get('order') && toNormalCase(searchParams.get('order')!)) || 'Asc',
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const setQuery = (key: string, value: string, label: string) => {
    router.push(pathname + '?' + createQueryString(key, value.toLowerCase()));
    key === 'sort' ? setSort(label) : setOrder(toNormalCase(value));
  };

  return (
    <div className={styles.wrapper}>
      <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
        <Menu.Target>
          <button className={styles.button}>
            <Icon name='sort'></Icon>
            <Paragraph>{sort}</Paragraph>
            <Paragraph>{order}</Paragraph>
          </button>
        </Menu.Target>
        <MenuDropdown className={styles.dropdown}>
          <Menu.Label>Sort By:</Menu.Label>
          {sortOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => {
                setQuery('sort', option.value, option.label);
              }}
              className={option.value === sort.toLowerCase() ? styles.selected : ''}
              leftSection={<Icon name={option.icon} />}
            >
              {option.label}
            </MenuItem>
          ))}
          <Menu.Divider />
          <Menu.Label>Sort Order:</Menu.Label>

          {orderOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => {
                setQuery('order', option.value, '');
              }}
              leftSection={<Icon name={option.icon} />}
              className={option.value === order.toLowerCase() ? styles.selected : ''}
            >
              {option.value}
            </MenuItem>
          ))}
        </MenuDropdown>
      </Menu>
    </div>
  );
};
