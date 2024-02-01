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
import { useTranslations } from 'next-intl';

interface IProfileFormProps {
  supabase: SupabaseClient;
  profile: TProfile;
  setProfile: (profile: TProfile) => void;
}

export const ProfileForm: React.FC<IProfileFormProps> = ({ supabase, profile, setProfile }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations('ProfilePage.fields');

  const initialState: IProfileForm = {
    userName: profile.user_name || '',
    fullName: profile.full_name || '',
    bio: profile.bio || '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IProfileForm>({
    defaultValues: initialState,
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
      <Input.Wrapper id='full-name' label={t('name.label')} description={t('name.description')}>
        <TextInput
          placeholder={t('name.label')}
          {...(register && register('fullName'))}
          error={errors['fullName'] && t('name.error')}
          style={{ marginTop: 6 }}
        />
      </Input.Wrapper>
      <Input.Wrapper
        id='username'
        label={t('userName.label')}
        description={t('userName.description')}
      >
        <TextInput
          placeholder={t('userName.label')}
          {...(register && register('userName'))}
          error={errors['userName'] && t('userName.error')}
          style={{ marginTop: 6 }}
        />
      </Input.Wrapper>
      <Input.Wrapper id='bio' label={t('bio.label')} description={t('bio.description')}>
        <Textarea
          placeholder={t('bio.label')}
          {...(register && register('bio'))}
          error={errors['bio'] && t('bio.error')}
          {...(profile.bio && { defaultValue: profile.bio })}
          style={{ marginTop: 6 }}
        />
      </Input.Wrapper>
      <Button loading={isLoading} type='submit'>
        {t('buttons.submit')}
      </Button>
      <Button variant='light' color='red' onClick={handleLogOut} className={styles.logout}>
        {t('buttons.logOut')}
      </Button>
    </form>
  );
};
