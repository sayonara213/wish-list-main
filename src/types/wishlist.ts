export interface IWishlistItemForm {
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface IWishlistForm {
  title: string;
  description: string;
}

export interface IWishlist {
  id: number;
  owner_id: string;
  title: string;
  description: string | null;
  is_shared: boolean;
  created_at: string;
}

export interface IWishlistItem {
  created_at: string;
  description: string | null;
  id: number;
  image_url: string | null;
  is_bought: boolean;
  link: string | null;
  name: string;
  wishlist_id: number;
}
