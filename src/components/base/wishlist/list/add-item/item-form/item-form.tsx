import React, { useEffect, useState } from 'react';

import styles from './item-form.module.scss';
import { AddItemImage } from './item-image/item-image';

import { useAuth } from '@/components/base/provider/auth-provider';
import { useWishlist } from '@/components/base/provider/wishlist-provider';
import { linkUrl, wishlistSchema } from '@/constants/validation';
import { Database } from '@/lib/schema';
import { TWishlistItem } from '@/types/database.types';
import { IWishlistItemForm } from '@/types/wishlist';
import { notify } from '@/utils/toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, NumberInput, TextInput, Textarea } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';

interface IWishlistItemFormProps {
  wishlistId: number;
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
  const [isLoading, setIsLoading] = useState(false);
  const [linkToParse, setLinkToParse] = useState<string | null>(null);

  const [OgImage, setOgImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const user = useAuth();

  const { items } = useWishlist();

  const supabase = createClientComponentClient<Database>();

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
          price: item?.price || undefined,
          link: item?.link || undefined,
          description: item?.description || undefined,
          imageUrl: item?.image_url || undefined,
        }
      : undefined,
    resolver: yupResolver<IWishlistItemForm>(wishlistSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: IWishlistItemForm) => {
    setIsLoading(true);

    if (image || OgImage) {
      await handleImageUpload();
    }

    const reqData = {
      name: data.name,
      price: data.price || null,
      link: data.link || null,
      description: data.description || null,
      image_url: data.imageUrl || null,
    };

    const { error } =
      isEdit && item
        ? await supabase
            .from('items')
            .update({ ...reqData })
            .eq('id', item.id)
        : await supabase.from('items').insert({
            ...reqData,
            wishlist_id: wishlistId,
            priority: items.length,
          });

    setIsLoading(false);

    if (error) {
      notify('error', 'Error saving item');
      return;
    }

    optimisticAction &&
      optimisticAction({
        ...item!,
        name: data.name,
        price: data.price || null,
        link: data.link || null,
        description: data.description || null,
        image_url: data.imageUrl || null,
      });
    closeModal();
  };

  const handlePriceChange = (value: number | string) => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    setValue('price', isNaN(numericValue) ? 0 : numericValue);
  };

  const handleLinkToParse = async (link: string, event: React.ChangeEvent<HTMLInputElement>) => {
    register('link').onBlur(event);

    const isValid = await linkUrl.isValid(link);
    isValid && setLinkToParse(link);
  };

  const handleImageUpload = async () => {
    setIsLoading(true);

    const formData = new FormData();

    formData.append('userId', user?.id);
    formData.append('wishlistId', wishlistId.toString());
    image && formData.append('file', image);
    OgImage && formData.append('url', OgImage);

    const res = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });

    const { imageUrl } = await res.json();

    setIsLoading(false);
    setValue('imageUrl', imageUrl);
  };

  useEffect(() => {
    setOgImage(null);
  }, [image]);

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.flex}>
        <TextInput
          label='Name'
          description='Name of the item'
          placeholder='Name'
          {...(register && register('name'))}
          error={errors['name']?.message}
          className={styles.input}
        />
        <NumberInput
          onChange={handlePriceChange}
          error={errors['price']?.message}
          value={getValues('price')}
          prefix='$'
          min={0}
          max={100000}
          decimalScale={2}
          thousandSeparator=','
          className={styles.input}
          label='Price'
          description='Price of the item in USD'
        />
      </div>
      <TextInput
        className={styles.input}
        {...(register && register('link'))}
        onBlur={(event) => handleLinkToParse(event.target.value, event)}
        error={errors['link']?.message}
        label='Link'
        description='Set link where someone can buy that item'
      />
      <AddItemImage
        link={linkToParse}
        setFile={setImage}
        setImageToUpload={setOgImage}
        initialImage={getValues('imageUrl')}
        setDisabled={setIsLoading}
      />
      <Textarea
        className={styles.input}
        {...(register && register('description'))}
        label='Description'
        description='Here you can add some description of the item, let others know why you want it'
      />
      <Button type='submit' loading={isLoading} disabled={isLoading}>
        Save
      </Button>
    </form>
  );
};
