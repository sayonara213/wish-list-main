'use client';

import React from 'react';

import styles from '../auth.module.scss';

import { authSchema } from '@/constants/validation';
import { IAuthForm } from '@/types/form.types';

import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordInput, Button, TextInput, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';

interface IAuthFormProps {
  handleProceed: (values: IAuthForm) => Promise<void>;
  isSignIn?: boolean;
  isLoading?: boolean;
}

export const AuthForm: React.FC<IAuthFormProps> = ({
  handleProceed,
  isLoading = false,
  isSignIn,
}) => {
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

  return (
    <form className={styles.box} onSubmit={handleSubmit(handleProceed)}>
      <TextInput
        placeholder='email'
        {...(register && register('email', { required: true }))}
        error={errors['email']?.message}
      />
      <PasswordInput
        placeholder='password'
        {...(register && register('password', { required: true }))}
        error={errors['password']?.message}
      />
      <Button variant='light' fullWidth type='submit' loading={isLoading} disabled={isLoading}>
        {isLoading ? 'Loading...' : isSignIn ? 'Sign In' : 'Sign Up'}
      </Button>
    </form>
  );
};
