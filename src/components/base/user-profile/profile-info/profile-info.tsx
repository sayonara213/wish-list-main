'use server';

import React from 'react';

import styles from './profile-info.module.scss';

import { Avatar } from '@/components/ui/avatar/avatar';
import { BirthDate } from '@/components/ui/birth-date/birth-date';
import { Paragraph } from '@/components/ui/text/text';
import { TProfile } from '@/types/database.types';

interface IProfileInfoProps {
  profile: TProfile;
}

const ProfileInfo: React.FC<IProfileInfoProps> = ({ profile }) => {
  return (
    <div className={styles.wrapper}>
      <Avatar size={128} src={profile.avatar_url} className={styles.avatar} />
      <div>
        <Paragraph size={'md'}>{profile.full_name}</Paragraph>
        {profile.user_name && (
          <Paragraph size={'sm'} color='muted'>
            @{profile.user_name}
          </Paragraph>
        )}
      </div>
      <BirthDate birthDate={profile.date_of_birth} />
      {profile.bio && <Paragraph className={styles.bio}>{profile.bio}</Paragraph>}
    </div>
  );
};

export default ProfileInfo;
