import React from 'react';

import { cookies } from 'next/headers';

import { Wishlist } from '@/components/base/wishlist/wishlist';
import { Database } from '@/lib/schema';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const WishlistPage = async ({ params }: { params: { id: number } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.from('wishlists').select().eq('id', params.id);

  if (data === null) return null;

  return <Wishlist wishlist={data[0]} />;
};

export default WishlistPage;
