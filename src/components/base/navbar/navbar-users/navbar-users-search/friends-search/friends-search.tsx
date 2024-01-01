import React, { useEffect, useState } from 'react';

import styles from '../user-search.module.scss';
import { NavbarUserSearchItem } from '../users-search-item/user-search-item';

import { useAuth } from '@/components/base/provider/auth-provider';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';

import { useDebouncedValue } from '@mantine/hooks';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface INavbarFriendsSearchProps {
  query: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarFriendsSearch: React.FC<INavbarFriendsSearchProps> = ({
  query,
  setIsLoading,
}) => {
  const [users, setUsers] = useState<TProfile[]>([]);

  const [debounced] = useDebouncedValue(query, 200);

  const supabase = createClientComponentClient<Database>();
  const user = useAuth();

  const fetchUsers = async (query: string) => {
    try {
      const { data } = await supabase
        .rpc('get_user_friends', { current_user_id: user.id })
        .or(`user_name.ilike.%${query}%,full_name.ilike.%${query}%`);
      return data;
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleFetchUsers = async (query: string) => {
    setIsLoading(true);
    const newUsers = await fetchUsers(query);
    setIsLoading(false);
    if (newUsers && newUsers.length > 0) {
      setUsers(newUsers);
    }
  };

  useEffect(() => {
    if (debounced !== query) return;
    handleFetchUsers(debounced);
  }, [debounced]);

  return (
    <div className={styles.wrapper}>
      {users.map((user) => (
        <NavbarUserSearchItem profile={user} key={user.id} isFriend />
      ))}
    </div>
  );
};
