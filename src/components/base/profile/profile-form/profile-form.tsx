import React from 'react';

import styles from './profile-form.module.scss';

import { IProfile } from '@/types/user.types';

import { TextInput, Button } from '@mantine/core';
import { SupabaseClient } from '@supabase/supabase-js';

interface IProfileFormProps {
  supabase: SupabaseClient;
  profile: IProfile;
  setProfile: (profile: IProfile) => void;
}

export const ProfileForm: React.FC<IProfileFormProps> = ({ supabase, profile, setProfile }) => {
  return (
    <form className={styles.form}>
      <TextInput placeholder='Name' />
      <TextInput placeholder='email' />
      <Button>Save</Button>
    </form>
  );
};
