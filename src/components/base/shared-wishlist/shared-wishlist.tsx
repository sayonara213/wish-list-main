'use client';

import React, { useCallback, useState, useEffect } from 'react';

import SharedWishlistProvider, { IUserStatus } from '../provider/shared-wishlist-provider';
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
  const [friendStatus, setFriendStatus] = useState<IUserStatus | null>(null);

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
        const lastSeen = new Date().toISOString();

        setFriendStatus({ isOnline, lastSeen });
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        if (key === friendId) {
          setFriendStatus({ isOnline: false, lastSeen: leftPresences[0].online_at });
        }
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        if (key === friendId) {
          setFriendStatus({ isOnline: true, lastSeen: new Date().toISOString() });
        }
      });

    return channel;
  }, [supabase]);

  useEffect(() => {
    const channel = handleRealtime();

    const userStatus = {
      user: userId,
      online_at: new Date().toISOString(),
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
    <SharedWishlistProvider sharedWishlist={sharedWishlist} friendStatus={friendStatus}>
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
