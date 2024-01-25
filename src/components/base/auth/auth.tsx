'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from './auth.module.scss';
import { AuthForm } from './auth-form/auth-form';

import { Logo } from '@/components/ui/icon/logo';
import { Database } from '@/lib/schema';
import { IAuthForm } from '@/types/form.types';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Text } from '@mantine/core';
import { AuthProviders } from './auth-providers/auth-providers';
import { Provider } from '@supabase/supabase-js';
import { notify } from '@/utils/toast';

const Auth: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const switchAuth = () => {
    setIsSignIn((prev) => !prev);
  };

  const handleAuth = async (values: IAuthForm) => {
    setIsLoading(true);
    const { error } = isSignIn
      ? await supabase.auth.signInWithPassword(values)
      : await supabase.auth.signUp(values);

    setIsLoading(false);

    if (error) {
      notify('error', error.message);
      setIsLoading(false);
      return;
    }

    router.refresh();
  };

  const handleOAuth = async (provider: Provider) => {
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      notify('error', error.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Logo />
        <Text size='50px' fw='bold'>
          Wishy
        </Text>
      </div>
      <div className={styles.container}>
        <Text size='lg'>{isSignIn ? 'Sign In' : 'Sign Up'}</Text>
        <AuthForm isSignIn={isSignIn} handleProceed={handleAuth} isLoading={isLoading} />
        <AuthProviders handleOAuth={handleOAuth} />
        <Text
          size='sm'
          c={'dimmed'}
          ta={'right'}
          td={'underline'}
          style={{ cursor: 'pointer' }}
          onClick={switchAuth}
        >
          {isSignIn ? 'New to Wishy? Join Now' : 'Already have an account? Sign in here'}
        </Text>
      </div>
    </div>
  );
};

export default Auth;
