'use client';

import React from 'react';

import { ThemeSwitch } from '../../navbar/theme-switch/theme-switch';
import styles from '../auth.module.scss';

import { Paragraph } from '@/components/ui/text/text';
import { authSchema } from '@/constants/validation';
import { IAuthForm } from '@/types/form.types';

import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordInput, Button, TextInput } from '@mantine/core';
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
        <Paragraph size='bg' className={styles.title} uppercase>
          Join us
        </Paragraph>
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
        <Button variant='light' fullWidth type='submit' loading={isLoading}>
          {isLoading ? 'Loading...' : 'Sign up'}
        </Button>
        <Button variant='outline' fullWidth onClick={next}>
          Go to login
        </Button>
        <div className={styles.additional}>
          <Paragraph size='sm' style={{ width: '100%', textAlign: 'center' }} color='muted'>
            Or try swiping this card {':)'}
          </Paragraph>
          <ThemeSwitch isExpanded />
        </div>
      </div>
    </form>
  );
};
