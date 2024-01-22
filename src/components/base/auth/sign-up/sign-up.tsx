'use client';

import React from 'react';

import styles from '../auth.module.scss';

import { authSchema } from '@/constants/validation';
import { IAuthForm } from '@/types/form.types';

import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordInput, Button, TextInput, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';

interface IAuthFormProps {
  handleSignUp: (values: IAuthForm) => Promise<void>;
  next?: () => void;
  isLoading?: boolean;
}

export const SignUp: React.FC<IAuthFormProps> = ({ next, handleSignUp, isLoading = false }) => {
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
    <form className={styles.form} onSubmit={handleSubmit(handleSignUp)}>
      <div className={styles.box}>
        <Text size='xl' className={styles.title} tt={'uppercase'}>
          Join us
        </Text>
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
          {isLoading ? 'Loading...' : 'Sign up'}
        </Button>
        <Button variant='outline' fullWidth onClick={next}>
          Go to login
        </Button>
        <div className={styles.additional}>
          <Text size='sm' c='dimmed'>
            Or try swiping this card {':)'}
          </Text>
        </div>
      </div>
    </form>
  );
};
