import React from 'react';

import styles from './birth-date.module.scss';

import { Text } from '@mantine/core';
import { IconCake } from '@tabler/icons-react';

interface IBirthDateProps extends React.HTMLAttributes<HTMLDivElement> {
  birthDate: string | null;
}

export const BirthDate: React.FC<IBirthDateProps> = ({ birthDate, ...props }) => {
  const formattedDate = birthDate
    ? new Date(birthDate!).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Set your birthday';

  return (
    <div className={styles.birthday} {...props}>
      <IconCake color='var(--color-text-secondary)' />
      <Text fw='bold'>{formattedDate}</Text>
    </div>
  );
};
