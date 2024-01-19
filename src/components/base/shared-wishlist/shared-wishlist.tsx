'use client';

import React, { useCallback, useState, useEffect } from 'react';

import SharedWishlistProvider from '../provider/shared-wishlist-provider';
import { ToolbarSharedTitle } from '../wishlist/toolbar/toolbar-shared-title/toolbar-shared-title';
import { Wishlist } from '../wishlist/wishlist';

import { Database } from '@/lib/schema';
import { TSharedWishlist, TWishlist } from '@/types/database.types';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface ISharedWishlistProps {
  sharedWishlist: TSharedWishlist;
  wishlistOne: TWishlist;
  wishlistTwo: TWishlist;
  userId: string;
}

export const SharedWishlist: React.FC<ISharedWishlistProps> = ({
  sharedWishlist,
  wishlistOne,
  wishlistTwo,
  userId,
}) => {
  const [isFriendOnline, setIsFriendOnline] = useState<boolean>(false);

  const CHANNEL_NAME = `shared-wishlist-presence:${sharedWishlist.id}`;

  const supabase = createClientComponentClient<Database>();

  const friendId = wishlistOne.owner_id === userId ? wishlistTwo.owner_id : wishlistOne.owner_id;

  const handleRealtime = useCallback(() => {
    const channel = supabase
      .channel(CHANNEL_NAME, {
        config: {
          presence: {
            key: userId,
          },
        },
      })
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        const isOnline = !!newState[friendId]; // Check if friend is online

        setIsFriendOnline(isOnline);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        if (key === friendId) {
          setIsFriendOnline(false);
        }
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        if (key === friendId) {
          setIsFriendOnline(true);
        }
      });

    return channel;
  }, [supabase]);

  useEffect(() => {
    const channel = handleRealtime();

    const userStatus = {
      user: userId,
    };

    channel.subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') {
        return;
      }

      await channel.track(userStatus);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  return (
    <SharedWishlistProvider sharedWishlist={sharedWishlist} isFriendOnline={isFriendOnline}>
      <ToolbarSharedTitle />
      <Wishlist
        wishlist={wishlistOne.owner_id === userId ? wishlistOne : wishlistTwo}
        isOwnWishlist={true}
      />
      <Wishlist
        wishlist={wishlistTwo.owner_id === userId ? wishlistOne : wishlistTwo}
        isOwnWishlist={false}
      />
    </SharedWishlistProvider>
  );
};
