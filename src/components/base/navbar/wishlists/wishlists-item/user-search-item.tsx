import React from 'react';

import Link from 'next/link';

import styles from './user-search-item.module.scss';

import { useAuth } from '@/components/base/provider/auth-provider';
import { Avatar } from '@/components/ui/avatar/avatar';
import { CustomIcon } from '@/components/ui/icon/custom-icon';
import { Paragraph } from '@/components/ui/text/text';
import { Database } from '@/lib/schema';
import { TProfile } from '@/types/database.types';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface INavbarUserSearchItemProps {
  profile: TProfile;
}

export const NavbarUserSearchItem: React.FC<INavbarUserSearchItemProps> = ({ profile }) => {
  const supabase = createClientComponentClient<Database>();
  const user = useAuth();

  const handleAddFriend = async () => {
    try {
      const { error } = await supabase.from('friendships').insert([
        {
          user_id: user.id,
          friend_id: profile.id,
        },
      ]);
      if (error) {
        console.error('ERROR:', error);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className={styles.item}>
      <Link href={`/profile/${profile.id}`} className={styles.info}>
        <Avatar src={profile.avatar_url!} size={36} />
        <Paragraph size='sm' color='white'>
          {profile.user_name}
        </Paragraph>
      </Link>
      <CustomIcon name='heart' onClick={handleAddFriend} />
    </div>
  );
};
