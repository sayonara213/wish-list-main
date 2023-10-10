'use client';

import React from 'react';

import Link from 'next/link';

import styles from './sub-nav-links.module.scss';

import { BirthDate } from '@/components/ui/birth-date/birth-date';
import { IProfile } from '@/types/user.types';

import { Avatar } from '@mantine/core';

interface ISubNavLinksProps {
  profile: IProfile;
}

export const SubNavLinks: React.FC<ISubNavLinksProps> = ({ profile }) => {
  return (
    <div className={styles.wrapper}>
      <Link href={'/app/profile'}>
        <BirthDate birthDate={profile.date_of_birth} />
      </Link>
      <Link href={'/app/profile'}>
        <Avatar src={profile.avatar_url} radius='xl' />
      </Link>
    </div>
  );
};
