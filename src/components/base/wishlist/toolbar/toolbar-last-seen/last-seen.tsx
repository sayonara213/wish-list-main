import React from 'react';

import styles from './last-seen.module.scss';

import { classes } from '@/utils/styles';

import { Tooltip } from '@mantine/core';

interface IToolbarLastSeenProps {
  isOnline?: boolean;
}

export const ToolbarLastSeen: React.FC<IToolbarLastSeenProps> = ({ isOnline }) => {
  return (
    <div className={styles.wrapper}>
      <Tooltip label={isOnline ? 'User is currently viewing this page' : 'User is offline'}>
        <div className={classes(styles.indicator, isOnline && styles.online)} />
      </Tooltip>
    </div>
  );
};
