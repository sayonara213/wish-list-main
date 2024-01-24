import React from 'react';

import { BirthdayListItem } from './birthday-list-item/birthday-list-item';
import styles from './birthday-list.module.scss';

import wrapper from '../birthdays.module.scss';

import { TProfile } from '@/types/database.types';
import { classes } from '@/utils/styles';
import { Text } from '@mantine/core';

interface IBirthdayListProps {
  friends: TProfile[];
}

export const BirthdayList: React.FC<IBirthdayListProps> = ({ friends }) => {
  return (
    <div className={classes(wrapper.wrapper, styles.wrapper)}>
      <Text size='lg'>Upcoming birthdays:</Text>
      <div className={styles.list}>
        {friends.map((friend) => (
          <BirthdayListItem friend={friend} key={friend.id} />
        ))}
      </div>
    </div>
  );
};
