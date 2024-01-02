import React from 'react';

import { SubNavLinks } from './sub-nav-links/sub-nav-links';
import styles from './sub-nav.module.scss';

import { Paragraph } from '@/components/ui/text/text';
import { TProfile } from '@/types/database.types';
import { toNormalCase } from '@/utils/text';

interface ISubNavProps {
  profile: TProfile;
}

export const SubNav: React.FC<ISubNavProps> = ({ profile }) => {
  return (
    <div className={styles.wrapper}>
      <Paragraph weight='medium' size='md' className={styles.welcome}>
        Welcome back, {toNormalCase(profile.full_name)} ✨
      </Paragraph>
      <SubNavLinks profile={profile} />
    </div>
  );
};
