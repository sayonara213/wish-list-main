import React from 'react';

import styles from './last-seen.module.scss';

import { Paragraph } from '@/components/ui/text/text';
import { formatDateToNow } from '@/utils/date';
import { classes } from '@/utils/styles';

import { Tooltip } from '@mantine/core';

interface IToolbarLastSeenProps {
  isOnline?: boolean;
  lastSeen?: string;
}

export const ToolbarLastSeen: React.FC<IToolbarLastSeenProps> = ({ isOnline, lastSeen }) => {
  if (!lastSeen) {
    return null;
  }

  const date = new Date(lastSeen).toISOString();
  const formattedDate = formatDateToNow(date);

  return (
    <div className={styles.wrapper}>
      <Tooltip label={isOnline ? 'User is currently viewing this page' : 'User is offline'}>
        <div className={classes(styles.indicator, isOnline && styles.online)} />
      </Tooltip>
      <Paragraph size='sm' color='muted'>
        {isOnline ? 'Online' : `Last seen: ${formattedDate}`}
      </Paragraph>
    </div>
  );
};
