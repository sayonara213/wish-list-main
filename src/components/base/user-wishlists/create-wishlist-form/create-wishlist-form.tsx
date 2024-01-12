import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from './create-wishlist-form.module.scss';
import { WishlistFormFriends } from './friends/wishlist-form-friends';

import { useAuth } from '../../provider/auth-provider';

import { Avatar } from '@/components/ui/avatar/avatar';
import { Paragraph } from '@/components/ui/text/text';
import { wishlistSchema } from '@/constants/validation';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';
import { IWishlistForm } from '@/types/form.types';
import { notify } from '@/utils/toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Switch, TextInput, Textarea } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const variants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 },
};

export const CreateWishlistForm = () => {
  const supabase = createClientComponentClient<Database>();
  const [isShared, setIsShared] = useState<boolean>(false);
  const [profile, setProfile] = useState<TProfile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const user = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IWishlistForm>({
    resolver: yupResolver<IWishlistForm>(wishlistSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: IWishlistForm) => {
    setIsLoading(true);
    if (isShared) {
      if (!data.sharedWith) return;

      const { data: sharedWishlistId, error } = await supabase.rpc('create_shared_wishlist', {
        shared_title: data.title,
        user_id_one: user.id,
        user_id_two: data.sharedWith,
      });
      error
        ? notify('error', 'Error creating shared wishlist')
        : push(`/shared-wishlist/${sharedWishlistId}`);
    } else {
      const { data: wishlist, error } = await supabase
        .from('wishlists')
        .insert({
          title: data.title,
          description: data.description,
          is_private: data.isPrivate,
          owner_id: user.id,
        })
        .select()
        .single();
      error ? notify('error', 'Error creating shared wishlist') : push(`/wishlist/${wishlist.id}`);
    }
  };

  const handleIsSharedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsShared(e.target.checked);
  };

  const handleSetFriend = (friend: TProfile) => {
    setValue('sharedWith', friend.id);
    setProfile(friend);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextInput
        {...register('title')}
        placeholder='Title'
        label='Title'
        description='Just the name of new wishlist'
      />
      <Textarea
        {...register('description')}
        placeholder='Description...'
        label='Description'
        description='Describe to your friends what this wishlist is about'
      ></Textarea>
      <Switch label='Is shared' onChange={handleIsSharedChange} checked={isShared} />
      <div>
        <AnimatePresence>
          {isShared ? (
            profile ? (
              <motion.div
                animate={'open'}
                exit={'closed'}
                initial={'closed'}
                variants={variants}
                key='friend-profile'
              >
                <Input.Wrapper label={'Shared with:'}>
                  <div className={styles.friend}>
                    <div className={styles.section}>
                      <Avatar src={profile.avatar_url} size={32} />
                      <Paragraph>{profile.full_name}</Paragraph>
                    </div>

                    <Button onClick={() => setProfile(undefined)}>Remove</Button>
                  </div>
                </Input.Wrapper>
              </motion.div>
            ) : (
              <motion.div
                animate={'open'}
                exit={'closed'}
                initial={'closed'}
                variants={variants}
                key='wishlist-form'
              >
                <Input.Wrapper
                  label={'Select friend'}
                  description={'Choose friend to create shared wishlist with'}
                >
                  <WishlistFormFriends onSelect={handleSetFriend} />
                </Input.Wrapper>
              </motion.div>
            )
          ) : (
            <motion.div
              animate={'open'}
              exit={'closed'}
              initial={'closed'}
              variants={variants}
              key='is-private'
            >
              <Switch label='Is private' {...register('isPrivate')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Button type='submit' fullWidth loading={isLoading} disabled={isLoading}>
        Create
      </Button>
    </form>
  );
};
