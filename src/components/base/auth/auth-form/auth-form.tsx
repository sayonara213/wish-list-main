'use client';

import React, { useState } from 'react';

import styles from '../auth.module.scss';

import { authSchema } from '@/constants/validation';
import { IAuthForm } from '@/types/form.types';

import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordInput, Button, TextInput, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { Database } from '@/lib/schema';
import { notify } from '@/utils/toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useTranslations } from 'next-intl';

interface IAuthFormProps {
  isSignIn?: boolean;
}

export const AuthForm: React.FC<IAuthFormProps> = ({ isSignIn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const t = useTranslations('AuthPage');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(authSchema),
    mode: 'onBlur',
  });

  const handleAuth = async (values: IAuthForm) => {
    const { error } = isSignIn
      ? await supabase.auth.signInWithPassword(values)
      : await supabase.auth.signUp(values);

    if (error) {
      notify('error', error.message);
      return;
    }
  };

  return (
    <form className={styles.box} onSubmit={handleSubmit(handleAuth)}>
      <TextInput
        placeholder={t('fields.email.label')}
        {...(register && register('email', { required: true }))}
        error={errors['email'] && t('fields.email.error')}
      />
      <PasswordInput
        placeholder={t('fields.password.label')}
        {...(register && register('password', { required: true }))}
        error={errors['password'] && t('fields.password.error')}
      />
      <Button variant='light' fullWidth type='submit' loading={isLoading} disabled={isLoading}>
        {t(`${isSignIn ? 'signIn' : 'signUp'}.title`)}
      </Button>
    </form>
  );
};
