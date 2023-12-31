'use client';

import React, { useEffect, useState } from 'react';

import { ProfileAvatar } from './avatar/avatar';
import { ProfileForm } from './profile-form/profile-form';
import styles from './profile.module.scss';

import { BirthDate } from '@/components/ui/birth-date/birth-date';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';

import { Skeleton, Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';

interface IProfileProps {
  user: User;
}

export const Profile: React.FC<IProfileProps> = ({ user }) => {
  const [profile, setProfile] = useState<TProfile>({} as TProfile);

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
            <Text size='lg'>{profile.full_name}</Text>
            {profile.user_name && (
              <Text c={'dimmed'} size='sm'>
                @{profile.user_name}
              </Text>
            )}
            <BirthDate birthDate={profile.date_of_birth} style={{ marginTop: 12 }} />
          </>
        )}
      </div>
      <ProfileForm supabase={supabase} profile={profile} setProfile={setProfile} />
    </div>
  );
};
