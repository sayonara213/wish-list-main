import React from 'react';

import { SubNavLinks } from './sub-nav-links/sub-nav-links';
import styles from './sub-nav.module.scss';

import { Paragraph } from '@/components/ui/text/text';
import { TProfile } from '@/types/database.types';

interface ISubNavProps {
  profile: TProfile;
}

export const SubNav: React.FC<ISubNavProps> = ({ profile }) => {
  return (
    <div className={styles.wrapper}>
      <Paragraph weight='medium' size='md' className={styles.welcome}>
        Welcome back, {profile.user_name} ✨
      </Paragraph>
      <SubNavLinks profile={profile} />
    </div>
  );
};
