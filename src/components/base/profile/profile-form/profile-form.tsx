'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from './profile-form.module.scss';

import { profileSchema } from '@/constants/validation';
import { TProfile } from '@/types/database.types';
import { IProfileForm } from '@/types/form.types';
import { toNormalCase } from '@/utils/text';
import { notify } from '@/utils/toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput, Button, Input, Textarea } from '@mantine/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';

interface IProfileFormProps {
  supabase: SupabaseClient;
  profile: TProfile;
  setProfile: (profile: TProfile) => void;
}

export const ProfileForm: React.FC<IProfileFormProps> = ({ supabase, profile, setProfile }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IProfileForm>({
    resolver: yupResolver<IProfileForm>(profileSchema),
    mode: 'onBlur',
  });

  const checkUserName = async (userName: string) => {
    const { data } = await supabase.from('profiles').select('id').eq('user_name', userName);
    return data && data.length > 0;
  };

  const onSubmit = async (data: IProfileForm) => {
    const fieldData = {
      ...(data.userName && { user_name: data.userName.toLowerCase() }),
      ...(data.fullName && { full_name: toNormalCase(data.fullName) }),
      ...(data.bio && { bio: data.bio }),
    };

    if (Object.keys(fieldData).length < 1) return;

    if (fieldData.user_name) {
      const isUserNameTaken = await checkUserName(fieldData.user_name);
      if (isUserNameTaken) {
        setError('userName', { message: 'Username is already taken' });
        return;
      }
    }

    setIsLoading(true);

    const { error } = await supabase.from('profiles').update(fieldData).eq('id', profile.id);
    setProfile({ ...profile, ...fieldData });
    router.refresh();
    setIsLoading(false);

    error && notify('error', 'Error updating profile');
  };

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input.Wrapper
        id='full-name'
        label='Full name'
        description='Set your full name to let others know who you are'
      >
        <TextInput
          placeholder='Full name'
          {...(register && register('fullName'))}
          error={errors['fullName']?.message}
          style={{ marginTop: 6 }}
        />
      </Input.Wrapper>
      <Input.Wrapper
        id='username'
        label='Username'
        description='Set your username to let others find you with ease'
      >
        <TextInput
          placeholder='Username'
          {...(register && register('userName'))}
          error={errors['userName']?.message}
          style={{ marginTop: 6 }}
        />
      </Input.Wrapper>
      <Input.Wrapper
        id='bio'
        label='Bio'
        description='Any details about you that you want to share with others'
      >
        <Textarea
          placeholder='Bio'
          {...(register && register('bio'))}
          error={errors['bio']?.message}
          {...(profile.bio && { defaultValue: profile.bio })}
          style={{ marginTop: 6 }}
        />
      </Input.Wrapper>
      <Button loading={isLoading} type='submit'>
        Save
      </Button>
      <Button variant='light' color='red' onClick={handleLogOut} className={styles.logout}>
        Log out
      </Button>
    </form>
  );
};
