import React from 'react';

import styles from './notifications-item.module.scss';

import { Avatar } from '@/components/ui/avatar/avatar';
import { Database } from '@/lib/schema';
import { TFriendship, TProfile } from '@/types/database.types';
import { formatDateToNow } from '@/utils/date';
import { toNormalCase } from '@/utils/text';
import { notify } from '@/utils/toast';

import { Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { IconCheck, IconX } from '@tabler/icons-react';

interface IFiriendshipProfile extends TFriendship {
  profiles: TProfile | null;
}

interface INotificationsItemProps {
  notification: IFiriendshipProfile;
  hideNotification: (id: number) => void;
}

export const NotificationsItem: React.FC<INotificationsItemProps> = ({
  notification,
  hideNotification,
}) => {
  const supabase = createClientComponentClient<Database>();

  const handleAction = async (status: TFriendship['status']) => {
    const { error } = await supabase
      .from('friendships')
      .update({ status: status })
      .eq('id', notification.id);

    if (error) {
      notify('error', 'Error accepting request');
      return;
    }

    notify('success', 'Friend request accepted');
    hideNotification(notification.id);
  };

  if (!notification.profiles) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Avatar src={notification.profiles?.avatar_url} size={40} />
        <div className={styles.col}>
          <Text size='md'>You have a new friend request</Text>
          <Text size='sm' c='dimmed'>
            {toNormalCase(notification.profiles.full_name)} wants to be your friend.{' '}
            {formatDateToNow(notification.created_at)}
          </Text>
        </div>
      </div>
      <div className={styles.right}>
        <IconCheck color='var(--text-color)' onClick={() => handleAction('accepted')} />
        <IconX color='var(--text-color)' onClick={() => handleAction('declined')} />
      </div>
    </div>
  );
};
