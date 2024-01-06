import React, { useEffect, useState } from 'react';

import styles from './item-form.module.scss';

import { useWishlist } from '@/components/base/provider/wishlist-provider';
import { wishlistSchema } from '@/constants/validation';
import { Database } from '@/lib/schema';
import { TWishlistItem } from '@/types/database.types';
import { IWishlistItemForm } from '@/types/wishlist';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, NumberInput, TextInput, Textarea } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';

interface IWishlistItemFormProps {
  wishlistId?: number;
  closeModal: () => void;
  isEdit?: boolean;
  item?: TWishlistItem;
  optimisticAction?: (item: TWishlistItem) => void;
}

export const WishlistItemForm: React.FC<IWishlistItemFormProps> = ({
  wishlistId,
  closeModal,
  isEdit,
  item,
  optimisticAction,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IWishlistItemForm>({
    defaultValues: isEdit
      ? {
          name: item?.name,
          price: item?.price,
          link: item?.link || undefined,
          description: item?.description || undefined,
        }
      : undefined,
    resolver: yupResolver<IWishlistItemForm>(wishlistSchema),
    mode: 'onBlur',
  });

  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClientComponentClient<Database>();

  const { items } = useWishlist();

  const onSubmit = async (data: IWishlistItemForm) => {
    try {
      setIsLoading(true);
      isEdit && item
        ? await supabase
            .from('items')
            .update({ ...data })
            .eq('id', item.id)
        : await supabase
            .from('items')
            .insert({ ...data, wishlist_id: wishlistId, priority: items.length });
      setIsLoading(false);
      optimisticAction &&
        optimisticAction({
          ...item!,
          name: data.name,
          price: data.price,
          link: data.link || null,
          description: data.description || null,
        });
      closeModal();
    } catch {}
  };

  const handlePriceChange = (value: number | string) => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    setValue('price', isNaN(numericValue) ? 0 : numericValue);
  };

  const fetchImageUrl = async (link: string) => {
    const response = await fetch('/api/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ link }),
    });
    const data = await response.json();
    console.log(data);
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
            value={getValues('price')}
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
      <Button onClick={() => fetchImageUrl(getValues('link'))}>Get image</Button>
      <Input.Wrapper
        id='item-description'
        label='Description'
        description='Here you can add some description of the item, let others know why you want it'
      >
        <Textarea className={styles.input} {...(register && register('description'))} />
      </Input.Wrapper>
      <Button type='submit' loading={isLoading}>
        Save
      </Button>
    </form>
  );
};
