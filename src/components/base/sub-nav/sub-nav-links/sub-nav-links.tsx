'use client';

import React from 'react';

import Link from 'next/link';

import styles from './sub-nav-links.module.scss';

import { Paragraph } from '@/components/ui/text/text';
import { IProfile } from '@/types/user.types';

import { Avatar } from '@mantine/core';

interface ISubNavLinksProps {
  profile: IProfile;
}

export const SubNavLinks: React.FC<ISubNavLinksProps> = ({ profile }) => {
  return (
    <div className={styles.wrapper}>
      <Link href={'/app/profile'}>
        <Paragraph>{profile.date_of_birth}</Paragraph>
      </Link>
      <Link href={'/app/profile'}>
        <Avatar src={profile.avatar_url} radius='xl' />
      </Link>
    </div>
  );
};
