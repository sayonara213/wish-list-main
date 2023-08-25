'use client';

import React from 'react';

import styles from './add-wishlist.module.scss';

import { Database } from '@/lib/schema';
import { IWishlistForm } from '@/types/wishlist';

import { Button, Input } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';

const AddWishlistForm = () => {
  const supabase = createClientComponentClient<Database>();

  const { register, handleSubmit } = useForm<IWishlistForm>({
    defaultValues: { title: '', description: '' },
  });

  const onSubmit = async (data: IWishlistForm) => {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user.id;

    if (!userId) return;

    await supabase
      .from('wishlists')
      .insert([{ title: data.title, description: data.description, owner_id: userId }]);
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder='title' {...(register && register('title', { required: true }))} />
      <Input
        placeholder='description'
        {...(register && register('description', { required: false }))}
      />
      <Button type='submit'>Create!</Button>
    </form>
  );
};

export default AddWishlistForm;
