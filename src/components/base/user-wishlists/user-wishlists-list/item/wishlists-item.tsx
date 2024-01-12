import React from 'react';

import Link from 'next/link';

import styles from '../user-wishlists-list.module.scss';

import { ConfirmModal } from '@/components/ui/confirm-modal/confirm-modal';
import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';
import { Database } from '@/lib/schema';
import { TWishlist } from '@/types/database.types';
import { formatDateToNow } from '@/utils/date';

import { useDisclosure } from '@mantine/hooks';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { formatDistanceToNow } from 'date-fns';

interface IWishlistsItemProps {
  wishlist: TWishlist;
  isOwnWishlist?: boolean;
}

export const WishlistsItem: React.FC<IWishlistsItemProps> = ({ wishlist, isOwnWishlist }) => {
  const supabase = createClientComponentClient<Database>();
  const [opened, { open, close }] = useDisclosure();

  const handleDeleteWishlist = async () => {
    const { error } = await supabase.from('wishlists').delete().eq('id', wishlist.id);

    if (error) {
      console.error(error);
      return;
    }
  };

  return (
    <li className={styles.item}>
      <Link href={`/wishlist/${wishlist.id}`}>{wishlist.title}</Link>
      <div className={styles.pair}>
        <Paragraph size='sm' color='muted'>
          {formatDateToNow(wishlist.created_at)}
        </Paragraph>
        <Icon name='delete' onClick={open} />
        <ConfirmModal
          title={'Delete wishlist'}
          description={`Are you sure you want to delete ${wishlist.title} wishlist?`}
          onConfirm={handleDeleteWishlist}
          onCancel={close}
          opened={opened}
        />
      </div>
    </li>
  );
};
