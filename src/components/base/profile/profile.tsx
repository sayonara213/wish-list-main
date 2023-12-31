'use client';

import React, { useEffect, useState } from 'react';

import { ProfileAvatar } from './avatar/avatar';
import { ProfileForm } from './profile-form/profile-form';
import styles from './profile.module.scss';

import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';

import { Skeleton } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';

interface IProfileProps {
  user: User;
}

export const Profile: React.FC<IProfileProps> = ({ user }) => {
  const [profile, setProfile] = useState<TProfile>({} as TProfile);

  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClientComponentClient<Database>();

  const formattedDate = profile.date_of_birth
    ? new Date(profile.date_of_birth!).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Set your birthday';

  const fetchProfile = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id);

    if (error) {
      console.error('ERROR:', error);
    }

    if (!data) return;

    setProfile(data[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <ProfileAvatar supabase={supabase} profile={profile} setProfile={setProfile} />
      </div>
      <div className={styles.usernameWrapper}>
        {isLoading ? (
          <>
            <Skeleton width={'60%'} height={20} radius={4} />
            <Skeleton width={'30%'} height={20} radius={4} />
          </>
        ) : (
          <>
            <Paragraph>{profile.user_name}</Paragraph>
            <div className={styles.bday}>
              <Icon color='muted' name='cake' size={18} />
              <Paragraph color='muted'>{formattedDate}</Paragraph>
            </div>
          </>
        )}
      </div>
      <ProfileForm supabase={supabase} profile={profile} setProfile={setProfile} />
    </div>
  );
};
