'use client';

import React from 'react';

import Link from 'next/link';

import styles from './sub-nav-links.module.scss';

import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';
import { IProfile } from '@/types/user.types';

import { Avatar } from '@mantine/core';

interface ISubNavLinksProps {
  profile: IProfile;
}

export const SubNavLinks: React.FC<ISubNavLinksProps> = ({ profile }) => {
  const formattedDate = profile.date_of_birth
    ? new Date(profile.date_of_birth!).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Set your birthday';

  return (
    <div className={styles.wrapper}>
      <Link href={'/app/profile'} className={styles.birthday}>
        <Icon name='cake' color='muted' />
        <Paragraph color='muted' weight='medium'>
          {formattedDate}
        </Paragraph>
      </Link>
      <Link href={'/app/profile'}>
        <Avatar src={profile.avatar_url} radius='xl' />
      </Link>
    </div>
  );
};
