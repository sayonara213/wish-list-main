'use client';

import React, { useState } from 'react';

import { NotificationsItem } from './notifications-item/notifications-item';
import styles from './notifications.module.scss';

import { Icon } from '@/components/ui/icon/icon';
import { TFriendship, TProfile } from '@/types/database.types';

import { Text } from '@mantine/core';

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
        <Icon name='notifications' />
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
    <div>no notifications</div>
  );
};
