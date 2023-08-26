import React, { useState } from 'react';

import styles from './add-link-form.module.scss';

import { useAuth } from '@/components/base/provider/auth-provider';
import { Paragraph } from '@/components/ui/text/text';
import { addLinkSchema } from '@/constants/validation';
import { Database } from '@/lib/schema';
import { IAddLinkForm } from '@/types/form.types';
import { IShopLink } from '@/types/shops-link';

import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';

interface IAddLinkFormProps {
  addLink: (link: IShopLink) => void;
  closePopover: () => void;
}

export const AddLinkForm: React.FC<IAddLinkFormProps> = ({ addLink, closePopover }) => {
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClientComponentClient<Database>();

  const user = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddLinkForm>({
    mode: 'onBlur',
    resolver: yupResolver(addLinkSchema),
  });

  const onSubmit = async (data: IAddLinkForm) => {
    const { linkName, linkUrl } = data;
    try {
      setIsLoading(true);
      await supabase
        .from('shops')
        .insert([{ user_id: user?.id, link_name: linkName, link_url: linkUrl }]);

      addLink({
        id: Date.now(),
        link_name: linkName,
        link_url: linkUrl,
      });
      setIsLoading(false);
      closePopover();
    } catch {}
  };

  return (
    <div className={styles.wrapper}>
      <Paragraph size='sm'>Add link</Paragraph>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          size='sm'
          placeholder='Rozetka'
          {...(register && register('linkName', { required: true }))}
          error={errors['linkName']?.message}
        />
        <Input
          size='sm'
          placeholder='https://rozetka.com.ua/'
          {...(register && register('linkUrl', { required: true }))}
          error={errors['linkUrl']?.message}
        />
        <Button size='sm' fullWidth type='submit' loading={isLoading}>
          Add
        </Button>
      </form>
    </div>
  );
};
