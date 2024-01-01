import React from 'react';

import styles from './birth-date.module.scss';

import { Icon } from '../icon/icon';
import { Paragraph } from '../text/text';

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
      <Icon name='cake' color='muted' />
      <Paragraph color='muted' weight='medium'>
        {formattedDate}
      </Paragraph>
    </div>
  );
};
