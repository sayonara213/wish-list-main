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
  setWishlist: (wishlist: TWishlist) => void;
  items: TWishlistItem[];
  isEditing: boolean;
  isOwnWishlist: boolean;
  setItems: (items: TWishlistItem[]) => void;
  addItem: (item: TWishlistItem) => void;
  deleteItem: (itemId: number) => void;
  updateItem: (item: TWishlistItem) => void;
  setIsEditing: (isEditing: boolean) => void;
  orderChanged: boolean;
  setOrderChanged: (orderChanged: boolean) => void;
  reorder: (items: TWishlistItem[]) => void;
}

const initialWishlist: IWishlistContext = {
  wishlist: {
    id: 0,
    owner_id: '',
    title: '',
    is_shared: false,
    is_private: false,
    created_at: '',
    description: null,
  },
  setWishlist: () => {},
  items: [],
  isOwnWishlist: false,
  isEditing: false,
  setItems: () => {},
  addItem: () => {},
  deleteItem: () => {},
  updateItem: () => {},
  setIsEditing: () => {},
  orderChanged: false,
  setOrderChanged: () => {},
  reorder: () => {},
};

const WishlistContext = createContext<IWishlistContext>(initialWishlist);

export const WishlistProvider: React.FC<IWishlistProviderProps> = ({
  wishlist,
  children,
  isOwn,
}) => {
  const [wishlistState, setWishlistState] = useState<TWishlist>(wishlist);
  const [items, setItems] = useState<TWishlistItem[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [orderChanged, setOrderChanged] = useState<boolean>(false);

  const addItem = (item: TWishlistItem) => {
    setItems((prevItems: TWishlistItem[]) => [
      ...prevItems,
      { ...item, priority: prevItems.length || 0, id: Math.random() },
    ]);
  };

  const deleteItem = (itemId: number) => {
    setItems((prevItems: TWishlistItem[]) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateItem = (updatedItem: TWishlistItem) => {
    setItems((prevItems: TWishlistItem[]) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  const reorder = (items: TWishlistItem[]) => {
    const reorderedItems = items.map((item, index) => ({ ...item, priority: index }));
    setItems(reorderedItems);
    setOrderChanged(true);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: wishlistState,
        setWishlist: setWishlistState,
        items,
        setItems,
        addItem,
        deleteItem,
        updateItem,
        isEditing,
        setIsEditing,
        isOwnWishlist: isOwn,
        orderChanged,
        setOrderChanged,
        reorder,
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
