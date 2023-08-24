'use client';

import React from 'react';

import styles from '../auth.module.scss';

import { Paragraph } from '@/components/ui/text/text';
import { authSchema } from '@/constants/validation';
import { IAuthForm } from '@/types/form.types';

import { yupResolver } from '@hookform/resolvers/yup';
import { Input, PasswordInput, Button } from '@mantine/core';
import { useForm } from 'react-hook-form';

interface IAuthFormProps {
  handleSignIn: (values: IAuthForm) => Promise<void>;
  next?: () => void;
  isLoading?: boolean;
}

export const SignIn: React.FC<IAuthFormProps> = ({ next, handleSignIn, isLoading = false }) => {
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
    <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
      <div className={styles.box}>
        <Paragraph size='bg' style={{ width: '100%', textAlign: 'center' }} uppercase>
          Sign in
        </Paragraph>
        <Input
          placeholder='email'
          {...(register && register('email', { required: true }))}
          error={errors['email'] && 'Email is required'}
        />
        <PasswordInput
          placeholder='password'
          {...(register && register('password', { required: true }))}
          error={errors['password'] && 'Password is required'}
        />
        <Button variant='light' fullWidth type='submit' loading={isLoading}>
          {isLoading ? 'Loading...' : 'Sign in'}
        </Button>
        <Button variant='outline' fullWidth onClick={next}>
          Go to sign up
        </Button>
        <Paragraph size='sm' style={{ width: '100%', textAlign: 'center' }} color='muted'>
          Or try swiping this card {':)'}
        </Paragraph>
      </div>
    </form>
  );
};
