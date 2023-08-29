import React, { useState } from 'react';

import styles from './profile-form.module.scss';

import { profileSchema } from '@/constants/validation';
import { IProfileForm } from '@/types/form.types';
import { IProfile } from '@/types/user.types';

import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput, Button } from '@mantine/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';

interface IProfileFormProps {
  supabase: SupabaseClient;
  profile: IProfile;
  setProfile: (profile: IProfile) => void;
}

export const ProfileForm: React.FC<IProfileFormProps> = ({ supabase, profile, setProfile }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileForm>({ mode: 'onBlur', resolver: yupResolver(profileSchema) });

  const onSubmit = async (data: IProfileForm) => {
    setIsLoading(true);
    const { userName } = data;
    try {
      await supabase.from('profiles').update({ user_name: userName }).eq('id', profile.id);

      setProfile({ ...profile, user_name: userName });
      setIsLoading(false);
    } catch {}
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        placeholder='Name'
        {...(register && register('userName', { required: true }))}
        error={errors['userName']?.message}
      />
      <Button loading={isLoading} type='submit'>
        Save
      </Button>
    </form>
  );
};
