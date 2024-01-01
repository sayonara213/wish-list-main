import React from 'react';

import styles from './notifications-item.module.scss';

import { Avatar } from '@/components/ui/avatar/avatar';
import { Database } from '@/lib/schema';
import { TFriendship, TProfile } from '@/types/database.types';

import { Button, Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface IFiriendshipProfile extends TFriendship {
  profiles: TProfile | null;
}

interface INotificationsItemProps {
  notification: IFiriendshipProfile;
}

export const NotificationsItem: React.FC<INotificationsItemProps> = ({ notification }) => {
  const supabase = createClientComponentClient<Database>();

  const handleAction = async (status: TFriendship['status']) => {
    try {
      const { error } = await supabase
        .from('friendships')
        .update({ status: status })
        .eq('id', notification.id);
      if (error) {
        console.error('ERROR:', error);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  if (!notification.profiles) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Avatar src={notification.profiles?.avatar_url} size={40} />
        <div className={styles.col}>
          <Text size='md'>You have a new friend request</Text>
          <Text size='sm' c='dimmed'>
            {notification.profiles.user_name} wants to be your friend
          </Text>
        </div>
      </div>
      <div className={styles.right}>
        <Text size='sm' c='dimmed'>
          {new Date(notification.created_at).toLocaleString()}
        </Text>
        <Button onClick={() => handleAction('accepted')}>Accept</Button>
        <Button onClick={() => handleAction('declined')}>Decline</Button>
        <Button onClick={() => handleAction('blocked')}>Block</Button>
      </div>
    </div>
  );
};
