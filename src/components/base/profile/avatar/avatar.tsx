import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from './avatar.module.scss';

import { Icon } from '@/components/ui/icon/icon';
import { API_URL } from '@/constants/api';
import { IProfile } from '@/types/user.types';

import { LoadingOverlay, Skeleton } from '@mantine/core';
import { SupabaseClient } from '@supabase/supabase-js';

interface IAvatarProps {
  supabase: SupabaseClient;
  profile: IProfile;
  setProfile: (profile: IProfile) => void;
}

export const Avatar: React.FC<IAvatarProps> = ({ supabase, profile, setProfile }) => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const changeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!file) return;

    setAvatar(file);
    router.refresh();
  };

  const setDefaultAvatar = async () => {
    setIsUploading(true);
    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${API_URL.avatars}/default.png`;
    await supabase
      .from('profiles')
      .update({
        avatar_url: fileUrl,
      })
      .eq('id', profile.id);

    setProfile({ ...profile, avatar_url: fileUrl });
    setIsUploading(false);
    router.refresh();
  };

  const uploadAvatar = async () => {
    if (!avatar) return;

    setIsUploading(true);
    const fileName = `avatar${Date.now()}`;
    const uploadedUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${API_URL.avatars}/${profile.id}/${fileName}`;

    await supabase.storage.from('avatars').upload(`${profile.id}/${fileName}`, avatar, {
      cacheControl: '3600',
      upsert: true,
    });

    if (profile.avatar_url !== uploadedUrl) {
      await supabase
        .from('profiles')
        .update({
          avatar_url: uploadedUrl,
        })
        .eq('id', profile.id);
    }

    setIsUploading(false);

    setProfile({ ...profile, avatar_url: uploadedUrl });
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    uploadAvatar();
  }, [avatar]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.delete} onClick={setDefaultAvatar}>
        <Icon name='delete' size={16} />
      </div>
      <div className={styles.avatarWrapper} onClick={handleClick}>
        <LoadingOverlay visible={isUploading} overlayBlur={2} />
        <div className={styles.upload}>
          <Icon name='upload' size={24} />
        </div>
        {profile.avatar_url ? (
          <Image
            width={128}
            height={128}
            src={profile.avatar_url}
            alt='avatar'
            priority
            className={styles.avatar}
          />
        ) : (
          <Skeleton width={128} height={128} circle />
        )}
      </div>
      <input
        type='file'
        onChange={changeAvatar}
        accept='image/png,image/jpeg'
        hidden
        ref={fileInputRef}
      />
    </div>
  );
};
