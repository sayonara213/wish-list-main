'use client';

import React from 'react';

import Link from 'next/link';

import styles from './sub-nav-links.module.scss';

import { BirthDate } from '@/components/ui/birth-date/birth-date';
import { TProfile } from '@/types/database.types';

import { Avatar } from '@mantine/core';

interface ISubNavLinksProps {
  profile: TProfile;
}

export const SubNavLinks: React.FC<ISubNavLinksProps> = ({ profile }) => {
  return (
    <div className={styles.wrapper}>
      <Link href={'/profile'}>
        <BirthDate birthDate={profile.date_of_birth} />
      </Link>
      <Link href={'/profile'}>
        <Avatar src={profile.avatar_url} radius='xl' />
      </Link>
    </div>
  );
};
