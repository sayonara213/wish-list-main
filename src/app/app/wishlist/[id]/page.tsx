import React from 'react';

import { cookies } from 'next/headers';

import { Database } from '@/lib/schema';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const Wishlist = async ({ params }: { params: { id: number } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.from('wishlists').select().eq('id', params.id);

  return <div>{data && data[0].title}</div>;
};

export default Wishlist;
