import React from 'react';
import styles from './auth-providers.module.scss';
import { Button } from '@mantine/core';
import { CustomIcon } from '@/components/ui/icon/custom-icon';
import { Provider } from '@supabase/supabase-js';
import { AuthProvidersItem } from './auth-providers-item/auth-providers-item';

interface IAuthProvidersProps {
  handleOAuth: (provider: Provider) => void;
}

const providers: Provider[] = ['discord', 'google'];

export const AuthProviders: React.FC<IAuthProvidersProps> = ({ handleOAuth }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.divider}>
        <span>OR</span>
      </div>
      {providers.map((provider) => (
        <AuthProvidersItem
          key={provider}
          name={provider}
          onClick={handleOAuth}
          disabled={provider === 'google'}
        />
      ))}
    </div>
  );
};
