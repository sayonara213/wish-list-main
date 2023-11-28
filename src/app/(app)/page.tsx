import React from 'react';

import { cookies } from 'next/headers';

import styles from './app.module.scss';

import { ShopLinks } from '@/components/base/shop-links/shop-links';
import { Wishlist } from '@/components/base/wishlist/wishlist';
import { Paragraph } from '@/components/ui/text/text';
import { Database } from '@/lib/schema';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const App = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: wishlist } = await supabase
    .from('wishlists')
    .select()
    .eq('owner_id', user?.id)
    .eq('is_shared', false)
    .single();

  return (
    <div className={styles.container}>
      {wishlist && <Wishlist wishlist={wishlist} />}
      <div className={styles.linksWrapper}>
        <Paragraph size='lg' weight='medium'>
          Saved Links:
        </Paragraph>
        <ShopLinks userId={user?.id!} />
      </div>
    </div>
  );
};

export default App;
