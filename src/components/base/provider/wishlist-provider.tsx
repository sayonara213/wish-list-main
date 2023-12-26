'use client';

import { createContext, useContext, useState } from 'react';

import { TWishlist, TWishlistItem } from '@/types/database.types';

interface IWishlistProviderProps {
  wishlist: TWishlist;
  isOwn: boolean;
  children: React.ReactNode;
}

interface IWishlistContext {
  wishlist: TWishlist;
  items: TWishlistItem[];
  isEditing: boolean;
  isOwnWishlist: boolean;
  setItems: (items: TWishlistItem[]) => void;
  addItem: (item: TWishlistItem) => void;
  deleteItem: (itemId: number) => void;
  updateItem: (item: TWishlistItem) => void;
  setIsEditing: (isEditing: boolean) => void;
}

const initialWishlist: IWishlistContext = {
  wishlist: {
    id: 0,
    owner_id: '',
    title: '',
    is_shared: false,
    created_at: '',
    description: null,
  },
  items: [],
  isOwnWishlist: false,
  isEditing: false,
  setItems: () => {},
  addItem: () => {},
  deleteItem: () => {},
  updateItem: () => {},
  setIsEditing: () => {},
};

const WishlistContext = createContext<IWishlistContext>(initialWishlist);

export const WishlistProvider: React.FC<IWishlistProviderProps> = ({
  wishlist,
  children,
  isOwn,
}) => {
  const [items, setItems] = useState<TWishlistItem[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const addItem = (item: TWishlistItem) => {
    setItems((prevItems: TWishlistItem[]) => [...prevItems, item]);
  };

  const deleteItem = (itemId: number) => {
    setItems((prevItems: TWishlistItem[]) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateItem = (updatedItem: TWishlistItem) => {
    setItems((prevItems: TWishlistItem[]) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        items,
        setItems,
        addItem,
        deleteItem,
        updateItem,
        isEditing,
        setIsEditing,
        isOwnWishlist: isOwn,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export default WishlistProvider;
