import React, { useEffect, useRef, useState } from 'react';

import styles from './user-search.module.scss';
import { NavbarUserSearchItem } from './wishlists-item/user-search-item';

import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';

import { Loader, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const paginationStep = 3;

export const NavbarUserSearch: React.FC = () => {
  const [users, setUsers] = useState<TProfile[]>([]);

  const [query, setQuery] = useState('');
  const [debounced] = useDebouncedValue(query, 200);
  const [pagination, setPagination] = useState({ from: 0, to: paginationStep });
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const supabase = createClientComponentClient<Database>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const fetchUsers = async (query: string, from: number, to: number) => {
    try {
      if (query.length < 1) return;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .ilike('user_name', `%${query}%`)
        .range(from, to);

      if (!data) setIsEnd(true);

      return data;
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleFetchUsers = async (query: string) => {
    if (isEnd) return;

    const newUsers = await fetchUsers(query, pagination.from, pagination.to);
    setIsLoading(false);
    if (newUsers && newUsers.length > 0) {
      setIsEnd(false);
      setUsers((prev) => [...prev, ...newUsers]);
    }
  };

  useEffect(() => {
    if (debounced !== query) return;
    handleFetchUsers(debounced);
  }, [debounced, pagination]);

  useEffect(() => {
    setIsLoading(true);
    setPagination({ from: 0, to: paginationStep });
    setUsers([]);
    setIsEnd(false);
  }, [query]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      if (scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight) {
        setPagination((prev) => ({
          from: prev.to + 1,
          to: prev.to + paginationStep,
        }));
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef]);

  return (
    <div className={styles.wrapper} ref={scrollRef}>
      <div className={styles.input}>
        <TextInput
          onChange={handleChange}
          value={query}
          placeholder='Search for people...'
          {...(isLoading && { rightSection: <Loader size={16} /> })}
        />
      </div>

      {users.map((user) => (
        <NavbarUserSearchItem profile={user} key={user.id} />
      ))}
    </div>
  );
};
