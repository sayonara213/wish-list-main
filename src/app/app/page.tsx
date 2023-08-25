import React from 'react';

import { cookies } from 'next/headers';

import styles from './app.module.scss';

import { ShopLinks } from '@/components/base/shop-links/shop-links';
import { Paragraph } from '@/components/ui/text/text';
import { Database } from '@/lib/schema';
import { toNormalCase } from '@/utils/text';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const App = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const username = await supabase.from('profiles').select('user_name').eq('id', user!.id);
  const { data, error } = await supabase.from('shops').select();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Paragraph weight='bold' style={{ fontSize: 50 }}>
          ✨Welcome, {toNormalCase(username.data![0].user_name)}!
        </Paragraph>
      </div>
      <ShopLinks shops={data} userId={user?.id!} />
    </div>
  );
};

export default App;
