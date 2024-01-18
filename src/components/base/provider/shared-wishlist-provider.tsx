'use client';

import { createContext, useContext, useState } from 'react';

import { TSharedWishlist } from '@/types/database.types';

export interface IUserStatus {
  isOnline: boolean;
  lastSeen: string;
}

interface ISharedWishlistProviderProps {
  sharedWishlist: TSharedWishlist;
  friendStatus: IUserStatus | null;
  children: React.ReactNode;
}

interface ISharedWishlistContext {
  sharedWishlist: TSharedWishlist;
  setSharedWishlist: (sharedWishlist: TSharedWishlist) => void;
  title: string;
  setTitle: (title: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  friendStatus: IUserStatus | null;
}

const initialWishlist: ISharedWishlistContext = {
  sharedWishlist: {
    id: 0,
    title: '',
    wishlist_id_one: 0,
    wishlist_id_two: 0,
    friendship_id: 0,
    created_at: '',
  },
  setSharedWishlist: () => {},
  title: '',
  setTitle: () => {},
  isEditing: false,
  setIsEditing: () => {},
  friendStatus: null,
};

const SharedWishlistContext = createContext<ISharedWishlistContext>(initialWishlist);

export const SharedWishlistProvider: React.FC<ISharedWishlistProviderProps> = ({
  sharedWishlist,
  friendStatus,
  children,
}) => {
  const [sharedWishlistState, setSharedWishlistState] = useState<TSharedWishlist>(sharedWishlist);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const setTitle = (title: string) => {
    setSharedWishlistState((prev) => ({ ...prev, title }));
  };

  return (
    <SharedWishlistContext.Provider
      value={{
        sharedWishlist: sharedWishlistState,
        setSharedWishlist: setSharedWishlistState,
        title: sharedWishlistState.title,
        setTitle,
        isEditing,
        setIsEditing,
        friendStatus,
      }}
    >
      {children}
    </SharedWishlistContext.Provider>
  );
};

export const useSharedWishlist = () => {
  return useContext(SharedWishlistContext);
};

export default SharedWishlistProvider;
