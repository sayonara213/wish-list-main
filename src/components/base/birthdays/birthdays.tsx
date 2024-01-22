'use server';

import React from 'react';

import { cookies } from 'next/headers';

import { BirthdayCalendar } from './birthday-calendar/birthday-calendar';
import { BirthdayList } from './birthday-list/birthday-list';
import styles from './birthdays.module.scss';

import { Database } from '@/lib/schema';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Text } from '@mantine/core';

interface IBirthdayCalendarProps {
  userId: string;
}

export const Birthdays: React.FC<IBirthdayCalendarProps> = async ({ userId }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: friends, error } = await supabase.rpc('get_user_friends', {
    current_user_id: userId,
  });

  const haveFriends = friends && friends.length > 0;

  return (
    <div className={styles.container}>
      <Text size='xxl' fw='bold'>
        Birthdays
      </Text>
      <div className={styles.row}>
        {haveFriends ? (
          <>
            <BirthdayCalendar friends={friends} />
            <BirthdayList friends={friends} />
          </>
        ) : (
          <div className={styles.wrapper} style={{ width: '100%' }}>
            <Text>
              You don&apos;t have any friends right now, search for them by opening navigation bar
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};
