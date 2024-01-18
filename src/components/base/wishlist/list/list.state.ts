import { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { useWishlist } from '../../provider/wishlist-provider';

import { Database } from '@/lib/schema';
import { TWishlistItem } from '@/types/database.types';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  RealtimePostgresUpdatePayload,
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresChangesFilter,
} from '@supabase/supabase-js';

export const useWishlistListState = () => {
  const { items, reorder, setItems, wishlist, isOwnWishlist, addItem, updateItem, deleteItem } =
    useWishlist();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  const supabase = createClientComponentClient<Database>();

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('items')
      .select()
      .eq('wishlist_id', wishlist.id)
      .order(searchParams.get('sort') || 'priority', {
        ascending: searchParams.get('order') === 'asc' || searchParams.has('order') === false,
      });

    if (error || !data) {
      return;
    }

    setItems(data);
    setIsLoading(false);
  };

  const handleDeleteItem = async (itemId: number) => {
    const { error, data } = await supabase.from('items').delete().eq('id', itemId);

    if (error) {
      throw new Error('Error deleting item');
    }
  };

  const realtimeUpdateItem = (payload: RealtimePostgresUpdatePayload<TWishlistItem>) => {
    if (payload.new.priority !== payload.old.priority) {
      console.log('reorder');

      fetchItems();
    } else {
      console.log('update');

      updateItem(payload.new);
    }
  };

  const realtimeDeleteItem = async (payload: RealtimePostgresDeletePayload<TWishlistItem>) => {
    deleteItem(payload.old.id!);
  };

  const realtimeAddItem = async (payload: RealtimePostgresInsertPayload<TWishlistItem>) => {
    addItem(payload.new);
  };

  const handleRealtime = () => {
    const partialFilter: Omit<
      RealtimePostgresChangesFilter<'DELETE' | 'INSERT' | 'UPDATE'>,
      'event'
    > = {
      schema: 'public',
      table: 'items',
      filter: `wishlist_id=eq.${wishlist.id}`,
    };

    return supabase
      .channel('realtime items')
      .on('postgres_changes', { event: 'INSERT', ...partialFilter }, realtimeAddItem)
      .on('postgres_changes', { event: 'UPDATE', ...partialFilter }, realtimeUpdateItem)
      .on('postgres_changes', { event: 'DELETE', ...partialFilter }, realtimeDeleteItem);
  };

  useEffect(() => {
    const channel = handleRealtime();

    if (!isOwnWishlist && wishlist.is_shared) {
      channel.subscribe();
    }

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  useEffect(() => {
    fetchItems();
  }, [searchParams]);

  const isWishlistEmpty = items.length === 0 && !isLoading;

  return {
    wishlist,
    items,
    isLoading,
    isWishlistEmpty,
    handleDeleteItem,
    reorder,
    isOwnWishlist,
  };
};
