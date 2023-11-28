import React from 'react';

import styles from './item-form.module.scss';

import { wishlistSchema } from '@/constants/validation';
import { Database } from '@/lib/schema';
import { IWishlistItemForm } from '@/types/wishlist';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, NumberInput, TextInput, Textarea } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';

interface IWishlistItemFormProps {
  wishlistId: number;
  closeModal: () => void;
}

export const WishlistItemForm: React.FC<IWishlistItemFormProps> = ({ wishlistId, closeModal }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IWishlistItemForm>({
    resolver: yupResolver<IWishlistItemForm>(wishlistSchema),
    mode: 'onBlur',
  });

  const supabase = createClientComponentClient<Database>();

  const onSubmit = async (data: IWishlistItemForm) => {
    try {
      await supabase.from('items').insert([{ ...data, wishlist_id: wishlistId }]);
      closeModal();
    } catch {}
  };

  const handlePriceChange = (value: number | string) => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    setValue('price', isNaN(numericValue) ? 0 : numericValue);
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.flex}>
        <Input.Wrapper id='item-name' label='Name' description='Name of the item'>
          <TextInput
            placeholder='Name'
            {...(register && register('name'))}
            error={errors['name']?.message}
            className={styles.input}
          />
        </Input.Wrapper>
        <Input.Wrapper id='item-price' label='Price' description='Price of the item in USD'>
          <NumberInput
            onChange={handlePriceChange}
            onBlur={register('price').onBlur}
            ref={register('price').ref}
            error={errors['price']?.message}
            prefix='$'
            min={0}
            max={100000}
            decimalScale={2}
            thousandSeparator=','
            className={styles.input}
          />
        </Input.Wrapper>
      </div>
      <Input.Wrapper
        id='item-link'
        label='Link'
        description='Set link where someone can buy that item'
      >
        <TextInput
          className={styles.input}
          {...(register && register('link'))}
          error={errors['link']?.message}
        />
      </Input.Wrapper>
      <Input.Wrapper
        id='item-description'
        label='Description'
        description='Here you can add some description of the item, let others know why you want it'
      >
        <Textarea className={styles.input} {...(register && register('description'))} />
      </Input.Wrapper>
      <Button type='submit'>Save</Button>
    </form>
  );
};
