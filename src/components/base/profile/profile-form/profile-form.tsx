'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from './profile-form.module.scss';

import { profileSchema } from '@/constants/validation';
import { TProfile } from '@/types/database.types';
import { IProfileForm } from '@/types/form.types';
import { toNormalCase } from '@/utils/text';

import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput, Button, Input } from '@mantine/core';
import { DateInput, DateValue } from '@mantine/dates';
import { SupabaseClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
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
    setValue,
    formState: { errors },
  } = useForm<IProfileForm>({ resolver: yupResolver(profileSchema), mode: 'onBlur' });

  const onSubmit = async (data: IProfileForm) => {
    const fieldData = {
      ...(data.name && { user_name: toNormalCase(data.name) }),
      ...(data.birthDate && { date_of_birth: data.birthDate.toLocaleDateString() }),
    };

    if (!fieldData.user_name || !fieldData.date_of_birth) return;

    setIsLoading(true);

    try {
      await supabase.from('profiles').update(fieldData).eq('id', profile.id);

      setProfile({ ...profile, ...fieldData });

      router.refresh();
      setIsLoading(false);
    } catch {}
  };

  const handleDateChange = (date: DateValue | null) => {
    if (date) {
      setValue('birthDate', date);
    }
  };

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input.Wrapper
        id='birth-date'
        label='User name'
        description='Set your user name to let others find you'
      >
        <TextInput
          placeholder='Name'
          {...(register && register('name'))}
          error={errors['name']?.message}
          style={{ marginTop: 6 }}
        />
      </Input.Wrapper>
      <Input.Wrapper
        id='birth-date'
        label='Date of birth'
        description='Let your friends know when to buy you a gift'
      >
        <DateInput
          disabled={!!profile.date_of_birth}
          onChange={handleDateChange}
          placeholder={profile.date_of_birth || 'Date of birth'}
          style={{ marginTop: 6 }}
          maxDate={dayjs().subtract(6, 'year').toDate()}
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
