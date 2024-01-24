import React from 'react';

import { SubNavLinks } from './sub-nav-links/sub-nav-links';
import styles from './sub-nav.module.scss';

import { TProfile } from '@/types/database.types';
import { toNormalCase } from '@/utils/text';
import { Text } from '@mantine/core';

interface ISubNavProps {
  profile: TProfile;
}

export const SubNav: React.FC<ISubNavProps> = ({ profile }) => {
  return (
    <div className={styles.wrapper}>
      <Text fw={'bold'} size='lg' className={styles.welcome}>
        Welcome back, {toNormalCase(profile.full_name)} ✨
      </Text>
      <SubNavLinks profile={profile} />
    </div>
  );
};
