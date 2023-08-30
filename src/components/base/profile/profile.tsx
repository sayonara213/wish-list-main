'use client';

import React, { useEffect, useState } from 'react';

import { Avatar } from './avatar/avatar';
import { ProfileForm } from './profile-form/profile-form';
import styles from './profile.module.scss';

import { Paragraph } from '@/components/ui/text/text';
import { Database } from '@/lib/schema';
import { IProfile } from '@/types/user.types';

import { Skeleton } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';

interface IProfileProps {
  user: User;
}

export const Profile: React.FC<IProfileProps> = ({ user }) => {
  const [profile, setProfile] = useState<IProfile>({} as IProfile);

  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClientComponentClient<Database>();

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
        <Avatar supabase={supabase} profile={profile} setProfile={setProfile} />
      </div>
      <div className={styles.usernameWrapper}>
        {isLoading ? (
          <Skeleton width={'50%'} height={20} radius={4} />
        ) : (
          <Paragraph>{profile.user_name}</Paragraph>
        )}
      </div>
      <ProfileForm supabase={supabase} profile={profile} setProfile={setProfile} />
    </div>
  );
};
