import React from 'react';

import Link from 'next/link';

import styles from './birthday-list-item.module.scss';

import { Avatar } from '@/components/ui/avatar/avatar';
import { Paragraph } from '@/components/ui/text/text';
import { TProfile } from '@/types/database.types';
import { formatBirthdayToNow } from '@/utils/date';

interface IBirthdayListItemProps {
  friend: TProfile;
}

export const BirthdayListItem: React.FC<IBirthdayListItemProps> = ({ friend }) => {
  const birthDate = new Date(friend.date_of_birth);
  const distance = formatBirthdayToNow(birthDate.toDateString());

  return (
    <Link href={`/profile/${friend.id}`} className={styles.wrapper}>
      <div className={styles.pair}>
        <Avatar src={friend.avatar_url} size={36} />
        <Paragraph size='sm'>{friend.full_name}</Paragraph>
      </div>
      <Paragraph size='sm' color='muted'>
        {birthDate.toLocaleDateString()} ({distance})
      </Paragraph>
    </Link>
  );
};
