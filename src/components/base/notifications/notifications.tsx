'use client';

import React, { useState } from 'react';

import { NotificationsItem } from './notifications-item/notifications-item';
import styles from './notifications.module.scss';

import { TFriendship, TProfile } from '@/types/database.types';

import { Text } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';

interface IFiriendshipProfile extends TFriendship {
  profiles: TProfile | null;
}

interface INotificationsProps {
  friendships: IFiriendshipProfile[] | null;
}

export const Notifications: React.FC<INotificationsProps> = ({ friendships }) => {
  const [notifications, setNotifications] = useState<IFiriendshipProfile[] | null>(friendships);

  const hideNotification = (id: number) => {
    const updatedNotifications = notifications?.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications || null);
  };

  const available = notifications && notifications.length > 0;

  return available ? (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <IconBell name='notifications' color='var(--text-color)' />
        <Text size='lg'>Notifications</Text>
      </div>
      <div className={styles.list}>
        {notifications.map((notification) => (
          <NotificationsItem
            notification={notification}
            key={notification.id}
            hideNotification={hideNotification}
          />
        ))}
      </div>
    </div>
  ) : (
    <div>You will see your notifications here</div>
  );
};
