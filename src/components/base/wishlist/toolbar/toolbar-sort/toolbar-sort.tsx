'use client';

import React, { useCallback, useState } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import styles from '../toolbar.module.scss';

import { toNormalCase } from '@/utils/text';

import { Menu, MenuDropdown, MenuItem, Text } from '@mantine/core';
import {
  IconCalendar,
  IconMoneybag,
  IconSortAscending,
  IconStar,
  IconTextGrammar,
  IconTrendingDown,
  IconTrendingUp,
} from '@tabler/icons-react';

const sortOptions = [
  { value: 'priority', label: 'Priority', icon: <IconStar color='var(--text-color)' /> },
  { value: 'name', label: 'Name', icon: <IconTextGrammar color='var(--text-color)' /> },
  { value: 'price', label: 'Price', icon: <IconMoneybag color='var(--text-color)' /> },
  { value: 'created_at', label: 'Date added', icon: <IconCalendar color='var(--text-color)' /> },
];

const orderOptions = [
  {
    value: 'asc',
    icon: <IconTrendingUp color='var(--text-color)' />,
  },
  {
    value: 'desc',
    icon: <IconTrendingDown color='var(--text-color)' />,
  },
];

export const ToolbarSort: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const [sort, setSort] = useState<string>(
    sortOptions.find((option) => option.value === searchParams.get('sort'))?.label || 'Priority',
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
    <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
      <Menu.Target>
        <button className={styles.button}>
          <IconSortAscending name='sort' />
          <Text>{sort}</Text>
          <Text>{order}</Text>
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
            leftSection={option.icon}
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
            leftSection={option.icon}
            className={option.value === order.toLowerCase() ? styles.selected : ''}
          >
            {option.value}
          </MenuItem>
        ))}
      </MenuDropdown>
    </Menu>
  );
};
