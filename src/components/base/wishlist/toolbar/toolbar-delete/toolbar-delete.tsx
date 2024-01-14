import React from 'react';

import { useRouter } from 'next/navigation';

import styles from '../toolbar.module.scss';

import { useSharedWishlist } from '@/components/base/provider/shared-wishlist-provider';
import { useWishlist } from '@/components/base/provider/wishlist-provider';
import { ConfirmModal } from '@/components/ui/confirm-modal/confirm-modal';
import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';
import { Database } from '@/lib/schema';
import { notify } from '@/utils/toast';

import { useDisclosure } from '@mantine/hooks';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const ToolbarDelete = () => {
  const { wishlist } = useWishlist();
  const { sharedWishlist } = useSharedWishlist();

  const [opened, { open, close }] = useDisclosure(false);

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleDeleteWishlist = async () => {
    const { error } = wishlist.is_shared
      ? await supabase.from('shared_wishlists').delete().eq('id', sharedWishlist.id)
      : await supabase.from('wishlists').delete().eq('id', wishlist.id);
    if (error) {
      notify('error', 'Error deleting wishlist');
      return;
    } else {
      router.push('/');
      notify('success', 'Wishlist deleted successfully');
    }
  };

  return (
    <>
      <ConfirmModal
        opened={opened}
        onConfirm={handleDeleteWishlist}
        onCancel={close}
        title='Delete wishlist'
        description='Are you sure you want to delete that wishlist?'
      />
      <div className={styles.button} onClick={open}>
        <Icon name='delete' />
        <Paragraph>Delete</Paragraph>
      </div>
    </>
  );
};
