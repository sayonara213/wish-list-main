'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Database } from '@lib/schema';
import { Button, Input, PasswordInput } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import styles from './auth.module.scss';
import { Paragraph } from '../../components/ui/text/text';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <Paragraph size='bg' style={{ width: '100%', textAlign: 'center' }}>
          Sign up
        </Paragraph>
        <Input placeholder='email' onChange={(e: any) => setEmail(e.target.value)} />
        <PasswordInput placeholder='password' onChange={(e: any) => setPassword(e.target.value)} />
        <Button variant='light' fullWidth onClick={handleSignIn}>
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Auth;
