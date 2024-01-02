import React, { useEffect, useRef, useState } from 'react';

import styles from './user-search.module.scss';
import { NavbarUserSearchItem } from './users-search-item/user-search-item';

import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';

import { Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface INavbarUserSearchProps {
  query: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const paginationStep = 4;

export const NavbarUserSearch: React.FC<INavbarUserSearchProps> = ({
  query,
  setIsLoading,
  isLoading,
}) => {
  const [users, setUsers] = useState<TProfile[]>([]);

  const [debounced] = useDebouncedValue(query, 200);
  const [pagination, setPagination] = useState({ from: 0, to: paginationStep });
  const [isEnd, setIsEnd] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const supabase = createClientComponentClient<Database>();

  const fetchUsers = async (query: string, from: number, to: number) => {
    if (query.length < 2) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .or(`user_name.ilike.%${query}%,full_name.ilike.%${query}%`)
      .range(from, to);

    if (!data || error) setIsEnd(true);

    return data;
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

  const noResults = query.length > 1 && users.length < 1 && !isLoading;

  const noQuery = query.length < 2;

  return (
    <div className={styles.wrapper} ref={scrollRef}>
      {noResults && (
        <div className={styles.errors}>
          <Text size='sm'>No users found</Text>
        </div>
      )}
      {noQuery && (
        <div className={styles.errors}>
          <Text size='sm'>Search for users by user name</Text>
        </div>
      )}

      {users.map((user) => (
        <NavbarUserSearchItem profile={user} key={user.id} />
      ))}
    </div>
  );
};
