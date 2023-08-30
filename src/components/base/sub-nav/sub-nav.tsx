import React from 'react';

import styles from './sub-nav.module.scss';

import { Paragraph } from '@/components/ui/text/text';
import { IProfile } from '@/types/user.types';

interface ISubNavProps {
  profile: IProfile;
}

export const SubNav: React.FC<ISubNavProps> = ({ profile }) => {
  return (
    <div className={styles.wrapper}>
      <Paragraph weight='medium' size='md'>
        Welcome back, {profile.user_name} ✨
      </Paragraph>
    </div>
  );
};
