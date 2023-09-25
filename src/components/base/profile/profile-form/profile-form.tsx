'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from './profile-form.module.scss';

import { profileSchema } from '@/constants/validation';
import { IProfileForm } from '@/types/form.types';
import { IProfile } from '@/types/user.types';
import { toNormalCase } from '@/utils/text';

import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput, Button, Input } from '@mantine/core';
import { DateInput, DateValue } from '@mantine/dates';
import { SupabaseClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

interface IProfileFormProps {
  supabase: SupabaseClient;
  profile: IProfile;
  setProfile: (profile: IProfile) => void;
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
    setIsLoading(true);

    const fieldData = {
      ...(data.name && { user_name: toNormalCase(data.name) }),
      ...(data.birthDate && { date_of_birth: data.birthDate.toLocaleDateString() }),
    };

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

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        placeholder='Name'
        {...(register && register('name'))}
        error={errors['name']?.message}
      />
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
    </form>
  );
};
