import React from 'react';

import { cookies } from 'next/headers';

import { ProfileWishlistsItem } from './profile-wishlists-item/profile-wishlists-item';
import styles from './profile-wishlists.module.scss';

import { WishlistsList } from '../../user-wishlists/user-wishlists-list/user-wishlists-list';

import { Paragraph } from '@/components/ui/text/text';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

interface ProfileWishlistsProps {
  profile: TProfile;
}

const ProfileWishlists: React.FC<ProfileWishlistsProps> = async ({ profile }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: wishlists } = await supabase
    .from('wishlists')
    .select()
    .eq('owner_id', profile.id)
    .eq('is_shared', false);

  return (
    <div className={styles.wrapper}>
      <Paragraph size='md'>{profile.full_name}&apos;s wishlists:</Paragraph>
      {wishlists && <WishlistsList wishlists={wishlists} />}
    </div>
  );
};

export default ProfileWishlists;
